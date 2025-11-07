import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { useGameStore } from '../store/gameStore';
import { ALL_SCREENS, getStickerByTrayecto } from '../content';
import type { Screen } from '../content';
import { preloadSounds, playSound } from '../utils/audio';
import Header from '../components/Header';
import ScreenLearn from '../components/ScreenLearn';
import ScreenChoice from '../components/ScreenChoice';
import ScreenDrag from '../components/ScreenDrag';
import ScreenMatch from '../components/ScreenMatch';
import ScreenHighlight from '../components/ScreenHighlight';
import ScreenReflect from '../components/ScreenReflect';
import StickerBook from '../components/StickerBook';

export default function KidsCiencias() {
  const {
    currentScreenIndex,
    score,
    unlockedStickers,
    soundEnabled,
    resetProgress,
    unlockSticker,
    getProgress,
  } = useGameStore();

  const [showStickers, setShowStickers] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [completedTrayecto, setCompletedTrayecto] = useState<number | null>(null);

  const currentScreen: Screen = ALL_SCREENS[currentScreenIndex];

  // Precargar sonidos al montar
  useEffect(() => {
    preloadSounds();
  }, []);

  // Detectar finalización de trayecto
  useEffect(() => {
    if (!currentScreen) return;

    const trayecto = currentScreen.trayecto;
    const trayectoScreens = ALL_SCREENS.filter((s) => s.trayecto === trayecto);
    const lastTrayectoScreen = trayectoScreens[trayectoScreens.length - 1];

    // Si acabamos de completar la última pantalla de un trayecto
    if (currentScreen.id === lastTrayectoScreen.id && !unlockedStickers.has(trayecto)) {
      setCompletedTrayecto(trayecto);
      unlockSticker(trayecto);
      setShowConfetti(true);
      playSound('sticker', soundEnabled);

      // Ocultar confetti después de 5 segundos
      setTimeout(() => {
        setShowConfetti(false);
        setCompletedTrayecto(null);
      }, 5000);
    }
  }, [currentScreenIndex, currentScreen, soundEnabled, unlockedStickers, unlockSticker]);

  // Compartir progreso
  const handleShareProgress = () => {
    const progress = getProgress();
    const json = JSON.stringify(progress, null, 2);

    // Copiar al portapapeles
    navigator.clipboard.writeText(json).then(
      () => {
        alert('¡Progreso copiado al portapapeles! 📋');
      },
      (err) => {
        console.error('Error al copiar:', err);
        alert('No se pudo copiar el progreso');
      }
    );
  };

  if (!currentScreen) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
        >
          <div className="text-8xl mb-6">🎉</div>
          <h1 className="text-3xl font-bold text-ink mb-4">
            ¡Felicidades! Has completado todo
          </h1>
          <p className="text-lg text-muted mb-8">
            Obtuviste <strong className="text-primary">{score} puntos</strong>
          </p>

          <div className="flex flex-col gap-3 max-w-sm mx-auto">
            <button onClick={() => setShowStickers(true)} className="btn text-lg py-4">
              Ver Mis Stickers 📚
            </button>
            <button onClick={handleShareProgress} className="btn secondary text-lg py-4">
              Compartir Progreso 📤
            </button>
            <button onClick={resetProgress} className="btn ghost text-lg py-4">
              Reiniciar 🔄
            </button>
          </div>
        </motion.div>

        {showStickers && <StickerBook onClose={() => setShowStickers(false)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-surface-soft to-surface">
      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {/* Header */}
      <Header
        tema={currentScreen.tema}
        emoji={currentScreen.emoji}
        currentScreen={currentScreenIndex}
        totalScreens={ALL_SCREENS.length}
      />

      {/* Contenido principal */}
      <main className="flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScreen.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            {currentScreen.kind === 'learn' && <ScreenLearn screen={currentScreen} />}
            {currentScreen.kind === 'quiz-choice' && <ScreenChoice screen={currentScreen} />}
            {currentScreen.kind === 'quiz-drag' && <ScreenDrag screen={currentScreen} />}
            {currentScreen.kind === 'quiz-match' && <ScreenMatch screen={currentScreen} />}
            {currentScreen.kind === 'quiz-highlight' && <ScreenHighlight screen={currentScreen} />}
            {currentScreen.kind === 'quiz-reflect' && <ScreenReflect screen={currentScreen} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating action buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        {/* Botón de stickers */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setShowStickers(true)}
          className="w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center text-2xl"
          aria-label="Ver stickers"
        >
          📚
        </motion.button>

        {/* Botón de compartir progreso */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleShareProgress}
          className="w-14 h-14 rounded-full bg-secondary text-white shadow-lg flex items-center justify-center text-2xl"
          aria-label="Compartir progreso"
        >
          📤
        </motion.button>
      </div>

      {/* Modal de stickers */}
      {showStickers && <StickerBook onClose={() => setShowStickers(false)} />}

      {/* Notificación de trayecto completado */}
      <AnimatePresence>
        {completedTrayecto && (
          <motion.div
            initial={{ scale: 0, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0, y: 100 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-6 text-center max-w-sm">
              <div className="text-6xl mb-3">{completedTrayecto && getStickerByTrayecto(completedTrayecto as 1 | 2 | 3)}</div>
              <h3 className="text-xl font-bold text-ink mb-2">
                ¡Trayecto Completado!
              </h3>
              <p className="text-sm text-muted">
                Has desbloqueado un nuevo sticker
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
