export type ChoiceOption = {
  id: string
  text: string
  correct: boolean
  helper?: string
}

export type ChoiceExercise = {
  id: string
  title: string
  category: string
  prompt: string
  options: ChoiceOption[]
  allowMulti?: boolean
  note?: string
  starValue?: number
}

export const adventureSteps: ChoiceExercise[] = [
  {
    id: 'intro-mision',
    title: 'Comienza la aventura',
    category: 'Bienvenida',
    prompt: '?Cual es la mision de este recorrido?',
    options: [
      { id: 'a', text: 'Explorar mitos y leyendas mexicanas de forma guiada.', correct: true },
      { id: 'b', text: 'Practicar operaciones matematicas avanzadas.', correct: false },
      { id: 'c', text: 'Aprender solo reglas gramaticales en ingles.', correct: false },
      { id: 'd', text: 'Repetir la misma historia sin analizarla.', correct: false },
    ],
  },
  {
    id: 'interes-enfoque',
    title: 'Elige tu enfoque',
    category: 'Personalizacion',
    prompt: '?Que aspecto te gustaria destacar durante la aventura?',
    options: [
      { id: 'planeta', text: 'Naturaleza y tradicion oral.', correct: true },
      { id: 'circulos', text: 'Reflexion sobre historias y comunidad.', correct: true },
      { id: 'pasatiempos', text: 'Ambiente creativo para narrar.', correct: true },
    ],
    note: 'Todas las opciones son validas, elige la que mas te motive.',
  },
  {
    id: 'activacion-inicial',
    title: 'Activacion visual',
    category: 'Activacion',
    prompt: '?Que accion ayuda mas a conectar con la naturaleza al crear la historia?',
    options: [
      { id: 'a', text: 'Usar imagenes y sonidos de rios, animales y estrellas.', correct: true },
      { id: 'b', text: 'Ignorar el ambiente y repetir la historia sin cambios.', correct: false },
      { id: 'c', text: 'Eliminar todo lo relacionado con la comunidad.', correct: false },
      { id: 'd', text: 'Contar la historia a toda velocidad sin contexto.', correct: false },
    ],
  },
  {
    id: 'lectura-llorona',
    title: 'La Llorona en Xochimilco',
    category: 'Lectura guiada',
    prompt: '?Que mensaje transmite la representacion nocturna en los canales?',
    options: [
      { id: 'a', text: 'Invita a respetar la memoria y cuidar el agua.', correct: true },
      { id: 'b', text: 'Promueve vender souvenirs sin contar historias.', correct: false },
      { id: 'c', text: 'Describe un concierto sin relacion con la leyenda.', correct: false },
      { id: 'd', text: 'Explica como construir trajineras modernas.', correct: false },
    ],
  },
  {
    id: 'comprension-llorona',
    title: 'Elementos unicos',
    category: 'Comprension',
    prompt: '?Que elementos hacen especial la puesta en escena?',
    options: [
      { id: 'a', text: 'Musica tradicional, luces y narracion dramatica.', correct: true },
      { id: 'b', text: 'Silencio total en un salon sin decoracion.', correct: false },
      { id: 'c', text: 'Unicamente pantallas digitales sin actores.', correct: false },
      { id: 'd', text: 'Un concurso para elegir el mejor disfraz moderno.', correct: false },
    ],
  },
  {
    id: 'crea-llorona',
    title: 'Version propia',
    category: 'Creacion',
    prompt: '?Que recurso resalta mejor a tu version de la Llorona?',
    options: [
      { id: 'a', text: 'Velos y agua que reflejen su presencia misteriosa.', correct: true },
      { id: 'b', text: 'Luces fosforescentes sin relacion con la historia.', correct: false },
      { id: 'c', text: 'Globos de colores brillantes y confeti.', correct: false },
      { id: 'd', text: 'Carteles comerciales de comida rapida.', correct: false },
    ],
  },
  {
    id: 'investigacion-fuentes',
    title: 'Donde investigar',
    category: 'Fuentes',
    prompt: '?Que fuente es mas confiable para conocer nuevas leyendas?',
    options: [
      { id: 'a', text: 'Platicar con cronistas o personas mayores de la comunidad.', correct: true },
      { id: 'b', text: 'Buscar solamente en memes sin contexto.', correct: false },
      { id: 'c', text: 'Seguir rumores anonimos en chats sin verificar.', correct: false },
      { id: 'd', text: 'Inventar datos sin preguntar a nadie.', correct: false },
    ],
  },
  {
    id: 'lectura-sol-luna',
    title: 'Mito del Sol y la Luna',
    category: 'Lectura guiada',
    prompt: '?Que ensena el sacrificio de Nanahuatzin en el mito?',
    options: [
      { id: 'a', text: 'Que la humildad y la valentia iluminan al mundo.', correct: true },
      { id: 'b', text: 'Que solo los dioses orgullosos logran triunfar.', correct: false },
      { id: 'c', text: 'Que la Luna brilla porque nunca hubo sacrificio.', correct: false },
      { id: 'd', text: 'Que Teotihuacan era un parque de diversiones.', correct: false },
    ],
  },
  {
    id: 'clasificacion-mitos',
    title: 'Mito o leyenda',
    category: 'Clasificacion',
    prompt: 'Selecciona los titulos que corresponden a mitos.',
    options: [
      { id: 'a', text: 'Xochiquetzal', correct: true },
      { id: 'b', text: 'El aguila y la serpiente', correct: true },
      { id: 'c', text: 'El callejon del beso', correct: false },
      { id: 'd', text: 'La Nahuala', correct: false },
    ],
    allowMulti: true,
  },
  {
    id: 'crea-mito',
    title: 'Plan del mito',
    category: 'Escritura',
    prompt: '?Que punto clave ayuda a planear tu propio mito?',
    options: [
      { id: 'a', text: 'Definir que fenomeno natural o cultural explicaras.', correct: true },
      { id: 'b', text: 'Escribir sin personajes ni conflicto.', correct: false },
      { id: 'c', text: 'Copiar exactamente un cuento ya existente.', correct: false },
      { id: 'd', text: 'Ignorar la ensenanza final.', correct: false },
    ],
  },
  {
    id: 'personaje-principal',
    title: 'Protagonista',
    category: 'Creacion visual',
    prompt: '?Que detalle describe mejor a un personaje memorable?',
    options: [
      { id: 'a', text: 'Mencionar su rasgo simbolico y como actua.', correct: true },
      { id: 'b', text: 'Decir solo su nombre sin caracteristicas.', correct: false },
      { id: 'c', text: 'Cambiarlo en cada escena sin explicar por que.', correct: false },
      { id: 'd', text: 'Evitar vincularlo con el mito.', correct: false },
    ],
  },
  {
    id: 'lenguaje-visual',
    title: 'Lenguaje visual y sonoro',
    category: 'Arte y cultura',
    prompt: '?Que combinacion refuerza mejor una leyenda en escena?',
    options: [
      { id: 'a', text: 'Iluminacion tenue, musica tradicional y narracion pausada.', correct: true },
      { id: 'b', text: 'Ruido incontrolable y luces sin ritmo.', correct: false },
      { id: 'c', text: 'Escenario vacio y silencio completo.', correct: false },
      { id: 'd', text: 'Canciones pop sin relacion con la historia.', correct: false },
    ],
  },
  {
    id: 'mensaje-ajolote',
    title: 'Protege al ajolote',
    category: 'Conciencia ambiental',
    prompt: '?Que mensaje invita a cuidar al ajolote?',
    options: [
      { id: 'a', text: 'Protege los canales y respeta su hogar acuatico.', correct: true },
      { id: 'b', text: 'Lleva un ajolote a casa sin cuidados especiales.', correct: false },
      { id: 'c', text: 'Decora la trajinera con plasticos brillantes.', correct: false },
      { id: 'd', text: 'Ignora los rios porque el ajolote no los necesita.', correct: false },
    ],
  },
  {
    id: 'analiza-catrina',
    title: 'Elementos de La Catrina',
    category: 'Arte popular',
    prompt: '?Que elemento simboliza la critica social en La Catrina?',
    options: [
      { id: 'a', text: 'El sombrero elegante que recuerda la satira de Posada.', correct: true },
      { id: 'b', text: 'Los tenis modernos con luces de colores.', correct: false },
      { id: 'c', text: 'Un letrero con frases en ingles sin contexto.', correct: false },
      { id: 'd', text: 'Un cartel de anuncios comerciales.', correct: false },
    ],
  },
  {
    id: 'cancion-llorona',
    title: 'Cancion tradicional',
    category: 'Musica y tradicion',
    prompt: '?Que verso refleja mejor la emocion de La Llorona?',
    options: [
      { id: 'a', text: 'Su voz pide respeto por la memoria de quienes ama.', correct: true },
      { id: 'b', text: 'Canta para animar un concurso de baile moderno.', correct: false },
      { id: 'c', text: 'Describe una fiesta sin relacion con la leyenda.', correct: false },
      { id: 'd', text: 'Habla sobre comprar regalos luminosos.', correct: false },
    ],
  },
  {
    id: 'narracion-oral',
    title: 'Historia familiar',
    category: 'Narracion oral',
    prompt: '?Que detalle fortalece una narracion oral?',
    options: [
      { id: 'a', text: 'Compartir quien conto la historia y que emocion transmitio.', correct: true },
      { id: 'b', text: 'Decir que fue inventada hace cinco minutos.', correct: false },
      { id: 'c', text: 'Eliminar todo recuerdo personal.', correct: false },
      { id: 'd', text: 'Contarla sin voz ni expresion.', correct: false },
    ],
  },
  {
    id: 'conceptos-clave',
    title: 'Mitos y leyendas',
    category: 'Conceptos clave',
    prompt: 'Selecciona las afirmaciones correctas.',
    options: [
      { id: 'a', text: 'Los mitos explican fenomenos y transmiten valores.', correct: true },
      { id: 'b', text: 'Las leyendas mezclan hechos reales con fantasia.', correct: true },
      { id: 'c', text: 'Los mitos no tienen relacion con la comunidad.', correct: false },
      { id: 'd', text: 'Las leyendas siempre son totalmente reales.', correct: false },
    ],
    allowMulti: true,
  },
  {
    id: 'pasos-narrativos',
    title: 'Orden del proceso',
    category: 'Proceso narrativo',
    prompt: '?Que paso va primero al crear una narracion?',
    options: [
      { id: 'a', text: 'Elegir el tema y el mensaje que quieres compartir.', correct: true },
      { id: 'b', text: 'Presentar la historia sin ensayarla.', correct: false },
      { id: 'c', text: 'Decidir el vestuario antes de conocer la trama.', correct: false },
      { id: 'd', text: 'Publicar la historia sin revisar el contenido.', correct: false },
    ],
  },
  {
    id: 'plan-escena',
    title: 'Representacion escenica',
    category: 'Planeacion',
    prompt: '?Que combinacion mejora la puesta en escena?',
    options: [
      { id: 'a', text: 'Planear materiales visuales y sonido acorde a cada momento.', correct: true },
      { id: 'b', text: 'Improvisar sin considerar el espacio.', correct: false },
      { id: 'c', text: 'Apagar todas las luces y contar en silencio.', correct: false },
      { id: 'd', text: 'Usar musica cualquiera aunque rompa la atmosfera.', correct: false },
    ],
  },
  {
    id: 'rubrica-expresion',
    title: 'Autoevaluacion',
    category: 'Autoevaluacion',
    prompt: 'Si notas que hablas muy rapido, ?que es recomendable?',
    options: [
      { id: 'a', text: 'Practicar pausas y respirar profundo entre ideas.', correct: true },
      { id: 'b', text: 'Aumentar aun mas la velocidad para terminar antes.', correct: false },
      { id: 'c', text: 'Hablar sin mirar al publico.', correct: false },
      { id: 'd', text: 'Evitar practicar porque no ayuda.', correct: false },
    ],
  },
  {
    id: 'conclusion-grupal',
    title: 'Preserva la memoria',
    category: 'Cierre',
    prompt: '?Que accion preserva mejor mitos y leyendas?',
    options: [
      { id: 'a', text: 'Organizar una lectura nocturna en la comunidad.', correct: true },
      { id: 'b', text: 'Guardar las historias y no contarlas nunca.', correct: false },
      { id: 'c', text: 'Cambiar los relatos para vender productos.', correct: false },
      { id: 'd', text: 'Olvidar las tradiciones para crear nuevas modas.', correct: false },
    ],
  },
  {
    id: 'bonus-verbos',
    title: 'Tiempos verbales',
    category: 'Gramatica',
    prompt: '?Que oracion esta en tiempo futuro?',
    options: [
      { id: 'a', text: 'Ma??ana contaremos la leyenda en la plaza.', correct: true },
      { id: 'b', text: 'Ayer narramos la historia junto al rio.', correct: false },
      { id: 'c', text: 'Ahora escucho con atencion la cancion.', correct: false },
      { id: 'd', text: 'Siempre guardo los recuerdos en silencio.', correct: false },
    ],
  },
]

adventureSteps.forEach(step => {
  step.starValue = step.starValue ?? 3
})

