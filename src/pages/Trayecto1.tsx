import { Link } from 'react-router-dom'
import { BookOpenCheck, Sparkles, Wand2 } from 'lucide-react'

const modules = [
  {
    title: 'Aventura guiada',
    subtitle: 'Pantallas 1-23 · Experiencia interactiva',
    to: '/trimestre-1/lengua/trayecto-1/aventura',
    highlight: true,
    icon: '🎮',
  },
  {
    title: 'Manifestaciones artísticas: mitos y leyendas (p. 30-31)',
    subtitle: 'SPA · Actividades impresas',
    to: '/trimestre-1/lengua/trayecto-1/mitos-y-leyendas',
    icon: '🏺',
  },
  {
    title: 'Lenguaje visual y sonoro (p. 32-33)',
    subtitle: 'SPA · Recursos visuales y auditivos',
    to: '/trimestre-1/lengua/trayecto-1/lenguaje-visual-y-sonoro',
    icon: '🎧',
  },
  {
    title: 'Ortografía y gramática: tiempos verbales (p. 37)',
    subtitle: 'SPA · Refuerzo gramatical',
    to: '/trimestre-1/lengua/trayecto-1/tiempos-verbales',
    icon: '⏰',
  },
]

export default function Trayecto1() {
  return (
    <div className="flex flex-col gap-9">
      <Link
        to="/trimestre-1/lengua"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:text-primary-dark"
      >
        <span aria-hidden>←</span>
        Volver al examen
      </Link>

      <section className="overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-r from-white via-[#f4eeff] to-[#e4f6ff] p-6 shadow-[0_32px_70px_-48px_rgba(116,95,224,0.9)] sm:p-9">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
              <Sparkles size={14} />
              Lengua · Trayecto 1
            </span>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Manifestaciones artísticas, mitos y leyendas</h1>
            <p className="text-sm text-muted">
              Explora la aventura paso a paso o abre las actividades complementarias para reforzar tus habilidades.
            </p>
          </div>
          <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white/80 text-4xl shadow-[0_24px_55px_-36px_rgba(116,95,224,0.8)]">
            <Wand2 className="text-primary" size={36} />
            <span aria-hidden className="absolute -right-3 top-2 text-2xl">
              ✨
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2">
        {modules.map(module =>
          module.highlight ? (
            <Link
              key={module.title}
              to={module.to}
              className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-[28px] border border-primary/25 bg-gradient-to-br from-white via-primary/10 to-primary/25 p-6 shadow-[0_28px_65px_-48px_rgba(116,95,224,1)] transition hover:-translate-y-1 hover:shadow-[0_36px_85px_-46px_rgba(116,95,224,1)]"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                <BookOpenCheck size={14} />
                Recomendado
              </span>
              <h2 className="text-xl font-semibold text-ink">
                <span aria-hidden className="mr-2 text-2xl">
                  {module.icon}
                </span>
                {module.title}
              </h2>
              <p className="text-sm text-muted">{module.subtitle}</p>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Iniciar recorrido
                <span aria-hidden>➡️</span>
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/35 blur-3xl transition group-hover:translate-x-3 group-hover:translate-y-1"
              />
            </Link>
          ) : (
            <Link
              key={module.title}
              to={module.to}
              className="group relative flex h-full flex-col gap-3 rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_24px_55px_-48px_rgba(116,95,224,0.7)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-46px_rgba(116,95,224,0.9)]"
            >
              <h2 className="text-lg font-semibold text-ink">
                <span aria-hidden className="mr-2 text-2xl">
                  {module.icon}
                </span>
                {module.title}
              </h2>
              <p className="text-sm text-muted">{module.subtitle}</p>
              <span
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-10 h-28 w-28 rounded-full bg-primary/10 blur-3xl opacity-0 transition group-hover:opacity-100"
              />
            </Link>
          )
        )}
      </div>
    </div>
  )
}

