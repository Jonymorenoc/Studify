import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizHighlight } from '../content';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';

interface ScreenHighlightProps {
  screen: QuizHighlight;
}

export default function ScreenHighlight({ screen }: ScreenHighlightProps) {
  const [clicks, setClicks] = useState<{ x: number; y: number; correct: boolean }[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const { nextScreen, addScore, incrementCorrect, incrementAttempts, soundEnabled } = useGameStore();

  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (showExplanation) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    // Verificar si el click está en algún hotspot
    let hitHotspot = false;
    for (const hotspot of screen.hotspots) {
      const distance = Math.sqrt(
        Math.pow(x - hotspot.x, 2) + Math.pow(y - hotspot.y, 2)
      );
      if (distance <= hotspot.r) {
        hitHotspot = true;
        break;
      }
    }

    incrementAttempts();

    // Agregar el click a la lista
    setClicks([...clicks, { x, y, correct: hitHotspot }]);

    if (hitHotspot) {
      setIsCorrect(true);
      setShowExplanation(true);
      incrementCorrect();
      addScore(15);
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
      // Después de 1 segundo, permitir intentar de nuevo
      setTimeout(() => {
        setShowExplanation(true);
      }, 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full max-w-md mx-auto px-4 py-6"
    >
      {/* Emoji */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="text-6xl text-center mb-4"
      >
        {screen.emoji}
      </motion.div>

      {/* Instrucciones */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-bold text-ink text-center mb-6"
      >
        {screen.prompt}
      </motion.h2>

      {/* Imagen interactiva */}
      <div className="flex-1 flex items-center justify-center pb-4">
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-white shadow-lg cursor-pointer"
          onClick={handleImageClick}
          style={{ touchAction: 'manipulation' }}
        >
          {/* Imagen */}
          <img
            src={screen.img}
            alt={screen.alt}
            className="w-full h-auto pointer-events-none select-none"
            draggable={false}
          />

          {/* Overlay para clicks */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Mostrar hotspots solo si ya respondió correctamente */}
            {showExplanation && isCorrect && screen.hotspots.map((hotspot) => (
              <div
                key={hotspot.id}
                className="absolute rounded-full border-4 border-success bg-success/20 animate-pulse"
                style={{
                  left: `${hotspot.x}%`,
                  top: `${hotspot.y}%`,
                  width: `${hotspot.r * 2}%`,
                  height: `${hotspot.r * 2}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}

            {/* Mostrar clicks del usuario */}
            {clicks.map((click, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 0] }}
                transition={{ duration: 1 }}
                className={`absolute w-8 h-8 rounded-full border-4 ${
                  click.correct ? 'border-success bg-success/30' : 'border-error bg-error/30'
                }`}
                style={{
                  left: `${click.x}%`,
                  top: `${click.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Explicación */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div
              className={`rounded-2xl p-4 ${
                isCorrect
                  ? 'bg-success/10 border-2 border-success'
                  : 'bg-error/10 border-2 border-error'
              }`}
              role="alert"
              aria-live="polite"
            >
              <p className="text-lg font-semibold text-ink">
                {isCorrect ? screen.explain : '¡Intenta de nuevo! Toca el área correcta.'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botón siguiente */}
      {showExplanation && isCorrect && (
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={nextScreen}
          className="w-full btn text-lg py-4 min-h-[56px]"
        >
          Siguiente →
        </motion.button>
      )}

      {/* Instrucción adicional */}
      {!showExplanation && clicks.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted mt-4"
        >
          👆 Toca la imagen en el área correcta
        </motion.p>
      )}
    </motion.div>
  );
}
