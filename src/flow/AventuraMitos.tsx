import { useEffect, useMemo, useRef, useState, type ReactElement } from 'react'
import { BookOpen, ChevronLeft, ChevronRight, Lightbulb, Palette, Sparkles } from 'lucide-react'
import Lottie from 'lottie-react'
import starAnimation from '../assets/lottie/star.json'
import { adventureSteps, type ChoiceExercise } from './adventureData'
import { getProgress, saveProgress } from '../state/progress'

type StepResult = {
  completed: boolean
  stars: number
  attempts: number
}

type CompletionPayload = {
  stars: number
  attempts: number
}

const iconByCategory: Record<string, ReactElement> = {
  Bienvenida: <Sparkles size={20} />,
  Personalizacion: <Lightbulb size={20} />,
  Activacion: <Lightbulb size={20} />,
  'Lectura guiada': <BookOpen size={20} />,
  Comprension: <BookOpen size={20} />,
  Creacion: <Palette size={20} />,
  'Creacion visual': <Palette size={20} />,
  Fuentes: <Lightbulb size={20} />,
  Escritura: <Lightbulb size={20} />,
  Clasificacion: <Lightbulb size={20} />,
  'Arte y cultura': <Palette size={20} />,
  'Conciencia ambiental': <Lightbulb size={20} />,
  'Arte popular': <Palette size={20} />,
  'Musica y tradicion': <Palette size={20} />,
  'Narracion oral': <Lightbulb size={20} />,
  'Conceptos clave': <Lightbulb size={20} />,
  'Proceso narrativo': <Lightbulb size={20} />,
  Planeacion: <Lightbulb size={20} />,
  Autoevaluacion: <Lightbulb size={20} />,
  Cierre: <Sparkles size={20} />,
  Gramatica: <Lightbulb size={20} />,
}

const totalSteps = adventureSteps.length

export default function AventuraMitos() {
  const [results, setResults] = useState<Record<string, StepResult>>(() => {
    const initial: Record<string, StepResult> = {}
    adventureSteps.forEach(step => {
      const saved = getProgress(`aventura.${step.id}`)
      if (saved && saved.score >= 1) {
        initial[step.id] = {
          completed: true,
          stars: saved.stars,
          attempts: saved.attempts,
        }
      }
    })
    return initial
  })

  const initialIndex = useMemo(() => {
    const pending = adventureSteps.findIndex(step => !results[step.id]?.completed)
    return pending === -1 ? 0 : pending
  }, [])

  const [activeIndex, setActiveIndex] = useState(initialIndex)
  const [celebrating, setCelebrating] = useState(false)
  const celebrationTimeout = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (celebrationTimeout.current) {
        clearTimeout(celebrationTimeout.current)
      }
    }
  }, [])

  const currentStep = adventureSteps[activeIndex]

  const completedSteps = adventureSteps.filter(step => results[step.id]?.completed).length
  const totalStarsEarned = Object.values(results).reduce((acc, value) => acc + value.stars, 0)
  const totalStarsPossible = adventureSteps.reduce((acc, step) => acc + (step.starValue ?? 3), 0)
  const progressPercent = Math.round((completedSteps / totalSteps) * 100)

  const handleComplete = ({ stars, attempts }: CompletionPayload) => {
    if (results[currentStep.id]?.completed) return
    const result: StepResult = { completed: true, stars, attempts }
    setResults(prev => ({ ...prev, [currentStep.id]: result }))
    saveProgress(`aventura.${currentStep.id}`, {
      score: 1,
      stars,
      attempts,
      completedAt: Date.now(),
    })
    setCelebrating(true)
    if (celebrationTimeout.current) {
      clearTimeout(celebrationTimeout.current)
    }
    celebrationTimeout.current = window.setTimeout(() => {
      setCelebrating(false)
      setActiveIndex(index => Math.min(index + 1, totalSteps - 1))
    }, 1500)
  }

  const goPrevious = () => setActiveIndex(index => Math.max(0, index - 1))
  const goNext = () => setActiveIndex(index => Math.min(totalSteps - 1, index + 1))

  return (
    <div className="flex flex-col gap-6">
      <header className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_32px_65px_-48px_rgba(127,107,255,0.9)]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Trayecto 1 - Lengua</p>
            <h1 className="text-2xl font-semibold text-ink">Aventura paso a paso</h1>
            <p className="text-sm text-muted">
              Ejercicio {activeIndex + 1} de {totalSteps}
            </p>
          </div>
          <div className="space-y-3">
            <div className="h-2 w-full rounded-full bg-primary/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs font-semibold text-muted">
              <span>{progressPercent}% completado</span>
              <span>
                {totalStarsEarned}/{totalStarsPossible} estrellas
              </span>
            </div>
          </div>
        </div>
      </header>

      {celebrating && (
        <div className="mx-auto w-40">
          <Lottie animationData={starAnimation} loop={false} />
        </div>
      )}

      <StepCard
        step={currentStep}
        index={activeIndex}
        total={totalSteps}
        completed={Boolean(results[currentStep.id]?.completed)}
      >
        <ChoiceStep
          step={currentStep}
          onSuccess={handleComplete}
          completed={Boolean(results[currentStep.id]?.completed)}
        />
      </StepCard>

      <footer className="mt-4 flex items-center justify-between">
        <button
          type="button"
          onClick={goPrevious}
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-sm font-semibold text-primary shadow-[0_18px_35px_-30px_rgba(127,107,255,0.7)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40"
          disabled={activeIndex === 0}
        >
          <ChevronLeft size={16} /> Anterior
        </button>
        <button
          type="button"
          onClick={goNext}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 text-sm font-semibold text-white shadow-[0_18px_35px_-18px_rgba(127,107,255,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-40"
          disabled={activeIndex === totalSteps - 1}
        >
          Siguiente <ChevronRight size={16} />
        </button>
      </footer>
    </div>
  )
}

function StepCard({
  step,
  index,
  total,
  completed,
  children,
}: {
  step: ChoiceExercise
  index: number
  total: number
  completed: boolean
  children: ReactElement
}) {
  const icon = iconByCategory[step.category] ?? <Sparkles size={20} />

  return (
    <section className="flex flex-col gap-5 rounded-[26px] border border-white/70 bg-white px-6 py-6 shadow-[0_24px_55px_-48px_rgba(127,107,255,0.8)]">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/15 text-primary">{icon}</div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Paso {index + 1} de {total}
            </p>
            <h2 className="text-xl font-semibold text-ink">{step.title}</h2>
            <p className="text-xs text-muted">{step.category}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            +{step.starValue ?? 3} estrellas
          </span>
          {completed && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold text-success">
              ✓ Completado
            </span>
          )}
        </div>
      </header>
      {children}
    </section>
  )
}

function ChoiceStep({
  step,
  onSuccess,
  completed,
}: {
  step: ChoiceExercise
  onSuccess: (payload: CompletionPayload) => void
  completed: boolean
}) {
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [attempts, setAttempts] = useState(0)
  const [feedback, setFeedback] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const shuffledOptions = useMemo(() => {
    const copy = [...step.options]
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[copy[i], copy[j]] = [copy[j], copy[i]]
    }
    return copy
  }, [step.id])

  useEffect(() => {
    setSelected(new Set())
    setAttempts(0)
    setFeedback('idle')
  }, [step.id, completed])

  const correctIds = useMemo(
    () => new Set(step.options.filter(option => option.correct).map(option => option.id)),
    [step.options]
  )

  const toggleOption = (id: string) => {
    if (completed) return
    setFeedback('idle')
    setSelected(prev => {
      const next = new Set(prev)
      if (step.allowMulti) {
        if (next.has(id)) next.delete(id)
        else next.add(id)
        return next
      }
      return new Set([id])
    })
  }

  const verify = () => {
    if (selected.size === 0 || completed) return
    const nextAttempts = attempts + 1
    setAttempts(nextAttempts)

    let isCorrect = false
    if (step.allowMulti) {
      if (selected.size === correctIds.size) {
        isCorrect = Array.from(selected).every(id => correctIds.has(id))
      }
    } else {
      const [choice] = Array.from(selected)
      isCorrect = choice !== undefined && correctIds.has(choice)
    }

    if (isCorrect) {
      setFeedback('correct')
      const stars = nextAttempts === 1 ? 3 : nextAttempts === 2 ? 2 : 1
      onSuccess({ stars, attempts: nextAttempts })
    } else {
      setFeedback('incorrect')
    }
  }

  const isSelected = (id: string) => selected.has(id)
  const disabled = completed || feedback === 'correct'

  return (
    <div className="flex flex-col gap-4">
      <p className="text-base font-semibold text-ink">{step.prompt}</p>
      {step.note && <p className="text-sm text-muted">{step.note}</p>}

      <div className="grid gap-3">
        {shuffledOptions.map(option => {
          const selectedState = isSelected(option.id)
          const isCorrectSelection = feedback === 'correct' && option.correct
          const isIncorrectSelection = feedback === 'incorrect' && selectedState && !option.correct

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleOption(option.id)}
              className={`flex items-center justify-between rounded-[18px] border-2 px-4 py-3 text-left text-sm transition shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary/60 ${
                selectedState
                  ? 'border-primary bg-primary/10 text-primary shadow-md ring-2 ring-primary/30'
                  : 'border-white/80 bg-white/90 text-ink hover:border-primary/50 hover:ring-2 hover:ring-primary/20'
              } ${isCorrectSelection ? 'border-success bg-success/10 text-success ring-2 ring-success/40' : ''} ${
                isIncorrectSelection ? 'border-error bg-error/10 text-error ring-2 ring-error/40' : ''
              }`}
              disabled={disabled}
            >
              <span>{option.text}</span>
              {option.helper && <span className="text-xs text-muted">{option.helper}</span>}
            </button>
          )
        })}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={verify}
          className="btn px-6 py-2 text-sm"
          disabled={selected.size === 0 || disabled}
        >
          Verificar
        </button>
        {feedback === 'correct' && <span className="text-sm font-semibold text-success">Excelente, continua.</span>}
        {feedback === 'incorrect' && (
          <span className="text-sm text-error">Revisa la pista mental y vuelve a intentarlo.</span>
        )}
      </div>
    </div>
  )
}
