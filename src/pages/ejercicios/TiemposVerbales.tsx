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
          { label: 'Exámenes Trimestrales · 1er Trimestre', to: '/trimestre-1' },
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
          groups={['Pretérito (antes)', 'Presente (ahora)', 'Futuro (después)']}
          items={[
            { id: '1', text: 'nací', group: 'Pretérito (antes)' },
            { id: '2', text: 'trabaja', group: 'Presente (ahora)' },
            { id: '3', text: 'viviremos', group: 'Futuro (después)' },
            { id: '4', text: 'canté', group: 'Pretérito (antes)' },
            { id: '5', text: 'juego', group: 'Presente (ahora)' },
            { id: '6', text: 'correrá', group: 'Futuro (después)' },
          ]}
        />
      </ExerciseCard>

      <ExerciseCard
        title="Escribe tus ejemplos"
        subtitle="Propón un verbo para cada tiempo verbal."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <TypeAnswer
            id="trimestre1.lengua.trayecto1.tiempos.txt1"
            prompt="Pretérito"
            correct={/.+/}
            hint="Ejemplo: jugué"
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
            hint="Ejemplo: jugaré"
          />
        </div>
      </ExerciseCard>
    </div>
  )
}
