import { useState } from 'react'
import { saveProgress } from '../../state/progress'

type Option = { id: string; text: string; correct?: boolean }

type Props = {
  id: string
  prompt: string
  options: Option[]
  onDone?: (score: number) => void
  hint?: string
}

export default function MultipleChoice({ id, prompt, options, onDone, hint }: Props) {
  const [picked, setPicked] = useState<string>()
  const [submitted, setSubmitted] = useState(false)
  const correct = options.find(option => option.correct)?.id
  const score = picked && picked === correct ? 1 : 0

  const handleSubmit = () => {
    if (!picked) return
    const stars = score ? 3 : 1
    setSubmitted(true)
    saveProgress(id, { score, stars, attempts: 1, completedAt: Date.now() })
    onDone?.(score)
  }

  return (
    <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 px-5 py-5 shadow-inner">
      <p className="text-sm text-slate-200">{prompt}</p>
      <div className="space-y-3">
        {options.map(option => {
          const isChecked = picked === option.id
          const isCorrectChoice = submitted && option.correct
          const isWrongChoice = submitted && isChecked && !option.correct

          return (
            <label
              key={option.id}
              className={`flex cursor-pointer items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                isCorrectChoice
                  ? 'border-success/60 bg-success/10 text-success'
                  : isWrongChoice
                    ? 'border-error/60 bg-error/10 text-error'
                    : isChecked
                      ? 'border-primary/60 bg-primary/15 text-primary'
                      : 'border-white/10 bg-white/5 text-slate-100 hover:border-primary/40 hover:bg-primary/10'
              }`}
            >
              <input
                type="radio"
                name={id}
                value={option.id}
                checked={isChecked}
                onChange={() => setPicked(option.id)}
                disabled={submitted}
                className="sr-only"
              />
              <span>{option.text}</span>
            </label>
          )
        })}
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted || !picked}
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Comprobar
        </button>
        {submitted && (
          <span className={`text-sm font-semibold ${score ? 'text-success' : 'text-error'}`}>
            {score ? '¡Correcto!' : 'Revisa la pista y vuelve a intentarlo.'}
          </span>
        )}
      </div>
      {!submitted && hint && <p className="text-xs text-slate-400">Pista: {hint}</p>}
    </div>
  )
}

