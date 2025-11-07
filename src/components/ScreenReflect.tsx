import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizReflect } from '../content';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';

interface ScreenReflectProps {
  screen: QuizReflect;
}

export default function ScreenReflect({ screen }: ScreenReflectProps) {
  const [selectedChoices, setSelectedChoices] = useState<number[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);

  const { nextScreen, addScore, incrementCorrect, soundEnabled } = useGameStore();

  const handleChoiceClick = (index: number) => {
    if (showExplanation) return;

    if (selectedChoices.includes(index)) {
      setSelectedChoices(selectedChoices.filter((i) => i !== index));
    } else {
      setSelectedChoices([...selectedChoices, index]);
    }
  };

  const handleContinue = () => {
    if (selectedChoices.length === 0) return;

    setShowExplanation(true);
    // En reflexión, siempre suma puntos por participar
    addScore(10);
    incrementCorrect();
    playSound('correct', soundEnabled);
  };

  const canContinue = selectedChoices.length > 0;

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
          {screen.choices.map((choice, index) => {
            const isSelected = selectedChoices.includes(index);

            return (
              <motion.button
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                onClick={() => handleChoiceClick(index)}
                disabled={showExplanation}
                className={`w-full rounded-2xl border-2 px-6 py-4 text-left text-lg transition-all min-h-[80px] ${
                  isSelected
                    ? 'border-primary bg-primary/10 text-primary font-semibold scale-105'
                    : 'border-primary/30 bg-white text-ink hover:border-primary hover:bg-primary/5'
                }`}
                aria-label={`Opción ${index + 1}`}
              >
                <div className="flex items-start gap-3">
                  {/* Checkbox visual */}
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      isSelected
                        ? 'border-primary bg-primary text-white'
                        : 'border-primary/30 bg-white'
                    }`}
                  >
                    {isSelected && (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Texto */}
                  <span className="flex-1">{choice}</span>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Explicación */}
      <AnimatePresence>
        {showExplanation && screen.explain && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-4"
          >
            <div
              className="rounded-2xl p-4 bg-primary/10 border-2 border-primary"
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
            animate={{ opacity: canContinue ? 1 : 0.3 }}
            onClick={handleContinue}
            disabled={!canContinue}
            className="flex-1 btn secondary text-lg py-4 min-h-[56px]"
          >
            Continuar
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

      {/* Hint */}
      {!showExplanation && selectedChoices.length === 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center text-sm text-muted mt-4"
        >
          💭 Selecciona una o más opciones para reflexionar
        </motion.p>
      )}
    </motion.div>
  );
}
