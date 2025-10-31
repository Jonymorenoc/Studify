import Lottie from 'lottie-react'
import Breadcrumbs from '../../components/Breadcrumbs'
import ExerciseCard from '../../components/ExerciseCard'
import TypeAnswer from '../../components/exercises/TypeAnswer'
import MultipleChoice from '../../components/exercises/MultipleChoice'
import star from '../../assets/lottie/star.json'

export default function LenguajeVisualSonoro() {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: 'Studify Home', to: '/' },
          { label: 'Tercero de primaria', to: '/tercero' },
          { label: 'Examenes Trimestrales - 1er Trimestre', to: '/trimestre-1' },
          { label: 'Examen Lengua', to: '/trimestre-1/lengua' },
          { label: 'Trayecto 1', to: '/trimestre-1/lengua/trayecto-1' },
          { label: 'Lenguaje visual y sonoro' },
        ]}
      />

      <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 shadow-lg ring-1 ring-white/5 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold text-slate-100">Lenguaje visual y sonoro</h3>
          <p className="mt-2 text-sm text-slate-400">
            Los recursos visuales (color, luz, simbolos) y sonoros (ritmo, melodia) enriquecen la narracion y transmiten emociones.
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
          hint="Incluye el nombre del ajolote y una accion que motive."
        />
      </ExerciseCard>

      <ExerciseCard
        title="Observa y responde"
        subtitle="Que elemento visual ayuda a comunicar una idea?"
      >
        <MultipleChoice
          id="trimestre1.lengua.trayecto1.visual.mc2"
          prompt="En una imagen, cual recurso visual transmite emociones mediante luz y color?"
          options={[
            { id: 'a', text: 'La puntuacion de un texto.' },
            {
              id: 'b',
              text: 'La composicion y los detalles visuales.',
              correct: true,
            },
            { id: 'c', text: 'El numero de personajes dibujados.' },
          ]}
        />
      </ExerciseCard>

      <ExerciseCard
        title="Imaginar la escena sonora"
        subtitle="Propone un sonido o instrumento que acompanaria la cancion de La Llorona."
      >
        <TypeAnswer
          id="trimestre1.lengua.trayecto1.visual.txt2"
          prompt="Que sonido, ritmo o instrumento agregarias para reforzar la emocion del texto?"
          correct={/.+/}
          hint="Piensa en instrumentos melancolicos como flauta, violin o arpa."
        />
      </ExerciseCard>
    </div>
  )
}

