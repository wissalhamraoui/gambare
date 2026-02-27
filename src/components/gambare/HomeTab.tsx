'use client';

import { motion } from 'framer-motion';
import { useGamificationStore, getXPForNextLevel } from '@/lib/store';
import { conversationScenarios } from '@/lib/japanese-data';

interface HomeTabProps {
  onNavigate: (tab: string) => void;
}

export default function HomeTab({ onNavigate }: HomeTabProps) {
  const { progress } = useGamificationStore();
  const xpForNextLevel = getXPForNextLevel(progress.level);
  const xpProgress = progress.level < 10 
    ? ((progress.xp % xpForNextLevel) / xpForNextLevel) * 100 
    : 100;

  const levelTitles = ['', 'Beginner', 'Novice', 'Apprentice', 'Intermediate', 'Advanced', 'Expert', 'Master', 'Champion', 'Legend', 'Grandmaster'];

  const quickActions = [
    { id: 'chat', title: 'Chat', icon: '💬', color: 'from-pink-400 to-pink-500', description: 'Text practice' },
    { id: 'tutor', title: 'AI Tutor', icon: '👨‍🏫', color: 'from-indigo-400 to-indigo-500', description: 'Voice call lesson' },
    { id: 'flashcards', title: 'Flashcards', icon: '🎴', color: 'from-green-400 to-green-500', description: 'Learn vocabulary' },
    { id: 'quiz', title: 'Quiz', icon: '🏆', color: 'from-orange-400 to-orange-500', description: 'Test yourself' },
  ];

  const dailyTips = [
    "Consistency is key! Even 5 minutes a day makes a difference. 🌸",
    "Try saying new words out loud to remember them better! 🗣️",
    "Watch Japanese content with subtitles to train your ear! 📺",
    "Practice writing hiragana and katakana daily! ✍️",
    "Don't be afraid to make mistakes - they help you learn! 💪",
  ];

  const randomTip = dailyTips[Math.floor(Math.random() * dailyTips.length)];

  return (
    <div className="min-h-screen pb-24 pt-4 px-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFE4E9]">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6"
      >
        <div className="text-6xl mb-2 animate-bounce-soft">🎌</div>
        <h1 className="text-2xl font-bold text-gray-700 mb-1">
          こんにちは! <span className="text-pink-500">Learner</span>
        </h1>
        <p className="text-gray-500 text-sm">Ready to practice Japanese today?</p>
      </motion.div>

      {/* Progress Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="gambare-card p-5 mb-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              {progress.level}
            </div>
            <div>
              <p className="text-gray-500 text-xs">Level</p>
              <p className="font-bold text-gray-700">{levelTitles[progress.level]}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-center">
              <p className="text-2xl">🔥</p>
              <p className="font-bold text-orange-500">{progress.streak}</p>
              <p className="text-xs text-gray-400">Streak</p>
            </div>
            <div className="text-center">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < progress.hearts ? 'text-red-400' : 'text-gray-200'}`}>
                    ♥
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1">Hearts</p>
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="relative">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>{progress.xp} XP</span>
            {progress.level < 10 && <span>{xpForNextLevel} XP to level up</span>}
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${xpProgress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-pink-400 to-purple-400 rounded-full"
            />
          </div>
        </div>
      </motion.div>

      {/* Daily Tip */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-lavender-100 to-pink-100 rounded-2xl p-4 mb-5 border-2 border-purple-100"
      >
        <div className="flex items-start gap-3">
          <span className="text-2xl">💡</span>
          <div>
            <p className="font-semibold text-purple-700 text-sm">Daily Tip</p>
            <p className="text-gray-600 text-sm">{randomTip}</p>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-5"
      >
        <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-xl">⚡</span> Quick Practice
        </h2>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate(action.id)}
              className={`bg-gradient-to-br ${action.color} p-4 rounded-2xl text-white text-left shadow-lg`}
            >
              <span className="text-3xl mb-2 block">{action.icon}</span>
              <p className="font-bold">{action.title}</p>
              <p className="text-xs opacity-80">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="gambare-card p-4 mb-5"
      >
        <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-xl">📊</span> Your Progress
        </h2>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-pink-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-pink-500">{progress.cardsMastered}</p>
            <p className="text-xs text-gray-500">Cards</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-purple-500">{progress.quizzesCompleted}</p>
            <p className="text-xs text-gray-500">Quizzes</p>
          </div>
          <div className="bg-green-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-green-500">{progress.conversationsCompleted}</p>
            <p className="text-xs text-gray-500">Chats</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3">
            <p className="text-2xl font-bold text-orange-500">{progress.voicePhrasesCompleted}</p>
            <p className="text-xs text-gray-500">Voice</p>
          </div>
        </div>
      </motion.div>

      {/* Conversation Scenarios */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
          <span className="text-xl">💬</span> Practice Conversations
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {conversationScenarios.map((scenario, index) => (
            <motion.button
              key={scenario.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onNavigate('chat')}
              className="flex-shrink-0 gambare-card p-4 w-40 text-left hover:border-pink-300 transition-colors"
            >
              <span className="text-3xl mb-2 block">{scenario.icon}</span>
              <p className="font-bold text-gray-700 text-sm">{scenario.title}</p>
              <p className="text-xs text-gray-400">{scenario.titleJp}</p>
              <div className="mt-2">
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  scenario.level === 'beginner' ? 'bg-green-100 text-green-600' :
                  scenario.level === 'intermediate' ? 'bg-yellow-100 text-yellow-600' :
                  'bg-red-100 text-red-600'
                }`}>
                  {scenario.level}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Motivational Footer */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center mt-8"
      >
        <p className="text-2xl mb-2">🌸</p>
        <p className="text-pink-500 font-medium">がんばって! (Ganbatte!)</p>
        <p className="text-gray-400 text-sm">You're doing great!</p>
      </motion.div>
    </div>
  );
}
