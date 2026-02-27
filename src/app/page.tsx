'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/gambare/Navigation';
import HomeTab from '@/components/gambare/HomeTab';
import ChatTab from '@/components/gambare/ChatTab';
import TutorTab from '@/components/gambare/TutorTab';
import FlashcardTab from '@/components/gambare/FlashcardTab';
import QuizTab from '@/components/gambare/QuizTab';
import { useGamificationStore } from '@/lib/store';

export default function Home() {
  const [activeTab, setActiveTab] = useState('home');
  const { checkDailyStreak, progress, _hasHydrated } = useGamificationStore();

  // Check daily streak on mount
  useEffect(() => {
    if (_hasHydrated) {
      checkDailyStreak();
    }
  }, [checkDailyStreak, _hasHydrated]);

  const handleNavigate = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'home':
        return <HomeTab onNavigate={handleNavigate} />;
      case 'chat':
        return <ChatTab />;
      case 'tutor':
        return <TutorTab />;
      case 'flashcards':
        return <FlashcardTab />;
      case 'quiz':
        return <QuizTab />;
      default:
        return <HomeTab onNavigate={handleNavigate} />;
    }
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Progress Header - shown on all tabs except home */}
      {activeTab !== 'home' && _hasHydrated && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b-2 border-pink-100 px-4 py-3 z-40"
        >
          <div className="flex items-center justify-between max-w-md mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-500 flex items-center justify-center text-white text-sm font-bold shadow-md">
                {progress.level}
              </div>
              <div>
                <div className="text-xs text-gray-400">Level {progress.level}</div>
                <div className="text-sm font-bold text-gray-700">{progress.xp} XP</div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-orange-500 fire-flicker">🔥</span>
                <span className="text-sm font-bold text-orange-500">{progress.streak}</span>
              </div>
              
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-sm ${i < progress.hearts ? 'text-red-400' : 'text-gray-200'}`}
                  >
                    ♥
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Main Content */}
      <div className={activeTab !== 'home' ? 'pt-16' : ''}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {renderTab()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Navigation */}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </main>
  );
}
