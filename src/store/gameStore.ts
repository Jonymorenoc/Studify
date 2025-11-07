import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GameState {
  // Navegación
  currentScreenIndex: number;

  // Puntuación y progreso
  score: number;
  correctAnswers: number;
  totalAttempts: number;

  // Stickers desbloqueados por trayecto
  unlockedStickers: Set<number>; // 1, 2, 3

  // Tiempo de inicio de sesión
  startTime: number;

  // Configuración
  soundEnabled: boolean;

  // Acciones
  nextScreen: () => void;
  previousScreen: () => void;
  goToScreen: (index: number) => void;
  addScore: (points: number) => void;
  incrementCorrect: () => void;
  incrementAttempts: () => void;
  unlockSticker: (trayecto: number) => void;
  resetProgress: () => void;
  toggleSound: () => void;

  // Para exportar progreso
  getProgress: () => {
    score: number;
    correctAnswers: number;
    totalAttempts: number;
    timeElapsed: number;
    stickers: number[];
  };
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      currentScreenIndex: 0,
      score: 0,
      correctAnswers: 0,
      totalAttempts: 0,
      unlockedStickers: new Set<number>(),
      startTime: Date.now(),
      soundEnabled: true,

      // Acciones
      nextScreen: () =>
        set((state) => ({
          currentScreenIndex: state.currentScreenIndex + 1
        })),

      previousScreen: () =>
        set((state) => ({
          currentScreenIndex: Math.max(0, state.currentScreenIndex - 1)
        })),

      goToScreen: (index: number) =>
        set({ currentScreenIndex: index }),

      addScore: (points: number) =>
        set((state) => ({
          score: state.score + points
        })),

      incrementCorrect: () =>
        set((state) => ({
          correctAnswers: state.correctAnswers + 1
        })),

      incrementAttempts: () =>
        set((state) => ({
          totalAttempts: state.totalAttempts + 1
        })),

      unlockSticker: (trayecto: number) =>
        set((state) => {
          const newStickers = new Set(state.unlockedStickers);
          newStickers.add(trayecto);
          return { unlockedStickers: newStickers };
        }),

      resetProgress: () =>
        set({
          currentScreenIndex: 0,
          score: 0,
          correctAnswers: 0,
          totalAttempts: 0,
          unlockedStickers: new Set<number>(),
          startTime: Date.now(),
        }),

      toggleSound: () =>
        set((state) => ({
          soundEnabled: !state.soundEnabled
        })),

      getProgress: () => {
        const state = get();
        return {
          score: state.score,
          correctAnswers: state.correctAnswers,
          totalAttempts: state.totalAttempts,
          timeElapsed: Math.floor((Date.now() - state.startTime) / 1000),
          stickers: Array.from(state.unlockedStickers)
        };
      }
    }),
    {
      name: 'kids-ciencias-storage',
      // Convertir Set a Array para persistencia
      partialize: (state) => ({
        ...state,
        unlockedStickers: Array.from(state.unlockedStickers)
      }),
      // Al cargar, convertir Array de vuelta a Set
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.unlockedStickers)) {
          state.unlockedStickers = new Set(state.unlockedStickers);
        }
      }
    }
  )
);
