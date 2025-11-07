import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizMatch } from '../content';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';

interface ScreenMatchProps {
  screen: QuizMatch;
}

export default function ScreenMatch({ screen }: ScreenMatchProps) {
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { nextScreen, addScore, incrementCorrect, incrementAttempts, soundEnabled } = useGameStore();

  const handleLeftClick = (leftId: string) => {
    if (showExplanation) return;

    // Si ya está emparejado, deseleccionar
    if (matches[leftId]) {
      const newMatches = { ...matches };
      delete newMatches[leftId];
      setMatches(newMatches);
      setSelectedLeft(null);
      return;
    }

    setSelectedLeft(leftId);
  };

  const handleRightClick = (rightId: string) => {
    if (showExplanation || !selectedLeft) return;

    // Crear nuevo emparejamiento
    setMatches((prev) => ({
      ...prev,
      [selectedLeft]: rightId,
    }));
    setSelectedLeft(null);
  };

  const handleCheck = () => {
    incrementAttempts();

    // Verificar si todos los emparejamientos son correctos
    let correct = true;
    for (const [leftId, correctRightId] of Object.entries(screen.pairs)) {
      if (matches[leftId] !== correctRightId) {
        correct = false;
        break;
      }
    }

    // También verificar que se hayan hecho todos los emparejamientos
    if (Object.keys(matches).length !== screen.left.length) {
      correct = false;
    }

    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      incrementCorrect();
      addScore(15);
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const canCheck = Object.keys(matches).length === screen.left.length;

  // Obtener el elemento derecho emparejado
  const getRightForLeft = (leftId: string) => {
    const rightId = matches[leftId];
    return screen.right.find((r) => r.id === rightId);
  };

  // Verificar si un elemento derecho ya está emparejado
  const isRightMatched = (rightId: string) => {
    return Object.values(matches).includes(rightId);
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

      {/* Contenido con scroll */}
      <div className="flex-1 overflow-y-auto pb-4">
        <div className="space-y-4">
          {screen.left.map((leftItem) => {
            const rightItem = getRightForLeft(leftItem.id);
            const isSelected = selectedLeft === leftItem.id;

            return (
              <motion.div
                key={leftItem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-2"
              >
                {/* Item izquierdo */}
                <button
                  onClick={() => handleLeftClick(leftItem.id)}
                  disabled={showExplanation}
                  className={`w-full rounded-xl border-2 px-4 py-3 text-lg font-semibold min-h-[56px] transition-all ${
                    isSelected
                      ? 'border-primary bg-primary/10 text-primary scale-105'
                      : rightItem
                      ? 'border-success bg-success/10 text-success'
                      : 'border-primary/30 bg-white text-ink hover:border-primary hover:bg-primary/5'
                  }`}
                  aria-label={leftItem.label}
                >
                  {leftItem.label}
                </button>

                {/* Item derecho emparejado */}
                <AnimatePresence>
                  {rightItem && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-6 border-l-4 border-primary/30"
                    >
                      <div className="rounded-xl border-2 border-primary/30 bg-primary/5 px-4 py-2 text-base font-medium text-ink">
                        ↳ {rightItem.label}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Opciones derechas disponibles */}
        {selectedLeft && !showExplanation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl bg-primary/5 border-2 border-dashed border-primary/40 p-4"
          >
            <h3 className="text-sm font-semibold text-ink mb-3 uppercase">Selecciona la respuesta:</h3>
            <div className="space-y-2">
              {screen.right.map((rightItem) => {
                const matched = isRightMatched(rightItem.id);
                return (
                  <button
                    key={rightItem.id}
                    onClick={() => handleRightClick(rightItem.id)}
                    disabled={matched}
                    className={`w-full rounded-xl border-2 px-4 py-2 text-base font-medium min-h-[48px] transition-all ${
                      matched
                        ? 'border-gray-300 bg-gray-100 text-gray-400 opacity-50'
                        : 'border-primary/30 bg-white text-ink hover:border-primary hover:bg-primary/10'
                    }`}
                  >
                    {rightItem.label}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
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
              <p className="text-lg font-semibold text-ink">{screen.explain}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Botones */}
      <div className="flex gap-3">
        {!showExplanation && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: canCheck ? 1 : 0.3 }}
            onClick={handleCheck}
            disabled={!canCheck}
            className="flex-1 btn secondary text-lg py-4 min-h-[56px]"
          >
            Verificar ✓
          </motion.button>
        )}
        {showExplanation && (
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={nextScreen}
            className="flex-1 btn text-lg py-4 min-h-[56px]"
          >
            Siguiente →
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}
