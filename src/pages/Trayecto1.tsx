import { Link } from 'react-router-dom'

const modules = [
  {
    title: 'Aventura guiada',
    subtitle: 'Pantallas 1-23 · Experiencia completa y móvil',
    to: '/trimestre-1/lengua/trayecto-1/aventura',
    highlight: true,
  },
  {
    title: 'Manifestaciones artísticas: mitos y leyendas (p. 30-31)',
    subtitle: 'SPA · Actividades impresas',
    to: '/trimestre-1/lengua/trayecto-1/mitos-y-leyendas',
  },
  {
    title: 'Lenguaje visual y sonoro (p. 32-33)',
    subtitle: 'SPA · Recursos visuales y auditivos',
    to: '/trimestre-1/lengua/trayecto-1/lenguaje-visual-y-sonoro',
  },
  {
    title: 'Ortografía y gramática: tiempos verbales (p. 37)',
    subtitle: 'SPA · Refuerzo gramatical',
    to: '/trimestre-1/lengua/trayecto-1/tiempos-verbales',
  },
]

export default function Trayecto1() {
  return (
    <div className="flex flex-col gap-7">
      <Link
        to="/trimestre-1/lengua"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
      >
        <span aria-hidden>←</span>
        Volver al examen
      </Link>

      <section className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_28px_60px_-48px_rgba(127,107,255,0.8)] sm:p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            Lengua · Trayecto 1
          </p>
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">
            Manifestaciones artísticas, mitos y leyendas
          </h1>
          <p className="text-sm text-muted">
            Explora la travesía paso a paso o accede a las actividades complementarias para reforzar tus conocimientos.
          </p>
        </div>
      </section>

      <div className="grid gap-4">
        {modules.map(module =>
          module.highlight ? (
            <Link
              key={module.title}
              to={module.to}
              className="flex flex-col gap-2 rounded-[26px] border border-primary/30 bg-gradient-to-r from-white via-primary/10 to-primary/25 p-5 shadow-[0_24px_55px_-48px_rgba(127,107,255,1)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-46px_rgba(127,107,255,1)]"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                Recomendado
              </span>
              <h2 className="text-lg font-semibold text-ink">{module.title}</h2>
              <p className="text-sm text-muted">{module.subtitle}</p>
              <span className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                Iniciar recorrido <span aria-hidden>→</span>
              </span>
            </Link>
          ) : (
            <Link
              key={module.title}
              to={module.to}
              className="flex flex-col gap-2 rounded-[26px] border border-white/70 bg-white/85 p-5 shadow-[0_20px_45px_-48px_rgba(127,107,255,0.8)] transition hover:-translate-y-1 hover:shadow-[0_26px_60px_-46px_rgba(127,107,255,0.9)]"
            >
              <h2 className="text-lg font-semibold text-ink">{module.title}</h2>
              <p className="text-sm text-muted">{module.subtitle}</p>
            </Link>
          )
        )}
      </div>
    </div>
  )
}
