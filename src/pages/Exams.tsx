import { Link } from 'react-router-dom'
import type { LucideIcon } from 'lucide-react'
import { BookMarked, BookOpen, Calculator, FlaskConical, Headphones, Languages, Lock, PenLine, Star } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import { percentCompleted } from '../state/progress'

type ExamCard = {
  title: string
  description: string
  language: string
  to?: string
  locked: boolean
  icon: LucideIcon
}

const exams: ExamCard[] = [
  {
    title: 'Examen de Lengua',
    description: 'Trayecto 1. Hechos de mitos',
    language: 'SPA',
    to: '/trimestre-1/lengua',
    locked: false,
    icon: BookOpen,
  },
  {
    title: 'Phonology (Phonics & Vocabulary)',
    description: 'ENG - Proximamente',
    language: 'ENG',
    locked: true,
    icon: Languages,
  },
  {
    title: 'Matematicas',
    description: 'SPA - Proximamente',
    language: 'SPA',
    locked: true,
    icon: Calculator,
  },
  {
    title: 'Language (Grammar)',
    description: 'ENG - Proximamente',
    language: 'ENG',
    locked: true,
    icon: PenLine,
  },
  {
    title: 'Ciencias',
    description: 'SPA - Proximamente',
    language: 'SPA',
    locked: true,
    icon: FlaskConical,
  },
  {
    title: 'Listening & Reading',
    description: 'ENG - Proximamente',
    language: 'ENG',
    locked: true,
    icon: Headphones,
  },
]

export default function Exams() {
  const pct = percentCompleted('trimestre1.lengua.trayecto1')

  return (
    <div className="flex flex-col gap-9">
      <Link
        to="/tercero"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:text-primary-dark"
      >
        <span aria-hidden>{'<'}</span>
        Volver al grado
      </Link>

      <section className="overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-r from-white via-[#f7f2ff] to-[#e1f6ff] p-6 shadow-[0_32px_70px_-48px_rgba(116,95,224,0.9)] sm:p-9">
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
              <Star size={14} />
              Primer trimestre
            </span>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Examenes trimestrales</h1>
            <p className="text-sm text-muted">
              Selecciona un examen disponible y completa los juegos para ganar estrellas y medallas brillantes.
            </p>
          </div>

          <div className="grid gap-4 rounded-[28px] border border-white/70 bg-white/90 p-5 shadow-[0_24px_60px_-48px_rgba(116,95,224,0.7)] sm:grid-cols-[1.1fr,0.9fr] sm:items-center">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Progreso general</p>
              <h2 className="text-lg font-semibold text-ink">Trayecto 1 - Lengua</h2>
              <p className="text-xs text-muted">Sigue completando ejercicios para desbloquear nuevas sorpresas.</p>
            </div>
            <div className="space-y-2">
              <ProgressBar value={pct} />
              <p className="text-right text-xs font-semibold text-primary">{pct}% completo</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {exams.map(exam =>
          exam.locked ? (
            <div
              key={exam.title}
              className="flex flex-col gap-3 rounded-[26px] border border-white/60 bg-white/75 p-5 text-muted shadow-[0_24px_55px_-48px_rgba(116,95,224,0.4)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-base font-semibold text-muted">
                  <span aria-hidden className="text-primary/40">
                    <exam.icon size={22} />
                  </span>
                  {exam.title}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted">
                  <Lock size={12} />
                  Bloqueado
                </span>
              </div>
              <p className="text-xs text-muted">{exam.description}</p>
            </div>
          ) : (
            <Link
              key={exam.title}
              to={exam.to ?? '#'}
              className="group relative flex flex-col gap-4 overflow-hidden rounded-[26px] border border-primary/25 bg-gradient-to-br from-white via-primary/10 to-primary/25 p-5 shadow-[0_28px_65px_-48px_rgba(116,95,224,1)] transition hover:-translate-y-1 hover:shadow-[0_36px_85px_-46px_rgba(116,95,224,1)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2 text-base font-semibold text-ink">
                  <span aria-hidden className="text-primary">
                    <exam.icon size={22} />
                  </span>
                  {exam.title}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {exam.language}
                </span>
              </div>
              <p className="text-xs text-muted">{exam.description}</p>
              <span className="btn secondary w-fit text-sm">
                <BookMarked size={16} />
                Comenzar
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/30 blur-3xl transition group-hover:translate-x-2 group-hover:translate-y-1"
              />
            </Link>
          )
        )}
      </div>
    </div>
  )
}
