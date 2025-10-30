import Breadcrumbs from '../../components/Breadcrumbs'
import ExerciseCard from '../../components/ExerciseCard'
import DragClassify from '../../components/exercises/DragClassify'
import MultipleChoice from '../../components/exercises/MultipleChoice'

export default function MitosLeyendas() {
  return (
    <div className="flex flex-col gap-6">
      <Breadcrumbs
        items={[
          { label: 'Studify Home', to: '/' },
          { label: 'Tercero de primaria', to: '/tercero' },
          { label: 'Examenes Trimestrales - 1er Trimestre', to: '/trimestre-1' },
          { label: 'Examen Lengua', to: '/trimestre-1/lengua' },
          { label: 'Trayecto 1', to: '/trimestre-1/lengua/trayecto-1' },
          { label: 'Manifestaciones artisticas: mitos y leyendas' },
        ]}
      />

      <ExerciseCard
        title="Mito o leyenda?"
        subtitle="Arrastra cada titulo a su columna correspondiente."
      >
        <DragClassify
          id="trimestre1.lengua.trayecto1.mitos.drag1"
          groups={['Mito', 'Leyenda']}
          items={[
            { id: '1', text: 'El conejo en la Luna', group: 'Leyenda' },
            { id: '2', text: 'El Nahual', group: 'Leyenda' },
            { id: '3', text: 'La Llorona', group: 'Leyenda' },
            { id: '4', text: 'La creacion del Sol y la Luna', group: 'Mito' },
            { id: '5', text: 'El origen del maiz', group: 'Mito' },
          ]}
        />
      </ExerciseCard>

      <ExerciseCard
        title="Identifica la afirmacion correcta"
        subtitle="Selecciona la opcion que describe a mitos y leyendas."
      >
        <MultipleChoice
          id="trimestre1.lengua.trayecto1.mitos.mc1"
          prompt="Los mitos y las leyendas..."
          options={[
            { id: 'a', text: 'relatan solo hechos reales sin fantasia.' },
            {
              id: 'b',
              text: 'explican elementos culturales con imaginacion y simbolismo.',
              correct: true,
            },
            { id: 'c', text: 'no transmiten valores de la comunidad.' },
          ]}
        />
      </ExerciseCard>
    </div>
  )
}
