import Breadcrumbs from '../../components/Breadcrumbs'
import ExerciseCard from '../../components/ExerciseCard'
import DragClassify from '../../components/exercises/DragClassify'
import TypeAnswer from '../../components/exercises/TypeAnswer'

export default function TiemposVerbales() {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: 'Studify Home', to: '/' },
          { label: 'Tercero de primaria', to: '/tercero' },
          { label: 'Examenes Trimestrales - 1er Trimestre', to: '/trimestre-1' },
          { label: 'Examen Lengua', to: '/trimestre-1/lengua' },
          { label: 'Trayecto 1', to: '/trimestre-1/lengua/trayecto-1' },
          { label: 'Tiempos verbales' },
        ]}
      />

      <ExerciseCard
        title="Clasifica por tiempo verbal"
        subtitle="Arrastra cada verbo al tiempo correcto."
      >
        <DragClassify
          id="trimestre1.lengua.trayecto1.tiempos.drag1"
          groups={['Preterito (antes)', 'Presente (ahora)', 'Futuro (despues)']}
          items={[
            { id: '1', text: 'naci', group: 'Preterito (antes)' },
            { id: '2', text: 'trabaja', group: 'Presente (ahora)' },
            { id: '3', text: 'viviremos', group: 'Futuro (despues)' },
            { id: '4', text: 'cante', group: 'Preterito (antes)' },
            { id: '5', text: 'juego', group: 'Presente (ahora)' },
            { id: '6', text: 'correre', group: 'Futuro (despues)' },
          ]}
        />
      </ExerciseCard>

      <ExerciseCard
        title="Escribe tus ejemplos"
        subtitle="Propone un verbo para cada tiempo verbal."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <TypeAnswer
            id="trimestre1.lengua.trayecto1.tiempos.txt1"
            prompt="Preterito"
            correct={/.+/}
            hint="Ejemplo: jugue"
          />
          <TypeAnswer
            id="trimestre1.lengua.trayecto1.tiempos.txt2"
            prompt="Presente"
            correct={/.+/}
            hint="Ejemplo: juego"
          />
          <TypeAnswer
            id="trimestre1.lengua.trayecto1.tiempos.txt3"
            prompt="Futuro"
            correct={/.+/}
            hint="Ejemplo: jugare"
          />
        </div>
      </ExerciseCard>
    </div>
  )
}

