import Breadcrumbs from '../../components/Breadcrumbs'
import ExerciseCard from '../../components/ExerciseCard'
import TypeAnswer from '../../components/exercises/TypeAnswer'
import MultipleChoice from '../../components/exercises/MultipleChoice'
import Lottie from 'lottie-react'
import star from '../../assets/lottie/star.json'

export default function LenguajeVisualSonoro() {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: 'Studify Home', to: '/' },
          { label: 'Tercero de primaria', to: '/tercero' },
          { label: 'Exámenes Trimestrales · 1er Trimestre', to: '/trimestre-1' },
          { label: 'Examen Lengua', to: '/trimestre-1/lengua' },
          { label: 'Trayecto 1', to: '/trimestre-1/lengua/trayecto-1' },
          { label: 'Lenguaje visual y sonoro' },
        ]}
      />

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 shadow-lg ring-1 ring-white/5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-slate-100">Lenguaje visual y sonoro</h3>
          <p className="mt-2 text-sm text-slate-400">
            Los recursos visuales (color, luz, símbolos) y sonoros (ritmo, melodía) enriquecen la narración y transmiten emociones.
          </p>
        </div>
        <Lottie animationData={star} loop style={{ width: 96 }} />
      </div>

      <ExerciseCard
        title="Mensaje para proteger al ajolote"
        subtitle="Escribe un eslogan breve y emotivo."
      >
        <TypeAnswer
          id="trimestre1.lengua.trayecto1.visual.mc1"
          prompt="Redacta un eslogan de 3 a 6 palabras que invite a cuidar al ajolote."
          correct={/ajolote|xoloatl/i}
          hint="Incluye una acción y el nombre del ajolote."
        />
      </ExerciseCard>

      <ExerciseCard
        title="Observa y responde"
        subtitle="¿Qué elemento visual ayuda a comunicar una idea?"
      >
        <MultipleChoice
          id="trimestre1.lengua.trayecto1.visual.mc2"
          prompt="En una imagen, ¿qué recurso visual transmite emociones mediante luz y color?"
          options={[
            { id: 'a', text: 'La puntuación de un texto.' },
            {
              id: 'b',
              text: 'La composición y los detalles visuales.',
              correct: true,
            },
            { id: 'c', text: 'El número de personajes dibujados.' },
          ]}
        />
      </ExerciseCard>
    </div>
  )
}

