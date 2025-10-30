import { Link } from 'react-router-dom'

const trimesters = [
  {
    title: 'Primer Trimestre',
    description: '5 exámenes disponibles',
    status: 'Disponible',
    to: '/trimestre-1',
    active: true,
  },
  {
    title: 'Segundo Trimestre',
    description: 'Próximamente',
    status: 'Bloqueado',
    active: false,
  },
  {
    title: 'Tercer Trimestre',
    description: 'Próximamente',
    status: 'Bloqueado',
    active: false,
  },
]

export default function Grade() {
  return (
    <div className="flex flex-col gap-7">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-dark"
      >
        <span aria-hidden>←</span>
        Volver a inicio
      </Link>

      <section className="rounded-[28px] border border-white/70 bg-white p-6 shadow-[0_28px_60px_-48px_rgba(127,107,255,0.8)] sm:p-8">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Tercero de primaria</p>
          <h1 className="text-2xl font-semibold text-ink sm:text-3xl">Selecciona el trimestre para comenzar</h1>
          <p className="text-sm text-muted">
            Activa el primer trayecto disponible y desbloquea actividades con estrellas.
          </p>
        </div>
      </section>

      <div className="space-y-4">
        {trimesters.map((item, index) =>
          item.active ? (
            <Link
              key={item.title}
              to={item.to ?? '#'}
              className="flex items-start gap-4 rounded-[26px] border border-primary/30 bg-gradient-to-r from-white via-primary/10 to-primary/20 p-5 shadow-[0_24px_55px_-48px_rgba(127,107,255,0.9)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-46px_rgba(127,107,255,1)] sm:p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold text-primary">
                {index + 1}
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="text-lg font-semibold text-ink">{item.title}</h2>
                <p className="text-sm text-muted">{item.description}</p>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-success/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-success">
                  {item.status}
                </span>
              </div>
            </Link>
          ) : (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-[26px] border border-white/60 bg-white/60 p-5 text-muted opacity-60 sm:p-6"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-lg font-semibold">
                {index + 1}
              </span>
              <div className="flex flex-1 flex-col gap-1">
                <h2 className="text-lg font-semibold text-muted">{item.title}</h2>
                <p className="text-sm">{item.description}</p>
                <span className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-widest">
                  {item.status}
                </span>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  )
}
