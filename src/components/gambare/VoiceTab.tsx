'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { voicePhrases } from '@/lib/japanese-data';
import { useGamificationStore } from '@/lib/store';

type Category = 'all' | 'greetings' | 'numbers' | 'daily' | 'questions' | 'expressions';
type VoiceType = 'douji' | 'kazi' | 'chuichui' | 'tongtong';

interface VoiceOption {
  id: VoiceType;
  name: string;
  description: string;
  icon: string;
}

const VOICE_OPTIONS: VoiceOption[] = [
  { id: 'douji', name: 'Natural', description: 'Smooth & Natural', icon: '🌸' },
  { id: 'kazi', name: 'Clear', description: 'Clear & Standard', icon: '🎯' },
  { id: 'chuichui', name: 'Cute', description: 'Lively & Fun', icon: '🎀' },
  { id: 'tongtong', name: 'Warm', description: 'Warm & Friendly', icon: '☀️' },
];

export default function VoiceTab() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState<VoiceType>('douji');
  const [playbackSpeed, setPlaybackSpeed] = useState(0.85);
  const [showSettings, setShowSettings] = useState(false);
  const [playCount, setPlayCount] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { completeVoicePhrase } = useGamificationStore();

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'greetings', label: 'Greetings', icon: '👋' },
    { id: 'numbers', label: 'Numbers', icon: '🔢' },
    { id: 'daily', label: 'Daily', icon: '☀️' },
    { id: 'questions', label: 'Questions', icon: '❓' },
    { id: 'expressions', label: 'Expressions', icon: '💬' },
  ];

  const filteredPhrases = selectedCategory === 'all' 
    ? voicePhrases 
    : voicePhrases.filter(p => p.category === selectedCategory);

  const phrase = filteredPhrases[currentPhrase];

  useEffect(() => {
    setCurrentPhrase(0);
  }, [selectedCategory]);

  // Cleanup audio on unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playPhrase = useCallback(async () => {
    if (!phrase || isPlaying) return;

    // Stop any currently playing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    setIsPlaying(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: phrase.japanese, 
          speed: playbackSpeed,
          voice: selectedVoice,
          volume: 1.2,
        }),
      });

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => {
        setIsPlaying(false);
        setPlayCount(prev => prev + 1);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      
      audio.onerror = () => {
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        audioRef.current = null;
      };
      
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsPlaying(false);
    }
  }, [phrase, isPlaying, playbackSpeed, selectedVoice]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await transcribeAudio(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setTranscription('');
      setShowResult(false);
    } catch (error) {
      console.error('Recording error:', error);
      alert('Please allow microphone access to use voice practice.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.wav');

      const response = await fetch('/api/asr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setTranscription(data.transcription);
        // Check if the transcription matches (simple check)
        const similarity = checkSimilarity(data.transcription.toLowerCase(), phrase.reading.toLowerCase());
        setIsCorrect(similarity > 0.6); // Slightly more lenient
        setShowResult(true);
        if (similarity > 0.6) {
          completeVoicePhrase();
        }
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('ASR error:', error);
      setTranscription('Could not transcribe. Please try again.');
      setShowResult(true);
      setIsCorrect(false);
    }
  };

  // Simple similarity check using Levenshtein distance
  const checkSimilarity = (str1: string, str2: string): number => {
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    
    if (longer.length === 0) return 1.0;
    
    const costs: number[] = [];
    for (let i = 0; i <= longer.length; i++) {
      let lastValue = i;
      for (let j = 0; j <= shorter.length; j++) {
        if (i === 0) {
          costs[j] = j;
        } else if (j > 0) {
          let newValue = costs[j - 1];
          if (longer.charAt(i - 1) !== shorter.charAt(j - 1)) {
            newValue = Math.min(Math.min(newValue, lastValue), costs[j]) + 1;
          }
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
      if (i > 0) costs[shorter.length] = lastValue;
    }
    
    return (longer.length - costs[shorter.length]) / longer.length;
  };

  const nextPhrase = () => {
    setShowResult(false);
    setTranscription('');
    setCurrentPhrase((prev) => (prev + 1) % filteredPhrases.length);
  };

  const prevPhrase = () => {
    setShowResult(false);
    setTranscription('');
    setCurrentPhrase((prev) => (prev - 1 + filteredPhrases.length) % filteredPhrases.length);
  };

  return (
    <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#E6E6FA]">
      <div className="px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="text-5xl mb-2">🎤</div>
          <h1 className="text-xl font-bold text-gray-700 mb-1">Voice Practice</h1>
          <p className="text-gray-500 text-sm">Listen and repeat to improve pronunciation!</p>
        </motion.div>

        {/* Voice Settings */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="gambare-card p-4 mb-4"
        >
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-full flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">
                {VOICE_OPTIONS.find(v => v.id === selectedVoice)?.icon}
              </span>
              <div className="text-left">
                <p className="font-medium text-gray-700 text-sm">Voice Settings</p>
                <p className="text-xs text-gray-400">
                  {VOICE_OPTIONS.find(v => v.id === selectedVoice)?.description} • Speed: {playbackSpeed}x
                </p>
              </div>
            </div>
            <motion.span
              animate={{ rotate: showSettings ? 180 : 0 }}
              className="text-gray-400"
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4 mt-4 border-t border-purple-100 space-y-4">
                  {/* Voice Selection */}
                  <div>
                    <p className="text-xs font-medium text-gray-500 mb-2">Select Voice</p>
                    <div className="grid grid-cols-2 gap-2">
                      {VOICE_OPTIONS.map((voice) => (
                        <button
                          key={voice.id}
                          onClick={() => setSelectedVoice(voice.id)}
                          className={`p-3 rounded-xl text-left transition-all ${
                            selectedVoice === voice.id
                              ? 'bg-purple-100 border-2 border-purple-300'
                              : 'bg-gray-50 border-2 border-transparent hover:border-purple-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{voice.icon}</span>
                            <div>
                              <p className="font-medium text-sm text-gray-700">{voice.name}</p>
                              <p className="text-xs text-gray-400">{voice.description}</p>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Speed Control */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-xs font-medium text-gray-500">Speed</p>
                      <span className="text-xs text-purple-500 font-medium">{playbackSpeed}x</span>
                    </div>
                    <div className="flex gap-2">
                      {[0.7, 0.85, 1.0].map((speed) => (
                        <button
                          key={speed}
                          onClick={() => setPlaybackSpeed(speed)}
                          className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${
                            playbackSpeed === speed
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          {speed === 0.7 ? 'Slow' : speed === 0.85 ? 'Normal' : 'Fast'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 mb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg'
                  : 'bg-white border-2 border-purple-100 text-gray-600 hover:border-purple-300'
              }`}
            >
              <span className="mr-1">{cat.icon}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Main Practice Card */}
        {phrase && (
          <motion.div
            key={phrase.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gambare-card p-6 mb-4"
          >
            {/* Difficulty Dots */}
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < phrase.difficulty ? 'bg-purple-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>

            {/* Japanese Text */}
            <div className="text-center mb-6">
              <p className="text-4xl font-bold text-gray-700 mb-2 jp-text">{phrase.japanese}</p>
              <p className="text-xl text-purple-500 mb-2">{phrase.reading}</p>
              <p className="text-gray-500">{phrase.english}</p>
            </div>

            {/* Listen Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={playPhrase}
              disabled={isPlaying}
              className={`w-full py-4 rounded-2xl font-bold text-lg transition-all mb-6 flex items-center justify-center gap-2 ${
                isPlaying
                  ? 'bg-purple-100 text-purple-400'
                  : 'bg-gradient-to-r from-purple-400 to-purple-500 text-white shadow-lg gambare-button'
              }`}
            >
              {isPlaying ? (
                <>
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 0.5 }}
                  >
                    🔊
                  </motion.span>
                  <span>Playing...</span>
                </>
              ) : (
                <>
                  <span>🔊</span>
                  <span>Listen ({VOICE_OPTIONS.find(v => v.id === selectedVoice)?.name})</span>
                </>
              )}
            </motion.button>

            {/* Recording Section */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">Now you try!</p>
              
              <motion.button
                whileTap={{ scale: 0.95 }}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                className={`w-24 h-24 rounded-full mx-auto flex items-center justify-center text-4xl transition-all ${
                  isRecording
                    ? 'bg-red-400 recording-pulse text-white'
                    : 'bg-gradient-to-br from-pink-400 to-pink-500 text-white shadow-xl hover:shadow-2xl'
                }`}
              >
                {isRecording ? '⏺️' : '🎤'}
              </motion.button>
              <p className="text-xs text-gray-400 mt-2">
                {isRecording ? 'Recording... Release to stop' : 'Tap and hold to record'}
              </p>
            </div>

            {/* Result */}
            <AnimatePresence>
              {showResult && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`mt-4 p-4 rounded-2xl ${
                    isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-orange-50 border-2 border-orange-200'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{isCorrect ? '🎉' : '💪'}</span>
                    <span className={`font-bold ${isCorrect ? 'text-green-600' : 'text-orange-600'}`}>
                      {isCorrect ? 'Great job!' : 'Good try!'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    You said: <span className="font-medium">{transcription || '...'}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Expected: <span className="font-medium">{phrase.reading}</span>
                  </p>
                  {!isCorrect && (
                    <button
                      onClick={playPhrase}
                      className="mt-2 text-sm text-purple-500 flex items-center gap-1"
                    >
                      🔊 Listen again
                    </button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={prevPhrase}
            className="w-12 h-12 rounded-full bg-white border-2 border-purple-100 flex items-center justify-center text-purple-500 hover:border-purple-300 transition-colors"
          >
            ←
          </button>
          
          <div className="flex gap-1">
            {filteredPhrases.slice(0, 10).map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i === currentPhrase ? 'bg-purple-400' : 'bg-purple-100'
                }`}
              />
            ))}
            {filteredPhrases.length > 10 && (
              <span className="text-xs text-gray-400 ml-1">+{filteredPhrases.length - 10}</span>
            )}
          </div>

          <button
            onClick={nextPhrase}
            className="w-12 h-12 rounded-full bg-white border-2 border-purple-100 flex items-center justify-center text-purple-500 hover:border-purple-300 transition-colors"
          >
            →
          </button>
        </div>

        {/* Tips */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 bg-purple-50 rounded-2xl p-4 border-2 border-purple-100"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <p className="font-semibold text-purple-700 text-sm">Pronunciation Tips</p>
              <ul className="text-xs text-gray-600 mt-1 space-y-1">
                <li>• Japanese vowels are short: a, i, u, e, o</li>
                <li>• Each syllable has equal length (mora timing)</li>
                <li>• Listen carefully and try to match the rhythm</li>
                <li>• Use the "Slow" speed if you need more time</li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
