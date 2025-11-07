import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

interface StickerBookProps {
  onClose: () => void;
}

const stickers = [
  { trayecto: 1, emoji: '🌙', title: 'La Luna' },
  { trayecto: 2, emoji: '🦴', title: 'Animales' },
  { trayecto: 3, emoji: '🚰', title: 'Mezclas y Salud' },
];

export default function StickerBook({ onClose }: StickerBookProps) {
  const unlockedStickers = useGameStore((state) => state.unlockedStickers);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ink">📚 Mis Stickers</h2>
            <button
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              aria-label="Cerrar"
            >
              <span className="text-xl">✕</span>
            </button>
          </div>

          {/* Grid de stickers */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {stickers.map((sticker) => {
              const isUnlocked = unlockedStickers.has(sticker.trayecto);

              return (
                <motion.div
                  key={sticker.trayecto}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: sticker.trayecto * 0.1 }}
                  className={`rounded-2xl border-2 p-4 flex flex-col items-center justify-center aspect-square ${
                    isUnlocked
                      ? 'border-primary bg-primary/5'
                      : 'border-gray-300 bg-gray-50 opacity-50'
                  }`}
                >
                  {/* Emoji */}
                  <div className={`text-5xl mb-2 ${!isUnlocked && 'grayscale blur-sm'}`}>
                    {sticker.emoji}
                  </div>

                  {/* Título */}
                  <p className="text-xs font-semibold text-center text-ink">
                    {sticker.title}
                  </p>

                  {/* Badge de desbloqueado */}
                  {isUnlocked && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="mt-1 text-xs"
                    >
                      ✓
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Progreso */}
          <div className="bg-primary/5 rounded-2xl p-4">
            <p className="text-sm font-semibold text-ink text-center">
              Has desbloqueado {unlockedStickers.size} de {stickers.length} stickers
            </p>
            <div className="mt-3 w-full bg-white rounded-full h-2 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(unlockedStickers.size / stickers.length) * 100}%` }}
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
              />
            </div>
          </div>

          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="w-full btn mt-6 text-lg py-3"
          >
            Cerrar
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
