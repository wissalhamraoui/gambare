'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { flashcards } from '@/lib/japanese-data';
import { useGamificationStore } from '@/lib/store';
import { playSuccess, playFlip, playWhoosh, playTap } from '@/lib/sounds';

type Category = 'all' | 'Greetings' | 'Pronouns' | 'Verbs' | 'Adjectives' | 'Numbers' | 'Nouns' | 'Time' | 'Expressions' | 'Family' | 'Body' | 'Food';
type Level = 'all' | 'N5' | 'N4' | 'N3';
type StudyMode = 'swipe' | 'flip' | 'quiz';

export default function FlashcardTab() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedLevel, setSelectedLevel] = useState<Level>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());
  const [learningCards, setLearningCards] = useState<Set<string>>(new Set());
  const [direction, setDirection] = useState<'left' | 'right' | null>(null);
  const [studyMode, setStudyMode] = useState<StudyMode>('swipe');
  const [showSettings, setShowSettings] = useState(false);
  const { completeCard, addXP } = useGamificationStore();

  const categories: { id: Category; label: string; icon: string }[] = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'Greetings', label: 'Greetings', icon: '👋' },
    { id: 'Pronouns', label: 'Pronouns', icon: '👤' },
    { id: 'Verbs', label: 'Verbs', icon: '🏃' },
    { id: 'Adjectives', label: 'Adjectives', icon: '🎨' },
    { id: 'Numbers', label: 'Numbers', icon: '🔢' },
    { id: 'Nouns', label: 'Nouns', icon: '📦' },
    { id: 'Time', label: 'Time', icon: '⏰' },
    { id: 'Expressions', label: 'Expressions', icon: '💬' },
    { id: 'Family', label: 'Family', icon: '👨‍👩‍👧' },
    { id: 'Body', label: 'Body', icon: '🫀' },
    { id: 'Food', label: 'Food', icon: '🍱' },
  ];

  const levels: { id: Level; label: string; color: string }[] = [
    { id: 'all', label: 'All Levels', color: 'bg-gradient-to-r from-purple-400 to-pink-400' },
    { id: 'N5', label: 'N5 (Beginner)', color: 'bg-green-100 text-green-600' },
    { id: 'N4', label: 'N4 (Intermediate)', color: 'bg-yellow-100 text-yellow-600' },
    { id: 'N3', label: 'N3 (Advanced)', color: 'bg-red-100 text-red-600' },
  ];

  // Filter cards by category and level
  const filteredCards = flashcards.filter(card => {
    const categoryMatch = selectedCategory === 'all' || card.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || card.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const card = filteredCards[currentIndex];

  // Shuffle cards when filters change
  const shuffleCards = useCallback(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
  }, []);

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const threshold = 100;
    
    if (info.offset.x > threshold) {
      // Swiped right - mastered
      setDirection('right');
      handleMastered();
    } else if (info.offset.x < -threshold) {
      // Swiped left - needs practice
      setDirection('left');
      handleNext();
    }
  };

  const handleMastered = () => {
    playSuccess();
    if (card && !masteredCards.has(card.id)) {
      setMasteredCards(prev => new Set([...prev, card.id]));
      completeCard();
      addXP(5);
    }
    // Remove from learning if was there
    if (card && learningCards.has(card.id)) {
      setLearningCards(prev => {
        const newSet = new Set(prev);
        newSet.delete(card.id);
        return newSet;
      });
    }
    setTimeout(() => {
      setIsFlipped(false);
      setDirection(null);
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 300);
  };

  const handleNeedPractice = () => {
    playWhoosh();
    if (card && !learningCards.has(card.id) && !masteredCards.has(card.id)) {
      setLearningCards(prev => new Set([...prev, card.id]));
    }
    setTimeout(() => {
      setIsFlipped(false);
      setDirection(null);
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 300);
  };

  const handleNext = () => {
    playWhoosh();
    setTimeout(() => {
      setIsFlipped(false);
      setDirection(null);
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }, 300);
  };

  const handlePrev = () => {
    playWhoosh();
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleFlip = () => {
    playFlip();
    setIsFlipped(!isFlipped);
  };

  const progress = filteredCards.length > 0 
    ? Math.round((masteredCards.size / filteredCards.length) * 100)
    : 0;

  // Text-to-speech for pronunciation
  const speakJapanese = useCallback((text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  }, []);

  // Handle category/level change
  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleLevelChange = (level: Level) => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  return (
    <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#D4EDDA]">
      <div className="px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-xl font-bold text-gray-700">🎴 Flashcards</h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full bg-white border-2 border-green-100 text-gray-500 hover:border-green-300 transition-colors"
            >
              ⚙️
            </button>
          </div>
          <p className="text-gray-500 text-sm">
            {filteredCards.length} cards • {masteredCards.size} mastered
          </p>
        </motion.div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="gambare-card p-4 mb-4 overflow-hidden"
            >
              <h3 className="font-bold text-gray-700 mb-3">Study Mode</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                {[
                  { id: 'swipe', label: 'Swipe', icon: '👆' },
                  { id: 'flip', label: 'Flip', icon: '🔄' },
                  { id: 'quiz', label: 'Quiz', icon: '❓' },
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setStudyMode(mode.id as StudyMode)}
                    className={`p-2 rounded-xl text-sm font-medium transition-all ${
                      studyMode === mode.id
                        ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg'
                        : 'bg-gray-50 border-2 border-gray-100 text-gray-600 hover:border-green-200'
                    }`}
                  >
                    <span className="mr-1">{mode.icon}</span> {mode.label}
                  </button>
                ))}
              </div>

              <h3 className="font-bold text-gray-700 mb-3">Level Filter</h3>
              <div className="grid grid-cols-2 gap-2">
                {levels.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleLevelChange(level.id)}
                    className={`p-2 rounded-xl text-sm font-medium transition-all ${
                      selectedLevel === level.id
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg'
                        : 'bg-gray-50 border-2 border-gray-100 text-gray-600 hover:border-purple-200'
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress */}
        <div className="gambare-card p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">Progress</span>
            <span className="text-sm font-bold text-green-500">{progress}% Mastered</span>
          </div>
          <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-green-400 to-green-500 rounded-full"
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-gray-400">
            <span className="text-green-500">{masteredCards.size} mastered ✓</span>
            <span className="text-orange-500">{learningCards.size} learning</span>
            <span>{filteredCards.length - masteredCards.size - learningCards.size} new</span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 mb-4 scrollbar-hide">
          {categories.map((cat) => {
            const count = cat.id === 'all' 
              ? flashcards.length 
              : flashcards.filter(c => c.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-green-400 to-green-500 text-white shadow-lg'
                    : 'bg-white border-2 border-green-100 text-gray-600 hover:border-green-300'
                }`}
              >
                <span className="mr-1">{cat.icon}</span> {cat.label}
                <span className="ml-1 opacity-70">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Flashcard */}
        {card && (
          <div className="flashcard-container mb-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction === 'left' ? -200 : direction === 'right' ? 200 : 0 }}
                transition={{ duration: 0.3 }}
                drag={studyMode === 'swipe' ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={studyMode === 'swipe' ? handleDragEnd : undefined}
                onClick={studyMode !== 'swipe' ? handleFlip : undefined}
                className={`flashcard ${studyMode === 'swipe' ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'} ${isFlipped ? 'flipped' : ''}`}
              >
                <div className="flashcard-inner relative">
                  {/* Front */}
                  <div className="flashcard-front gambare-card p-6 min-h-[320px] flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 absolute top-3 right-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${
                        card.level === 'N5' ? 'bg-green-100 text-green-600' :
                        card.level === 'N4' ? 'bg-yellow-100 text-yellow-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        {card.level}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(card.japanese);
                        }}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-400 to-pink-500 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                      >
                        🔊
                      </button>
                    </div>
                    
                    <p className="text-5xl font-bold text-gray-700 mb-3 jp-text">{card.japanese}</p>
                    <p className="text-2xl text-green-500 mb-4">{card.reading}</p>
                    
                    {studyMode === 'quiz' && (
                      <p className="text-gray-400 text-sm mb-4">Tap to reveal answer</p>
                    )}
                    
                    <div className="absolute bottom-4 text-gray-400 text-sm flex items-center gap-1">
                      {studyMode === 'swipe' ? (
                        <>
                          <span>👈 Practice</span>
                          <span className="mx-2">|</span>
                          <span>Know it 👉</span>
                        </>
                      ) : (
                        <>
                          <span>👆</span> Tap to flip
                        </>
                      )}
                    </div>
                  </div>

                  {/* Back */}
                  <div className="flashcard-back gambare-card p-6 min-h-[320px] flex flex-col items-center justify-center absolute inset-0 bg-gradient-to-br from-green-50 to-white">
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          speakJapanese(card.example);
                        }}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-green-400 to-green-500 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                      >
                        🔊
                      </button>
                    </div>
                    
                    <p className="text-3xl font-bold text-gray-700 mb-2 text-center">{card.english}</p>
                    <div className="w-16 h-1 bg-green-300 rounded-full my-3" />
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Example:</p>
                      <p className="text-lg font-medium text-gray-700 jp-text">{card.example}</p>
                      <p className="text-sm text-green-600">{card.exampleReading}</p>
                      <p className="text-sm text-gray-500 mt-1">{card.exampleEnglish}</p>
                    </div>
                    
                    <div className="absolute bottom-4 text-gray-400 text-sm flex items-center gap-1">
                      <span>👆</span> Tap to flip back
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setDirection('left'); handleNeedPractice(); }}
            className="w-14 h-14 rounded-full bg-white border-2 border-orange-200 flex items-center justify-center text-2xl hover:border-orange-400 transition-colors shadow-lg"
          >
            🔄
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => { setDirection('right'); handleMastered(); }}
            className="w-18 h-18 rounded-full bg-gradient-to-br from-green-400 to-green-500 flex items-center justify-center text-3xl text-white shadow-xl gambare-button"
            style={{ width: '72px', height: '72px' }}
          >
            ✓
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="w-14 h-14 rounded-full bg-white border-2 border-green-200 flex items-center justify-center text-2xl hover:border-green-400 transition-colors shadow-lg"
          >
            ←
          </motion.button>
        </div>

        {/* Card Counter */}
        <div className="text-center text-sm text-gray-500 mb-4">
          Card {currentIndex + 1} of {filteredCards.length}
          {masteredCards.has(card?.id) && <span className="text-green-500 ml-2">✓ Mastered</span>}
          {learningCards.has(card?.id) && <span className="text-orange-500 ml-2">📚 Learning</span>}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-green-50 rounded-2xl p-4 border-2 border-green-100"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl">📖</span>
            <div>
              <p className="font-semibold text-green-700 text-sm">How to use</p>
              <ul className="text-xs text-gray-600 mt-1 space-y-1">
                <li>• <span className="font-medium text-green-600">Tap ✓</span> or swipe right if you know it</li>
                <li>• <span className="font-medium text-orange-600">Tap 🔄</span> or swipe left to practice later</li>
                <li>• <span className="font-medium text-gray-600">Tap the card</span> to flip and see the answer</li>
                <li>• <span className="font-medium text-pink-600">Tap 🔊</span> to hear pronunciation</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-3 gap-3 mt-4"
        >
          <div className="bg-green-50 rounded-xl p-3 text-center border-2 border-green-100">
            <p className="text-2xl font-bold text-green-500">{masteredCards.size}</p>
            <p className="text-xs text-gray-500">Mastered</p>
          </div>
          <div className="bg-orange-50 rounded-xl p-3 text-center border-2 border-orange-100">
            <p className="text-2xl font-bold text-orange-500">{learningCards.size}</p>
            <p className="text-xs text-gray-500">Learning</p>
          </div>
          <div className="bg-purple-50 rounded-xl p-3 text-center border-2 border-purple-100">
            <p className="text-2xl font-bold text-purple-500">{filteredCards.length - masteredCards.size - learningCards.size}</p>
            <p className="text-xs text-gray-500">New</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
