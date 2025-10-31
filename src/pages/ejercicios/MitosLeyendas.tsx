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
            { id: '1', text: 'El Charro Negro', group: 'Leyenda' },
            { id: '2', text: 'Xochiquetzal', group: 'Mito' },
            { id: '3', text: 'El conejo en la Luna', group: 'Leyenda' },
            { id: '4', text: 'El aguila y la serpiente', group: 'Mito' },
            { id: '5', text: 'La Malinche', group: 'Leyenda' },
            { id: '6', text: 'La Nahuala', group: 'Leyenda' },
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

      <ExerciseCard
        title="El mito del Sol y la Luna"
        subtitle="Lee la historia y responde como se construye el mensaje."
      >
        <MultipleChoice
          id="trimestre1.lengua.trayecto1.mitos.mc2"
          prompt="Segun el mito, cual valor representa Nanahuatzin al lanzarse a la hoguera?"
          options={[
            { id: 'a', text: 'Orgullo y deseo de fama.' },
            { id: 'b', text: 'Humildad y valentia para servir.', correct: true },
            { id: 'c', text: 'Obediencia sin pensar.' },
          ]}
          hint="Recuerda que Nanahuatzin se ofrecio aun cuando era el menos esperado."
        />
      </ExerciseCard>
    </div>
  )
}
