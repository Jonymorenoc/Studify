export type VibeWidgetConfig = Record<string, unknown>

export type VibeScreenConfig = {
  id: string
  type: 'screen'
  widgets: VibeWidgetConfig[]
  next?: string
  meta?: Record<string, unknown>
}

export type VibeFlowBlueprint = {
  id: string
  title: string
  description: string
  durationMinutes: [number, number]
  grade: string
  audience: string
  maxScore: number
  variables: {
    score: number
    attempts: Record<string, number>
    answers: Record<string, unknown>
  }
  screens: VibeScreenConfig[]
  scoringGuide: { min: number; max: number; message: string }[]
  qaChecklist: string[]
}

const trayecto1Estacion2Flow: VibeFlowBlueprint = {
  id: 'lengua_trimestre1_estacion2',
  title: 'Anuncios publicitarios y etiquetas',
  description:
    'Modulo interactivo del trimestre 1 de lengua enfocado en anuncios publicitarios y lectura de etiquetas. Se alinea al temario de las paginas 115 a 121.',
  durationMinutes: [25, 35],
  grade: '3 primaria',
  audience: 'Ninas y ninos de 7 a 9 anos',
  maxScore: 12,
  variables: {
    score: 0,
    attempts: {},
    answers: {},
  },
  screens: [
    {
      id: 'intro',
      type: 'screen',
      meta: { theme: 'activation' },
      widgets: [
        {
          type: 'title',
          value: 'Productos, anuncios y etiquetas: que tan confiables son?',
        },
        {
          type: 'text',
          value: 'Sabias que muchos productos llegan a ti acompanados de anuncios y etiquetas? Vamos a descubrir para que sirven.',
        },
        {
          type: 'audio',
          src: 'audio/intro.mp3',
          transcript: 'Bienvenida al recorrido sobre anuncios publicitarios y etiquetas. Escucha y luego pulsa comenzar.',
        },
        {
          type: 'buttons',
          id: 'intro-start',
          options: [{ id: 'go', label: 'Comenzar', to: 'productos' }],
        },
      ],
      next: 'productos',
    },
    {
      id: 'productos',
      type: 'screen',
      meta: { theme: 'activacion', store: 'answers.productos' },
      widgets: [
        {
          type: 'text',
          value: 'Toca los productos que has comprado o consumido.',
        },
        {
          type: 'buttons',
          id: 'productos-check',
          multi: true,
          options: [
            { id: 'bebida', label: 'Bebida', image: 'img/115_productos_1.png' },
            { id: 'muffins', label: 'Muffins', image: 'img/115_productos_2.png' },
            { id: 'nuggets', label: 'Nuggets', image: 'img/115_productos_3.png' },
            { id: 'queso', label: 'Queso rebanado', image: 'img/115_productos_4.png' },
            { id: 'sandwich', label: 'Sandwich', image: 'img/115_productos_5.png' },
            { id: 'salchichas', label: 'Salchichas super magicas', trap: true },
          ],
          saveTo: 'answers.productos',
          analyticsId: 'productos',
        },
        { type: 'next', to: 'razon-producto' },
      ],
      next: 'razon-producto',
    },
    {
      id: 'razon-producto',
      type: 'screen',
      widgets: [
        {
          type: 'text',
          value: 'Que te llamo la atencion de esos productos? Escribe tu respuesta en un maximo de 120 caracteres.',
        },
        {
          type: 'shortText',
          id: 'razon',
          maxLength: 120,
          saveTo: 'answers.razon',
          placeholder: 'Colores, sabores, anuncios, regalos...',
        },
        { type: 'next', to: 'crea-eslogan' },
      ],
      next: 'crea-eslogan',
    },
    {
      id: 'crea-eslogan',
      type: 'screen',
      widgets: [
        {
          type: 'text',
          value: 'Imagina que vendes uno de los productos. Escribe un eslogan corto y llamativo entre 12 y 60 caracteres.',
        },
        {
          type: 'audio',
          src: 'audio/pistas.mp3',
          transcript: 'Un eslogan resume la idea principal en pocas palabras. Usa verbos y adjetivos que enganchen.',
        },
        {
          type: 'shortText',
          id: 'eslogan',
          minLength: 12,
          maxLength: 60,
          saveTo: 'answers.eslogan',
        },
        { type: 'next', to: 'identifica-anuncio' },
      ],
      next: 'identifica-anuncio',
    },
    {
      id: 'identifica-anuncio',
      type: 'screen',
      meta: { scoring: 'score', attemptsKey: 'identifica-anuncio' },
      widgets: [
        {
          type: 'text',
          value: 'Elige cual SI es un anuncio publicitario.',
        },
        {
          type: 'singleChoice',
          id: 'identifica-anuncio-q',
          shuffle: true,
          options: [
            { id: 'a', label: 'Instrucciones para armar un avion de papel', trap: true },
            { id: 'b', label: 'Recomendaciones ante un sismo', trap: true },
            { id: 'c', label: 'Jugos de la Finca', correct: true, image: 'img/jugos_finca.png' },
            { id: 'd', label: 'Tabla de nutrimentos', trap: true },
          ],
          feedback: {
            correct: '+1 punto. Los anuncios buscan persuadir para vender o convencer.',
            wrong: 'No del todo. Los anuncios promocionan productos o servicios.',
          },
          scoring: { correct: 1 },
          saveTo: 'answers.identificaAnuncio',
        },
        { type: 'next', to: 'completa-frase' },
      ],
      next: 'completa-frase',
    },
    {
      id: 'completa-frase',
      type: 'screen',
      meta: { scoring: 'score', attemptsKey: 'completa-frase', shuffle: true },
      widgets: [
        {
          type: 'text',
          value: 'Completa la definicion arrastrando las palabras correctas.',
        },
        {
          type: 'dragDrop',
          mode: 'fillBlanks',
          id: 'completa-frase-dd',
          text: 'Un anuncio publicitario es un __1__ que las empresas utilizan para __2__ y promocionar productos o __3__.',
          blanks: ['mensaje', 'vender', 'servicios'],
          bank: [
            { id: 'mensaje', label: 'mensaje', correct: true },
            { id: 'vender', label: 'vender', correct: true },
            { id: 'servicios', label: 'servicios', correct: true },
            { id: 'informar', label: 'informar', trap: true },
          ],
          scoring: { all: 2, partial: 1 },
          feedback: {
            all: '+2 puntos. Dominaste la idea central.',
            partial: 'Casi. Revisa el objetivo principal del anuncio.',
            wrong: 'Pista: piensa en la meta de convencer.',
          },
          maxAttempts: 2,
          saveTo: 'answers.completaFrase',
        },
        { type: 'next', to: 'analiza-anuncio' },
      ],
      next: 'analiza-anuncio',
    },
    {
      id: 'analiza-anuncio',
      type: 'screen',
      meta: { scoring: 'score', attemptsKey: 'analiza-anuncio' },
      widgets: [
        {
          type: 'image',
          src: 'img/anuncio_peso.png',
          alt: 'Anuncio que dice: Pierde peso ya, sin dietas, sin ejercicio',
        },
        {
          type: 'singleChoice',
          id: 'analiza-anuncio-q',
          prompt: 'Como parece este anuncio?',
          options: [
            { id: 'a', label: 'Honesto y benefico', trap: true },
            { id: 'b', label: 'Confiable y saludable', trap: true },
            { id: 'c', label: 'Exagerado y poco creible', correct: true },
            { id: 'd', label: 'Claro y original', trap: true },
          ],
          feedback: {
            correct: 'Bien visto: usa promesas absolutas dificiles de comprobar.',
            wrong: 'Fijate en promesas imposibles como sin dieta y sin ejercicio.',
          },
          scoring: { correct: 1 },
          saveTo: 'answers.analizaAnuncio.seleccion',
        },
        {
          type: 'shortText',
          id: 'analiza-anuncio-just',
          optional: true,
          placeholder: 'Por que lo consideras exagerado?',
          keywords: ['promesa imposible', 'exagerado', 'sin evidencia', 'sin prueba'],
          bonusScore: 0.5,
          saveTo: 'answers.analizaAnuncio.justificacion',
        },
        { type: 'next', to: 'match-eslogans' },
      ],
      next: 'match-eslogans',
    },
    {
      id: 'match-eslogans',
      type: 'screen',
      meta: { scoring: 'score', attemptsKey: 'match-eslogans' },
      widgets: [
        {
          type: 'text',
          value: 'Arrastra cada eslogan al producto correcto.',
        },
        {
          type: 'dragDrop',
          mode: 'match',
          id: 'match-eslogans-dd',
          sources: [
            { id: 'a', label: 'Sabor que derrite corazones', correctTarget: 'choco' },
            { id: 'b', label: 'Carga tus suenos, no solo tus libros', correctTarget: 'mochila' },
            { id: 'c', label: 'Energia limpia, futuro brillante', correctTarget: 'solar' },
            { id: 'd', label: 'Todo al alcance de tu mano', correctTarget: 'cel' },
          ],
          targets: [
            { id: 'choco', label: 'Chocolate' },
            { id: 'mochila', label: 'Mochila' },
            { id: 'solar', label: 'Panel solar' },
            { id: 'cel', label: 'Celular' },
          ],
          scoring: { all: 2, three: 1 },
          shuffle: true,
          maxAttempts: 2,
          saveTo: 'answers.matchEslogans',
        },
        { type: 'next', to: 'logotipo' },
      ],
      next: 'logotipo',
    },
    {
      id: 'logotipo',
      type: 'screen',
      widgets: [
        {
          type: 'text',
          value: 'Elige un logotipo que te guste y explica por que te parece atractivo.',
        },
        {
          type: 'imageChoice',
          id: 'logotipo-choice',
          options: [
            { id: 'logo-a', image: 'img/logotipo_a.png', label: 'Logo A' },
            { id: 'logo-b', image: 'img/logotipo_b.png', label: 'Logo B' },
            { id: 'logo-c', image: 'img/logotipo_c.png', label: 'Logo C' },
            { id: 'logo-d', image: 'img/logotipo_d.png', label: 'Logo D' },
          ],
          saveTo: 'answers.logotipo.elegido',
        },
        {
          type: 'shortText',
          id: 'logotipo-text',
          maxLength: 100,
          placeholder: 'Colores, forma, claridad...',
          saveTo: 'answers.logotipo.razon',
        },
        { type: 'next', to: 'procesados' },
      ],
      next: 'procesados',
    },
    {
      id: 'procesados',
      type: 'screen',
      meta: { scoring: 'score', attemptsKey: 'procesados' },
      widgets: [
        {
          type: 'text',
          value: 'Arrastra la palabra correcta a cada definicion.',
        },
        {
          type: 'dragDrop',
          mode: 'match',
          id: 'procesados-dd',
          sources: [
            { id: 'procesados', label: 'procesados', correctTarget: 'def-procesados' },
            { id: 'no-procesados', label: 'no procesados', correctTarget: 'def-noprocesados' },
            { id: 'semi', label: 'semi-procesados', trap: true },
          ],
          targets: [
            {
              id: 'def-procesados',
              label: 'Los alimentos ________ son modificados de su estado natural mediante metodos fisicos, quimicos o biologicos.',
            },
            { id: 'def-noprocesados', label: 'Los alimentos ________ se consumen en su estado natural sin alteraciones.' },
          ],
          scoring: { all: 1 },
          maxAttempts: 2,
          saveTo: 'answers.procesados',
        },
        { type: 'next', to: 'funciones-etiquetas' },
      ],
      next: 'funciones-etiquetas',
    },
    {
      id: 'funciones-etiquetas',
      type: 'screen',
      meta: { scoring: 'score', attemptsKey: 'funciones-etiquetas' },
      widgets: [
        {
          type: 'text',
          value: 'Marca las funciones correctas de las etiquetas.',
        },
        {
          type: 'multiChoice',
          id: 'funciones-etiquetas-q',
          shuffle: true,
          options: [
            { id: 'nutrimentos', label: 'Informan sobre los nutrimentos.', correct: true },
            { id: 'comparar', label: 'Permiten comparar el contenido nutricional.', correct: true },
            { id: 'advertir', label: 'Advierten sobre ingredientes que pueden ser daninos.', correct: true },
            { id: 'precio', label: 'Solo muestran el precio.', trap: true },
            { id: 'solo-procesados', label: 'Solo estan presentes en alimentos procesados.', trap: true },
          ],
          scoring: { perfect: 2, partial: 1 },
          feedback: {
            perfect: 'Perfecto. Identificaste las tres funciones clave.',
            partial: 'Bien. Revisa si marcaste alguna opcion incorrecta.',
            wrong: 'Vuelve a revisar para que sirven las etiquetas.',
          },
          maxAttempts: 2,
          saveTo: 'answers.funcionesEtiquetas',
        },
        { type: 'next', to: 'partes-etiqueta' },
      ],
      next: 'partes-etiqueta',
    },
    {
      id: 'partes-etiqueta',
      type: 'screen',
      meta: { scoring: 'score', attemptsKey: 'partes-etiqueta' },
      widgets: [
        {
          type: 'image',
          src: 'img/etiqueta_gelarte.png',
          alt: 'Etiqueta del producto Gelatina GelArte',
        },
        {
          type: 'dragDrop',
          mode: 'match',
          id: 'partes-etiqueta-dd',
          sources: [
            { id: 'nombre', label: 'Gelatina GelArte', correctTarget: 't-nombre' },
            { id: 'contenido', label: 'Informacion nutrimental', correctTarget: 't-contenido' },
            { id: 'porcion', label: 'Cantidad por porcion: 8 g', correctTarget: 't-porcion' },
            { id: 'origen', label: 'Hecho en Mexico', correctTarget: 't-origen' },
            { id: 'cad', label: 'Julio de 2029', correctTarget: 't-cad' },
            { id: 'porciones', label: 'Total: 15 porciones', correctTarget: 't-porciones' },
            { id: 'calorias', label: 'Calorias 30', trap: true },
          ],
          targets: [
            { id: 't-nombre', label: 'Nombre del producto' },
            { id: 't-contenido', label: 'Contenido nutricional' },
            { id: 't-porcion', label: 'Cantidad por porcion' },
            { id: 't-origen', label: 'Pais de origen' },
            { id: 't-cad', label: 'Caducidad' },
            { id: 't-porciones', label: 'Porciones' },
          ],
          scoring: { all: 2, partial: 1 },
          maxAttempts: 2,
          saveTo: 'answers.partesEtiqueta',
        },
        { type: 'next', to: 'influencia-etiquetado' },
      ],
      next: 'influencia-etiquetado',
    },
    {
      id: 'influencia-etiquetado',
      type: 'screen',
      meta: { scoring: 'score', attemptsKey: 'influencia-etiquetado' },
      widgets: [
        {
          type: 'text',
          value: 'Como influye mas el etiquetado en tu decision de compra?',
        },
        {
          type: 'singleChoice',
          id: 'influencia-q',
          options: [
            {
              id: 'colores',
              label: 'Los colores del empaque indican que el producto es saludable.',
              trap: true,
              feedback:
                'Ojo: los colores pueden influir en la percepcion, pero no garantizan que sea saludable. Revisa datos reales.',
            },
            {
              id: 'nutrientes',
              label: 'Me ayuda a elegir alimentos con mejor contenido de nutrimentos.',
              correct: true,
              feedback: 'Excelente. Usar la informacion nutrimental es la mejor guia.',
            },
            {
              id: 'sellos',
              label: 'Si dice bajo en grasa pienso que no sera sabroso.',
              trap: true,
              feedback: 'Cuidado: un sello no define el sabor ni el valor real del producto.',
            },
          ],
          scoring: { correct: 1 },
          saveTo: 'answers.influencia',
        },
        { type: 'next', to: 'cierre' },
      ],
      next: 'cierre',
    },
    {
      id: 'cierre',
      type: 'screen',
      meta: { summary: true },
      widgets: [
        {
          type: 'score',
          id: 'score-final',
          label: 'Puntaje final',
          format: 'score/max',
        },
        {
          type: 'feedback',
          id: 'feedback-final',
          ranges: [
            { min: 0, max: 5, message: 'Sigue practicando. Vuelve a revisar las pistas.' },
            { min: 6, max: 9, message: 'Bien. Vas por buen camino.' },
            { min: 10, max: 12, message: 'Excelente. Eres un lector critico de anuncios.' },
          ],
        },
        {
          type: 'text',
          value: 'Buen trabajo. Ahora sabes analizar anuncios y leer etiquetas.',
        },
        {
          type: 'buttons',
          id: 'cierre-actions',
          options: [
            { id: 'download', label: 'Descargar evidencia', action: 'export', format: 'pdf' },
            { id: 'retry', label: 'Reintentar', to: 'identifica-anuncio', reset: true },
          ],
        },
      ],
    },
  ],
  scoringGuide: [
    { min: 0, max: 5, message: 'Sigue practicando. Vuelve a revisar las pistas.' },
    { min: 6, max: 9, message: 'Bien. Vas por buen camino.' },
    { min: 10, max: 12, message: 'Excelente. Eres un lector critico de anuncios.' },
  ],
  qaChecklist: [
    'Verificar que todos los botones de siguiente avanzan a la pantalla correcta.',
    'Revisar que las zonas de arrastre solo acepten etiquetas validas.',
    'Confirmar que el score se actualiza y el PDF exporta nombre, fecha y puntaje.',
    'Asegurar que los distractores marcados como trap no suman puntos y muestran feedback.',
  ],
}

export default trayecto1Estacion2Flow

