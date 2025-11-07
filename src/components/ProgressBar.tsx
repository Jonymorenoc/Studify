import { motion } from 'framer-motion';

interface ProgressBarProps {
  current?: number;
  total?: number;
  score?: number;
  value?: number; // Para retrocompatibilidad con otros componentes
}

export default function ProgressBar({ current, total, value }: ProgressBarProps) {
  // Si se proporciona 'value', usarlo directamente
  const percentage = value !== undefined ? value : ((current || 0) / (total || 1)) * 100;

  return (
    <div className="w-full bg-white/50 rounded-full h-3 overflow-hidden shadow-inner">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percentage}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full relative"
      >
        {/* Brillo animado */}
        <motion.div
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
        />
      </motion.div>
    </div>
  );
}
