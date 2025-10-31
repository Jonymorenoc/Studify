import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { ArrowRightCircle, ListCheck, Sparkles, Star } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import { percentCompleted, getAll } from '../state/progress'
import { adventureSteps, type AdventureStep } from '../flow/adventureData'
import starAnimation from '../assets/lottie/star.json'

const statIcons = {
  Ejercicios: <ListCheck size={18} />,
  Estrellas: <Star size={18} />,
}

export default function LenguaExam() {
  const trayecto1Progress = percentCompleted('trimestre1.lengua.trayecto1')
  const trayecto2Progress = percentCompleted('trimestre1.lengua.trayecto2')
  const trayecto3Progress = percentCompleted('trimestre1.lengua.trayecto3')

  const all = getAll()
  const completed = adventureSteps.filter((step: AdventureStep) => all[`aventura.${step.id}`]?.score >= 1).length
  const earnedStars = adventureSteps.reduce(
    (acc: number, step: AdventureStep) => acc + (all[`aventura.${step.id}`]?.stars ?? 0),
    0
  )
  const totalExercises = adventureSteps.length
  const totalStars = adventureSteps.reduce((acc, step) => acc + (step.starValue ?? 3), 0)

  const stats = [
    { label: 'Ejercicios', value: `${completed}/${totalExercises}` },
    { label: 'Estrellas', value: `${earnedStars}/${totalStars}` },
  ]

  return (
    <div className="flex flex-col gap-9">
      <Link
        to="/trimestre-1"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:text-primary-dark"
      >
        <span aria-hidden>{'<'}</span>
        Volver a examenes
      </Link>

      <section className="overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-r from-white via-[#f6f1ff] to-[#e5f5ff] p-6 shadow-[0_32px_80px_-48px_rgba(116,95,224,0.9)] sm:p-9">
        <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr] md:items-center">
          <div className="flex flex-col gap-5">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
              <Sparkles size={14} />
              Examen de Lengua
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Completa los trayectos y gana estrellas</h1>
              <p className="text-sm text-muted">
                Recorre actividades cortas inspiradas en el libro: mitos y leyendas (pag. 30-37) y anuncios con etiquetas (pag. 115-121).
              </p>
            </div>
            <div className="grid gap-3 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_24px_60px_-48px_rgba(116,95,224,0.7)] sm:grid-cols-[1.1fr,0.9fr] sm:items-center">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Progreso general</p>
                <h2 className="text-lg font-semibold text-ink">Estan avanzando</h2>
                <p className="text-xs text-muted">Completa los retos para desbloquear celebraciones y sumar estrellas al marcador.</p>
              </div>
              <div className="space-y-2">
                <ProgressBar value={trayecto1Progress} />
                <p className="text-right text-xs font-semibold text-primary">Trayecto 1 {trayecto1Progress}%</p>
              </div>
            </div>
            <div className="grid gap-3 rounded-[24px] border border-white/70 bg-white/90 p-4 shadow-[0_18px_45px_-42px_rgba(116,95,224,0.6)] md:grid-cols-3">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-ink">Trayecto 1. Hechos de mitos</h3>
                <ProgressBar value={trayecto1Progress} />
                <div className="flex flex-wrap gap-3">
                  <Link to="/trimestre-1/lengua/trayecto-1" className="btn px-5 py-2 text-xs">
                    <ArrowRightCircle size={14} /> Abrir Trayecto 1
                  </Link>
                  <Link to="/trimestre-1/lengua/trayecto-1/aventura" className="btn secondary text-xs">
                    Explorar aventura
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-ink">Trayecto 2. Anuncios y etiquetas</h3>
                <ProgressBar value={trayecto2Progress} />
                <div className="flex flex-wrap gap-3">
                  <Link to="/trimestre-1/lengua/trayecto-2" className="btn px-5 py-2 text-xs">
                    <ArrowRightCircle size={14} /> Abrir Trayecto 2
                  </Link>
                </div>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-ink">Trayecto 3. Cuentos y descripciones</h3>
                <ProgressBar value={trayecto3Progress} />
                <div className="flex flex-wrap gap-3">
                  <Link to="/trimestre-1/lengua/trayecto-3" className="btn px-5 py-2 text-xs">
                    <ArrowRightCircle size={14} /> Abrir Trayecto 3
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex items-center justify-center">
            <div className="w-40">
              <Lottie animationData={starAnimation} loop />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {stats.map(stat => (
            <div
              key={stat.label}
              className="flex items-center gap-3 rounded-[24px] border border-white/70 bg-white/85 px-4 py-3 text-sm font-semibold text-ink shadow-[0_18px_45px_-42px_rgba(116,95,224,0.6)]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/15 text-primary">
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
