import { motion } from 'framer-motion';
import ProgressBar from './ProgressBar';
import { useGameStore } from '../store/gameStore';

interface HeaderProps {
  tema: string;
  emoji: string;
  currentScreen: number;
  totalScreens: number;
}

export default function Header({ tema, emoji, currentScreen, totalScreens }: HeaderProps) {
  const { score, soundEnabled, toggleSound } = useGameStore();

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full bg-white/80 backdrop-blur-sm border-b border-primary/10 shadow-sm"
    >
      <div className="max-w-md mx-auto px-4 py-3">
        {/* Fila superior: Tema y controles */}
        <div className="flex items-center justify-between mb-3">
          {/* Tema con emoji */}
          <div className="flex items-center gap-2">
            <span className="text-3xl">{emoji}</span>
            <h1 className="text-lg font-bold text-ink">{tema}</h1>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-3">
            {/* Puntaje */}
            <motion.div
              key={score}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-accent/20 px-3 py-1 rounded-full"
            >
              <span className="text-lg">⭐</span>
              <span className="text-sm font-bold text-ink">{score}</span>
            </motion.div>

            {/* Botón de sonido */}
            <button
              onClick={toggleSound}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
              aria-label={soundEnabled ? 'Desactivar sonido' : 'Activar sonido'}
            >
              <span className="text-lg">{soundEnabled ? '🔊' : '🔇'}</span>
            </button>
          </div>
        </div>

        {/* Barra de progreso */}
        <div className="flex items-center gap-3">
          <ProgressBar current={currentScreen + 1} total={totalScreens} score={score} />
          <span className="text-sm font-semibold text-muted whitespace-nowrap">
            {currentScreen + 1}/{totalScreens}
          </span>
        </div>
      </div>
    </motion.header>
  );
}
