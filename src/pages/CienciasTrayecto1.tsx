import { useMemo, useState, useEffect } from 'react'
import Lottie from 'lottie-react'
import confetti from 'canvas-confetti'
import { Home, RotateCcw, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getProgress, saveProgress } from '../state/progress'
import moonPhasesAnimation from '../assets/lottie/moon-phases.json'
import animalAnimation from '../assets/lottie/animal.json'
import waterDropAnimation from '../assets/lottie/water-drop.json'

/**
 * App móvil first para enseñar y evaluar a niñas/niños en Ciencias.
 * - 1 pantalla por ejercicio, siempre con una pantalla de APRENDIZAJE antes.
 * - Español, tipografía grande, botones táctiles.
 * - Progreso, puntos, retroalimentación inmediata, y reinicio por trayecto.
 * - Diseño mobile-first con animaciones Lottie.
 */

// ---------- Componentes UI ----------
const Pill = ({ children, onClick, selected, correct, disabled, index }: any) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`w-full text-left rounded-2xl px-5 py-4 my-2 border-2 transition-all transform active:scale-[0.97] hover:scale-[1.01] shadow-sm ${
      selected ? 'border-blue-500 ring-4 ring-blue-200/50 bg-blue-50' : 'border-slate-300 bg-white'
    } ${disabled ? 'opacity-60 cursor-not-allowed' : 'hover:border-blue-400 hover:shadow-md cursor-pointer'}
    ${correct === true ? 'bg-green-100 border-green-500 ring-4 ring-green-200/50' : ''}
    ${correct === false ? 'bg-red-100 border-red-500 ring-4 ring-red-200/50' : ''}`}
    style={{ animationDelay: `${index * 50}ms` }}
  >
    <div className="flex items-center gap-3">
      <span className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all ${
        selected
          ? 'bg-blue-500 text-white'
          : correct === true
            ? 'bg-green-500 text-white'
            : correct === false
              ? 'bg-red-500 text-white'
              : 'bg-slate-200 text-slate-600'
      }`}>
        {String.fromCharCode(65 + index)}
      </span>
      <span className="text-base leading-tight font-medium flex-1">{children}</span>
      {correct === true && <span className="text-2xl">✓</span>}
      {correct === false && <span className="text-2xl">✗</span>}
    </div>
  </button>
)

const Badge = ({ children, variant = 'default' }: any) => {
  const variantClasses = variant === 'learn'
    ? 'bg-blue-100 text-blue-700 border-blue-200'
    : variant === 'quiz'
      ? 'bg-purple-100 text-purple-700 border-purple-200'
      : 'bg-slate-100 text-slate-700 border-slate-200'

  return (
    <span className={`inline-flex items-center rounded-full border-2 px-4 py-2 text-sm font-bold gap-2 ${variantClasses}`}>
      {variant === 'learn' && <span className="text-lg">📚</span>}
      {variant === 'quiz' && <span className="text-lg">✏️</span>}
      {children}
    </span>
  )
}

const Progress = ({ value }: { value: number }) => (
  <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden shadow-inner">
    <div
      className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-500 ease-out"
      style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
    />
  </div>
)

// ---------- Banco de pantallas ----------
type Screen = {
  trayecto: number
  tema: string
  emoji: string
  kind: 'learn' | 'quiz'
  animation?: any
  body?: React.ReactNode
  quiz?: {
    prompt: string
    options: string[]
    answerIndex: number
    explain: string
    funFact?: string
  }
}

const SCREENS: Screen[] = [
  // Trayecto 1 — Fases de la Luna
  {
    trayecto: 1,
    tema: 'Las fases de la Luna',
    emoji: '🌙',
    kind: 'learn',
    animation: moonPhasesAnimation,
    body: (
      <div className="space-y-4 animate-fade-in">
        <p className="text-lg leading-relaxed">
          <b className="text-blue-600">La Luna</b> cambia de apariencia porque vemos distinta parte iluminada por el Sol.
        </p>
        <div className="grid grid-cols-2 gap-4 my-4">
          <div className="bg-slate-50 rounded-2xl p-4 text-center hover:bg-slate-100 transition-colors">
            <div className="text-4xl mb-2">🌑</div>
            <p className="text-sm font-semibold">Luna nueva</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 text-center hover:bg-slate-100 transition-colors">
            <div className="text-4xl mb-2">🌓</div>
            <p className="text-sm font-semibold">Cuarto creciente</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 text-center hover:bg-slate-100 transition-colors">
            <div className="text-4xl mb-2">🌕</div>
            <p className="text-sm font-semibold">Luna llena</p>
          </div>
          <div className="bg-slate-50 rounded-2xl p-4 text-center hover:bg-slate-100 transition-colors">
            <div className="text-4xl mb-2">🌗</div>
            <p className="text-sm font-semibold">Cuarto menguante</p>
          </div>
        </div>
        <div className="bg-blue-50 rounded-2xl p-4 border-2 border-blue-200">
          <p className="text-base font-semibold text-blue-900">💡 ¿Sabías que...?</p>
          <p className="text-sm text-blue-800 mt-1">Un ciclo lunar completo tarda aproximadamente 28 días.</p>
        </div>
      </div>
    ),
  },
  {
    trayecto: 1,
    tema: 'Las fases de la Luna',
    emoji: '🌙',
    kind: 'quiz',
    animation: moonPhasesAnimation,
    quiz: {
      prompt: '¿En qué fase la Luna se ve completamente iluminada?',
      options: ['Luna nueva', 'Cuarto creciente', 'Luna llena', 'Cuarto menguante'],
      answerIndex: 2,
      explain: 'La Luna llena aparece totalmente iluminada desde la Tierra porque el Sol la ilumina de frente.',
      funFact: '¡La Luna llena es tan brillante que puede crear sombras en la Tierra!',
    },
  },

  // Trayecto 1 — Caras de la Luna
  {
    trayecto: 1,
    tema: 'Las caras de la Luna',
    emoji: '🌝',
    kind: 'learn',
    animation: moonPhasesAnimation,
    body: (
      <div className="space-y-4 animate-fade-in">
        <p className="text-lg leading-relaxed">
          La Luna <b className="text-blue-600">siempre nos muestra la misma cara</b>. Esto pasa por la{' '}
          <b className="text-purple-600">rotación sincrónica</b>: tarda lo mismo en girar sobre sí misma que en dar la vuelta a la Tierra.
        </p>
        <div className="flex items-center justify-center gap-6 py-4 bg-slate-50 rounded-2xl">
          <div className="text-6xl animate-pulse">🌍</div>
          <div className="text-3xl">↔️</div>
          <div className="text-6xl animate-pulse" style={{ animationDelay: '500ms' }}>🌕</div>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
          <p className="text-base font-semibold text-purple-900">🎯 Dato importante</p>
          <p className="text-sm text-purple-800 mt-1">
            Hay una cara visible (la que vemos) y otra cara oculta que no vemos desde la Tierra.
          </p>
        </div>
      </div>
    ),
  },
  {
    trayecto: 1,
    tema: 'Las caras de la Luna',
    emoji: '🌝',
    kind: 'quiz',
    animation: moonPhasesAnimation,
    quiz: {
      prompt: 'La rotación sincrónica significa que…',
      options: [
        'La Luna gira a distinta velocidad que su vuelta a la Tierra',
        'La Luna tarda lo mismo en rotar que en trasladarse',
        'La Luna no gira sobre su eje',
      ],
      answerIndex: 1,
      explain:
        'Rotación sincrónica significa que el tiempo de rotación (girar sobre su eje) es igual al tiempo de traslación (dar la vuelta a la Tierra).',
      funFact: 'Por eso siempre vemos el mismo "hombre en la Luna" o "conejo en la Luna".',
    },
  },

  // Trayecto 1 — Sistema locomotor
  {
    trayecto: 1,
    tema: 'Sistema locomotor',
    emoji: '🦴',
    kind: 'learn',
    animation: animalAnimation,
    body: (
      <div className="space-y-4 animate-fade-in">
        <p className="text-lg leading-relaxed">
          Para movernos usamos el <b className="text-green-600">sistema locomotor</b>:
        </p>
        <div className="space-y-3">
          <div className="bg-red-50 rounded-2xl p-4 border-l-4 border-red-400">
            <p className="font-bold text-red-900">🦴 Huesos</p>
            <p className="text-sm text-red-800 mt-1">Forman el esqueleto y protegen órganos importantes.</p>
          </div>
          <div className="bg-orange-50 rounded-2xl p-4 border-l-4 border-orange-400">
            <p className="font-bold text-orange-900">💪 Músculos</p>
            <p className="text-sm text-orange-800 mt-1">Jalan los huesos para movernos.</p>
          </div>
          <div className="bg-yellow-50 rounded-2xl p-4 border-l-4 border-yellow-400">
            <p className="font-bold text-yellow-900">🔗 Articulaciones</p>
            <p className="text-sm text-yellow-800 mt-1">Unen huesos y permiten doblar (como el codo o la rodilla).</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    trayecto: 1,
    tema: 'Sistema locomotor',
    emoji: '🦴',
    kind: 'quiz',
    animation: animalAnimation,
    quiz: {
      prompt: '¿Qué parte permite que el codo se doble sin problemas?',
      options: ['Huesos', 'Músculos', 'Articulaciones'],
      answerIndex: 2,
      explain: 'Las articulaciones unen huesos y facilitan el movimiento, como bisagras en nuestro cuerpo.',
      funFact: '¡Tenemos más de 200 huesos y más de 600 músculos en nuestro cuerpo!',
    },
  },

  // Trayecto 1 — Vertebrados/Invertebrados
  {
    trayecto: 1,
    tema: 'Vertebrados e invertebrados',
    emoji: '🐻',
    kind: 'learn',
    animation: animalAnimation,
    body: (
      <div className="space-y-4 animate-fade-in">
        <p className="text-lg leading-relaxed">
          Los <b className="text-green-600">vertebrados</b> tienen <b>columna vertebral</b> (pez, ave, reptil, anfibio, mamífero).
          Los <b className="text-orange-600">invertebrados</b> no la tienen (insectos, gusanos, moluscos...).
        </p>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="rounded-2xl p-5 bg-emerald-50 border-2 border-emerald-300 text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">🐻</div>
            <p className="text-sm font-bold text-emerald-900">Vertebrado</p>
            <p className="text-xs text-emerald-700 mt-1">Con columna</p>
          </div>
          <div className="rounded-2xl p-5 bg-orange-50 border-2 border-orange-300 text-center hover:scale-105 transition-transform">
            <div className="text-5xl mb-3">🦋</div>
            <p className="text-sm font-bold text-orange-900">Invertebrado</p>
            <p className="text-xs text-orange-700 mt-1">Sin columna</p>
          </div>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
          <p className="text-base font-semibold text-green-900">🔬 Para recordar</p>
          <p className="text-sm text-green-800 mt-1">
            Los vertebrados representan solo el 5% de todos los animales. ¡Hay muchos más invertebrados!
          </p>
        </div>
      </div>
    ),
  },
  {
    trayecto: 1,
    tema: 'Vertebrados e invertebrados',
    emoji: '🦋',
    kind: 'quiz',
    animation: animalAnimation,
    quiz: {
      prompt: '¿Una mariposa es…?',
      options: ['Animal vertebrado', 'Animal invertebrado'],
      answerIndex: 1,
      explain: 'Las mariposas son insectos y no tienen columna vertebral, por eso son invertebrados.',
      funFact: '¡Las mariposas pueden ver colores que los humanos no podemos ver!',
    },
  },

  // Trayecto 1 — Solubilidad
  {
    trayecto: 1,
    tema: 'Solubilidad',
    emoji: '🥤',
    kind: 'learn',
    animation: waterDropAnimation,
    body: (
      <div className="space-y-4 animate-fade-in">
        <p className="text-lg leading-relaxed">
          Cuando una sustancia se <b className="text-blue-600">disuelve</b> en un líquido, hay:
        </p>
        <div className="space-y-3">
          <div className="bg-blue-50 rounded-2xl p-4 border-l-4 border-blue-400">
            <p className="font-bold text-blue-900">🧂 Soluto</p>
            <p className="text-sm text-blue-800 mt-1">
              Lo que se disuelve (ejemplo: chocolate en polvo, sal, azúcar).
            </p>
          </div>
          <div className="bg-cyan-50 rounded-2xl p-4 border-l-4 border-cyan-400">
            <p className="font-bold text-cyan-900">💧 Disolvente</p>
            <p className="text-sm text-cyan-800 mt-1">
              El líquido que disuelve (ejemplo: agua, leche, jugo).
            </p>
          </div>
        </div>
        <div className="bg-purple-50 rounded-2xl p-4 border-2 border-purple-200">
          <p className="text-base font-semibold text-purple-900">🧪 Ejemplo práctico</p>
          <p className="text-sm text-purple-800 mt-1">
            Cuando haces chocolate caliente: el chocolate en polvo es el <b>soluto</b> y la leche es el <b>disolvente</b>.
          </p>
        </div>
      </div>
    ),
  },
  {
    trayecto: 1,
    tema: 'Solubilidad',
    emoji: '🥤',
    kind: 'quiz',
    animation: waterDropAnimation,
    quiz: {
      prompt: 'En "agua con sal", la sal es…',
      options: ['Disolvente', 'Soluto'],
      answerIndex: 1,
      explain: 'La sal es el soluto (lo que se disuelve) y el agua es el disolvente (lo que disuelve).',
      funFact: 'El agua es conocida como el "disolvente universal" porque puede disolver muchas sustancias.',
    },
  },

  // Trayecto 1 — Agua y salud
  {
    trayecto: 1,
    tema: 'El agua en la salud',
    emoji: '🚰',
    kind: 'learn',
    animation: waterDropAnimation,
    body: (
      <div className="space-y-4 animate-fade-in">
        <p className="text-lg leading-relaxed">
          Beber agua ayuda a <b className="text-blue-600">transportar nutrientes</b>, <b className="text-green-600">regular la temperatura</b> y{' '}
          <b className="text-purple-600">eliminar desechos</b>.
        </p>
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-5 border-2 border-blue-200">
          <p className="text-xl font-bold text-blue-900 mb-3">💧 Beneficios del agua</p>
          <ul className="space-y-2 text-sm text-blue-800">
            <li className="flex items-start gap-2">
              <span className="text-lg">✓</span>
              <span>Mantiene tu cuerpo hidratado</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg">✓</span>
              <span>Te ayuda a pensar mejor</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-lg">✓</span>
              <span>Mantiene tu piel saludable</span>
            </li>
          </ul>
        </div>
        <div className="bg-green-50 rounded-2xl p-4 border-2 border-green-200">
          <p className="text-base font-semibold text-green-900">⚖️ Derecho humano</p>
          <p className="text-sm text-green-800 mt-1">¡El agua potable es un derecho de todas las personas!</p>
        </div>
      </div>
    ),
  },
  {
    trayecto: 1,
    tema: 'El agua en la salud',
    emoji: '🚰',
    kind: 'quiz',
    animation: waterDropAnimation,
    quiz: {
      prompt: '¿Cuál es una buena acción para cuidar el agua en casa?',
      options: [
        'Dejar la llave abierta al lavarte los dientes',
        'Reparar fugas y cerrar la llave mientras te cepillas',
        'Bañarse por 30 minutos',
      ],
      answerIndex: 1,
      explain: 'Cerrar la llave mientras nos cepillamos y reparar fugas ahorra mucha agua preciosa.',
      funFact: 'Una llave goteando puede desperdiciar más de 20 litros de agua al día. ¡Eso es como 100 vasos de agua!',
    },
  },
]

// ---------- Componente principal ----------
export default function CienciasTrayecto1() {
  const [idx, setIdx] = useState(0)
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState<number | null>(null)
  const [showExplain, setShowExplain] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)

  const screen = SCREENS[idx]
  const totalQuizzes = useMemo(() => SCREENS.filter(s => s.kind === 'quiz').length, [])
  const done = idx >= SCREENS.length

  const quizzesPassed = useMemo(() => {
    return score // 1 punto por acierto
  }, [score])

  const progress = Math.round(((idx) / SCREENS.length) * 100)

  // Save progress
  useEffect(() => {
    if (done && score > 0) {
      const existing = getProgress('trimestre1.ciencias.trayecto1')
      if (score > (existing?.score ?? 0)) {
        saveProgress('trimestre1.ciencias.trayecto1', {
          score,
          stars: Math.floor((score / totalQuizzes) * 3),
          attempts: 1,
          completedAt: Date.now(),
        })
      }
    }
  }, [done, score, totalQuizzes])

  const fireCelebration = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7F6BFF', '#FFB347', '#FF6B9D', '#4ECDC4'],
    })
  }

  const handleOption = (i: number) => {
    if (screen.kind !== 'quiz' || answered !== null) return
    setAnswered(i)
    const correct = i === screen.quiz!.answerIndex
    if (correct) {
      setScore(v => v + 1)
      fireCelebration()
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 2000)
    }
    setShowExplain(true)

    // Save individual exercise progress
    const exerciseId = `ciencias.ex${Math.floor(idx / 2) + 1}`
    if (correct) {
      saveProgress(exerciseId, {
        score: 1,
        stars: 3,
        attempts: 1,
        completedAt: Date.now(),
      })
    }
  }

  const next = () => {
    setAnswered(null)
    setShowExplain(false)
    setIdx(v => Math.min(SCREENS.length, v + 1))
  }

  const restartTrayecto = () => {
    const t = screen.trayecto
    const firstIndex = SCREENS.findIndex(s => s.trayecto === t)
    setIdx(firstIndex)
    setAnswered(null)
    setShowExplain(false)
  }

  if (done) {
    const percentage = Math.round((quizzesPassed / totalQuizzes) * 100)
    const stars = quizzesPassed === totalQuizzes ? 3 : quizzesPassed >= totalQuizzes * 0.7 ? 2 : quizzesPassed >= totalQuizzes * 0.4 ? 1 : 0

    return (
      <div className="max-w-2xl mx-auto min-h-screen bg-gradient-to-b from-white via-blue-50 to-purple-50 text-slate-900 p-4 sm:p-6 flex flex-col justify-center items-center">
        <div className="w-full bg-white rounded-3xl shadow-2xl p-8 text-center space-y-6 border-2 border-purple-200">
          <div className="text-7xl animate-bounce">🎉</div>
          <h1 className="text-3xl sm:text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            ¡Felicitaciones!
          </h1>
          <p className="text-lg text-slate-700">Has completado el Trayecto 1 de Ciencias</p>

          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
            <p className="text-sm font-semibold text-slate-600 mb-2">TU PUNTUACIÓN</p>
            <p className="text-5xl font-extrabold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">
              {quizzesPassed}/{totalQuizzes}
            </p>
            <p className="text-lg text-slate-700 mt-2">{percentage}% Correcto</p>
            <div className="flex justify-center gap-2 mt-4">
              {[...Array(3)].map((_, i) => (
                <span key={i} className={`text-4xl ${i < stars ? 'animate-pulse' : 'opacity-30'}`} style={{ animationDelay: `${i * 200}ms` }}>
                  ⭐
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              className="px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              onClick={() => {
                setIdx(0)
                setScore(0)
                setAnswered(null)
                setShowExplain(false)
              }}
            >
              🔄 Repetir ejercicios
            </button>
            <Link
              to="/trimestre-1/ciencias"
              className="px-6 py-4 rounded-2xl bg-white border-2 border-purple-300 text-purple-700 font-bold text-lg hover:bg-purple-50 transition-all transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Home size={20} />
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto min-h-screen bg-gradient-to-b from-white via-blue-50/30 to-purple-50/30 text-slate-900 flex flex-col pb-safe">
      {/* Encabezado con animación */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur-lg border-b border-slate-200 shadow-sm">
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="text-3xl sm:text-4xl">{screen.emoji}</div>
              <div>
                <div className="text-xs text-slate-500 font-semibold">Trayecto {screen.trayecto}</div>
                <div className="text-xs text-slate-400">Pantalla {idx + 1} de {SCREENS.length}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs font-semibold text-slate-600 mb-1">Progreso</div>
              <div className="w-32 sm:w-44">
                <Progress value={progress} />
              </div>
              <div className="text-xs font-bold text-purple-600 mt-1">{progress}%</div>
            </div>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-800 leading-tight">{screen.tema}</h1>
        </div>
      </header>

      {/* Contenido */}
      <main className="flex-1 p-4 sm:p-6">
        <div className="bg-white rounded-3xl shadow-xl p-5 sm:p-7 border-2 border-slate-100 relative overflow-hidden">
          {/* Animación de celebración */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm z-20 animate-fade-in rounded-3xl">
              <div className="text-center">
                <div className="text-8xl mb-4 animate-bounce">🎉</div>
                <p className="text-3xl font-bold text-green-600">¡Correcto!</p>
              </div>
            </div>
          )}

          {screen.kind === 'learn' && (
            <div className="space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <Badge variant="learn">Aprende</Badge>
                {screen.animation && (
                  <div className="w-24 h-24">
                    <Lottie animationData={screen.animation} loop />
                  </div>
                )}
              </div>
              <div className="prose prose-slate max-w-none">{screen.body}</div>
              <button
                className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                onClick={next}
              >
                <Sparkles size={20} />
                ¡Entendido! → Practicar
              </button>
            </div>
          )}

          {screen.kind === 'quiz' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <Badge variant="quiz">Ejercicio</Badge>
                <div className="flex items-center gap-4">
                  {screen.animation && (
                    <div className="w-20 h-20">
                      <Lottie animationData={screen.animation} loop />
                    </div>
                  )}
                  <div className="text-right">
                    <div className="text-xs text-slate-500 font-semibold">Puntos</div>
                    <div className="text-2xl font-extrabold text-transparent bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text">
                      {score}
                    </div>
                  </div>
                </div>
              </div>

              <p className="text-lg sm:text-xl font-bold mb-4 text-slate-800 leading-tight">{screen.quiz!.prompt}</p>

              <div className="space-y-2">
                {screen.quiz!.options.map((opt, i) => (
                  <Pill
                    key={i}
                    index={i}
                    onClick={() => handleOption(i)}
                    selected={answered === i}
                    disabled={answered !== null}
                    correct={
                      answered !== null
                        ? i === screen.quiz!.answerIndex
                          ? true
                          : i === answered
                            ? false
                            : undefined
                        : undefined
                    }
                  >
                    {opt}
                  </Pill>
                ))}
              </div>

              {showExplain && (
                <div className="mt-5 space-y-3 animate-fade-in">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
                    <p className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                      <span className="text-xl">💡</span>
                      Explicación
                    </p>
                    <p className="text-sm text-blue-800 leading-relaxed">{screen.quiz!.explain}</p>
                  </div>
                  {screen.quiz!.funFact && (
                    <div className="p-5 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
                      <p className="font-bold text-yellow-900 mb-2 flex items-center gap-2">
                        <span className="text-xl">🌟</span>
                        Dato curioso
                      </p>
                      <p className="text-sm text-yellow-800 leading-relaxed">{screen.quiz!.funFact}</p>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  className="rounded-2xl border-2 border-slate-300 bg-white py-3 sm:py-4 font-bold text-slate-700 hover:bg-slate-50 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                  onClick={restartTrayecto}
                >
                  <RotateCcw size={16} />
                  Reiniciar
                </button>
                <button
                  className="rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 sm:py-4 font-bold shadow-lg hover:shadow-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  onClick={next}
                  disabled={answered === null}
                >
                  Siguiente →
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Pie */}
      <footer className="p-4 text-center">
        <p className="text-xs text-slate-500 flex items-center justify-center gap-2">
          <span>Hecho para manos pequeñas: botones grandes y lenguaje claro</span>
          <span className="text-lg">💫</span>
        </p>
      </footer>
    </div>
  )
}
