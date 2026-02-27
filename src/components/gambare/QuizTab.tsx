'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { quizQuestions, flashcards, QuizQuestion } from '@/lib/japanese-data';
import { useGamificationStore } from '@/lib/store';
import { playSuccess, playError, playTap, playTick, playTimeWarning, playWhoosh } from '@/lib/sounds';

type Category = 'all' | 'Greetings' | 'Pronouns' | 'Verbs' | 'Adjectives' | 'Numbers' | 'Nouns' | 'Time' | 'Expressions' | 'Family' | 'Body' | 'Food';
type Difficulty = 'all' | 'easy' | 'medium' | 'hard';

// Helper function to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  return [...array].sort(() => Math.random() - 0.5);
}

// Generate quiz questions from flashcards dynamically
function generateQuestionsFromFlashcards(
  cards: typeof flashcards,
  count: number,
  difficulty: Difficulty
): QuizQuestion[] {
  const shuffled = shuffleArray(cards);
  const questions: QuizQuestion[] = [];

  for (let i = 0; i < Math.min(count, shuffled.length); i++) {
    const card = shuffled[i];
    const questionTypes = ['multiple-choice', 'reverse', 'reading'] as const;
    const questionType = questionTypes[Math.floor(Math.random() * questionTypes.length)];

    if (questionType === 'multiple-choice') {
      // Generate wrong options
      const wrongOptions = shuffled
        .filter(c => c.id !== card.id && c.category === card.category)
        .slice(0, 3)
        .map(c => c.english);
      
      // If not enough same category, use any
      const additionalOptions = wrongOptions.length < 3 
        ? shuffled
            .filter(c => c.id !== card.id && !wrongOptions.includes(c.english))
            .slice(0, 3 - wrongOptions.length)
            .map(c => c.english)
        : [];
      
      const allWrongOptions = [...wrongOptions, ...additionalOptions].slice(0, 3);
      const options = shuffleArray([card.english, ...allWrongOptions]);

      questions.push({
        id: `gen-${Date.now()}-${i}`,
        type: 'multiple-choice',
        question: `What does "${card.japanese}" mean?`,
        questionReading: card.reading,
        options,
        correctAnswer: card.english,
        explanation: `${card.japanese} (${card.reading}) = "${card.english}"\nExample: ${card.example} (${card.exampleReading})\n"${card.exampleEnglish}"`,
        category: card.category,
        difficulty: difficulty === 'all' ? (Math.random() > 0.5 ? 'easy' : 'medium') : difficulty,
      });
    } else if (questionType === 'reverse') {
      // Japanese to English or English to Japanese
      const wrongOptions = shuffled
        .filter(c => c.id !== card.id)
        .slice(0, 3)
        .map(c => c.japanese);
      const options = shuffleArray([card.japanese, ...wrongOptions]);

      questions.push({
        id: `gen-rev-${Date.now()}-${i}`,
        type: 'multiple-choice',
        question: `How do you say "${card.english}" in Japanese?`,
        options,
        correctAnswer: card.japanese,
        explanation: `"${card.english}" in Japanese is "${card.japanese}" (${card.reading})`,
        category: card.category,
        difficulty: difficulty === 'all' ? 'medium' : difficulty,
      });
    } else {
      // Reading question
      const wrongOptions = ['a', 'i', 'u', 'e', 'o', 'ka', 'ki', 'ku', 'ke', 'ko']
        .filter(r => r !== card.reading.substring(0, 2))
        .slice(0, 3);
      const options = shuffleArray([card.reading, ...wrongOptions.map(o => o + card.reading.substring(2))]);

      questions.push({
        id: `gen-read-${Date.now()}-${i}`,
        type: 'multiple-choice',
        question: `How do you read "${card.japanese}"?`,
        options,
        correctAnswer: card.reading,
        explanation: `${card.japanese} is read as "${card.reading}" and means "${card.english}"`,
        category: card.category,
        difficulty: difficulty === 'all' ? 'easy' : difficulty,
      });
    }
  }

  return questions;
}

export default function QuizTab() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizKey, setQuizKey] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>('all');
  const [questionCount, setQuestionCount] = useState(10);
  const [quizStarted, setQuizStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const { completeQuiz, addXP } = useGamificationStore();

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

  // Filter static questions by category and difficulty
  const filteredStaticQuestions = useMemo(() => {
    let filtered = quizQuestions;
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(q => q.category === selectedCategory);
    }
    if (selectedDifficulty !== 'all') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }
    return filtered;
  }, [selectedCategory, selectedDifficulty]);

  // Generate dynamic questions from flashcards
  const allQuestions = useMemo(() => {
    const staticQs = filteredStaticQuestions;
    const dynamicQs = generateQuestionsFromFlashcards(
      selectedCategory === 'all' ? flashcards : flashcards.filter(f => f.category === selectedCategory),
      questionCount,
      selectedDifficulty
    );
    return [...staticQs, ...dynamicQs];
  }, [filteredStaticQuestions, selectedCategory, selectedDifficulty, questionCount]);

  // Use useMemo for initial shuffle with quizKey as dependency
  const shuffledQuestions = useMemo(() => {
    return shuffleArray(allQuestions).slice(0, questionCount);
  }, [quizKey, allQuestions, questionCount]);

  // Use useMemo for shuffled options
  const shuffledOptions = useMemo(() => {
    if (shuffledQuestions.length > 0 && shuffledQuestions[currentQuestion]?.options) {
      return shuffleArray(shuffledQuestions[currentQuestion].options!);
    }
    return [];
  }, [currentQuestion, shuffledQuestions]);

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsTimerActive(false);
            // Auto-submit when time runs out
            if (!showResult && shuffledQuestions[currentQuestion]) {
              setShowResult(true);
              setSelectedAnswer('timeout');
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isTimerActive, timeLeft, showResult, currentQuestion, shuffledQuestions]);

  const question = shuffledQuestions[currentQuestion];

  const handleAnswer = useCallback((answer: string) => {
    if (showResult || !question) return;
    
    setSelectedAnswer(answer);
    setShowResult(true);
    setIsTimerActive(false);

    if (answer === question.correctAnswer) {
      setScore(prev => prev + 1);
      completeQuiz();
      playSuccess();
    } else {
      playError();
    }
  }, [showResult, question, completeQuiz]);

  const nextQuestion = useCallback(() => {
    playWhoosh();
    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
      // Set timer for next question
      const timePerQuestion = selectedDifficulty === 'hard' ? 10 : selectedDifficulty === 'medium' ? 15 : 20;
      setTimeLeft(timePerQuestion);
      setIsTimerActive(true);
    } else {
      setQuizComplete(true);
      setIsTimerActive(false);
      // Bonus XP for completing quiz
      addXP(score * 2);
      playSuccess();
    }
  }, [currentQuestion, shuffledQuestions.length, score, addXP, selectedDifficulty]);

  const startQuiz = useCallback(() => {
    playTap();
    setQuizStarted(true);
    setQuizKey(prev => prev + 1);
    const timePerQuestion = selectedDifficulty === 'hard' ? 10 : selectedDifficulty === 'medium' ? 15 : 20;
    setTimeLeft(timePerQuestion);
    setIsTimerActive(true);
  }, [selectedDifficulty]);

  const restartQuiz = useCallback(() => {
    playTap();
    setQuizKey(prev => prev + 1);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizComplete(false);
    setQuizStarted(false);
    setIsTimerActive(false);
  }, []);

  // Quiz Setup Screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFDAB9]">
        <div className="px-4">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-6"
          >
            <div className="text-5xl mb-3">🏆</div>
            <h1 className="text-xl font-bold text-gray-700 mb-2">Quiz Setup</h1>
            <p className="text-gray-500 text-sm">Customize your quiz experience</p>
          </motion.div>

          {/* Category Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="gambare-card p-4 mb-4"
          >
            <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>📚</span> Select Category
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`p-2 rounded-xl text-sm font-medium transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-orange-400 to-orange-500 text-white shadow-lg'
                      : 'bg-gray-50 border-2 border-gray-100 text-gray-600 hover:border-orange-200'
                  }`}
                >
                  <span className="mr-1">{cat.icon}</span>
                  <span className="text-xs">{cat.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="gambare-card p-4 mb-4"
          >
            <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>⚡</span> Select Difficulty
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { id: 'all', label: 'Mixed', icon: '🎲', color: 'from-purple-400 to-purple-500' },
                { id: 'easy', label: 'Easy', icon: '🌱', color: 'from-green-400 to-green-500' },
                { id: 'medium', label: 'Medium', icon: '🔥', color: 'from-orange-400 to-orange-500' },
                { id: 'hard', label: 'Hard', icon: '💀', color: 'from-red-400 to-red-500' },
              ].map((diff) => (
                <button
                  key={diff.id}
                  onClick={() => setSelectedDifficulty(diff.id as Difficulty)}
                  className={`p-3 rounded-xl text-sm font-medium transition-all ${
                    selectedDifficulty === diff.id
                      ? `bg-gradient-to-r ${diff.color} text-white shadow-lg`
                      : 'bg-gray-50 border-2 border-gray-100 text-gray-600 hover:border-orange-200'
                  }`}
                >
                  <span className="block text-xl mb-1">{diff.icon}</span>
                  <span className="text-xs">{diff.label}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Question Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="gambare-card p-4 mb-4"
          >
            <h3 className="font-bold text-gray-700 mb-3 flex items-center gap-2">
              <span>🔢</span> Number of Questions
            </h3>
            <div className="grid grid-cols-4 gap-2">
              {[5, 10, 15, 20].map((count) => (
                <button
                  key={count}
                  onClick={() => setQuestionCount(count)}
                  className={`p-3 rounded-xl text-lg font-bold transition-all ${
                    questionCount === count
                      ? 'bg-gradient-to-r from-pink-400 to-pink-500 text-white shadow-lg'
                      : 'bg-gray-50 border-2 border-gray-100 text-gray-600 hover:border-pink-200'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Available Questions Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-green-50 to-mint-50 rounded-2xl p-4 mb-4 border-2 border-green-100"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <p className="font-semibold text-green-700 text-sm">Available Questions</p>
                <p className="text-green-600 text-xs">
                  {allQuestions.length} questions ready • Auto-generating from {flashcards.length} flashcards
                </p>
              </div>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={startQuiz}
            className="w-full py-4 rounded-2xl gambare-button text-lg shadow-xl"
          >
            Start Quiz 🚀
          </motion.button>
        </div>
      </div>
    );
  }

  if (shuffledQuestions.length === 0) {
    return (
      <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFDAB9] flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="text-4xl"
        >
          ⏳
        </motion.div>
      </div>
    );
  }

  // Quiz Complete Screen
  if (quizComplete) {
    const percentage = Math.round((score / shuffledQuestions.length) * 100);
    const getMessage = () => {
      if (percentage === 100) return { text: 'Perfect Score! 🌟', subtext: 'You\'re a Japanese master!' };
      if (percentage >= 80) return { text: 'Excellent! 🎉', subtext: 'Great job! Keep it up!' };
      if (percentage >= 60) return { text: 'Good work! 💪', subtext: 'You\'re making progress!' };
      if (percentage >= 40) return { text: 'Nice try! 🌸', subtext: 'Practice makes perfect!' };
      return { text: 'Keep learning! 📚', subtext: 'Every mistake is a step forward!' };
    };
    const message = getMessage();

    return (
      <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFDAB9]">
        <div className="px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="gambare-card p-8 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="text-7xl mb-4"
            >
              {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎯' : percentage >= 40 ? '💪' : '📚'}
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-700 mb-2"
            >
              {message.text}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-500 mb-6"
            >
              {message.subtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mb-6"
            >
              <div className="relative w-32 h-32 mx-auto mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="#FFE4E9"
                    strokeWidth="12"
                  />
                  <motion.circle
                    cx="64"
                    cy="64"
                    r="56"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="12"
                    strokeLinecap="round"
                    initial={{ strokeDasharray: '0 352' }}
                    animate={{ strokeDasharray: `${percentage * 3.52} 352` }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FF8FA3" />
                      <stop offset="100%" stopColor="#FFB6C1" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-700">{percentage}%</span>
                </div>
              </div>

              <div className="flex justify-center gap-8">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-500">{score}</p>
                  <p className="text-xs text-gray-400">Correct</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-400">{shuffledQuestions.length - score}</p>
                  <p className="text-xs text-gray-400">Wrong</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-500">{questionCount}</p>
                  <p className="text-xs text-gray-400">Total</p>
                </div>
              </div>
            </motion.div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={restartQuiz}
              className="w-full py-4 rounded-2xl gambare-button text-lg"
            >
              New Quiz 🔄
            </motion.button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24 pt-4 bg-gradient-to-b from-[#FFF9F0] to-[#FFDAB9]">
      <div className="px-4">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-4"
        >
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={restartQuiz}
              className="text-sm text-gray-500 flex items-center gap-1"
            >
              ← Back
            </button>
            <span className="text-sm font-medium text-orange-500">
              {categories.find(c => c.id === selectedCategory)?.icon} {categories.find(c => c.id === selectedCategory)?.label}
            </span>
          </div>
          <h1 className="text-xl font-bold text-gray-700">Quiz Time!</h1>
        </motion.div>

        {/* Progress Bar & Timer */}
        <div className="gambare-card p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-gray-500">
              Question {currentQuestion + 1}/{shuffledQuestions.length}
            </span>
            <div className="flex items-center gap-3">
              {isTimerActive && (
                <span className={`text-sm font-bold ${timeLeft <= 5 ? 'text-red-500 animate-pulse' : 'text-blue-500'}`}>
                  ⏱️ {timeLeft}s
                </span>
              )}
              <span className="text-sm font-bold text-orange-500">Score: {score}</span>
            </div>
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestion + 1) / shuffledQuestions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"
            />
          </div>
        </div>

        {/* Question Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={question?.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="gambare-card p-6 mb-4"
          >
            {/* Question Type Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  question?.type === 'multiple-choice' ? 'bg-blue-100 text-blue-600' :
                  question?.type === 'fill-blank' ? 'bg-purple-100 text-purple-600' :
                  question?.type === 'matching' ? 'bg-green-100 text-green-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {question?.type === 'multiple-choice' ? 'Multiple Choice' :
                   question?.type === 'fill-blank' ? 'Fill in Blank' :
                   question?.type === 'matching' ? 'Matching' : 'Quiz'}
                </span>
                {question?.difficulty && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    question.difficulty === 'easy' ? 'bg-green-50 text-green-500' :
                    question.difficulty === 'medium' ? 'bg-orange-50 text-orange-500' :
                    'bg-red-50 text-red-500'
                  }`}>
                    {question.difficulty}
                  </span>
                )}
              </div>
              <span className="text-xs text-gray-400">{question?.category}</span>
            </div>

            {/* Question */}
            <h2 className="text-xl font-bold text-gray-700 mb-2 jp-text">{question?.question}</h2>
            {question?.questionReading && (
              <p className="text-sm text-orange-500 mb-4">{question.questionReading}</p>
            )}

            {/* Fill in blank input */}
            {question?.type === 'fill-blank' && !showResult && (
              <input
                type="text"
                placeholder="Type your answer..."
                className="w-full gambare-input px-4 py-3 text-lg mb-4"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleAnswer((e.target as HTMLInputElement).value);
                  }
                }}
              />
            )}

            {/* Options for multiple choice */}
            {question?.type !== 'fill-blank' && shuffledOptions.length > 0 && (
              <div className="space-y-3">
                {shuffledOptions.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrect = option === question?.correctAnswer;
                  const showCorrect = showResult && isCorrect;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={option}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={!showResult ? { scale: 1.02 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                      onClick={() => handleAnswer(option)}
                      disabled={showResult}
                      className={`w-full p-4 rounded-2xl text-left transition-all ${
                        showCorrect
                          ? 'bg-green-100 border-2 border-green-400 text-green-700'
                          : showWrong
                          ? 'bg-red-100 border-2 border-red-400 text-red-700'
                          : isSelected
                          ? 'bg-orange-100 border-2 border-orange-400 text-orange-700'
                          : 'bg-gray-50 border-2 border-gray-100 hover:border-orange-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{option}</span>
                        {showCorrect && <span className="text-xl">✓</span>}
                        {showWrong && <span className="text-xl">✗</span>}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Result */}
            {showResult && question && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mt-4 p-4 rounded-2xl ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-green-50 border-2 border-green-200'
                    : 'bg-orange-50 border-2 border-orange-200'
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {selectedAnswer === question.correctAnswer ? '🎉' : '💡'}
                  </span>
                  <span className={`font-bold ${
                    selectedAnswer === question.correctAnswer ? 'text-green-600' : 'text-orange-600'
                  }`}>
                    {selectedAnswer === question.correctAnswer ? 'Correct!' : 'Not quite!'}
                  </span>
                </div>
                {selectedAnswer !== question.correctAnswer && (
                  <p className="text-sm text-gray-600 mb-2">
                    The correct answer is: <span className="font-bold">{question.correctAnswer}</span>
                  </p>
                )}
                {question.explanation && (
                  <p className="text-sm text-gray-500 whitespace-pre-line">{question.explanation}</p>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Next Button */}
        {showResult && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={nextQuestion}
            className="w-full py-4 rounded-2xl gambare-button text-lg"
          >
            {currentQuestion < shuffledQuestions.length - 1 ? 'Next Question →' : 'See Results 🏆'}
          </motion.button>
        )}
      </div>
    </div>
  );
}
