import Lottie from 'lottie-react'
import Breadcrumbs from '../components/Breadcrumbs'
import ExerciseCard from '../components/ExerciseCard'
import DragClassify from '../components/exercises/DragClassify'
import MultipleChoice from '../components/exercises/MultipleChoice'
import TypeAnswer from '../components/exercises/TypeAnswer'
import star from '../assets/lottie/star.json'

export default function Trayecto3() {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: 'Studify Home', to: '/' },
          { label: 'Tercero de primaria', to: '/tercero' },
          { label: 'Examenes Trimestrales - 1er Trimestre', to: '/trimestre-1' },
          { label: 'Examen Lengua', to: '/trimestre-1/lengua' },
          { label: 'Trayecto 3' },
        ]}
      />

      <section className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 px-6 py-6 shadow-lg ring-1 ring-white/5 md:flex-row md:items-center md:justify-between">
        <div className="space-y-3">
          <h1 className="text-2xl font-semibold text-slate-100">Cuentos y descripciones</h1>
          <p className="text-sm text-slate-400">
            Aprende a reconocer la estructura del texto narrativo y describe personajes usando adjetivos precisos.
          </p>
          <p className="text-xs text-slate-400">
            Referencia: paginas 150 a 157 del libro. Completa cada reto para sumar estrellas.
          </p>
        </div>
        <Lottie animationData={star} loop style={{ width: 120 }} />
      </section>

      <ExerciseCard
        title="Elementos del texto narrativo"
        subtitle="Arrastra cada elemento a la definicion que le corresponde."
      >
        <p className="text-xs text-muted">Si un termino no pertenece, sueltalo en la zona "No es elemento".</p>
        <DragClassify
          id="trimestre1.lengua.trayecto3.elementos"
          groups={[
            'Quien cuenta la historia',
            'Quienes participan',
            'Lo que sucede',
            'Cuando sucede',
            'Donde sucede',
            'No es elemento',
          ]}
          items={[
            { id: 'narrador', text: 'Narrador', group: 'Quien cuenta la historia' },
            { id: 'personajes', text: 'Personajes', group: 'Quienes participan' },
            { id: 'acciones', text: 'Acciones', group: 'Lo que sucede' },
            { id: 'tiempo', text: 'Tiempo', group: 'Cuando sucede' },
            { id: 'espacios', text: 'Espacios', group: 'Donde sucede' },
            { id: 'final', text: 'Final', group: 'No es elemento' },
          ]}
        />
      </ExerciseCard>

      <ExerciseCard
        title="Reconoce el texto narrativo"
        subtitle="Selecciona el fragmento que cuenta una historia."
      >
        <MultipleChoice
          id="trimestre1.lengua.trayecto3.narrativo"
          prompt="Cual de los fragmentos es un texto narrativo?"
          options={[
            { id: 'a', text: 'La contaminacion del agua afecta a muchas especies acuaticas.' },
            {
              id: 'b',
              text: 'Lucas y su hermana siguieron el arroyo hasta que el agua volvio transparente.',
              correct: true,
            },
            { id: 'c', text: 'El agua es una sustancia formada por dos atomos de hidrogeno y uno de oxigeno.' },
          ]}
          hint="Busca el fragmento con personajes y acciones." 
        />
      </ExerciseCard>

      <ExerciseCard
        title="Completa el contexto"
        subtitle="Arrastra las palabras para completar la idea."
      >
        <p className="text-xs text-muted">La zona "No corresponde" sirve para descartar palabras del banco.</p>
        <DragClassify
          id="trimestre1.lengua.trayecto3.contexto"
          groups={['Hueco 1', 'Hueco 2', 'Hueco 3', 'No corresponde']}
          items={[
            { id: 'tiempo', text: 'tiempo', group: 'Hueco 1' },
            { id: 'espacio', text: 'espacio', group: 'Hueco 2' },
            { id: 'hechos', text: 'hechos', group: 'Hueco 3' },
            { id: 'moraleja', text: 'moraleja', group: 'No corresponde' },
          ]}
        />
        <p className="text-xs text-muted">
          El texto completo dira: El <strong>tiempo</strong> y el <strong>espacio</strong> son esenciales porque establecen el contexto donde se desarrollan los <strong>hechos</strong>.
        </p>
      </ExerciseCard>

      <ExerciseCard
        title="Partes de la historia"
        subtitle="Clasifica cada fragmento en introduccion, nudo o desenlace."
      >
        <DragClassify
          id="trimestre1.lengua.trayecto3.partes"
          groups={['Introduccion', 'Nudo', 'Desenlace']}
          items={[
            { id: 'intro', text: 'Era un dia tranquilo en la casa de los Garcia...', group: 'Introduccion' },
            { id: 'nudo', text: 'Pero todo cambio cuando el gato empujo la pecera y el agua se desbordo.', group: 'Nudo' },
            { id: 'desenlace', text: 'Sin embargo, el pez no se dio por vencido y nado en un nuevo hogar.', group: 'Desenlace' },
          ]}
        />
      </ExerciseCard>

      <ExerciseCard
        title="El narrador es clave"
        subtitle="Explica con tus palabras por que es importante el narrador."
      >
        <TypeAnswer
          id="trimestre1.lengua.trayecto3.narrador"
          prompt="El narrador es importante porque..."
          correct={/(historia|hechos|cuenta)/i}
          hint="Menciona que el narrador cuenta lo que sucede."
        />
      </ExerciseCard>

      <ExerciseCard
        title="Funciones de cada parte"
        subtitle="Une cada nombre con su funcion dentro de la historia."
      >
        <p className="text-xs text-muted">Usa "No corresponde" si una tarjeta no coincide.</p>
        <DragClassify
          id="trimestre1.lengua.trayecto3.estructura"
          groups={['Introduccion', 'Nudo', 'Desenlace', 'No corresponde']}
          items={[
            { id: 'intro-funcion', text: 'Presenta lugar, personajes y problema principal.', group: 'Introduccion' },
            { id: 'nudo-funcion', text: 'Muestra los hechos mas importantes y el conflicto.', group: 'Nudo' },
            { id: 'desenlace-funcion', text: 'Resuelve el conflicto y cierra la historia.', group: 'Desenlace' },
            { id: 'moraleja', text: 'Moraleja', group: 'No corresponde' },
          ]}
        />
      </ExerciseCard>

      <ExerciseCard
        title="Describe al rinoceronte"
        subtitle="Usa palabras del banco para completar tus respuestas."
      >
        <p className="text-sm text-muted">
          Banco: grande, pesado, oscuro, largo, corto, pequenas, feroz, peligroso, dulce, rapido.
        </p>
        <div className="grid gap-4 md:grid-cols-2">
          <TypeAnswer id="trimestre1.lengua.trayecto3.zoo1" prompt="Era..." correct={/(grande|pesado)/i} hint="Usa tamano o peso." />
          <TypeAnswer id="trimestre1.lengua.trayecto3.zoo2" prompt="Su color era..." correct={/oscuro/i} hint="Piensa en tonos grises." />
          <TypeAnswer id="trimestre1.lengua.trayecto3.zoo3" prompt="Tenia un cuerno..." correct={/largo/i} hint="Describe el primer cuerno." />
          <TypeAnswer id="trimestre1.lengua.trayecto3.zoo4" prompt="Y otro cuerno..." correct={/corto/i} hint="El segundo cuerno es mas pequeno." />
          <TypeAnswer id="trimestre1.lengua.trayecto3.zoo5" prompt="Sus orejas eran..." correct={/pequen(as)?/i} hint="Observa su tamano." />
          <TypeAnswer
            id="trimestre1.lengua.trayecto3.zoo6"
            prompt="Si se siente en peligro puede ser..."
            correct={/(feroz.*peligroso|peligroso.*feroz)/i}
            hint="Incluye las palabras feroz y peligroso."
          />
        </div>
      </ExerciseCard>

      <ExerciseCard
        title="Que expresan los adjetivos?"
        subtitle="Selecciona la opcion correcta."
      >
        <MultipleChoice
          id="trimestre1.lengua.trayecto3.adjetivos"
          prompt="Los adjetivos que escribiste sirven para..."
          options={[
            { id: 'a', text: 'Indicar como realizar una accion.' },
            { id: 'b', text: 'Describir como es algo o alguien.', correct: true },
            { id: 'c', text: 'Expresar un sentimiento directamente.' },
          ]}
          hint="Recuerda que modifican al sustantivo."
        />
      </ExerciseCard>

      <ExerciseCard
        title="Reflexion final"
        subtitle="Cuenta por que los adjetivos son importantes al describir un personaje o animal."
      >
        <TypeAnswer
          id="trimestre1.lengua.trayecto3.cierre"
          prompt="Los adjetivos son importantes porque..."
          correct={/(describen|imaginar|detall)/i}
          hint="Menciona que ayudan a imaginar mejor la historia."
        />
      </ExerciseCard>
    </div>
  )
}
