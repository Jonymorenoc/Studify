import { Link } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import { percentCompleted } from '../state/progress'

export default function Home() {
  const pct = percentCompleted('trimestre1.lengua.trayecto1')

  return (
    <div className="flex flex-col gap-8">
      <section className="rounded-[32px] border border-white/70 bg-gradient-to-br from-white via-surface-soft to-primary/10 p-6 shadow-[0_30px_60px_-45px_rgba(127,107,255,0.8)] sm:p-8">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-primary">Aprende jugando</p>
            <h1 className="text-2xl font-semibold text-ink sm:text-3xl">
              Â¡Bienvenido a tu aventura de aprendizaje!
            </h1>
            <p className="text-base text-muted">
              Completa ejercicios divertidos, gana estrellas y sigue tu progreso en cada trayecto.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[0_14px_30px_-24px_rgba(255,172,87,0.8)]">
              <span aria-hidden>⭐</span> Gana estrellas
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-sm font-semibold text-success">
              <span aria-hidden>⭐</span> Sigue tu progreso
            </span>
          </div>
          <div className="space-y-3 rounded-[28px] border border-white/60 bg-white p-4 shadow-[0_20px_45px_-40px_rgba(127,107,255,0.7)] sm:flex sm:items-center sm:justify-between sm:gap-6 sm:space-y-0">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted">Lengua Â· Trayecto 1</p>
              <h2 className="mt-1 text-lg font-semibold text-ink">Progreso general</h2>
            </div>
            <div className="w-full space-y-2 sm:max-w-xs">
              <ProgressBar value={pct} />
              <p className="text-right text-xs font-semibold text-primary">{pct}%</p>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold text-ink">Selecciona tu grado</h2>
          <p className="text-sm text-muted">Elige un bloque para comenzar la aventura.</p>
        </div>
        <Link
          to="/tercero"
          className="flex flex-col gap-4 rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_28px_60px_-48px_rgba(127,107,255,0.8)] transition hover:-translate-y-1 hover:shadow-[0_32px_70px_-45px_rgba(127,107,255,0.9)] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Tercero de primaria</p>
            <h3 className="text-lg font-semibold text-ink">ExÃ¡menes trimestrales disponibles</h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {['Lengua', 'MatemÃ¡ticas', 'Ciencias', 'English'].map(label => (
                <span
                  key={label}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    label === 'Lengua'
                      ? 'bg-primary/15 text-primary'
                      : 'bg-surface-alt text-muted'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <div className="inline-flex items-center gap-2 self-end rounded-full bg-primary/15 px-4 py-2 text-sm font-semibold text-primary sm:self-center">
            Comenzar
            <span aria-hidden>⭐</span>
          </div>
        </Link>
      </section>
    </div>
  )
}

