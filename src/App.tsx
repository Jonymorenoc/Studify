import { HashRouter, Link, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Grade from './pages/Grade'
import Exams from './pages/Exams'
import LenguaExam from './pages/LenguaExam'
import Trayecto1 from './pages/Trayecto1'
import MitosLeyendas from './pages/ejercicios/MitosLeyendas'
import LenguajeVisualSonoro from './pages/ejercicios/LenguajeVisualSonoro'
import TiemposVerbales from './pages/ejercicios/TiemposVerbales'
import AventuraMitos from './flow/AventuraMitos'
import viteLogo from '/vite.svg'

function App() {
  return (
    <HashRouter>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-30 border-b border-white/50 bg-white/70 backdrop-blur">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-5 py-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-[0_16px_32px_-24px_rgba(127,107,255,0.7)] transition hover:bg-primary/10 hover:text-primary-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <img src={viteLogo} width={26} height={26} aria-hidden />
              Studify
            </Link>
            <nav
              className="hidden items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted md:flex"
              aria-label="Secciones bloqueadas"
            >
              {['Phonology · ENG', 'Matemáticas · SPA', 'Language · ENG', 'Ciencias · SPA', 'Listening/Reading · ENG'].map(item => (
                <span key={item} className="rounded-full bg-white/80 px-3 py-1 text-ink/30">
                  {item}
                </span>
              ))}
            </nav>
          </div>
        </header>
        <main className="flex-1">
          <div className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tercero" element={<Grade />} />
              <Route path="/trimestre-1" element={<Exams />} />
              <Route path="/trimestre-1/lengua" element={<LenguaExam />} />
              <Route path="/trimestre-1/lengua/trayecto-1" element={<Trayecto1 />} />
              <Route path="/trimestre-1/lengua/trayecto-1/mitos-y-leyendas" element={<MitosLeyendas />} />
              <Route path="/trimestre-1/lengua/trayecto-1/lenguaje-visual-y-sonoro" element={<LenguajeVisualSonoro />} />
              <Route path="/trimestre-1/lengua/trayecto-1/tiempos-verbales" element={<TiemposVerbales />} />
              <Route path="/trimestre-1/lengua/trayecto-1/aventura" element={<AventuraMitos />} />
            </Routes>
          </div>
        </main>
        <footer className="border-t border-white/60 bg-white/70 backdrop-blur">
          <div className="mx-auto w-full max-w-5xl px-5 py-4 text-xs font-medium text-muted">
            © 2025 Studify · Progreso guardado localmente
          </div>
        </footer>
      </div>
    </HashRouter>
  )
}

export default App



