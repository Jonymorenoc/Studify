import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { ArrowRightCircle, FlaskConical, Star, ListCheck } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import { percentCompleted, getAll } from '../state/progress'
import scienceFlaskAnimation from '../assets/lottie/science-flask.json'

const statIcons = {
  Ejercicios: <ListCheck size={18} />,
  Estrellas: <Star size={18} />,
}

export default function CienciasExam() {
  const trayecto1Progress = percentCompleted('trimestre1.ciencias.trayecto1')

  // For now, we'll use placeholder values for exercises and stars
  // These will be updated once we implement the progress tracking
  const all = getAll()
  const completedExercises = Object.keys(all).filter(key =>
    key.startsWith('ciencias.') && all[key]?.score >= 1
  ).length
  const earnedStars = Object.keys(all)
    .filter(key => key.startsWith('ciencias.'))
    .reduce((acc, key) => acc + (all[key]?.stars ?? 0), 0)

  const stats = [
    { label: 'Ejercicios', value: `${completedExercises}/14` },
    { label: 'Estrellas', value: `${earnedStars}/42` },
  ]

  return (
    <div className="flex flex-col gap-9">
      <Link
        to="/trimestre-1"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:text-primary-dark"
      >
        <span aria-hidden>{'<'}</span>
        Volver a exámenes
      </Link>

      <section className="overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-r from-white via-[#f0f8ff] to-[#e8f5e9] p-6 shadow-[0_32px_80px_-48px_rgba(76,175,80,0.9)] sm:p-9">
        <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] md:items-center">
          <div className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-success">
              <FlaskConical size={14} />
              Examen de Ciencias
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Explora el mundo de la ciencia</h1>
              <p className="text-sm text-muted">
                Descubre las fases de la Luna, los animales vertebrados e invertebrados, la solubilidad y el cuidado del agua. ¡Aprende de forma divertida e interactiva!
              </p>
            </div>
            <div className="grid gap-3 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_24px_60px_-48px_rgba(76,175,80,0.7)] sm:grid-cols-[1.1fr,0.9fr] sm:items-center">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Progreso general</p>
                <h2 className="text-lg font-semibold text-ink">Tercer grado - Primer trimestre</h2>
                <p className="text-xs text-muted">Completa los ejercicios interactivos y gana estrellas mientras aprendes.</p>
              </div>
              <div className="space-y-2">
                <ProgressBar value={trayecto1Progress} />
                <p className="text-right text-xs font-semibold text-success">Trayecto 1 {trayecto1Progress}%</p>
              </div>
            </div>
            <div className="grid gap-4 rounded-[24px] border border-white/70 bg-white/90 p-5 shadow-[0_18px_45px_-42px_rgba(76,175,80,0.6)]">
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-ink">🌙 Trayecto 1. Exploración Científica</h3>
                <p className="text-sm text-muted">
                  Aprende sobre las fases de la Luna, los animales y el agua con ejercicios interactivos y divertidos.
                </p>
                <ul className="space-y-2 text-xs text-muted">
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-success" />
                    <span>Las fases de la Luna y sus caras</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-success" />
                    <span>Sistema locomotor: huesos, músculos y articulaciones</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-success" />
                    <span>Vertebrados e invertebrados</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-success" />
                    <span>Solubilidad: soluto y disolvente</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-success" />
                    <span>El agua en la salud y su cuidado</span>
                  </li>
                </ul>
                <ProgressBar value={trayecto1Progress} />
                <div className="flex flex-wrap gap-3">
                  <Link to="/trimestre-1/ciencias/trayecto-1" className="btn px-5 py-3 text-sm">
                    <ArrowRightCircle size={16} /> Comenzar aventura
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-48">
              <Lottie animationData={scienceFlaskAnimation} loop />
            </div>
            <span className="floating-emoji left-4 top-8 text-3xl" aria-hidden>
              🌙
            </span>
            <span className="floating-emoji animation-delay-200 right-8 top-4 text-3xl" aria-hidden>
              🐻
            </span>
            <span className="floating-emoji animation-delay-400 bottom-8 right-4 text-3xl" aria-hidden>
              💧
            </span>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-[24px] border border-white/70 bg-white/85 px-4 py-3 text-sm font-semibold text-ink shadow-[0_18px_45px_-42px_rgba(76,175,80,0.6)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-success/15 text-success">
                {statIcons[stat.label as keyof typeof statIcons]}
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
