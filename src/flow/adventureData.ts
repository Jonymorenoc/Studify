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
      { id: 'a', text: 'Guiarte para entender y reinterpretar mitos mexicanos con sentido.', correct: true },
      { id: 'b', text: 'Acumular datos historicos sin relacionarlos con relatos.', correct: false },
      { id: 'c', text: 'Memorizar reglas gramaticales aisladas.', correct: false },
      { id: 'd', text: 'Repetir historias sin analizar su significado.', correct: false },
    ],
  },
  {
    id: 'interes-enfoque',
    title: 'Elige tu enfoque',
    category: 'Personalizacion',
    prompt: '?Que enfoque te ayudara mas durante la aventura?',
    options: [
      { id: 'a', text: 'Relacionar cada actividad con las voces y costumbres de la comunidad.', correct: true },
      { id: 'b', text: 'Elegir el tema que mas vistas tiene en redes.', correct: false },
      { id: 'c', text: 'Tomar la primera opcion disponible sin reflexionar.', correct: false },
      { id: 'd', text: 'Apuntar datos sueltos para terminar rapido.', correct: false },
    ],
    note: 'Piensa en el enfoque que realmente conecta con la historia.',
  },
  {
    id: 'activacion-inicial',
    title: 'Activacion visual',
    category: 'Activacion',
    prompt: '?Que accion te conecta mejor con la naturaleza antes de narrar?',
    options: [
      { id: 'a', text: 'Crear una atmosfera con sonidos y elementos del entorno natural.', correct: true },
      { id: 'b', text: 'Narrar sin ambientacion para no distraerte.', correct: false },
      { id: 'c', text: 'Usar efectos futuristas que no tienen relacion con el paisaje.', correct: false },
      { id: 'd', text: 'Leer de prisa para pasar directo a la actividad.', correct: false },
    ],
  },
  {
    id: 'lectura-llorona',
    title: 'La Llorona en Xochimilco',
    category: 'Lectura guiada',
    prompt: '?Que mensaje resalta la representacion nocturna en los canales?',
    options: [
      { id: 'a', text: 'Honrar la memoria colectiva y cuidar el entorno de Xochimilco.', correct: true },
      { id: 'b', text: 'Promocionar productos turisticos sin contar la historia.', correct: false },
      { id: 'c', text: 'Convertir la trajinera en un espectaculo de comedia.', correct: false },
      { id: 'd', text: 'Explicar como fabricar trajineras modernas.', correct: false },
    ],
  },
  {
    id: 'comprension-llorona',
    title: 'Elementos unicos',
    category: 'Comprension',
    prompt: '?Que elementos hacen memorable la puesta en escena?',
    options: [
      { id: 'a', text: 'Musica tradicional, luces y narracion que refuerzan el misterio.', correct: true },
      { id: 'b', text: 'Escenario neutro sin sonido para evitar distracciones.', correct: false },
      { id: 'c', text: 'Solo pantallas con datos tecnicos del lugar.', correct: false },
      { id: 'd', text: 'Un concurso de disfraces modernos sin contexto.', correct: false },
    ],
  },
  {
    id: 'crea-llorona',
    title: 'Version propia',
    category: 'Creacion',
    prompt: '?Que recurso resalta mejor a tu version de la Llorona?',
    options: [
      { id: 'a', text: 'Velos, agua y sombras que evoquen su presencia.', correct: true },
      { id: 'b', text: 'Luces neon porque lucen modernas.', correct: false },
      { id: 'c', text: 'Globos y confeti como en una fiesta.', correct: false },
      { id: 'd', text: 'Anuncios comerciales para llamar la atencion.', correct: false },
    ],
  },
  {
    id: 'investigacion-fuentes',
    title: 'Donde investigar',
    category: 'Fuentes',
    prompt: '?Que fuente es mas confiable para conocer nuevas leyendas?',
    options: [
      { id: 'a', text: 'Conversar con cronistas y mayores que resguardan la memoria local.', correct: true },
      { id: 'b', text: 'Depender de memes y publicaciones sin contexto.', correct: false },
      { id: 'c', text: 'Repetir rumores de chats anonimos sin comprobar.', correct: false },
      { id: 'd', text: 'Inventar datos porque casi nadie verifica.', correct: false },
    ],
  },
  {
    id: 'lectura-sol-luna',
    title: 'Mito del Sol y la Luna',
    category: 'Lectura guiada',
    prompt: '?Que ensena el sacrificio de Nanahuatzin en el mito?',
    options: [
      { id: 'a', text: 'Que la valentia humilde puede traer luz a la comunidad.', correct: true },
      { id: 'b', text: 'Que solo los dioses orgullosos alcanzan el exito.', correct: false },
      { id: 'c', text: 'Que nada cambio porque no hubo sacrificio real.', correct: false },
      { id: 'd', text: 'Que Teotihuacan era un parque de diversiones.', correct: false },
    ],
  },
  {
    id: 'clasificacion-mitos',
    title: 'Mito o leyenda',
    category: 'Clasificacion',
    prompt: 'Cual de estos titulos corresponde a un mito?',
    options: [
      { id: 'a', text: 'El nacimiento del Quinto Sol en Teotihuacan.', correct: true },
      { id: 'b', text: 'La leyenda del Callejon del Beso.', correct: false },
      { id: 'c', text: 'Cronica moderna sobre un festival escolar.', correct: false },
      { id: 'd', text: 'Reportaje comercial sobre artesanias.', correct: false },
    ],
  },
  {
    id: 'crea-mito',
    title: 'Plan del mito',
    category: 'Escritura',
    prompt: '?Que punto clave ayuda a planear tu propio mito?',
    options: [
      { id: 'a', text: 'Definir que fenomeno explicaras y el mensaje que dejara.', correct: true },
      { id: 'b', text: 'Escribir sin protagonistas ni conflicto central.', correct: false },
      { id: 'c', text: 'Copiar un cuento popular y cambiar los nombres.', correct: false },
      { id: 'd', text: 'Dejar el final sin sentido para que cada quien imagine uno.', correct: false },
    ],
  },
  {
    id: 'personaje-principal',
    title: 'Protagonista',
    category: 'Creacion visual',
    prompt: '?Que detalle describe mejor a un personaje memorable?',
    options: [
      { id: 'a', text: 'Describir su rasgo simbolico y como reacciona al conflicto.', correct: true },
      { id: 'b', text: 'Dar solo su nombre y edad para presentarlo rapido.', correct: false },
      { id: 'c', text: 'Hablar de su vestuario sin relacionarlo con la historia.', correct: false },
      { id: 'd', text: 'Cambiar su personalidad en cada escena sin explicacion.', correct: false },
    ],
  },
  {
    id: 'lenguaje-visual',
    title: 'Lenguaje visual y sonoro',
    category: 'Arte y cultura',
    prompt: '?Que combinacion refuerza mejor una leyenda en escena?',
    options: [
      { id: 'a', text: 'Iluminacion tenue, musica tradicional y narracion intencional.', correct: true },
      { id: 'b', text: 'Luces estroboscopicas y volumen alto sin ritmo.', correct: false },
      { id: 'c', text: 'Escenario vacio con silencio prolongado.', correct: false },
      { id: 'd', text: 'Canciones pop ajenas al sentido de la leyenda.', correct: false },
    ],
  },
  {
    id: 'mensaje-ajolote',
    title: 'Protege al ajolote',
    category: 'Conciencia ambiental',
    prompt: '?Que mensaje invita a cuidar al ajolote?',
    options: [
      { id: 'a', text: 'Cuidar los canales y difundir por que el ajolote los necesita.', correct: true },
      { id: 'b', text: 'Llevarlo a casa como mascota exotica.', correct: false },
      { id: 'c', text: 'Decorar la trajinera con plasticos brillantes.', correct: false },
      { id: 'd', text: 'Ignorar su habitat porque se adapta a cualquier lugar.', correct: false },
    ],
  },
  {
    id: 'analiza-catrina',
    title: 'Elementos de La Catrina',
    category: 'Arte popular',
    prompt: '?Que elemento simboliza la critica social en La Catrina?',
    options: [
      { id: 'a', text: 'El sombrero elegante que satiriza las apariencias de la elite.', correct: true },
      { id: 'b', text: 'El bolso de disenador que combina con la temporada.', correct: false },
      { id: 'c', text: 'Los lentes oscuros que evocan moda actual.', correct: false },
      { id: 'd', text: 'Publicidad de productos colocada junto al personaje.', correct: false },
    ],
  },
  {
    id: 'cancion-llorona',
    title: 'Cancion tradicional',
    category: 'Musica y tradicion',
    prompt: '?Que verso refleja mejor la emocion de La Llorona?',
    options: [
      { id: 'a', text: 'Suplica respeto por quienes perdio y por la memoria colectiva.', correct: true },
      { id: 'b', text: 'Invita a festejar con pasos de baile alegres.', correct: false },
      { id: 'c', text: 'Relata compras y regalos luminosos.', correct: false },
      { id: 'd', text: 'Promete premios por participar en un concurso.', correct: false },
    ],
  },
  {
    id: 'narracion-oral',
    title: 'Historia familiar',
    category: 'Narracion oral',
    prompt: '?Que detalle fortalece una narracion oral?',
    options: [
      { id: 'a', text: 'Contar quien la transmitio y las emociones que compartio.', correct: true },
      { id: 'b', text: 'Afirmar que no recuerdas quien la conto.', correct: false },
      { id: 'c', text: 'Quitar detalles personales para que parezca generica.', correct: false },
      { id: 'd', text: 'Narrarla sin tono ni gestos para no distraer.', correct: false },
    ],
  },
  {
    id: 'conceptos-clave',
    title: 'Mitos y leyendas',
    category: 'Conceptos clave',
    prompt: '?Que afirmacion describe mejor a un mito?',
    options: [
      { id: 'a', text: 'Relato simbolico que explica origenes y valores de una comunidad.', correct: true },
      { id: 'b', text: 'Historia basada solo en datos cientificos recientes.', correct: false },
      { id: 'c', text: 'Anecdota personal contada en redes sociales.', correct: false },
      { id: 'd', text: 'Leyenda urbana sin elementos sagrados.', correct: false },
    ],
  },
  {
    id: 'pasos-narrativos',
    title: 'Orden del proceso',
    category: 'Proceso narrativo',
    prompt: '?Que paso va primero al crear una narracion?',
    options: [
      { id: 'a', text: 'Definir el tema y el mensaje antes de escribir.', correct: true },
      { id: 'b', text: 'Improvisar y ver que surge sobre la marcha.', correct: false },
      { id: 'c', text: 'Escoger vestuario antes de conocer el conflicto.', correct: false },
      { id: 'd', text: 'Publicar la historia sin revisarla.', correct: false },
    ],
  },
  {
    id: 'plan-escena',
    title: 'Representacion escenica',
    category: 'Planeacion',
    prompt: '?Que combinacion mejora la puesta en escena?',
    options: [
      { id: 'a', text: 'Planear imagen, sonido y movimientos segun cada momento.', correct: true },
      { id: 'b', text: 'Improvisar con el primer material que encuentres.', correct: false },
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
      { id: 'a', text: 'Practicar pausas, respirar y enfatizar ideas clave.', correct: true },
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
      { id: 'a', text: 'Organizar espacios para compartir relatos y registrarlos con respeto.', correct: true },
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
      { id: 'a', text: 'Manana contaremos la leyenda en la plaza.', correct: true },
      { id: 'b', text: 'Ayer narramos la historia junto al rio.', correct: false },
      { id: 'c', text: 'Ahora escucho con atencion la cancion.', correct: false },
      { id: 'd', text: 'Siempre guardo los recuerdos en silencio.', correct: false },
    ],
  },
]

adventureSteps.forEach(step => {
  step.starValue = step.starValue ?? 3
})

