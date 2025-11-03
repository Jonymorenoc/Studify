import { useState } from 'react'
import { saveProgress } from '../../state/progress'

type Option = { id: string; text: string; correct?: boolean; hint?: string }

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
    <div className="space-y-4 rounded-3xl border border-primary/15 bg-white px-5 py-5 shadow-[0_18px_45px_-32px_rgba(67,61,102,0.35)]">
      <p className="text-sm font-medium text-ink">{prompt}</p>
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
                  ? 'border-success bg-success/10 text-success'
                : isWrongChoice
                    ? 'border-error bg-error/10 text-error'
                    : isChecked
                      ? 'border-primary bg-primary/15 text-primary'
                      : 'border-primary/20 bg-surface text-ink hover:border-primary/40 hover:bg-primary/10'
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
              {option.hint && !submitted && <span className="text-xs text-muted">{option.hint}</span>}
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
            {score ? 'Correcto!' : 'Revisa la pista y vuelve a intentarlo.'}
          </span>
        )}
      </div>
      {!submitted && hint && <p className="text-xs text-muted">Pista: {hint}</p>}
    </div>
  )
}

