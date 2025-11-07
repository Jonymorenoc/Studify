import { motion } from 'framer-motion';
import type { LearnScreen } from '../content';
import { useGameStore } from '../store/gameStore';

interface ScreenLearnProps {
  screen: LearnScreen;
}

export default function ScreenLearn({ screen }: ScreenLearnProps) {
  const nextScreen = useGameStore((state) => state.nextScreen);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full max-w-md mx-auto px-4 py-6"
    >
      {/* Contenedor de contenido con scroll */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Emoji grande */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="text-7xl text-center mb-6"
        >
          {screen.emoji}
        </motion.div>

        {/* Imagen si existe */}
        {screen.media?.img && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-6 rounded-2xl overflow-hidden bg-white/50 p-4"
          >
            <img
              src={screen.media.img}
              alt={screen.media.alt || screen.tema}
              className="w-full h-auto max-h-48 object-contain"
            />
          </motion.div>
        )}

        {/* Contenido HTML */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: screen.html }}
          style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: '#433d66'
          }}
        />
      </div>

      {/* Botón siguiente */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="pt-4"
      >
        <button
          onClick={nextScreen}
          className="w-full btn text-lg py-4 min-h-[56px]"
          aria-label="Continuar a la siguiente pantalla"
        >
          ¡Entendido! Siguiente →
        </button>
      </motion.div>

      {/* Estilos adicionales para el contenido HTML */}
      <style>{`
        .prose h2 {
          font-size: 24px;
          font-weight: 700;
          color: #433d66;
          margin-bottom: 16px;
          margin-top: 0;
        }
        .prose h3 {
          font-size: 20px;
          font-weight: 600;
          color: #433d66;
          margin-top: 20px;
          margin-bottom: 12px;
        }
        .prose p {
          font-size: 18px;
          color: #433d66;
          margin-bottom: 16px;
          line-height: 1.6;
        }
        .prose ul {
          margin: 16px 0;
          padding-left: 24px;
        }
        .prose li {
          font-size: 18px;
          color: #433d66;
          margin-bottom: 12px;
          line-height: 1.5;
        }
        .prose strong {
          font-weight: 600;
          color: #7F6BFF;
        }
      `}</style>
    </motion.div>
  );
}
