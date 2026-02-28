'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGamificationStore } from '@/lib/store';
import { conversationScenarios } from '@/lib/japanese-data';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { completeConversation } = useGamificationStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+/g;
      const japaneseMatches = text.match(japaneseRegex);
      const textToSpeak = japaneseMatches ? japaneseMatches.join(' ') : text;
      
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.9;
      
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const sendMessage = async (messageText: string = input) => {
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageText,
          history: messages,
          scenario: selectedScenario,
          level: 'beginner'
        })
      });

      const data = await response.json();

      if (data.success && data.response) {
        const assistantMessage: Message = { role: 'assistant', content: data.response };
        setMessages(prev => [...prev, assistantMessage]);
        completeConversation();
        speakText(data.response);
      } else {
        const errorMessage: Message = {
          role: 'assistant',
          content: `すみません (Sumimasen) - Sorry, there was an error. Please try again! 🙏\n\nError: ${data.error || 'Unknown error'}`
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: 'すみません (Sumimasen) - Sorry, network error. Please try again! 🙏'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const selectScenario = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
    const scenario = conversationScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      sendMessage(`Let's practice: ${scenario.title}`);
    }
  };

  if (messages.length === 0) {
    return (
      <div className="min-h-screen pt-20 pb-24 px-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFE4E9]">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <span className="text-5xl">💬</span>
          <h1 className="text-2xl font-bold text-gray-700 mt-2">Chat Practice</h1>
          <p className="text-gray-500 text-sm">Choose a scenario or start typing!</p>
        </motion.div>

        <div className="grid grid-cols-2 gap-3 mb-6">
          {conversationScenarios.map((scenario, index) => (
            <motion.button
              key={scenario.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => selectScenario(scenario.id)}
              className="gambare-card p-4 text-left hover:border-pink-300 transition-colors"
            >
              <span className="text-2xl">{scenario.icon}</span>
              <p className="font-bold text-gray-700 text-sm mt-2">{scenario.title}</p>
              <p className="text-xs text-gray-400">{scenario.titleJp}</p>
            </motion.button>
          ))}
        </div>

        <div className="fixed bottom-20 left-0 right-0 px-4">
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type in Japanese or English..."
                className="flex-1 px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage()}
                disabled={!input.trim()}
                className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-2xl font-bold disabled:opacity-50"
              >
                送信
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-32 px-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFE4E9]">
      <div className="max-w-md mx-auto space-y-4">
        <AnimatePresence>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white'
                    : 'bg-white border-2 border-pink-100 text-gray-700'
                }`}
              >
                <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                {msg.role === 'assistant' && (
                  <button
                    onClick={() => speakText(msg.content)}
                    className="mt-2 text-xs text-pink-400 hover:text-pink-600"
                  >
                    🔊 Listen
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="bg-white border-2 border-pink-100 p-4 rounded-2xl">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="fixed bottom-20 left-0 right-0 px-4 bg-gradient-to-t from-[#FFE4E9] via-[#FFE4E9] to-transparent pt-6 pb-2">
        <div className="max-w-md mx-auto">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type in Japanese or English..."
              className="flex-1 px-4 py-3 rounded-2xl border-2 border-pink-200 focus:border-pink-400 focus:outline-none bg-white"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || isLoading}
              className="px-6 py-3 bg-gradient-to-r from-pink-400 to-pink-500 text-white rounded-2xl font-bold disabled:opacity-50"
            >
              送信
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
