'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/lib/store';
import { playCallRing, playCallConnect, playCallEnd, playTap, playSuccess } from '@/lib/sounds';

interface Message {
  id: string;
  speaker: 'tutor' | 'student';
  text: string;
  japanese?: string;
  timestamp: Date;
}

type LessonTopic = 'greetings' | 'numbers' | 'food' | 'travel' | 'daily' | 'business';

const lessonTopics: { id: LessonTopic; title: string; titleJp: string; icon: string; description: string }[] = [
  { id: 'greetings', title: 'Greetings', titleJp: '挨拶', icon: '👋', description: 'Basic greetings and introductions' },
  { id: 'numbers', title: 'Numbers', titleJp: '数字', icon: '🔢', description: 'Counting and numbers' },
  { id: 'food', title: 'Food & Dining', titleJp: '食べ物', icon: '🍱', description: 'Ordering food and restaurants' },
  { id: 'travel', title: 'Travel', titleJp: '旅行', icon: '✈️', description: 'Directions and travel phrases' },
  { id: 'daily', title: 'Daily Life', titleJp: '日常', icon: '🏠', description: 'Everyday conversations' },
  { id: 'business', title: 'Business', titleJp: 'ビジネス', icon: '💼', description: 'Work and formal Japanese' },
];

export default function TutorTab() {
  const [callState, setCallState] = useState<'idle' | 'ringing' | 'connected' | 'ended'>('idle');
  const [selectedTopic, setSelectedTopic] = useState<LessonTopic | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isTutorSpeaking, setIsTutorSpeaking] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [showTranscript, setShowTranscript] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  const { addXP, completeConversation } = useGamificationStore();

  // Format call duration
  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Start call timer
  useEffect(() => {
    if (callState === 'connected') {
      callTimerRef.current = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    }
    return () => {
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, [callState]);

  // Speech recognition setup
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'ja-JP';

        recognitionRef.current.onresult = async (event: any) => {
          const transcript = event.results[0][0].transcript;
          setIsListening(false);
          
          // Add student message
          const studentMessage: Message = {
            id: Date.now().toString(),
            speaker: 'student',
            text: transcript,
            timestamp: new Date(),
          };
          setMessages(prev => [...prev, studentMessage]);
          
          // Get tutor response
          await getTutorResponse(transcript);
        };

        recognitionRef.current.onerror = () => {
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, [selectedTopic]);

  // Start listening
  const startListening = useCallback(() => {
    if (recognitionRef.current && callState === 'connected') {
      setIsListening(true);
      recognitionRef.current.start();
      playTap();
    }
  }, [callState]);

  // Get tutor response from API
  const getTutorResponse = async (studentText: string) => {
    setIsTutorSpeaking(true);
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: studentText,
          history: messages.map(m => ({
            role: m.speaker === 'student' ? 'user' as const : 'assistant' as const,
            content: m.text
          })),
          scenario: lessonTopics.find(t => t.id === selectedTopic)?.title,
          level: 'beginner',
          mode: 'tutor' // Special mode for tutor calls
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Add tutor message
        const tutorMessage: Message = {
          id: (Date.now() + 1).toString(),
          speaker: 'tutor',
          text: data.response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, tutorMessage]);
        
        // Speak the response
        await speakText(data.response);
      }
    } catch (error) {
      console.error('Tutor response error:', error);
    } finally {
      setIsTutorSpeaking(false);
    }
  };

  // Text to speech
  const speakText = async (text: string) => {
    setIsTutorSpeaking(true);
    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          speed: 0.85,
          voice: 'douji'
        }),
      });

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      audioRef.current = new Audio(audioUrl);
      audioRef.current.onended = () => {
        setIsTutorSpeaking(false);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audioRef.current.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsTutorSpeaking(false);
    }
  };

  // Start a call
  const startCall = (topic: LessonTopic) => {
    setSelectedTopic(topic);
    setCallState('ringing');
    playCallRing();
    
    // Simulate connection after 2 seconds
    setTimeout(() => {
      setCallState('connected');
      playCallConnect();
      
      // Initial greeting
      const greeting: Message = {
        id: Date.now().toString(),
        speaker: 'tutor',
        text: `こんにちは！Today we'll practice ${lessonTopics.find(t => t.id === topic)?.title}. Let's start! 何か話しかけてください。`,
        timestamp: new Date(),
      };
      setMessages([greeting]);
      
      // Speak greeting
      setTimeout(() => speakText(greeting.text), 500);
    }, 2000);
  };

  // End call
  const endCall = () => {
    playCallEnd();
    setCallState('ended');
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    
    // Award XP
    const xpEarned = Math.min(callDuration * 2, 50); // Max 50 XP
    addXP(xpEarned);
    completeConversation();
    playSuccess();
  };

  // Reset to idle
  const resetCall = () => {
    setCallState('idle');
    setSelectedTopic(null);
    setMessages([]);
    setCallDuration(0);
    setIsListening(false);
    setIsTutorSpeaking(false);
    playTap();
  };

  // Idle state - Topic selection
  if (callState === 'idle') {
    return (
      <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#E8E4F0]">
        <div className="px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="text-5xl mb-3">👨‍🏫</div>
            <h1 className="text-xl font-bold text-gray-700 mb-2">AI Tutor Call</h1>
            <p className="text-gray-500 text-sm">Practice speaking Japanese with your tutor!</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-4 mb-5 border-2 border-indigo-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-3xl">📞</span>
              <div>
                <p className="font-semibold text-indigo-700 text-sm">Voice Call Practice</p>
                <p className="text-indigo-600 text-xs">Have a real conversation with your AI tutor!</p>
              </div>
            </div>
          </motion.div>

          <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">📚</span> Choose a Topic
          </h2>

          <div className="grid grid-cols-2 gap-3">
            {lessonTopics.map((topic, index) => (
              <motion.button
                key={topic.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => { playTap(); startCall(topic.id); }}
                className="gambare-card p-4 text-left hover:border-indigo-300 transition-colors"
              >
                <span className="text-3xl mb-2 block">{topic.icon}</span>
                <p className="font-bold text-gray-700">{topic.title}</p>
                <p className="text-xs text-gray-400">{topic.titleJp}</p>
                <p className="text-xs text-gray-500 mt-1">{topic.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Ringing state
  if (callState === 'ringing') {
    return (
      <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-indigo-500 to-purple-600 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center text-white"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-32 h-32 mx-auto mb-6 rounded-full bg-white/20 flex items-center justify-center"
          >
            <span className="text-6xl">👨‍🏫</span>
          </motion.div>
          <h2 className="text-2xl font-bold mb-2">Calling Tutor...</h2>
          <p className="text-white/80">{lessonTopics.find(t => t.id === selectedTopic)?.title} Lesson</p>
          <motion.div 
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="mt-4 flex justify-center gap-2"
          >
            {[0, 1, 2].map(i => (
              <motion.div
                key={i}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ repeat: Infinity, delay: i * 0.2 }}
                className="w-3 h-3 rounded-full bg-white"
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  // Ended state
  if (callState === 'ended') {
    const xpEarned = Math.min(callDuration * 2, 50);
    return (
      <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#D4EDDA] flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center px-4"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Great Session!</h2>
          <p className="text-gray-500 mb-6">You practiced for {formatDuration(callDuration)}</p>
          
          <div className="gambare-card p-6 mb-6 max-w-xs mx-auto">
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl">✨</span>
              <span className="text-3xl font-bold text-indigo-500">+{xpEarned} XP</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-gray-700">{messages.filter(m => m.speaker === 'student').length}</p>
                <p className="text-xs text-gray-500">You spoke</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-700">{formatDuration(callDuration)}</p>
                <p className="text-xs text-gray-500">Duration</p>
              </div>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={resetCall}
            className="w-full max-w-xs mx-auto py-4 rounded-2xl bg-gradient-to-r from-indigo-400 to-purple-500 text-white font-bold text-lg shadow-xl"
          >
            Start New Lesson 📚
          </motion.button>
        </motion.div>
      </div>
    );
  }

  // Connected state - Active call
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-500 to-purple-600 flex flex-col">
      {/* Call Header */}
      <div className="p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl"
            >
              👨‍🏫
            </motion.div>
            <div>
              <p className="font-bold">Sensei Takahashi</p>
              <p className="text-xs text-white/70">{lessonTopics.find(t => t.id === selectedTopic)?.title} Lesson</p>
            </div>
          </div>
          <div className="text-right">
            <p className="font-mono text-xl">{formatDuration(callDuration)}</p>
            <div className="flex items-center gap-1 text-xs text-green-300">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Connected
            </div>
          </div>
        </div>
      </div>

      {/* Video/Avatar Area */}
      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          animate={isTutorSpeaking ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: isTutorSpeaking ? Infinity : 0, duration: 0.5 }}
          className="relative"
        >
          <div className="w-40 h-40 rounded-full bg-white/20 flex items-center justify-center">
            <span className="text-7xl">👨‍🏫</span>
          </div>
          {isTutorSpeaking && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-white rounded-full px-3 py-1"
            >
              <div className="flex gap-0.5">
                {[0, 1, 2, 3].map(i => (
                  <motion.div
                    key={i}
                    animate={{ height: [8, 16, 8] }}
                    transition={{ repeat: Infinity, delay: i * 0.1, duration: 0.3 }}
                    className="w-1 bg-indigo-500 rounded-full"
                  />
                ))}
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Transcript Toggle */}
      <div className="px-4">
        <button
          onClick={() => setShowTranscript(!showTranscript)}
          className="text-white/80 text-sm flex items-center gap-2 mx-auto"
        >
          {showTranscript ? '👇 Hide Transcript' : '👆 Show Transcript'}
        </button>
      </div>

      {/* Transcript */}
      <AnimatePresence>
        {showTranscript && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white/10 backdrop-blur mx-4 rounded-2xl mb-4 overflow-hidden"
          >
            <div className="max-h-40 overflow-y-auto p-3 space-y-2">
              {messages.slice(-6).map((msg) => (
                <div
                  key={msg.id}
                  className={`text-sm ${msg.speaker === 'student' ? 'text-right' : 'text-left'}`}
                >
                  <span className={`inline-block px-3 py-1 rounded-full ${
                    msg.speaker === 'student' 
                      ? 'bg-indigo-400 text-white' 
                      : 'bg-white/20 text-white'
                  }`}>
                    {msg.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="bg-white/10 backdrop-blur p-6 pb-8">
        <div className="flex items-center justify-center gap-6">
          {/* Microphone Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startListening}
            disabled={isListening || isTutorSpeaking}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all ${
              isListening 
                ? 'bg-red-500 text-white animate-pulse' 
                : isTutorSpeaking
                ? 'bg-gray-300 text-gray-500'
                : 'bg-white text-indigo-500'
            }`}
          >
            {isListening ? (
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.5 }}
              >
                🎤
              </motion.div>
            ) : (
              '🎤'
            )}
          </motion.button>

          {/* End Call Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={endCall}
            className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center shadow-lg"
          >
            📵
          </motion.button>

          {/* Speaker Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => playTap()}
            className="w-16 h-16 rounded-full bg-white text-indigo-500 flex items-center justify-center shadow-lg"
          >
            🔊
          </motion.button>
        </div>

        <p className="text-center text-white/60 text-xs mt-4">
          {isListening ? '🎤 Listening... Speak now!' : 
           isTutorSpeaking ? '🔊 Tutor is speaking...' :
           'Tap 🎤 to speak Japanese'}
        </p>
      </div>
    </div>
  );
}
