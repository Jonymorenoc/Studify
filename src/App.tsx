import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { Sparkles } from 'lucide-react'
import ErrorBoundary from './components/ErrorBoundary'
const Home = lazy(()=>import('./pages/Home'))
const Grade = lazy(()=>import('./pages/Grade'))
const Exams = lazy(()=>import('./pages/Exams'))
const LenguaExam = lazy(()=>import('./pages/LenguaExam'))
const CienciasExam = lazy(()=>import('./pages/CienciasExam'))
const Trayecto1 = lazy(()=>import('./pages/Trayecto1'))
const Trayecto2 = lazy(()=>import('./pages/Trayecto2'))
const Trayecto3 = lazy(()=>import('./pages/Trayecto3'))
const CienciasTrayecto1 = lazy(()=>import('./pages/CienciasTrayecto1'))
const KidsCiencias = lazy(()=>import('./pages/KidsCiencias'))
const MitosLeyendas = lazy(()=>import('./pages/ejercicios/MitosLeyendas'))
const LenguajeVisualSonoro = lazy(()=>import('./pages/ejercicios/LenguajeVisualSonoro'))
const TiemposVerbales = lazy(()=>import('./pages/ejercicios/TiemposVerbales'))
const AventuraMitos = lazy(()=>import('./flow/AventuraMitos'))
import viteLogo from '/vite.svg'

const lockedSections = [
  'Phonology · ENG',
  'Matemáticas · SPA',
  'Language · ENG',
  'Listening/Reading · ENG',
]

function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 border-b border-white/50 bg-white/80 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[0_16px_36px_-24px_rgba(127,107,255,0.7)] transition hover:-translate-y-0.5 hover:bg-primary/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <img src={viteLogo} width={26} height={26} aria-hidden />
              Studify
              <Sparkles size={16} aria-hidden className="text-secondary" />
            </Link>
            <nav
              className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted md:flex"
              aria-label="Secciones bloqueadas"
            >
              {lockedSections.map(item => (
                <span key={item} className="rounded-full bg-white/80 px-3 py-1 text-ink/30">
                  {item}
                </span>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <ErrorBoundary>
            <Suspense fallback={<div style={{padding:24}}>Cargando…</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/tercero" element={<Grade />} />
                <Route path="/trimestre-1" element={<Exams />} />
                <Route path="/trimestre-1/lengua" element={<LenguaExam />} />
                <Route path="/trimestre-1/ciencias" element={<CienciasExam />} />
                <Route path="/trimestre-1/lengua/trayecto-1" element={<Trayecto1 />} />
                <Route path="/trimestre-1/lengua/trayecto-2" element={<Trayecto2 />} />
                <Route path="/trimestre-1/lengua/trayecto-3" element={<Trayecto3 />} />
                <Route path="/trimestre-1/ciencias/trayecto-1" element={<CienciasTrayecto1 />} />
                <Route path="/kids-ciencias" element={<KidsCiencias />} />
                <Route path="/trimestre-1/lengua/trayecto-1/mitos-y-leyendas" element={<MitosLeyendas />} />
                <Route path="/trimestre-1/lengua/trayecto-1/lenguaje-visual-y-sonoro" element={<LenguajeVisualSonoro />} />
                <Route path="/trimestre-1/lengua/trayecto-1/tiempos-verbales" element={<TiemposVerbales />} />
                <Route path="/trimestre-1/lengua/trayecto-1/aventura" element={<AventuraMitos />} />
              </Routes>
            </Suspense>
            </ErrorBoundary>
          </div>
        </main>
        <footer className="border-t border-white/60 bg-white/80 backdrop-blur">
          <div className="mx-auto w-full max-w-5xl px-5 py-4 text-xs font-medium text-muted">
            © 2025 Studify · Progreso guardado localmente
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

export default App
