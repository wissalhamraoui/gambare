import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserProgress {
  xp: number;
  level: number;
  streak: number;
  hearts: number;
  lastActiveDate: string;
  cardsMastered: number;
  quizzesCompleted: number;
  conversationsCompleted: number;
  voicePhrasesCompleted: number;
}

interface GamificationState {
  progress: UserProgress;
  addXP: (amount: number) => void;
  loseHeart: () => void;
  restoreHearts: () => void;
  incrementStreak: () => void;
  completeCard: () => void;
  completeQuiz: () => void;
  completeConversation: () => void;
  completeVoicePhrase: () => void;
  checkDailyStreak: () => void;
  reset: () => void;
}

const initialState: UserProgress = {
  xp: 0,
  level: 1,
  streak: 0,
  hearts: 5,
  lastActiveDate: '',
  cardsMastered: 0,
  quizzesCompleted: 0,
  conversationsCompleted: 0,
  voicePhrasesCompleted: 0,
};

// Level thresholds
const getLevel = (xp: number): number => {
  if (xp >= 5000) return 10;
  if (xp >= 3500) return 9;
  if (xp >= 2500) return 8;
  if (xp >= 1800) return 7;
  if (xp >= 1200) return 6;
  if (xp >= 800) return 5;
  if (xp >= 500) return 4;
  if (xp >= 250) return 3;
  if (xp >= 100) return 2;
  return 1;
};

// XP required for next level
const getXPForNextLevel = (level: number): number => {
  const thresholds = [100, 250, 500, 800, 1200, 1800, 2500, 3500, 5000, Infinity];
  return thresholds[level - 1] || Infinity;
};

export const useGamificationStore = create<GamificationState>()(
  persist(
    (set, get) => ({
      progress: initialState,
      
      addXP: (amount: number) => {
        set((state) => {
          const newXP = state.progress.xp + amount;
          const newLevel = getLevel(newXP);
          return {
            progress: {
              ...state.progress,
              xp: newXP,
              level: newLevel,
            }
          };
        });
      },
      
      loseHeart: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            hearts: Math.max(0, state.progress.hearts - 1),
          }
        }));
      },
      
      restoreHearts: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            hearts: 5,
          }
        }));
      },
      
      incrementStreak: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            streak: state.progress.streak + 1,
          }
        }));
      },
      
      completeCard: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            cardsMastered: state.progress.cardsMastered + 1,
          }
        }));
        get().addXP(5);
      },
      
      completeQuiz: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            quizzesCompleted: state.progress.quizzesCompleted + 1,
          }
        }));
        get().addXP(10);
      },
      
      completeConversation: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            conversationsCompleted: state.progress.conversationsCompleted + 1,
          }
        }));
        get().addXP(15);
      },
      
      completeVoicePhrase: () => {
        set((state) => ({
          progress: {
            ...state.progress,
            voicePhrasesCompleted: state.progress.voicePhrasesCompleted + 1,
          }
        }));
        get().addXP(8);
      },
      
      checkDailyStreak: () => {
        const today = new Date().toDateString();
        const { progress } = get();
        
        if (progress.lastActiveDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          
          if (progress.lastActiveDate === yesterday.toDateString()) {
            // Continuing streak
            set((state) => ({
              progress: {
                ...state.progress,
                streak: state.progress.streak + 1,
                lastActiveDate: today,
              }
            }));
          } else if (progress.lastActiveDate === '') {
            // First time
            set((state) => ({
              progress: {
                ...state.progress,
                streak: 1,
                lastActiveDate: today,
              }
            }));
          } else {
            // Streak broken
            set((state) => ({
              progress: {
                ...state.progress,
                streak: 1,
                lastActiveDate: today,
              }
            }));
          }
        }
      },
      
      reset: () => {
        set({ progress: initialState });
      },
    }),
    {
      name: 'gambare-progress',
    }
  )
);

export { getXPForNextLevel };
