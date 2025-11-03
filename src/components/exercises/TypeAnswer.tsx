import { useState } from 'react'
import { saveProgress } from '../../state/progress'

type Props = {
  id: string
  prompt: string
  correct: string | RegExp
  hint?: string
}

export default function TypeAnswer({ id, prompt, correct, hint }: Props) {
  const [value, setValue] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const isCorrect =
    typeof correct === 'string'
      ? value.trim().toLowerCase() === correct.trim().toLowerCase()
      : correct.test(value.trim())

  const handleSubmit = () => {
    if (!value) return
    setSubmitted(true)
    const stars = isCorrect ? 3 : 2
    const score = isCorrect ? 1 : 0.5
    saveProgress(id, { score, stars, attempts: 1, completedAt: Date.now() })
  }

  return (
    <div className="space-y-3 rounded-3xl border border-primary/15 bg-white px-5 py-5 shadow-[0_18px_45px_-32px_rgba(67,61,102,0.35)]">
      <label className="text-sm font-semibold text-ink">{prompt}</label>
      <input
        value={value}
        onChange={event => setValue(event.target.value)}
        placeholder="Escribe tu respuesta"
        disabled={submitted}
        className="w-full rounded-2xl border border-primary/20 bg-white px-4 py-3 text-sm text-ink focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-60"
      />
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={submitted || !value}
          className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white shadow-glow transition hover:bg-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:cursor-not-allowed disabled:opacity-40"
        >
          Comprobar
        </button>
        {submitted && (
          <span className={`text-sm font-semibold ${isCorrect ? 'text-success' : 'text-error'}`}>
            {isCorrect ? 'Buen trabajo!' : 'Casi, revisa la pista y ajusta tu respuesta.'}
          </span>
        )}
      </div>
      {!submitted && hint && <p className="text-xs text-muted">Pista: {hint}</p>}
    </div>
  )
}

