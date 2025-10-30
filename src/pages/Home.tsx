import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'
import { PartyPopper, Sparkles, Trophy } from 'lucide-react'
import ProgressBar from '../components/ProgressBar'
import studyBuddyAnimation from '../assets/lottie/study-buddy.json'
import { percentCompleted } from '../state/progress'

const missions = [
  {
    title: 'Explorador de palabras',
    description: 'Busca palabras mágicas dentro de los mitos y compártelas con tu maestro.',
    icon: '🔤',
    badge: 'Nuevo',
  },
  {
    title: 'Ritmo aventurero',
    description: 'Lee en voz alta el mito favorito con ritmo y dramatización.',
    icon: '🥁',
    badge: '+1 estrella',
  },
  {
    title: 'Super memoria',
    description: 'Recuerda 3 personajes del cuento e inventa un final sorpresa.',
    icon: '🧠',
    badge: 'Bonus',
  },
  {
    title: 'Mini director',
    description: 'Diseña un escenario usando sonidos y colores del mito.',
    icon: '🎨',
    badge: 'Creativo',
  },
]

const journeyTags = ['Estrellas brillantes', 'Desafíos cortos', 'Lectura divertida']

export default function Home() {
  const pct = percentCompleted('trimestre1.lengua.trayecto1')

  return (
    <div className="flex flex-col gap-12">
      <section className="relative overflow-hidden rounded-[36px] border border-white/70 bg-gradient-to-br from-white via-[#f5f1ff] to-[#dff2ff] p-6 shadow-[0_35px_80px_-50px_rgba(116,95,224,0.9)] sm:p-9">
        <div aria-hidden className="pointer-events-none absolute -left-20 -top-24 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -right-28 -bottom-32 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

        <div className="grid items-center gap-10 md:grid-cols-[1.1fr,0.9fr]">
          <div className="flex flex-col gap-6">
            <span className="inline-flex items-center gap-2 self-start rounded-full bg-white/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-primary shadow-[0_18px_40px_-30px_rgba(116,95,224,0.9)]">
              <Sparkles size={16} />
              Aprende jugando
            </span>
            <div className="space-y-3">
              <h1 className="text-3xl font-semibold text-ink sm:text-4xl">
                ¡Bienvenido a tu aventura mágica de estudio!
              </h1>
              <p className="text-base text-muted">
                Completa misiones cortas, gana estrellas y desbloquea sorpresas increíbles mientras aprendes sobre mitos y leyendas.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              {journeyTags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-2 rounded-full border border-white/70 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[0_20px_48px_-36px_rgba(255,173,87,0.7)]"
                >
                  <span aria-hidden>🌟</span>
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid gap-4 rounded-[30px] border border-white/70 bg-white/90 p-5 shadow-[0_24px_60px_-45px_rgba(116,95,224,0.8)] sm:grid-cols-[1.1fr,0.9fr] sm:items-center">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted">Lengua – Trayecto 1</p>
                <h2 className="text-lg font-semibold text-ink">Progreso general</h2>
                <p className="text-xs text-muted">
                  ¡Sigue jugando! Cuando completes el 100% desbloquearás una celebración especial.
                </p>
              </div>
              <div className="space-y-2">
                <ProgressBar value={pct} />
                <p className="text-right text-xs font-semibold text-primary">{pct}% completo</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link to="/tercero" className="btn px-6 py-3 text-sm">
                <Trophy size={16} />
                Ir a mis exámenes
              </Link>
              <Link to="/trimestre-1/lengua/trayecto-1" className="btn secondary text-sm">
                <PartyPopper size={16} />
                Ver mi aventura
              </Link>
            </div>
          </div>

          <div className="relative flex justify-center">
            <div className="w-full max-w-xs sm:max-w-sm">
              <Lottie animationData={studyBuddyAnimation} loop autoplay />
            </div>
            <span className="floating-emoji left-[20%] top-6 text-3xl sm:text-4xl" aria-hidden>
              📚
            </span>
            <span className="floating-emoji animation-delay-200 right-8 top-12 text-4xl" aria-hidden>
              🌈
            </span>
            <span className="floating-emoji animation-delay-400 bottom-10 right-[25%] text-3xl sm:text-4xl" aria-hidden>
              ⭐
            </span>
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-ink">Misiones del día</h2>
            <p className="text-sm text-muted">Elige una misión y gana estrellas extra completándola.</p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-success/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-success">
            ⭐ Recompensas activas
          </span>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {missions.map(mission => (
            <article
              key={mission.title}
              className="group relative overflow-hidden rounded-[26px] border border-white/70 bg-white p-5 shadow-[0_24px_55px_-48px_rgba(116,95,224,0.8)] transition hover:-translate-y-1 hover:shadow-[0_30px_70px_-46px_rgba(116,95,224,0.9)]"
            >
              <div aria-hidden className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-primary/10 transition group-hover:scale-[1.2]" />
              <div className="relative flex flex-col gap-3">
                <div className="inline-flex items-center gap-2">
                  <span className="text-3xl" aria-hidden>
                    {mission.icon}
                  </span>
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
                    {mission.badge}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-ink">{mission.title}</h3>
                <p className="text-sm text-muted">{mission.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-semibold text-ink">Selecciona tu grado</h2>
          <p className="text-sm text-muted">Elige el bloque para seguir desbloqueando juegos y retos.</p>
        </div>
        <Link
          to="/tercero"
          className="relative flex flex-col gap-5 overflow-hidden rounded-[32px] border border-primary/25 bg-gradient-to-r from-white via-primary/10 to-primary/25 p-6 shadow-[0_32px_80px_-48px_rgba(116,95,224,1)] transition hover:-translate-y-1 hover:shadow-[0_38px_90px_-46px_rgba(116,95,224,1)] sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-primary">Tercero de primaria</p>
            <h3 className="text-xl font-semibold text-ink">Exámenes trimestrales listos para jugar</h3>
            <div className="flex flex-wrap gap-2">
              {['Lengua', 'Matemáticas', 'Ciencias', 'English'].map(label => (
                <span
                  key={label}
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${
                    label === 'Lengua' ? 'bg-white text-primary' : 'bg-primary/15 text-primary/70'
                  }`}
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
          <span className="btn secondary text-sm sm:self-center">
            ¡Quiero jugar!
            <span aria-hidden>➡️</span>
          </span>
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-10 -right-8 h-32 w-32 rounded-full bg-white/30 blur-2xl"
          />
        </Link>
      </section>
    </div>
  )
}
