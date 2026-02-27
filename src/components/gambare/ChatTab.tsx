'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { conversationScenarios } from '@/lib/japanese-data';
import { useGamificationStore } from '@/lib/store';
import { playMessageSent, playMessageReceived, playTap } from '@/lib/sounds';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatTab() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { completeConversation } = useGamificationStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    playMessageSent();

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'user' ? 'user' as const : 'assistant' as const,
        content: m.content
      }));

      const scenario = conversationScenarios.find(s => s.id === selectedScenario);
      
      console.log('Sending message:', userMessage.content);
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          history,
          scenario: scenario?.title,
          level: 'beginner'
        }),
      });

      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok && data.success && data.response) {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response,
          timestamp: new Date(),
        };
        setMessages(prev => [...prev, assistantMessage]);
        completeConversation();
        playMessageReceived();
      } else {
        console.error('API returned error:', data);
        throw new Error(data.error || 'Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `すみません (Sumimasen) - Sorry, there was an error. Please try again! 🙏\n\nError: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const playTTS = async (text: string, messageId: string) => {
    try {
      setIsPlaying(messageId);
      
      // Use the natural 'douji' voice for conversations
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text, 
          speed: 0.85,
          voice: 'douji', // Natural voice
          volume: 1.2
        }),
      });

      if (!response.ok) throw new Error('TTS failed');

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onended = () => {
        setIsPlaying(null);
        URL.revokeObjectURL(audioUrl);
      };
      
      audio.onerror = () => {
        setIsPlaying(null);
        URL.revokeObjectURL(audioUrl);
      };
      
      await audio.play();
    } catch (error) {
      console.error('TTS error:', error);
      setIsPlaying(null);
    }
  };

  const quickPrompts = [
    { japanese: 'こんにちは', reading: 'Konnichiwa', english: 'Hello' },
    { japanese: 'お元気ですか', reading: 'Ogenki desu ka', english: 'How are you?' },
    { japanese: '日本語を勉強しています', reading: 'Nihongo wo benkyou shiteimasu', english: 'I am studying Japanese' },
    { japanese: '助けてください', reading: 'Tasukete kudasai', english: 'Please help me' },
  ];

  const startScenario = (scenarioId: string) => {
    playTap();
    setSelectedScenario(scenarioId);
    setMessages([]);
    const scenario = conversationScenarios.find(s => s.id === scenarioId);
    if (scenario) {
      // Add initial greeting from AI
      const initialMessage: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: `こんにちは！(Konnichiwa!) I'm ready to help you practice "${scenario.title}" (${scenario.titleJp}). Let's start! ${scenario.icon}\n\nWhat would you like to say first?`,
        timestamp: new Date(),
      };
      setMessages([initialMessage]);
      playMessageReceived();
    }
  };

  return (
    <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFE4E9]">
      {/* Scenario Selection */}
      {!selectedScenario && (
        <div className="px-4">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="text-5xl mb-3">💬</div>
            <h1 className="text-xl font-bold text-gray-700 mb-2">Chat Practice</h1>
            <p className="text-gray-500 text-sm">Text or voice message your AI tutor!</p>
          </motion.div>

          <div className="space-y-3">
            {conversationScenarios.map((scenario, index) => (
              <motion.button
                key={scenario.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => startScenario(scenario.id)}
                className="w-full gambare-card p-4 flex items-center gap-4 text-left hover:border-pink-300 transition-colors"
              >
                <span className="text-4xl">{scenario.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-700">{scenario.title}</h3>
                    <span className="text-gray-400 text-sm">{scenario.titleJp}</span>
                  </div>
                  <p className="text-sm text-gray-500">{scenario.description}</p>
                  <div className="mt-2">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      scenario.level === 'beginner' ? 'bg-green-100 text-green-600' :
                      scenario.level === 'intermediate' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-red-100 text-red-600'
                    }`}>
                      {scenario.level}
                    </span>
                  </div>
                </div>
                <span className="text-gray-300 text-2xl">→</span>
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Chat Interface */}
      {selectedScenario && (
        <div className="flex flex-col h-[calc(100vh-8rem)]">
          {/* Chat Header */}
          <div className="px-4 mb-3 flex items-center gap-3">
            <button
              onClick={() => setSelectedScenario(null)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-500 hover:bg-gray-50"
            >
              ←
            </button>
            <div className="flex-1">
              <h2 className="font-bold text-gray-700">
                {conversationScenarios.find(s => s.id === selectedScenario)?.title}
              </h2>
              <p className="text-xs text-gray-400">
                {conversationScenarios.find(s => s.id === selectedScenario)?.titleJp}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white text-lg shadow-lg">
              🎌
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className={`chat-bubble flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-gradient-to-br from-pink-400 to-pink-500 text-white rounded-br-md' 
                      : 'bg-white border-2 border-pink-100 text-gray-700 rounded-bl-md'
                  }`}>
                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
                    {message.role === 'assistant' && (
                      <button
                        onClick={() => playTTS(message.content, message.id)}
                        disabled={isPlaying === message.id}
                        className="mt-2 flex items-center gap-1 text-xs text-pink-400 hover:text-pink-500 transition-colors"
                      >
                        {isPlaying === message.id ? (
                          <>
                            <span className="animate-pulse">🔊</span> Playing...
                          </>
                        ) : (
                          <>
                            <span>🔊</span> Listen
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-white border-2 border-pink-100 rounded-2xl rounded-bl-md p-4">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-pink-300 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="px-4 py-2">
              <p className="text-xs text-gray-400 mb-2">Quick phrases:</p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {quickPrompts.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => setInput(prompt.japanese)}
                    className="flex-shrink-0 bg-white border-2 border-pink-100 rounded-full px-3 py-1.5 text-xs hover:border-pink-300 transition-colors"
                  >
                    {prompt.japanese}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 bg-white/80 backdrop-blur-sm border-t border-pink-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type in Japanese or English..."
                className="flex-1 gambare-input px-4 py-3 text-sm focus:outline-none"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={isLoading || !input.trim()}
                className="w-12 h-12 rounded-xl gambare-button flex items-center justify-center disabled:opacity-50"
              >
                {isLoading ? '⏳' : '➤'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
