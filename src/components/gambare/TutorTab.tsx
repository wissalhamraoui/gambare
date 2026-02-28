'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useGamificationStore } from '@/lib/store';

export default function TutorTab() {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [conversation, setConversation] = useState<{q: string, a: string}[]>([]);
  const [status, setStatus] = useState('Tap Start to begin');
  const [currentLevel, setCurrentLevel] = useState('beginner');
  const [textInput, setTextInput] = useState('');
  const [showTextInput, setShowTextInput] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const recognitionRef = useRef<any>(null);
  const finalTranscriptRef = useRef('');
  const { completeConversation, completeVoicePhrase } = useGamificationStore();

  const levels = [
    { id: 'beginner', name: 'Beginner', icon: '🌱' },
    { id: 'intermediate', name: 'Intermediate', icon: '🌿' },
    { id: 'advanced', name: 'Advanced', icon: '🌳' },
  ];

  const speakText = useCallback((text: string, onEnd?: () => void) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g;
      const japaneseMatches = text.match(japaneseRegex);
      const textToSpeak = japaneseMatches ? japaneseMatches.join(' ') : text;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => {
        setIsSpeaking(false);
        onEnd?.();
      };
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  }, []);

  const getAIResponse = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;
    
    setStatus('🤔 Thinking...');
    
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: [],
          scenario: 'tutor_session',
          level: currentLevel
        })
      });

      const data = await response.json();

      if (data.success && data.response) {
        setConversation(prev => [...prev, { q: userMessage, a: data.response }]);
        completeConversation();
        completeVoicePhrase();
        
        setStatus('🗣️ Speaking...');
        speakText(data.response, () => {
          setStatus('🎤 Your turn!');
        });
      } else {
        setStatus('Error: ' + (data.error || 'Unknown'));
      }
    } catch (error) {
      setStatus('Network error!');
    }
  }, [currentLevel, completeConversation, completeVoicePhrase, speakText]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try { recognitionRef.current.stop(); } catch(e) {}
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    if (!recognitionRef.current || isSpeaking) return;
    
    finalTranscriptRef.current = '';
    
    try {
      setIsListening(true);
      setStatus('🎧 Listening... Speak now!');
      recognitionRef.current.start();
    } catch (e: any) {
      if (e.message?.includes('already started')) {
        stopListening();
        setTimeout(startListening, 100);
      } else {
        setStatus('Mic error - use text input');
        setShowTextInput(true);
        setIsListening(false);
      }
    }
  }, [isSpeaking, stopListening]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setSpeechSupported(false);
      setShowTextInput(true);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'ja-JP';

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setStatus(`You: "${transcript}"`);
      stopListening();
      getAIResponse(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech error:', event.error);
      stopListening();
      if (event.error === 'not-allowed') {
        setStatus('Mic blocked - use text');
        setShowTextInput(true);
      } else if (event.error === 'no-speech') {
        setStatus('No speech detected - try again');
      } else {
        setStatus('Error - use text input');
        setShowTextInput(true);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch(e) {}
      }
    };
  }, [getAIResponse, stopListening]);

  const sendTextMessage = () => {
    if (textInput.trim()) {
      getAIResponse(textInput.trim());
      setTextInput('');
    }
  };

  const startCall = () => {
    setIsCallActive(true);
    setConversation([]);
    setShowTextInput(false);
    
    const greeting = 'こんにちは！I am your Japanese teacher. Let us start learning! What is your name? お名前は何ですか？';
    
    setStatus('🗣️ Speaking...');
    speakText(greeting, () => {
      setStatus('🎤 Your turn! Click mic or type');
    });
  };

  const endCall = () => {
    setIsCallActive(false);
    window.speechSynthesis.cancel();
    stopListening();
    setStatus('Tap Start to begin');
    setConversation([]);
  };

  if (!isCallActive) {
    return (
      <div className="min-h-screen pt-20 pb-24 px-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFE4E9]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="w-28 h-28 mx-auto rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-5xl mb-3 shadow-xl">
            👨‍🏫
          </div>
          <h1 className="text-2xl font-bold text-gray-700">AI Voice Tutor</h1>
          <p className="text-gray-500 text-sm mt-1">Practice Japanese with a teacher!</p>
        </motion.div>

        <div className="gambare-card p-4 mb-4">
          <h2 className="font-bold text-gray-700 mb-2">Level:</h2>
          <div className="flex gap-2">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setCurrentLevel(level.id)}
                className={`flex-1 p-2 rounded-xl text-sm ${
                  currentLevel === level.id
                    ? 'bg-gradient-to-r from-indigo-400 to-purple-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {level.icon} {level.name}
              </button>
            ))}
          </div>
        </div>

        <div className="gambare-card p-4 mb-4">
          <p className="text-sm text-gray-600">
            {!speechSupported && '⚠️ Voice not supported - text only mode'}
            {speechSupported && '🎤 Click mic to speak, or use text input'}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={startCall}
          className="w-full py-4 bg-gradient-to-r from-indigo-400 to-purple-500 text-white rounded-2xl font-bold text-lg shadow-lg"
        >
          📞 Start Lesson
        </motion.button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 pb-32 px-4 bg-gradient-to-b from-indigo-50 to-purple-50">
      <div className="text-center mb-3">
        <motion.div 
          animate={{ scale: isSpeaking ? [1, 1.05, 1] : 1 }}
          transition={{ repeat: isSpeaking ? Infinity : 0, duration: 0.5 }}
          className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-3xl shadow-xl mb-2"
        >
          👨‍🏫
        </motion.div>
        <p className="font-bold text-gray-700 text-sm">Sensei</p>
      </div>

      <div className="bg-white rounded-xl p-2 mb-2 text-center shadow-sm">
        <p className="text-gray-700 text-sm">{status}</p>
      </div>

      <div className="max-h-[35vh] overflow-y-auto mb-2 space-y-2">
        {conversation.slice(-4).map((item, index) => (
          <div key={index} className="text-sm">
            <div className="bg-indigo-100 rounded-lg p-2 mb-1">
              <p className="text-indigo-600 font-medium text-xs">You:</p>
              <p>{item.q}</p>
            </div>
            <div className="bg-white rounded-lg p-2 border">
              <p className="text-purple-600 font-medium text-xs">Sensei:</p>
              <p className="text-xs whitespace-pre-wrap">{item.a}</p>
              <button onClick={() => speakText(item.a)} className="text-xs text-purple-400 mt-1">🔊</button>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed bottom-20 left-0 right-0 px-4">
        <div className="max-w-md mx-auto">
          <div className="flex justify-center gap-3 mb-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={isListening ? stopListening : startListening}
              disabled={isSpeaking || !speechSupported}
              className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg ${
                isListening ? 'bg-red-500 text-white' :
                isSpeaking ? 'bg-gray-300' :
                speechSupported ? 'bg-gradient-to-r from-indigo-400 to-purple-500 text-white' : 'bg-gray-300'
              }`}
            >
              {isListening ? '⏹️' : '🎤'}
            </motion.button>
            
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowTextInput(!showTextInput)}
              className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg bg-white border-2 border-indigo-200"
            >
              ⌨️
            </motion.button>
          </div>

          <p className="text-center text-gray-400 text-xs mb-2">
            {isListening ? '🎧 Speak now!' : '🎤 Voice | ⌨️ Type'}
          </p>

          {showTextInput && (
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendTextMessage()}
                placeholder="Type Japanese or English..."
                className="flex-1 px-3 py-2 rounded-lg border text-sm"
              />
              <button onClick={sendTextMessage} className="px-3 py-2 bg-indigo-500 text-white rounded-lg text-sm">Send</button>
            </div>
          )}

          <button onClick={endCall} className="w-full py-2 bg-red-100 text-red-500 rounded-lg text-sm">📵 End</button>
        </div>
      </div>
    </div>
  );
}
