'use client';

import { motion } from 'framer-motion';

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'home', icon: '🏠', label: 'Home' },
  { id: 'chat', icon: '💬', label: 'Chat' },
  { id: 'tutor', icon: '👨‍🏫', label: 'Tutor' },
  { id: 'flashcards', icon: '🎴', label: 'Cards' },
  { id: 'quiz', icon: '🏆', label: 'Quiz' },
];

export default function Navigation({ activeTab, onTabChange }: NavigationProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t-2 border-pink-100 px-2 pb-safe z-50">
      <div className="flex justify-around items-center py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTabChange(tab.id)}
              className={`relative flex flex-col items-center py-2 px-4 rounded-2xl transition-all ${
                isActive
                  ? 'text-pink-500'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-50 rounded-2xl"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative text-2xl mb-1">{tab.icon}</span>
              <span className="relative text-xs font-medium">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
