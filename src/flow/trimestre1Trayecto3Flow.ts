export type VibeWidget = Record<string, unknown>

export type VibeScreen = {
  id: string
  type: 'screen'
  widgets: VibeWidget[]
  next?: string
  meta?: Record<string, unknown>
}

export type VibeFlow = {
  id: string
  title: string
  description: string
  durationMinutes: [number, number]
  grade: string
  audience: string
  maxScore: number
  variables: {
    score: number
    answers: Record<string, unknown>
  }
  screens: VibeScreen[]
  scoringGuide: { min: number; max: number; message: string }[]
  qaChecklist: string[]
}

const trayecto3Flow: VibeFlow = {
  id: 'lengua_trimestre1_trayecto3',
  title: 'Trayecto 3 - Cuentos y descripciones',
  description: 'Version digital basada en las paginas 150-157 para practicar narrativa y descripciones con adjetivos.',
  durationMinutes: [30, 40],
  grade: '3 primaria',
  audience: 'Estudiantes de 8 a 9 anos',
  maxScore: 15,
  variables: {
    score: 0,
    answers: {},
  },
  screens: [
    {
      id: 'intro',
      type: 'screen',
      widgets: [
        { type: 'title', value: 'Cuentos y descripciones: aprendamos a narrar!' },
        {
          type: 'text',
          value: 'Hoy descubriras como se cuentan historias y como describir lo que observas usando adjetivos.',
        },
        { type: 'audio', src: 'audio/intro.mp3' },
        { type: 'buttons', options: [{ id: 'start', label: 'Comenzar', to: 'elementos' }] },
      ],
      next: 'elementos',
    },
    {
      id: 'elementos',
      type: 'screen',
      meta: { scoring: 'score' },
      widgets: [
        { type: 'text', value: 'Arrastra cada elemento del texto narrativo a su definicion.' },
        {
          type: 'dragDrop',
          mode: 'match',
          sources: [
            { id: 'narrador', label: 'Narrador', correctTarget: 't-narrador' },
            { id: 'personajes', label: 'Personajes', correctTarget: 't-personajes' },
            { id: 'acciones', label: 'Acciones', correctTarget: 't-acciones' },
            { id: 'tiempo', label: 'Tiempo', correctTarget: 't-tiempo' },
            { id: 'espacios', label: 'Espacios', correctTarget: 't-espacios' },
            { id: 'final', label: 'Final', trap: true },
          ],
          targets: [
            { id: 't-narrador', label: 'Quien cuenta la historia' },
            { id: 't-personajes', label: 'Personas o seres que participan' },
            { id: 't-acciones', label: 'Hechos que suceden' },
            { id: 't-tiempo', label: 'Momento en que ocurre' },
            { id: 't-espacios', label: 'Lugar donde ocurre' },
          ],
          scoring: { all: 1 },
          feedback: {
            all: 'Muy bien! Estos son los elementos basicos del texto narrativo.',
            wrong: 'Revisa de nuevo, el final forma parte de la estructura, no es elemento basico.',
          },
        },
        { type: 'next', to: 'texto-narrativo' },
      ],
      next: 'texto-narrativo',
    },
    {
      id: 'texto-narrativo',
      type: 'screen',
      meta: { scoring: 'score' },
      widgets: [
        { type: 'text', value: 'Lee los fragmentos y marca cual es narrativo.' },
        {
          type: 'singleChoice',
          options: [
            { id: 'informativo', label: 'La contaminacion del agua afecta a muchas especies.', trap: true },
            { id: 'narrativo', label: 'Lucas y su hermana siguieron el arroyo hasta que volvio a brillar.', correct: true },
            { id: 'cientifico', label: 'El agua es una sustancia formada por hidrogeno y oxigeno.', trap: true },
          ],
          feedback: {
            correct: 'Correcto, narra una historia con personajes y acciones.',
            wrong: 'Ese texto informa o explica, no cuenta una historia.',
          },
          scoring: { correct: 1 },
          saveTo: 'answers.textoNarrativo',
        },
        { type: 'next', to: 'completa-contexto' },
      ],
      next: 'completa-contexto',
    },
    {
      id: 'completa-contexto',
      type: 'screen',
      meta: { scoring: 'score' },
      widgets: [
        { type: 'text', value: 'Arrastra las palabras para completar el parrafo.' },
        {
          type: 'dragDrop',
          mode: 'fillBlanks',
          text: 'El __1__ y el __2__ en los textos narrativos son esenciales porque establecen el contexto donde se desarrollan los __3__.',
          blanks: ['tiempo', 'espacio', 'hechos'],
          bank: [
            { label: 'tiempo', id: 'tiempo' },
            { label: 'espacio', id: 'espacio' },
            { label: 'hechos', id: 'hechos' },
            { label: 'moraleja', id: 'moraleja', trap: true },
          ],
          scoring: { all: 2 },
          feedback: {
            all: 'Excelente, tiempo y espacio crean el escenario donde ocurren los hechos.',
            wrong: 'Pista: piensa en donde y cuando sucede la historia.',
          },
        },
        { type: 'next', to: 'clasifica-partes' },
      ],
      next: 'clasifica-partes',
    },
    {
      id: 'clasifica-partes',
      type: 'screen',
      meta: { scoring: 'score' },
      widgets: [
        { type: 'text', value: 'Indica si el fragmento pertenece a la introduccion (I), nudo (N) o desenlace (D).' },
        {
          type: 'multiChoice',
          questions: [
            { label: 'Era un dia tranquilo en la casa de los Garcia...', options: ['I', 'N', 'D'], answer: 'I' },
            { label: 'Pero todo cambio cuando el gato empujo la pecera...', options: ['I', 'N', 'D'], answer: 'N' },
            { label: 'Sin embargo, el pez encontro un nuevo hogar...', options: ['I', 'N', 'D'], answer: 'D' },
          ],
          onCorrect: { score: 2, feedback: 'Excelente! Identificaste las partes de la historia.' },
          onWrong: { feedback: 'Recuerda: el nudo muestra el conflicto principal.' },
        },
        { type: 'next', to: 'narrador' },
      ],
      next: 'narrador',
    },
    {
      id: 'narrador',
      type: 'screen',
      meta: { scoring: 'score' },
      widgets: [
        { type: 'text', value: 'Explica con tus palabras por que es importante el narrador.' },
        {
          type: 'shortText',
          id: 'narrador-text',
          maxLength: 80,
          keywords: ['historia', 'hechos', 'cuenta'],
          bonusScore: 1,
          saveTo: 'answers.narrador',
        },
        { type: 'next', to: 'estructura' },
      ],
      next: 'estructura',
    },
    {
      id: 'estructura',
      type: 'screen',
      meta: { scoring: 'score' },
      widgets: [
        { type: 'text', value: 'Arrastra cada parte de la historia a su funcion.' },
        {
          type: 'dragDrop',
          mode: 'match',
          sources: [
            { id: 'intro', label: 'Introduccion', correctTarget: 't-intro' },
            { id: 'nudo', label: 'Nudo', correctTarget: 't-nudo' },
            { id: 'desenlace', label: 'Desenlace', correctTarget: 't-desenlace' },
            { id: 'moraleja', label: 'Moraleja', trap: true },
          ],
          targets: [
            { id: 't-intro', label: 'Presenta lugar, personajes y problema principal.' },
            { id: 't-nudo', label: 'Muestra los hechos mas importantes y el conflicto.' },
            { id: 't-desenlace', label: 'Resuelve el conflicto y termina la historia.' },
          ],
          scoring: { all: 2 },
          feedback: {
            all: 'Muy bien! Conoces las funciones de cada parte.',
            wrong: 'Recuerda que la moraleja es opcional.',
          },
        },
        { type: 'next', to: 'zoologico' },
      ],
      next: 'zoologico',
    },
    {
      id: 'zoologico',
      type: 'screen',
      meta: { scoring: 'score' },
      widgets: [
        { type: 'text', value: 'Completa la descripcion usando palabras del banco.' },
        { type: 'audio', src: 'audio/zoo.mp3' },
        {
          type: 'fillBlank',
          text: 'El animal que mas me impresiono era __1__, __2__ y de color gris __3__. Tenia dos cuernos: uno __4__ y otro __5__, y sus orejas eran __6__. El guia nos dijo que si este animal se siente en peligro puede ser __7__ y __8__.',
          blanks: ['grande', 'pesado', 'oscuro', 'largo', 'corto', 'pequenas', 'feroz', 'peligroso'],
          bank: [
            'grande',
            'pesado',
            'oscuro',
            'largo',
            'corto',
            'pequenas',
            'feroz',
            'peligroso',
            'dulce',
            'rapido',
          ],
          scoring: { all: 3, almost: 2, partial: 1 },
          feedback: {
            all: 'Excelente descripcion del rinoceronte!',
            partial: 'Vas bien. Ajusta las palabras que hablan de tamano y fuerza.',
          },
        },
        { type: 'next', to: 'adjetivos' },
      ],
      next: 'adjetivos',
    },
    {
      id: 'adjetivos',
      type: 'screen',
      meta: { scoring: 'score' },
      widgets: [
        { type: 'text', value: 'Marca lo que expresan los adjetivos que escribiste.' },
        {
          type: 'singleChoice',
          options: [
            { id: 'accion', label: 'Indican como realizar una accion', trap: true },
            { id: 'descripcion', label: 'Describen como es algo o alguien', correct: true },
            { id: 'sentimientos', label: 'Describen sentimientos', trap: true },
          ],
          scoring: { correct: 1 },
          feedback: {
            correct: 'Correcto, los adjetivos calificativos describen al sustantivo.',
            wrong: 'Recuerda que no explican como se hace algo, sino como es.',
          },
        },
        { type: 'next', to: 'cierre' },
      ],
      next: 'cierre',
    },
    {
      id: 'cierre',
      type: 'screen',
      widgets: [
        {
          type: 'shortText',
          id: 'cierre-text',
          maxLength: 100,
          prompt: 'Por que son importantes los adjetivos al describir?',
          saveTo: 'answers.cierre',
        },
        { type: 'audio', src: 'audio/final.mp3' },
        {
          type: 'score',
          format: 'score/max',
          label: 'Puntaje final',
        },
        {
          type: 'feedback',
          ranges: [
            { min: 0, max: 5, message: 'Sigue practicando, tus historias necesitan mas detalles.' },
            { min: 6, max: 10, message: 'Bien! Ya entiendes como se cuentan las historias.' },
            { min: 11, max: 15, message: 'Excelente narrador! Sabes describir y contar como un autor.' },
          ],
        },
        {
          type: 'buttons',
          options: [
            { id: 'retry', label: 'Reintentar', to: 'elementos', reset: true },
            { id: 'finish', label: 'Finalizar' },
          ],
        },
      ],
    },
  ],
  scoringGuide: [
    { min: 0, max: 5, message: 'Sigue practicando, tus historias necesitan mas detalles.' },
    { min: 6, max: 10, message: 'Bien! Ya entiendes como se cuentan las historias.' },
    { min: 11, max: 15, message: 'Excelente narrador! Sabes describir y contar como un autor.' },
  ],
  qaChecklist: [
    'Flujo completo sin bucles.',
    'Feedback visible y coherente.',
    'La puntuacion se guarda correctamente en score.',
    'Campos de texto almacenan respuestas en answers.',
  ],
}

export default trayecto3Flow

