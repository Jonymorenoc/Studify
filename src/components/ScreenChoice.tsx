import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizChoice } from '../content';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';

interface ScreenChoiceProps {
  screen: QuizChoice;
}

export default function ScreenChoice({ screen }: ScreenChoiceProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const { nextScreen, addScore, incrementCorrect, incrementAttempts, soundEnabled } = useGameStore();

  const handleOptionClick = (index: number) => {
    if (selectedIndex !== null) return; // Ya respondió

    setSelectedIndex(index);
    incrementAttempts();

    const correct = index === screen.answerIndex;
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      incrementCorrect();
      addScore(10);
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
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

      {/* Pregunta */}
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-bold text-ink text-center mb-8"
      >
        {screen.prompt}
      </motion.h2>

      {/* Opciones */}
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto pb-4">
        {screen.options.map((option, index) => {
          const isSelected = selectedIndex === index;
          const isAnswer = index === screen.answerIndex;
          const showResult = selectedIndex !== null;

          let buttonClass = 'w-full rounded-2xl border-2 px-6 py-4 text-lg font-semibold transition-all min-h-[64px]';

          if (!showResult) {
            buttonClass += ' border-primary/30 bg-white hover:border-primary hover:bg-primary/5 active:scale-95';
          } else if (isSelected && isCorrect) {
            buttonClass += ' border-success bg-success/10 text-success';
          } else if (isSelected && !isCorrect) {
            buttonClass += ' border-error bg-error/10 text-error';
          } else if (isAnswer) {
            buttonClass += ' border-success bg-success/10 text-success';
          } else {
            buttonClass += ' border-gray-300 bg-gray-50 text-gray-400 opacity-50';
          }

          return (
            <motion.button
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
              onClick={() => handleOptionClick(index)}
              disabled={selectedIndex !== null}
              className={buttonClass}
              aria-label={`Opción ${index + 1}: ${option}`}
            >
              {option}
            </motion.button>
          );
        })}
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

      {/* Botón siguiente */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: selectedIndex !== null ? 1 : 0.3 }}
        onClick={nextScreen}
        disabled={selectedIndex === null}
        className="w-full btn text-lg py-4 min-h-[56px]"
        aria-label="Continuar a la siguiente pantalla"
      >
        Siguiente →
      </motion.button>
    </motion.div>
  );
}
