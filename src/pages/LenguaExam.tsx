import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { percentCompleted, getAll } from '../state/progress'
import { adventureSteps, type ChoiceExercise } from '../flow/adventureData'

export default function LenguaExam() {
  const pct = percentCompleted('trimestre1.lengua.trayecto1')
  const all = getAll()
  const completed = adventureSteps.filter((step: ChoiceExercise) => all[`aventura.${step.id}`]?.score >= 1).length
  const earnedStars = adventureSteps.reduce((acc: number, step: ChoiceExercise) => acc + (all[`aventura.${step.id}`]?.stars ?? 0), 0)
  const totalExercises = adventureSteps.length
  const totalStars = totalExercises * 3

  const stats = [
    { label: 'Ejercicios', value: `${completed}/${totalExercises}`, icon: 'EJ' },
    { label: 'Estrellas', value: `${earnedStars}/${totalStars}`, icon: 'ST' },
  ]

  return (
    <div className="flex flex-col gap-7">
      <Link
        to="/trimestre-1"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
      >
        <span aria-hidden>{'<'}</span>
        Volver a examenes
      </Link>

      <section className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_28px_60px_-48px_rgba(127,107,255,0.8)] sm:p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold font-semibold uppercase tracking-[0.3em] text-primary">
            Examen de Lengua
          </p>
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">
            Completa los ejercicios y gana estrellas
          </h1>
          <p className="text-sm text-muted">
            Trayecto 1 - Manifestaciones artisticas, mitos y leyendas. Disenado para estudiantes de 8 a 9 anos.
          </p>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-[2fr,1fr] sm:items-center sm:gap-6">
          <div className="rounded-[24px] border border-white/70 bg-surface-soft p-4 shadow-[0_22px_45px_-48px_rgba(127,107,255,0.8)]">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-ink">Progreso total</h2>
              <span className="text-sm font-semibold text-primary">{pct}%</span>
            </div>
            <p className="text-xs text-muted">Sigue completando ejercicios para desbloquear todo el recorrido.</p>
            <div className="mt-3">
              <ProgressBar value={pct} />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Link
              to="/trimestre-1/lengua/trayecto-1"
              className="btn w-full justify-center px-6 py-3 text-base font-semibold sm:w-auto"
            >
              Comenzar trayecto
            </Link>
          </div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-[24px] border border-white/70 bg-white/80 px-4 py-3 text-sm font-semibold text-ink"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-xs font-semibold">
                {stat.icon}
              </span>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted">{stat.label}</p>
                <p className="text-base font-semibold text-ink">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
