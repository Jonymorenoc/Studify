import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { percentCompleted } from '../state/progress'

const exams = [
  {
    title: 'Examen de Lengua',
    description: 'Trayecto 1 · Mitos y leyendas',
    language: 'SPA',
    to: '/trimestre-1/lengua',
    locked: false,
  },
  {
    title: 'Phonology (Phonics & vocabulary)',
    description: 'ENG · Próximamente',
    language: 'ENG',
    locked: true,
  },
  {
    title: 'Matemáticas',
    description: 'SPA · Próximamente',
    language: 'SPA',
    locked: true,
  },
  {
    title: 'Language (Grammar)',
    description: 'ENG · Próximamente',
    language: 'ENG',
    locked: true,
  },
  {
    title: 'Ciencias',
    description: 'SPA · Próximamente',
    language: 'SPA',
    locked: true,
  },
  {
    title: 'Listening & reading comprehension',
    description: 'ENG · Próximamente',
    language: 'ENG',
    locked: true,
  },
]

export default function Exams() {
  const pct = percentCompleted('trimestre1.lengua.trayecto1')

  return (
    <div className="flex flex-col gap-7">
      <Link
        to="/tercero"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
      >
        <span aria-hidden>←</span>
        Volver al grado
      </Link>

      <section className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_28px_60px_-48px_rgba(127,107,255,0.8)] sm:p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Primer trimestre
          </p>
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">
            Exámenes trimestrales
          </h1>
          <p className="text-sm text-muted">
            Selecciona un examen disponible y completa los ejercicios para ganar estrellas.
          </p>
        </div>
        <div className="mt-6 rounded-[24px] border border-white/70 bg-surface-soft p-4 shadow-[0_22px_45px_-48px_rgba(127,107,255,0.8)] sm:flex sm:items-center sm:justify-between sm:gap-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">
              Progreso general
            </p>
            <h2 className="text-lg font-semibold text-ink">Trayecto 1 · Lengua</h2>
          </div>
          <div className="mt-3 w-full space-y-2 sm:mt-0 sm:max-w-sm">
            <ProgressBar value={pct} />
            <p className="text-right text-xs font-semibold text-primary">{pct}%</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4">
        {exams.map(exam =>
          exam.locked ? (
            <div
              key={exam.title}
              className="flex items-center justify-between rounded-[26px] border border-white/60 bg-white/60 px-5 py-4 text-muted opacity-70"
            >
              <div>
                <h2 className="text-base font-semibold text-muted">{exam.title}</h2>
                <p className="text-xs">{exam.description}</p>
              </div>
              <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                Bloqueado
              </span>
            </div>
          ) : (
            <Link
              key={exam.title}
              to={exam.to ?? '#'}
              className="flex items-center justify-between rounded-[26px] border border-primary/30 bg-gradient-to-r from-white via-primary/10 to-primary/20 px-5 py-4 shadow-[0_24px_55px_-48px_rgba(127,107,255,0.9)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-46px_rgba(127,107,255,1)]"
            >
              <div>
                <h2 className="text-base font-semibold text-ink">{exam.title}</h2>
                <p className="text-xs text-muted">{exam.description}</p>
              </div>
              <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
                {exam.language}
              </span>
            </Link>
          )
        )}
      </div>
    </div>
  )
}
