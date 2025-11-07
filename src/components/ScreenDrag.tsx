import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  closestCenter,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { QuizDrag } from '../content';
import { useGameStore } from '../store/gameStore';
import { playSound } from '../utils/audio';

interface ScreenDragProps {
  screen: QuizDrag;
}

// Componente para items ordenables
function SortableItem({ id, label }: { id: string; label: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none">
      <div className="rounded-xl border-2 border-primary/30 bg-white px-4 py-3 text-lg font-semibold text-ink shadow-sm cursor-move active:cursor-grabbing min-h-[56px] flex items-center justify-center">
        {label}
      </div>
    </div>
  );
}

// Componente para bucket droppable
function BucketZone({
  bucket,
  items,
  onRemove,
}: {
  bucket: { id: string; label: string };
  items: { id: string; label: string }[];
  onRemove: (itemId: string) => void;
}) {
  return (
    <div className="rounded-2xl border-2 border-dashed border-primary/40 bg-primary/5 p-4 min-h-[120px]">
      <h3 className="text-lg font-bold text-ink mb-3">{bucket.label}</h3>
      <div className="flex flex-col gap-2">
        {items.map((item) => (
          <motion.div
            key={item.id}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="rounded-xl bg-white border-2 border-primary/30 px-4 py-2 text-base font-semibold text-ink flex items-center justify-between min-h-[48px]"
          >
            <span>{item.label}</span>
            <button
              onClick={() => onRemove(item.id)}
              className="text-error hover:text-error/70 ml-2 text-xl"
              aria-label={`Quitar ${item.label}`}
            >
              ✕
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default function ScreenDrag({ screen }: ScreenDragProps) {
  const [items, setItems] = useState(screen.items);
  const [bucketItems, setBucketItems] = useState<Record<string, { id: string; label: string }[]>>(
    screen.mode === 'bucket'
      ? Object.fromEntries(screen.buckets?.map((b) => [b.id, []]) || [])
      : {}
  );
  const [availableItems, setAvailableItems] = useState(screen.mode === 'bucket' ? screen.items : []);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { nextScreen, addScore, incrementCorrect, incrementAttempts, soundEnabled } = useGameStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 100, tolerance: 8 },
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    if (screen.mode === 'sort') {
      if (active.id !== over.id) {
        setItems((items) => {
          const oldIndex = items.findIndex((i) => i.id === active.id);
          const newIndex = items.findIndex((i) => i.id === over.id);
          return arrayMove(items, oldIndex, newIndex);
        });
      }
    } else if (screen.mode === 'bucket') {
      // Lógica de bucket
      const bucketId = over.id as string;
      const itemId = active.id as string;

      // Verificar si es un bucket válido
      if (screen.buckets?.some((b) => b.id === bucketId)) {
        const item = availableItems.find((i) => i.id === itemId);
        if (item) {
          // Agregar al bucket
          setBucketItems((prev) => ({
            ...prev,
            [bucketId]: [...(prev[bucketId] || []), item],
          }));
          // Remover de disponibles
          setAvailableItems((prev) => prev.filter((i) => i.id !== itemId));
        }
      }
    }
  };

  const handleRemoveFromBucket = (itemId: string) => {
    const item = screen.items.find((i) => i.id === itemId);
    if (!item) return;

    // Encontrar en qué bucket está
    let foundBucket = '';
    for (const [bucketId, items] of Object.entries(bucketItems)) {
      if (items.some((i) => i.id === itemId)) {
        foundBucket = bucketId;
        break;
      }
    }

    if (foundBucket) {
      // Remover del bucket
      setBucketItems((prev) => ({
        ...prev,
        [foundBucket]: prev[foundBucket].filter((i) => i.id !== itemId),
      }));
      // Agregar de vuelta a disponibles
      setAvailableItems((prev) => [...prev, item]);
    }
  };

  const handleCheck = () => {
    incrementAttempts();

    let correct = false;

    if (screen.mode === 'sort') {
      // Verificar orden
      const currentOrder = items.map((i) => i.id);
      correct = JSON.stringify(currentOrder) === JSON.stringify(screen.correctOrder);
    } else if (screen.mode === 'bucket') {
      // Verificar buckets
      correct = true;
      for (const [itemId, correctBucketId] of Object.entries(screen.correctBuckets || {})) {
        const itemBucket = Object.entries(bucketItems).find(([, items]) =>
          items.some((i) => i.id === itemId)
        )?.[0];
        if (itemBucket !== correctBucketId) {
          correct = false;
          break;
        }
      }
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

  const canCheck =
    screen.mode === 'sort' || (screen.mode === 'bucket' && availableItems.length === 0);

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
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          onDragStart={(event) => setActiveId(event.active.id as string)}
        >
          {screen.mode === 'sort' && (
            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
              <div className="flex flex-col gap-3">
                {items.map((item) => (
                  <SortableItem key={item.id} id={item.id} label={item.label} />
                ))}
              </div>
            </SortableContext>
          )}

          {screen.mode === 'bucket' && (
            <div className="space-y-4">
              {/* Items disponibles */}
              {availableItems.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-base font-semibold text-ink mb-3">Arrastra a los grupos:</h3>
                  <div className="flex flex-wrap gap-2">
                    {availableItems.map((item) => (
                      <SortableContext key={item.id} items={[item.id]}>
                        <div className="touch-none">
                          <div className="rounded-xl border-2 border-primary/30 bg-white px-4 py-2 text-base font-semibold text-ink shadow-sm cursor-move">
                            {item.label}
                          </div>
                        </div>
                      </SortableContext>
                    ))}
                  </div>
                </div>
              )}

              {/* Buckets */}
              <div className="space-y-3">
                {screen.buckets?.map((bucket) => (
                  <SortableContext key={bucket.id} items={[bucket.id]}>
                    <BucketZone
                      bucket={bucket}
                      items={bucketItems[bucket.id] || []}
                      onRemove={handleRemoveFromBucket}
                    />
                  </SortableContext>
                ))}
              </div>
            </div>
          )}

          <DragOverlay>
            {activeId ? (
              <div className="rounded-xl border-2 border-primary bg-primary/10 px-4 py-3 text-lg font-semibold text-ink shadow-lg">
                {items.find((i) => i.id === activeId)?.label ||
                  availableItems.find((i) => i.id === activeId)?.label}
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
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
