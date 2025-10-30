import { Link } from 'react-router-dom'
import { Lock, Rocket, Sparkles } from 'lucide-react'

const trimesters = [
  {
    title: 'Primer trimestre',
    description: '5 exámenes listos para jugar',
    status: 'Disponible',
    to: '/trimestre-1',
    active: true,
    icon: '🚀',
  },
  {
    title: 'Segundo trimestre',
    description: 'Próximamente con nuevos retos',
    status: 'Bloqueado',
    active: false,
    icon: '🧩',
  },
  {
    title: 'Tercer trimestre',
    description: 'Sorpresas en camino',
    status: 'Bloqueado',
    active: false,
    icon: '🎯',
  },
]

export default function Grade() {
  return (
    <div className="flex flex-col gap-9">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:text-primary-dark"
      >
        <span aria-hidden>←</span>
        Volver a inicio
      </Link>

      <section className="overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-r from-white via-[#f4edff] to-[#e2f5ff] p-6 shadow-[0_32px_70px_-48px_rgba(116,95,224,0.9)] sm:p-9">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
              <Sparkles size={14} />
              Tercero de primaria
            </span>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Escoge el trimestre para comenzar</h1>
            <p className="text-sm text-muted">
              ¡Cada trimestre tiene misiones sorpresas! Empieza por el primero y desbloquea insignias especiales.
            </p>
          </div>
          <div className="relative inline-flex h-28 w-28 items-center justify-center rounded-3xl bg-white/80 text-5xl shadow-[0_24px_55px_-36px_rgba(116,95,224,0.8)]">
            <Rocket className="text-primary" size={40} />
            <span aria-hidden className="absolute -right-4 top-0 text-3xl">
              ⭐
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {trimesters.map((item, index) =>
          item.active ? (
            <Link
              key={item.title}
              to={item.to ?? '#'}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[28px] border border-primary/25 bg-gradient-to-br from-white via-primary/10 to-primary/25 p-6 shadow-[0_28px_65px_-48px_rgba(116,95,224,1)] transition hover:-translate-y-1 hover:shadow-[0_36px_85px_-46px_rgba(116,95,224,1)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-primary">
                  {index + 1}
                </span>
                <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                  {item.status}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-ink">
                  {item.icon} {item.title}
                </h2>
                <p className="text-sm text-muted">{item.description}</p>
              </div>
              <span className="btn secondary w-fit text-sm">
                ¡Entrar ahora!
                <span aria-hidden>➡️</span>
              </span>
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/30 blur-3xl transition group-hover:translate-x-4 group-hover:translate-y-1"
              />
            </Link>
          ) : (
            <div
              key={item.title}
              className="flex h-full flex-col gap-4 rounded-[28px] border border-white/60 bg-white/70 p-6 text-muted shadow-[0_24px_55px_-48px_rgba(116,95,224,0.4)]"
            >
              <div className="flex items-center justify-between">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-muted">
                  {index + 1}
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted">
                  <Lock size={12} />
                  {item.status}
                </span>
              </div>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-muted">
                  {item.icon} {item.title}
                </h2>
                <p className="text-sm text-muted/80">{item.description}</p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
