export type BaseStep = {
  id: string
  title: string
  category: string
  starValue?: number
}

export type ReadingStep = BaseStep & {
  type: 'reading'
  content: string
  actionLabel?: string
}

export type ChoiceOption = {
  id: string
  text: string
  correct: boolean
  helper?: string
}

export type MultipleChoiceStep = BaseStep & {
  type: 'multiple-choice'
  prompt: string
  options: ChoiceOption[]
  hint?: string
  note?: string
  readingId?: string
}

export type AdventureStep = ReadingStep | MultipleChoiceStep

export const adventureSteps: AdventureStep[] = [
  {
    id: 'lectura-llorona',
    type: 'reading',
    title: 'La Llorona en Xochimilco',
    category: 'Lectura guiada',
    content: `La puesta en escena "La Llorona en Xochimilco" cumple treinta años de presentar la leyenda de la Llorona, o "Chokani", en nahuatl, y abrira la temporada de celebraciones por el Dia de Muertos en la Ciudad de México. Este año la produccion consta de 36 funciones que conjugan música original, danza prehispánica, luces y teatro al aire libre, en un escenario que permite a las personas espectadoras disfrutar desde las trajineras un espectáculo nocturno.\n\nLa Llorona es una de las leyendas con mayor arraigo en la cultura mexicana. En esta ocasíón se decidio incluir en el título la palabra "Chokani" -del nahuatl, "la que llora"- y, según la secretaria de Turismo de la capital, Nathalie Desplas, el objetivo del evento es difundir la cultura y la tradición de Xochimilco, cuyos canales hacen de la obra un espectáculo único en el mundo.\n\nConsultado en: El País, bit.ly/3uwnNcT (21 de febrero de 2025).`,
    actionLabel: 'Ya he terminado de leer',
  },
  {
    id: 'llorona-tema',
    type: 'multiple-choice',
    title: 'Idea principal',
    category: 'Comprension lectora',
    prompt: '¿De qué trata principalmente el texto?',
    readingId: 'lectura-llorona',
    options: [
      { id: 'a', text: 'Una puesta en escena que celebra la leyenda de la Llorona en Xochimilco.', correct: true },
      { id: 'b', text: 'La historia de como se construyeron los canales de la ciudad.', correct: false },
      { id: 'c', text: 'Un informe sobre la venta de flores de cempasuchil.', correct: false },
      { id: 'd', text: 'Un manual para manejar trajineras durante la noche.', correct: false },
    ],
  },
  {
    id: 'llorona-experiencia',
    type: 'multiple-choice',
    title: 'Experiencia del publico',
    category: 'Comprension lectora',
    prompt: '¿Qué vuelve única la experiencia del público según el texto?',
    readingId: 'lectura-llorona',
    options: [
      { id: 'a', text: 'Ver la obra desde trajineras en un espectáculo nocturno.', correct: true },
      { id: 'b', text: 'Llevarse un recuerdo gratuito al final de la funcion.', correct: false },
      { id: 'c', text: 'Participar como actores en cada presentacion.', correct: false },
      { id: 'd', text: 'Recibir una guia impresa con la historia completa.', correct: false },
    ],
  },
  {
    id: 'llorona-objetivo',
    type: 'multiple-choice',
    title: 'Objetivo del evento',
    category: 'Comprension lectora',
    prompt: '¿Cuál es el proposito principal según Nathalie Desplas?',
    readingId: 'lectura-llorona',
    options: [
      { id: 'a', text: 'Difundir la cultura y la tradición de Xochimilco.', correct: true },
      { id: 'b', text: 'Incrementar la venta de boletos turisticos internacionales.', correct: false },
      { id: 'c', text: 'Convertir la leyenda en una comedia músical.', correct: false },
      { id: 'd', text: 'Recaudar fondos para construir nuevas trajineras.', correct: false },
    ],
  },
  {
    id: 'lectura-manifestaciónes',
    type: 'reading',
    title: 'manifestaciónes artísticas',
    category: 'Conceptos clave',
    content: `Las manifestaciónes artísticas de la cultura popular de México incluyen historias, tradiciónes, música, artesanías y bailes, y se han transmitido por generaciones. Muchas representan mitos y leyendas que combinan creencias e imaginación popular para crear producciones artísticas.\n\nLos mitos son historias sobre seres mágicos que explican como comenzó el mundo y describen el origen de los elementos que conviven con la cultura. Las leyendas son relatos basados en hechos reales, pero mezclados con fantasía, que reflejan la cultura local, transmiten valores y, en ocasíónes, una enseñanza.\n\nEn ambos tipos de relato suelen aparecer personajes como deidades, héroes, seres fantásticos, fenómenos naturales y sobrenaturales, así como entidades espirituales.`,
    actionLabel: 'Continuar al ejercicio',
  },
  {
    id: 'manifestaciónes-sentido',
    type: 'multiple-choice',
    title: 'manifestaciónes artísticas',
    category: 'Conceptos clave',
    prompt: '¿Qué describe mejor a una manifestación artistica de la cultura popular?',
    readingId: 'lectura-manifestaciónes',
    options: [
      { id: 'a', text: 'Una expresion que comparte tradiciónes y creencias mediante relatos y espectáculos.', correct: true },
      { id: 'b', text: 'Unicamente un cuadro colgado en un museo.', correct: false },
      { id: 'c', text: 'Cualquier historia inventada sin relacion con la comunidad.', correct: false },
      { id: 'd', text: 'Un informe tecnico sobre fabricas y comercios.', correct: false },
    ],
  },
  {
    id: 'mito-vs-leyenda',
    type: 'multiple-choice',
    title: 'Tipos de narraciónes',
    category: 'Conceptos clave',
    prompt: '¿Qué diferencia menciona el texto entre mitos y leyendas?',
    readingId: 'lectura-manifestaciónes',
    options: [
      { id: 'a', text: 'Los mitos explican origenes con seres mágicos y las leyendas mezclan hechos reales con fantasía.', correct: true },
      { id: 'b', text: 'Los mitos siempre ocurren en ciudades modernas y las leyendas solo en selvas.', correct: false },
      { id: 'c', text: 'Las leyendas no transmiten valores y los mitos no tienen personajes fantásticos.', correct: false },
      { id: 'd', text: 'Los mitos hablan de tecnologia y las leyendas de deportes.', correct: false },
    ],
  },
  {
    id: 'personajes-relatos',
    type: 'multiple-choice',
    title: 'Personajes frecuentes',
    category: 'Conceptos clave',
    prompt: '¿Qué tipo de personajes pueden aparecer en estos relatos según el texto?',
    readingId: 'lectura-manifestaciónes',
    options: [
      { id: 'a', text: 'Deidades, héroes y fenómenos naturales o sobrenaturales.', correct: true },
      { id: 'b', text: 'Unicamente vecinos comunes sin ningun elemento simbolico.', correct: false },
      { id: 'c', text: 'Personajes famosos de television contemporanea.', correct: false },
      { id: 'd', text: 'Solo animales domesticos sin relacion con la cultura.', correct: false },
    ],
  },
  {
    id: 'lectura-sol-luna',
    type: 'reading',
    title: 'Mito del Sol y la Luna',
    category: 'Lectura guiada',
    content: `Un buen dia, los dioses decidieron crear el Sol y la Luna para iluminar el mundo, que estaba en oscuridad. Tecuciztecatl se ofrecio a ser el Sol, pues se creia digno. Nanahuatzin, en cambio, fue elegido para la Luna, pues era pobre y modesto.\n\nAmbos debian arrojarse a una gran hoguera, sin embargo, Tecuciztecatl tuvo miedo y no se atrevio. Nanahuatzin, por el contrario, con valor, se lanzo a la hoguera. Tecuciztecatl, avergonzado, lo hizo despues. Los dioses se sorprendieron al ver que ambos eran igual de brillantes.\n\nLos dioses consideraron que Nanahuatzin merecia brillar más por su valor. Tomaron un conejo, lo arrojaron a la cara de Tecuciztecatl y le dejaron una mancha oscura. así, el orgulloso y rico se convirtio en la Luna, y el valiente y humilde, en el Sol.\n\nConsultado en: Palacio, Nairen. "La fascinante historia de la leyenda del sol y la luna en la mitologia azteca", Mundo Mitologico (21 de marzo de 2025).`,
    actionLabel: 'Listo, vamos al ejercicio',
  },
  {
    id: 'sol-luna-enseñanza',
    type: 'multiple-choice',
    title: 'Mensaje del mito',
    category: 'Comprension lectora',
    prompt: '¿Qué enseñanza principal ofrece el mito?',
    readingId: 'lectura-sol-luna',
    options: [
      { id: 'a', text: 'El valor y la humildad pueden iluminar al mundo.', correct: true },
      { id: 'b', text: 'La riqueza asegura el exito en cualquier prueba.', correct: false },
      { id: 'c', text: 'Los dioses premian a quien evita los riesgos.', correct: false },
      { id: 'd', text: 'Ser orgulloso es la mejor manera de ser recordado.', correct: false },
    ],
  },
  {
    id: 'sol-luna-conejo',
    type: 'multiple-choice',
    title: 'Detalle del mito',
    category: 'Comprension lectora',
    prompt: '¿Por qué los dioses arrojaron un conejo a Tecuciztecatl?',
    readingId: 'lectura-sol-luna',
    options: [
      { id: 'a', text: 'Para dejar una mancha que atenuara su brillo.', correct: true },
      { id: 'b', text: 'Para convertirlo en un animal terrestre.', correct: false },
      { id: 'c', text: 'Para agradecerle su decision valiente.', correct: false },
      { id: 'd', text: 'Para que guiara a Nanahuatzin de regreso.', correct: false },
    ],
  },
  {
    id: 'sol-luna-valores',
    type: 'multiple-choice',
    title: 'Valor destacado',
    category: 'Comprension lectora',
    prompt: '¿Qué valor representa Nanahuatzin en la historia?',
    readingId: 'lectura-sol-luna',
    options: [
      { id: 'a', text: 'Humildad y valentia para cumplir una tarea dificil.', correct: true },
      { id: 'b', text: 'Astucia para evitar cualquier sacrificio.', correct: false },
      { id: 'c', text: 'Deseo de reconocimiento antes que el deber.', correct: false },
      { id: 'd', text: 'Indiferencia ante la oscuridad del mundo.', correct: false },
    ],
  },
  {
    id: 'lectura-ajolote',
    type: 'reading',
    title: 'Dia Nacional del Ajolote',
    category: 'Conciencia ambiental',
    content: `En el año 2018 se oficializo el 1 de febrero como el Dia Nacional del Ajolote. Es un anfibio originario de Xochimilco que se encuentra en peligro de extincion y juega un papel vital en los ecosistemás y en la cultura mexicana.\n\nTiene una caracteristica inusual: la capacidad regenerativa, es decir, puede reponer partes de su cuerpo. Las antiguas culturas originarias creian que esa propiedad se debia a que estaba ligado al dios Xolotl, el hermano gemelo de Quetzalcoatl.\n\nAl proteger su habitat se cuidan tambien los canales, la flora y la fauna que conviven en esa zona lacustre de la Ciudad de México.`,
    actionLabel: 'He terminado de leer',
  },
  {
    id: 'ajolote-cuidado',
    type: 'multiple-choice',
    title: 'Importancia del ajolote',
    category: 'Conciencia ambiental',
    prompt: '¿Por qué es importante proteger al ajolote según el texto?',
    readingId: 'lectura-ajolote',
    options: [
      { id: 'a', text: 'Porque es clave para el ecosistema de Xochimilco y simboliza una tradición cultural.', correct: true },
      { id: 'b', text: 'Porque permite sustituir todas las plantas acuaticas.', correct: false },
      { id: 'c', text: 'Porque solo habita en acuarios privados.', correct: false },
      { id: 'd', text: 'Porque su regeneracion evita cuidar los canales.', correct: false },
    ],
  },
  {
    id: 'ajolote-mensaje',
    type: 'multiple-choice',
    title: 'Mensaje para la comunidad',
    category: 'Conciencia ambiental',
    prompt: '¿Qué mensaje motivaria mejor a la comunidad a protegerlo?',
    readingId: 'lectura-ajolote',
    options: [
      { id: 'a', text: 'Cuidemos los canales y evitemos contaminar el agua donde vive el ajolote.', correct: true },
      { id: 'b', text: 'Llevemos ajolotes como máscotas exotas para admirarlos de cerca.', correct: false },
      { id: 'c', text: 'Tapemos los canales para que no escapen a otros lugares.', correct: false },
      { id: 'd', text: 'Dediquemonos solo a vender recuerdos sin hablar del ajolote.', correct: false },
    ],
  },
  {
    id: 'lectura-lenguajes',
    type: 'reading',
    title: 'Lenguaje visual y sonoro',
    category: 'Arte y cultura',
    content: `Las historias contadas oralmente se pueden enriquecer con los lenguajes visual y sonoro. Estos ayudan a mantener y compartir tradiciónes artísticas y culturales, como mitos y leyendas, y permiten transmitir emociones e ideas que conectan con personas de distintas culturas y epocas.\n\nEl lenguaje visual incluye pintura, escultura y arquitectura; se apoya en simbolismos, color y luz para transmitir ideas y emociones. La composición y los detalles enriquecen la narrativa visual.\n\nEl lenguaje sonoro, como la música y la poesía oral, comunica emociones a traves del ritmo y la melodía. La pronunciación y la instrumentación anaden enfasís y crean un ambiente.`,
    actionLabel: 'Continuar',
  },
  {
    id: 'lenguaje-visual',
    type: 'multiple-choice',
    title: 'Lenguaje visual',
    category: 'Arte y cultura',
    prompt: '¿Qué afirma el texto sobre el lenguaje visual?',
    readingId: 'lectura-lenguajes',
    options: [
      { id: 'a', text: 'Utiliza símbolos, color y luz para transmitir ideas y emociones.', correct: true },
      { id: 'b', text: 'Se limita a repetir dialogos sin apoyos escenicos.', correct: false },
      { id: 'c', text: 'Solo se aplica en museos y no en escenarios populares.', correct: false },
      { id: 'd', text: 'Reemplaza a los personajes y elimina la narrativa oral.', correct: false },
    ],
  },
  {
    id: 'lenguaje-combinacion',
    type: 'multiple-choice',
    title: 'Lenguajes en escena',
    category: 'Arte y cultura',
    prompt: '¿Cómo se pueden combinar ambos lenguajes según la lectura?',
    readingId: 'lectura-lenguajes',
    options: [
      { id: 'a', text: 'Usando música y luz para resaltar emociones mientras se narra la historia.', correct: true },
      { id: 'b', text: 'Evitar cualquier sonido para que la gente imagine el ambiente.', correct: false },
      { id: 'c', text: 'Apagar las luces y hablar sin gestos para concentrarse.', correct: false },
      { id: 'd', text: 'Reemplazar la narración por una lista de datos.', correct: false },
    ],
  },
  {
    id: 'lectura-cancion-llorona',
    type: 'reading',
    title: 'Cancion tradiciónal: La Llorona',
    category: 'música y tradición',
    content: `Salias de un templo un dia, Llorona,\ncuando al pasar yo te vi.\nHermoso huipil llevabas, Llorona,\nque a la Virgen te crei.\n\nAy de mi, Llorona, Llorona,\nLlorona de azul celeste.\nAy de mi, Llorona, Llorona,\nLlorona de azul celeste.\n\nDicen que no sabe de amores, Llorona,\nel que no ha llorado cantando.\nAy de mi, Llorona, Llorona,\nLlorona de azul celeste.\nAy de mi, Llorona, Llorona,\nLlorona de azul celeste.\n\nNo dejare de quererte, Llorona,\nporque me muero contigo.\nAy de mi, Llorona, Llorona,\nLlorona llevame al rio.\nTapame con tu rebozo, Llorona,\nporque me muero de frio.`,
    actionLabel: 'Listo, continuar',
  },
  {
    id: 'cancion-emocion',
    type: 'multiple-choice',
    title: 'Emocion de la cancion',
    category: 'música y tradición',
    prompt: '¿Qué emocion predomina en la letra de la cancion?',
    readingId: 'lectura-cancion-llorona',
    options: [
      { id: 'a', text: 'Una mezcla de nostalgia, amor y dolor.', correct: true },
      { id: 'b', text: 'Alegria festiva por un encuentro familiar.', correct: false },
      { id: 'c', text: 'Orgullo por ganar un concurso de canto.', correct: false },
      { id: 'd', text: 'Indiferencia ante la despedida de un ser querido.', correct: false },
    ],
  },
  {
    id: 'cancion-escena',
    type: 'multiple-choice',
    title: 'Ambientacion escenica',
    category: 'música y tradición',
    prompt: '¿Qué elemento escenico reforzaria mejor la atmosfera según la letra?',
    readingId: 'lectura-cancion-llorona',
    options: [
      { id: 'a', text: 'Iluminacion azul tenue y un rebozo que cubra a la protagonista.', correct: true },
      { id: 'b', text: 'Luces brillantes multicolor y confeti al centro.', correct: false },
      { id: 'c', text: 'Un escenario deportivo con ruido constante.', correct: false },
      { id: 'd', text: 'Una pasarela con focos rojos intermitentes.', correct: false },
    ],
  },
  {
    id: 'lectura-narración-oral',
    type: 'reading',
    title: 'narración oral',
    category: 'narración oral',
    content: `Las narraciónes orales, como los mitos y las leyendas, se transmiten de boca en boca y permiten compartir aspectos de la cultura, como la relacion entre la comunidad y la naturaleza, los valores y los sentimientos de un grupo de personas.\n\nPara crear una narración oral con las características del mito o la leyenda es necesario conocer la manifestación cultural o el tema del que se hablará, elegir los puntos más relevantes que se representaran, desarrollar una narrativa sencilla, atractiva y coherente, y reconocer a la audiencia: no es lo mismo narrar para un grupo de niños que para uno de adultos.`,
    actionLabel: 'Comprendi la lectura',
  },
  {
    id: 'narración-paso',
    type: 'multiple-choice',
    title: 'Preparar la narración',
    category: 'narración oral',
    prompt: '¿Según el texto, qué debes hacer primero al preparar una narración oral?',
    readingId: 'lectura-narración-oral',
    options: [
      { id: 'a', text: 'Conocer la manifestación cultural o el tema que abordaras.', correct: true },
      { id: 'b', text: 'Inventar la historia sin pensar en la audiencia.', correct: false },
      { id: 'c', text: 'Decidir el vestuario antes del contenido.', correct: false },
      { id: 'd', text: 'Repetir otra historia sin relacion con la comunidad.', correct: false },
    ],
  },
]

adventureSteps.forEach(step => {
  step.starValue = step.starValue ?? 3
})




