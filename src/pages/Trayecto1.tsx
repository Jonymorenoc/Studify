import type { CSSProperties } from 'react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle2, Clock, Lock, Sparkles, TrainFront, Wand2 } from 'lucide-react'
import { percentCompleted } from '../state/progress'

type JourneyStatus = 'locked' | 'unlocked' | 'completed'

type StopResource = {
  label: string
  to: string
  variant?: 'primary' | 'secondary'
}

type JourneyStop = {
  id: string
  title: string
  summary: string
  startDate: string
  temario?: string[]
  resources?: StopResource[]
  status: JourneyStatus
  progress?: number
}

type TrimesterId = 'trimestre-1' | 'trimestre-2' | 'trimestre-3'

const trimesterTabs: { id: TrimesterId; label: string; note: string }[] = [
  {
    id: 'trimestre-1',
    label: 'Trimestre 1',
    note: 'Este trimestre incluye el trayecto "Hechos de mitos" y nuevas estaciones por desbloquear.',
  },
  {
    id: 'trimestre-2',
    label: 'Trimestre 2',
    note: 'Estamos preparando los contenidos del segundo trimestre. Disponible muy pronto.',
  },
  {
    id: 'trimestre-3',
    label: 'Trimestre 3',
    note: 'El tercer trimestre llegara con misiones y retos nuevos mas adelante.',
  },
]

const trimesterOneStops: Omit<JourneyStop, 'status'>[] = [
  {
    id: 'trayecto-1-hechos-mitos',
    title: 'Trayecto 1. Hechos de mitos',
    summary:
      'Aventura inicial para conocer manifestaciones artisticas, mitos y leyendas. Completa actividades interactivas y gana estrellas.',
    startDate: '08 septiembre 2025',
    temario: [
      'Manifestaciones artisticas: mitos y leyendas (pag. 30-31)',
      'Lenguaje visual y sonoro (pag. 32-33)',
      'Ortografia y gramatica: tiempos verbales (pag. 37)',
    ],
    resources: [
      { label: 'Aventura interactiva', to: '/trimestre-1/lengua/trayecto-1/aventura', variant: 'primary' },
      { label: 'Manifestaciones artisticas', to: '/trimestre-1/lengua/trayecto-1/mitos-y-leyendas' },
      { label: 'Lenguaje visual y sonoro', to: '/trimestre-1/lengua/trayecto-1/lenguaje-visual-y-sonoro' },
      { label: 'Tiempos verbales', to: '/trimestre-1/lengua/trayecto-1/tiempos-verbales' },
    ],
  },
  {
    id: 'estacion-1-como-llegamos',
    title: 'Estacion Lengua 1. Como llegamos?',
    summary:
      'Modulo centrado en anuncios publicitarios y etiquetas (paginas 115-121). Incluye versiones digitales, analisis critico y actividades creativas.',
    startDate: '26 septiembre 2025',
    temario: ['Anuncios publicitarios (paginas 115-116)', 'Etiquetado de productos (paginas 119-121)'],
    resources: [{ label: 'Abrir Trayecto 2', to: '/trimestre-1/lengua/trayecto-2', variant: 'primary' }],
  },
  {
    id: 'trayecto-2-alimentos',
    title: 'Trayecto 2. Alimentos a la venta',
    summary:
      'Analiza anuncios publicitarios y etiquetas para tomar decisiones informadas sobre lo que compras.',
    startDate: '10 octubre 2025',
    temario: [
      'Anuncios publicitarios (pag. 115-116)',
      'Etiquetado de productos (pag. 119-121)',
    ],
    resources: [{ label: 'Abrir Trayecto 2', to: '/trimestre-1/lengua/trayecto-2', variant: 'primary' }],
  },
  {
    id: 'trayecto-3-historias',
    title: 'Trayecto 3. Cuentos y descripciones',
    summary:
      'Crea narraciones completas y descripciones ricas en adjetivos basadas en las paginas 150-157.',
    startDate: '20 octubre 2025',
    temario: ['Texto narrativo (pag. 150-151)', 'Descripciones con adjetivos (pag. 156-157)'],
    resources: [{ label: 'Abrir Trayecto 3', to: '/trimestre-1/lengua/trayecto-3', variant: 'primary' }],
  },
  {
    id: 'estacion-3-tablero',
    title: 'Estacion Lengua 3. Tablero, dados, accion!',
    summary:
      'Juego colaborativo con tablero y dados para repasar vocabulario, tiempos verbales y comprension de historias.',
    startDate: '07 noviembre 2025',
    temario: ['Actividad ludica integradora del trimestre (contenido por publicar)'],
  },
  {
    id: 'trayecto-4-basura',
    title: 'Trayecto 4. Como se ve la basura en mi comunidad?',
    summary:
      'Investiga y presenta propuestas sobre el manejo de residuos con enfasis en sustantivos y adjetivos calificativos.',
    startDate: '21 noviembre 2025',
    temario: ['Ortografia y gramatica: sustantivos y adjetivos calificativos (pag. 157)'],
  },
]

const temarioPrimerTrimestre = [
  'Manifestaciones artisticas: mitos y leyendas (pag. 30-31)',
  'Lenguaje visual y sonoro (pag. 32-33)',
  'Ortografia y gramatica: tiempos verbales (pag. 37)',
  'Anuncios publicitarios (pag. 115-116)',
  'Etiquetado de productos (pag. 119-121)',
  'Texto narrativo (pag. 150-151)',
  'Ortografia y gramatica: sustantivos y adjetivos calificativos (pag. 157)',
]

export default function Trayecto1() {
  const [activeTrimester, setActiveTrimester] = useState<TrimesterId>('trimestre-1')
  const trayectoProgress = percentCompleted('trimestre1.lengua.trayecto1')

  const trimesterOneComputed = useMemo<JourneyStop[]>(() => {
    return trimesterOneStops.map((stop, index) => {
      if (index === 0) {
        const status: JourneyStatus = trayectoProgress >= 100 ? 'completed' : 'unlocked'
        return { ...stop, status, progress: trayectoProgress }
      }

      if (index === 1 || index === 2 || index === 3) {
        return { ...stop, status: 'unlocked' }
      }

      return { ...stop, status: 'locked' }
    })
  }, [trayectoProgress])

  const activeTab = trimesterTabs.find(tab => tab.id === activeTrimester)
  const activeStops = activeTrimester === 'trimestre-1' ? trimesterOneComputed : []

  const lastCompletedIndex = activeStops.reduce((acc, stop, index) => (stop.status === 'completed' ? index : acc), -1)
  const trainIndex = activeStops.length > 0 ? Math.min(lastCompletedIndex + 1, activeStops.length - 1) : 0
  const progressPercent =
    activeStops.length > 1 ? Math.max(0, Math.min(100, (trainIndex / (activeStops.length - 1)) * 100)) : 0

  return (
    <div className="flex flex-col gap-9">
      <Link
        to="/trimestre-1/lengua"
        className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:-translate-y-0.5 hover:text-primary-dark"
      >
        <span aria-hidden>{'<'}</span>
        Volver al examen
      </Link>

      <section className="overflow-hidden rounded-[32px] border border-white/70 bg-gradient-to-r from-white via-[#f4eeff] to-[#e4f6ff] p-6 shadow-[0_32px_70px_-48px_rgba(116,95,224,0.9)] sm:p-9">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.35em] text-primary">
              <Sparkles size={14} />
              Lengua - Trimestre 1
            </span>
            <h1 className="text-3xl font-semibold text-ink sm:text-4xl">Viaja en el tren de los trayectos</h1>
            <p className="text-sm text-muted">
              Completa el trayecto "Hechos de mitos" para desbloquear las estaciones siguientes y seguir sumando estrellas.
            </p>
          </div>
          <div className="relative inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-white/80 text-4xl shadow-[0_24px_55px_-36px_rgba(116,95,224,0.8)]">
            <TrainFront className="text-primary" size={36} />
            <span aria-hidden className="absolute -right-3 top-2 text-2xl">✨</span>
          </div>
        </div>
      </section>

      <nav
        className="inline-flex flex-wrap items-center gap-2 rounded-full border border-white/60 bg-white/70 p-1 shadow-[0_20px_45px_-40px_rgba(116,95,224,0.6)]"
        aria-label="Selecciona un trimestre"
      >
        {trimesterTabs.map(tab => {
          const isActive = tab.id === activeTrimester
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTrimester(tab.id)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${isActive ? 'bg-primary text-white shadow-[0_15px_40px_-25px_rgba(116,95,224,1)]' : 'bg-transparent text-primary hover:bg-primary/10'}`}
            >
              {tab.label}
              {tab.id !== 'trimestre-1' && <Lock size={14} aria-hidden className="text-primary/60" />}
            </button>
          )
        })}
      </nav>
      {activeTab && <p className="text-xs text-muted">{activeTab.note}</p>}

      {activeTrimester === 'trimestre-1' ? (
        <>
          <section className="space-y-4">
            <div>
              <h2 className="text-2xl font-semibold text-ink">Trayectos del trimestre</h2>
              <p className="text-sm text-muted">Desliza de izquierda a derecha para descubrir cada estacion del recorrido.</p>
            </div>
            <JourneyTrain stops={activeStops} progressPercent={progressPercent} />
          </section>

          <section className="space-y-4 rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_-48px_rgba(116,95,224,0.6)]">
            <h3 className="text-xl font-semibold text-ink">Temario del primer trimestre</h3>
            <ul className="space-y-2 text-sm text-muted">
              {temarioPrimerTrimestre.map(item => (
                <li key={item} className="flex items-start gap-2">
                  <span aria-hidden className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <section className="rounded-[28px] border border-white/70 bg-white/80 p-6 text-center shadow-[0_24px_60px_-48px_rgba(116,95,224,0.5)]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white">
            <Wand2 className="text-primary" size={28} />
          </div>
          <h2 className="mt-4 text-xl font-semibold text-ink">Contenido en construccion</h2>
          <p className="mt-2 text-sm text-muted">
            Estamos preparando las misiones de este trimestre. Vuelve pronto para seguir avanzando en el tren de Studify.
          </p>
        </section>
      )}
    </div>
  )
}

function JourneyTrain({ stops, progressPercent }: { stops: JourneyStop[]; progressPercent: number }) {
  const fillStyle: CSSProperties = {
    width: stops.length > 1 ? `calc(${progressPercent}% + 2px)` : '0%',
  }

  const trainStyle: CSSProperties =
    stops.length > 1
      ? { left: `calc(${progressPercent}% - 18px)` }
      : { left: '-18px' }

  return (
    <div className="overflow-visible rounded-[28px] border border-white/70 bg-white/90 p-6 shadow-[0_28px_65px_-48px_rgba(116,95,224,0.9)]">
      <div className="relative mt-2 overflow-visible">
        <div className="h-2 w-full rounded-full bg-primary/10" />
        <div className="absolute left-0 top-0 h-2 rounded-full bg-gradient-to-r from-primary via-primary/80 to-secondary" style={fillStyle} />
        <TrainFront
          aria-hidden
          className="absolute -top-5 h-9 w-9 text-primary drop-shadow-lg transition-all duration-500"
          style={trainStyle}
        />
        <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 justify-between">
          {stops.map((stop, index) => {
            const isCompleted = stop.status === 'completed'
            const isUnlocked = stop.status === 'unlocked'
            const circleClass = isCompleted
              ? 'border-primary bg-primary'
              : isUnlocked
                ? 'border-primary/70 bg-white'
                : 'border-white/60 bg-white'
            return (
              <div key={stop.id} className="flex flex-col items-center gap-2">
                <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${circleClass}`} />
                <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-muted">{index + 1}</span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4">
        {stops.map(stop => (
          <JourneyCard key={stop.id} stop={stop} />
        ))}
      </div>
    </div>
  )
}

function JourneyCard({ stop }: { stop: JourneyStop }) {
  const isLocked = stop.status === 'locked'
  const isCompleted = stop.status === 'completed'
  const hasProgress = typeof stop.progress === 'number' && stop.progress > 0 && stop.progress < 100

  const cardBase = 'group relative min-w-[280px] snap-start flex flex-col gap-4 rounded-[26px] border p-5 transition duration-300'
  const cardVariant = isCompleted
    ? 'border-success/40 bg-success/5 text-ink shadow-[0_24px_60px_-46px_rgba(39,174,96,0.4)]'
    : isLocked
      ? 'border-white/60 bg-white/70 text-muted shadow-[0_24px_55px_-48px_rgba(116,95,224,0.25)]'
      : 'border-primary/30 bg-gradient-to-br from-white via-primary/10 to-primary/20 text-ink shadow-[0_28px_65px_-48px_rgba(116,95,224,1)] hover:-translate-y-1 hover:shadow-[0_36px_85px_-46px_rgba(116,95,224,1)]'

  const badgeIcon = isCompleted ? (
    <CheckCircle2 size={14} />
  ) : isLocked ? (
    <Lock size={14} />
  ) : hasProgress ? (
    <Clock size={14} />
  ) : (
    <Sparkles size={14} />
  )

  const badgeLabel = isCompleted
    ? 'Completado'
    : isLocked
      ? 'Proximamente'
      : hasProgress
        ? `En progreso (${stop.progress}%)`
        : 'Disponible'

  return (
    <article className={`${cardBase} ${cardVariant}`}>
      <div className="flex items-center justify-between">
        <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest ${isCompleted ? 'bg-success/10 text-success' : isLocked ? 'bg-white/80 text-muted' : 'bg-white text-primary'}`}>
          {badgeIcon}
          {badgeLabel}
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Inicio: {stop.startDate}</span>
      </div>

      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-ink">{stop.title}</h3>
        <p className="text-sm text-muted">{stop.summary}</p>
      </div>

      {stop.temario && (
        <ul className="space-y-1 text-xs text-muted">
          {stop.temario.map(item => (
            <li key={item} className="flex items-start gap-1">
              <span aria-hidden className="mt-1 h-1 w-1 rounded-full bg-primary/60" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}

      {!isLocked && stop.resources?.length ? (
        <div className="flex flex-wrap gap-3">
          {stop.resources.map(resource => (
            <Link
              key={resource.to}
              to={resource.to}
              className={resource.variant === 'primary' ? 'btn px-4 py-2 text-sm' : 'btn secondary px-4 py-2 text-sm'}
            >
              {resource.label}
            </Link>
          ))}
        </div>
      ) : null}
    </article>
  )
}
