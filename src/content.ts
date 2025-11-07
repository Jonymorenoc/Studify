// Tipos de pantallas
export type ScreenKind = "learn" | "quiz-choice" | "quiz-drag" | "quiz-match" | "quiz-highlight" | "quiz-reflect";
export type Trayecto = 1 | 2 | 3;

// Interfaz base
export interface BaseScreen {
  id: string;
  trayecto: Trayecto;
  tema: string;
  emoji: string;
  kind: ScreenKind;
}

// Pantalla de aprendizaje
export interface LearnScreen extends BaseScreen {
  kind: "learn";
  html: string;
  media?: { img?: string; alt?: string };
}

// Quiz de selección múltiple
export interface QuizChoice extends BaseScreen {
  kind: "quiz-choice";
  prompt: string;
  options: string[];
  answerIndex: number;
  explain: string;
}

// Quiz de arrastrar y soltar
export interface QuizDrag extends BaseScreen {
  kind: "quiz-drag";
  prompt: string;
  mode: "sort" | "bucket";
  items: { id: string; label: string }[];
  correctOrder?: string[]; // para sort
  buckets?: { id: string; label: string }[]; // para bucket
  correctBuckets?: Record<string, string>; // itemId -> bucketId para bucket
  explain: string;
}

// Quiz de emparejamiento
export interface QuizMatch extends BaseScreen {
  kind: "quiz-match";
  prompt: string;
  left: { id: string; label: string }[];
  right: { id: string; label: string }[];
  pairs: Record<string, string>; // leftId -> rightId
  explain: string;
}

// Quiz de resaltar zonas
export interface QuizHighlight extends BaseScreen {
  kind: "quiz-highlight";
  prompt: string;
  img: string;
  alt: string;
  hotspots: { id: string; x: number; y: number; r: number }[];
  explain: string;
}

// Quiz de reflexión
export interface QuizReflect extends BaseScreen {
  kind: "quiz-reflect";
  prompt: string;
  choices: string[];
  explain?: string;
}

// Unión de todos los tipos de pantallas
export type Screen = LearnScreen | QuizChoice | QuizDrag | QuizMatch | QuizHighlight | QuizReflect;

// CONTENIDOS DEL TEMARIO
export const screens: Screen[] = [
  // ==================== TRAYECTO 1: LUNA ====================

  // Pantalla 1: Aprende sobre fases de la Luna
  {
    id: "luna-1-learn",
    trayecto: 1,
    tema: "Fases de la Luna",
    emoji: "🌙",
    kind: "learn",
    html: `
      <h2>🌙 Fases de la Luna</h2>
      <p>La Luna cambia de forma en el cielo cada noche. ¡Pero en realidad no cambia! Lo que vemos es diferente según cómo le llega la luz del Sol.</p>
      <ul>
        <li><strong>🌑 Luna Nueva:</strong> No la vemos, está oscura</li>
        <li><strong>🌓 Cuarto Creciente:</strong> Vemos la mitad derecha iluminada</li>
        <li><strong>🌕 Luna Llena:</strong> La vemos completamente iluminada</li>
        <li><strong>🌗 Cuarto Menguante:</strong> Vemos la mitad izquierda iluminada</li>
      </ul>
      <p>Este ciclo dura aproximadamente <strong>28 días</strong>.</p>
    `,
    media: { img: "/Studify/moon-phases.svg", alt: "Fases de la Luna" }
  },

  // Pantalla 2: Quiz choice sobre Luna Llena
  {
    id: "luna-2-choice",
    trayecto: 1,
    tema: "Fases de la Luna",
    emoji: "🌙",
    kind: "quiz-choice",
    prompt: "¿En qué fase está la Luna completamente iluminada?",
    options: [
      "Luna Nueva",
      "Cuarto Creciente",
      "Luna Llena",
      "Cuarto Menguante"
    ],
    answerIndex: 2,
    explain: "¡Correcto! 🌕 En la Luna Llena podemos ver toda su cara iluminada por el Sol."
  },

  // Pantalla 3: Quiz drag-sort para ordenar fases
  {
    id: "luna-3-drag-sort",
    trayecto: 1,
    tema: "Fases de la Luna",
    emoji: "🌙",
    kind: "quiz-drag",
    prompt: "Ordena las fases de la Luna en el orden correcto:",
    mode: "sort",
    items: [
      { id: "nueva", label: "🌑 Nueva" },
      { id: "creciente", label: "🌓 Creciente" },
      { id: "llena", label: "🌕 Llena" },
      { id: "menguante", label: "🌗 Menguante" }
    ],
    correctOrder: ["nueva", "creciente", "llena", "menguante"],
    explain: "¡Excelente! El ciclo lunar va de Nueva → Creciente → Llena → Menguante."
  },

  // Pantalla 4: Aprende sobre rotación sincrónica
  {
    id: "luna-4-learn",
    trayecto: 1,
    tema: "Caras de la Luna",
    emoji: "🌙",
    kind: "learn",
    html: `
      <h2>🌙 La Misma Cara de la Luna</h2>
      <p>¿Sabías que la Luna siempre nos muestra la misma cara?</p>
      <p>Esto se llama <strong>rotación sincrónica</strong>. La Luna gira sobre sí misma y alrededor de la Tierra en el <strong>mismo tiempo</strong>.</p>
      <ul>
        <li>🔄 La Luna <strong>rota</strong> (gira sobre sí misma)</li>
        <li>🌍 La Luna se <strong>traslada</strong> (gira alrededor de la Tierra)</li>
        <li>⏱️ Ambos movimientos toman el mismo tiempo: ~28 días</li>
      </ul>
      <p>Por eso, desde la Tierra, siempre vemos la misma cara lunar.</p>
    `,
    media: { img: "/Studify/moon-rotation.svg", alt: "Rotación sincrónica de la Luna" }
  },

  // Pantalla 5: Quiz choice sobre rotación sincrónica
  {
    id: "luna-5-choice",
    trayecto: 1,
    tema: "Caras de la Luna",
    emoji: "🌙",
    kind: "quiz-choice",
    prompt: "La rotación sincrónica significa que la Luna...",
    options: [
      "No gira sobre sí misma",
      "Gira más rápido que la Tierra",
      "Rota y se traslada en el mismo tiempo",
      "Tiene dos caras diferentes"
    ],
    answerIndex: 2,
    explain: "¡Perfecto! 🎯 La rotación sincrónica significa que la Luna tarda el mismo tiempo en rotar sobre sí misma que en dar la vuelta alrededor de la Tierra."
  },

  // Pantalla 6: Quiz highlight - Cuarto Creciente
  {
    id: "luna-6-highlight",
    trayecto: 1,
    tema: "Fases de la Luna",
    emoji: "🌙",
    kind: "quiz-highlight",
    prompt: "Toca la mitad iluminada en la Luna en cuarto creciente:",
    img: "/Studify/moon-crescent.svg",
    alt: "Luna en cuarto creciente",
    hotspots: [
      { id: "derecha", x: 60, y: 50, r: 25 }
    ],
    explain: "¡Bien hecho! 🌓 En el cuarto creciente, vemos iluminada la mitad derecha de la Luna."
  },

  // ==================== TRAYECTO 2: ANIMALES ====================

  // Pantalla 7: Aprende sobre sistema locomotor
  {
    id: "animales-1-learn",
    trayecto: 2,
    tema: "Sistema Locomotor",
    emoji: "🦴",
    kind: "learn",
    html: `
      <h2>🦴 Sistema Locomotor</h2>
      <p>El sistema locomotor nos permite movernos. Está formado por tres partes importantes:</p>
      <ul>
        <li><strong>🦴 Huesos:</strong> Protegen nuestros órganos y forman el esqueleto</li>
        <li><strong>💪 Músculos:</strong> Jalan los huesos para que nos movamos</li>
        <li><strong>🔗 Articulaciones:</strong> Unen los huesos y nos permiten doblarlos</li>
      </ul>
      <p>Todos los animales vertebrados tienen este sistema que les permite caminar, correr, nadar o volar.</p>
    `,
    media: { img: "/Studify/locomotor-system.svg", alt: "Sistema locomotor" }
  },

  // Pantalla 8: Quiz match - Sistema locomotor
  {
    id: "animales-2-match",
    trayecto: 2,
    tema: "Sistema Locomotor",
    emoji: "🦴",
    kind: "quiz-match",
    prompt: "Une cada parte del sistema locomotor con su función:",
    left: [
      { id: "huesos", label: "🦴 Huesos" },
      { id: "musculos", label: "💪 Músculos" },
      { id: "articulaciones", label: "🔗 Articulaciones" }
    ],
    right: [
      { id: "protegen", label: "Protegen y forman el esqueleto" },
      { id: "jalan", label: "Jalan para movernos" },
      { id: "unen", label: "Unen y permiten doblar" }
    ],
    pairs: {
      "huesos": "protegen",
      "musculos": "jalan",
      "articulaciones": "unen"
    },
    explain: "¡Perfecto! 🎯 Los huesos protegen, los músculos jalan, y las articulaciones unen y permiten movimiento."
  },

  // Pantalla 9: Aprende sobre vertebrados e invertebrados
  {
    id: "animales-3-learn",
    trayecto: 2,
    tema: "Vertebrados e Invertebrados",
    emoji: "🐴",
    kind: "learn",
    html: `
      <h2>🐴 Vertebrados e Invertebrados</h2>
      <p>Los animales se pueden clasificar según tengan o no columna vertebral:</p>

      <h3>🦴 Vertebrados (CON columna vertebral):</h3>
      <ul>
        <li>🐟 Peces</li>
        <li>🐦 Aves</li>
        <li>🦎 Reptiles</li>
        <li>🐸 Anfibios</li>
        <li>🐻 Mamíferos</li>
      </ul>

      <h3>🦋 Invertebrados (SIN columna vertebral):</h3>
      <ul>
        <li>🦋 Insectos (mariposas, abejas)</li>
        <li>🐌 Moluscos (caracoles, pulpos)</li>
        <li>🪱 Gusanos</li>
        <li>🕷️ Arácnidos (arañas)</li>
      </ul>
    `,
    media: { img: "/Studify/vertebrados-invertebrados.svg", alt: "Vertebrados e Invertebrados" }
  },

  // Pantalla 10: Quiz drag-bucket - Clasificar animales
  {
    id: "animales-4-drag-bucket",
    trayecto: 2,
    tema: "Vertebrados e Invertebrados",
    emoji: "🐴",
    kind: "quiz-drag",
    prompt: "Arrastra cada animal a su grupo correcto:",
    mode: "bucket",
    items: [
      { id: "oso", label: "🐻 Oso" },
      { id: "pez", label: "🐟 Pez" },
      { id: "mariposa", label: "🦋 Mariposa" },
      { id: "caracol", label: "🐌 Caracol" },
      { id: "abeja", label: "🐝 Abeja" },
      { id: "delfin", label: "🐬 Delfín" }
    ],
    buckets: [
      { id: "vertebrado", label: "🦴 Vertebrados" },
      { id: "invertebrado", label: "🦋 Invertebrados" }
    ],
    correctBuckets: {
      "oso": "vertebrado",
      "pez": "vertebrado",
      "mariposa": "invertebrado",
      "caracol": "invertebrado",
      "abeja": "invertebrado",
      "delfin": "vertebrado"
    },
    explain: "¡Excelente trabajo! 🎉 Los vertebrados tienen columna vertebral (oso, pez, delfín), mientras que los invertebrados no la tienen (mariposa, caracol, abeja)."
  },

  // Pantalla 11: Quiz choice - Ventaja de vertebrados
  {
    id: "animales-5-choice",
    trayecto: 2,
    tema: "Vertebrados e Invertebrados",
    emoji: "🐴",
    kind: "quiz-choice",
    prompt: "¿Por qué muchos vertebrados pueden crecer más grandes que los invertebrados?",
    options: [
      "Porque comen más",
      "Porque tienen esqueleto interno que soporta el cuerpo",
      "Porque viven más tiempo",
      "Porque corren más rápido"
    ],
    answerIndex: 1,
    explain: "¡Correcto! 🦴 El esqueleto interno de los vertebrados soporta su cuerpo, permitiéndoles crecer más grandes y fuertes."
  },

  // ==================== TRAYECTO 3: MEZCLAS Y SALUD ====================

  // Pantalla 12: Aprende sobre solubilidad
  {
    id: "mezclas-1-learn",
    trayecto: 3,
    tema: "Solubilidad",
    emoji: "🥤",
    kind: "learn",
    html: `
      <h2>🥤 Solubilidad: Soluto y Disolvente</h2>
      <p>Cuando mezclamos sustancias, una se <strong>disuelve</strong> en la otra:</p>

      <ul>
        <li><strong>☕ Soluto:</strong> Es lo que se disuelve (azúcar, sal, chocolate en polvo)</li>
        <li><strong>💧 Disolvente:</strong> Es lo que disuelve al soluto (agua, leche)</li>
      </ul>

      <h3>Ejemplos:</h3>
      <ul>
        <li>🍫 Chocolate en polvo + 🥛 Leche = Chocolatada</li>
        <li>🧂 Sal + 💧 Agua = Agua salada</li>
        <li>🍋 Jugo en polvo + 💧 Agua = Refresco</li>
      </ul>

      <p>El <strong>soluto</strong> es la sustancia en menor cantidad que se disuelve, y el <strong>disolvente</strong> es la sustancia en mayor cantidad.</p>
    `,
    media: { img: "/Studify/solubilidad.svg", alt: "Soluto y disolvente" }
  },

  // Pantalla 13: Quiz choice - Soluto
  {
    id: "mezclas-2-choice",
    trayecto: 3,
    tema: "Solubilidad",
    emoji: "🥤",
    kind: "quiz-choice",
    prompt: "En 'agua con sal', la sal es...",
    options: [
      "El disolvente",
      "El soluto",
      "Una mezcla",
      "Un compuesto"
    ],
    answerIndex: 1,
    explain: "¡Perfecto! 🧂 La sal es el soluto porque es lo que se disuelve. El agua es el disolvente."
  },

  // Pantalla 14: Quiz drag-bucket - Clasificar solutos y disolventes
  {
    id: "mezclas-3-drag-bucket",
    trayecto: 3,
    tema: "Solubilidad",
    emoji: "🥤",
    kind: "quiz-drag",
    prompt: "Clasifica cada sustancia en soluto o disolvente:",
    mode: "bucket",
    items: [
      { id: "azucar", label: "🍬 Azúcar" },
      { id: "agua", label: "💧 Agua" },
      { id: "chocolate", label: "🍫 Chocolate en polvo" },
      { id: "leche", label: "🥛 Leche" },
      { id: "sal", label: "🧂 Sal" },
      { id: "jugo", label: "🍊 Jugo en polvo" }
    ],
    buckets: [
      { id: "soluto", label: "☕ Soluto (se disuelve)" },
      { id: "disolvente", label: "💧 Disolvente (disuelve)" }
    ],
    correctBuckets: {
      "azucar": "soluto",
      "agua": "disolvente",
      "chocolate": "soluto",
      "leche": "disolvente",
      "sal": "soluto",
      "jugo": "soluto"
    },
    explain: "¡Muy bien! 🎯 Los solutos (azúcar, chocolate, sal, jugo) se disuelven en los disolventes (agua, leche)."
  },

  // Pantalla 15: Aprende sobre aceite y agua
  {
    id: "mezclas-4-learn",
    trayecto: 3,
    tema: "Mezclas Inmiscibles",
    emoji: "🥤",
    kind: "learn",
    html: `
      <h2>🥤 Aceite y Agua No se Mezclan</h2>
      <p>No todas las sustancias se pueden mezclar. Algunas son <strong>inmiscibles</strong>.</p>

      <h3>¿Por qué el aceite y el agua no se mezclan?</h3>
      <ul>
        <li>🪶 El aceite es menos denso (más liviano) que el agua</li>
        <li>💧 El agua y el aceite tienen diferentes propiedades químicas</li>
        <li>⬆️ El aceite flota sobre el agua formando capas separadas</li>
      </ul>

      <p><strong>Inmiscibles</strong> significa que dos líquidos no se pueden disolver uno en el otro. Quedan separados en capas.</p>
    `,
    media: { img: "/Studify/aceite-agua.svg", alt: "Aceite y agua separados" }
  },

  // Pantalla 16: Quiz choice - Aceite y agua
  {
    id: "mezclas-5-choice",
    trayecto: 3,
    tema: "Mezclas Inmiscibles",
    emoji: "🥤",
    kind: "quiz-choice",
    prompt: "¿Qué pasa si mezclas aceite y agua?",
    options: [
      "Se disuelven completamente",
      "Forman una mezcla uniforme",
      "No se disuelven; quedan separados",
      "Se evaporan"
    ],
    answerIndex: 2,
    explain: "¡Correcto! 🎯 El aceite y el agua son inmiscibles, por lo que no se disuelven y quedan separados en capas."
  },

  // Pantalla 17: Aprende sobre el agua en la salud
  {
    id: "salud-1-learn",
    trayecto: 3,
    tema: "Agua y Salud",
    emoji: "🚰",
    kind: "learn",
    html: `
      <h2>🚰 El Agua en la Salud</h2>
      <p>El agua es esencial para nuestra vida y salud. Nuestro cuerpo es aproximadamente 60% agua.</p>

      <h3>¿Para qué necesitamos el agua?</h3>
      <ul>
        <li>🍎 <strong>Transporta nutrientes</strong> de los alimentos a todo el cuerpo</li>
        <li>🌡️ <strong>Regula la temperatura</strong> corporal (sudor cuando hace calor)</li>
        <li>🧹 <strong>Elimina desechos</strong> a través de la orina</li>
        <li>💪 Mantiene nuestros músculos y articulaciones saludables</li>
        <li>🧠 Ayuda al cerebro a funcionar mejor</li>
      </ul>

      <p><strong>💧 El agua potable es un derecho humano.</strong> Todos debemos tener acceso a agua limpia y segura.</p>
    `,
    media: { img: "/Studify/agua-salud.svg", alt: "Importancia del agua" }
  },

  // Pantalla 18: Quiz reflect - Reflexión sobre el agua
  {
    id: "salud-2-reflect",
    trayecto: 3,
    tema: "Agua y Salud",
    emoji: "🚰",
    kind: "quiz-reflect",
    prompt: "Reflexiona sobre estas preguntas:",
    choices: [
      "¿Qué actividades se afectan sin agua en casa? (a) Bañarse (b) Cocinar (c) Lavar dientes (d) Todas las anteriores",
      "¿Cuál es una acción correcta para cuidar el agua? (a) Dejar la llave abierta (b) Cerrar la llave y reparar fugas (c) Usar mucha agua (d) No importa"
    ],
    explain: "¡Excelente reflexión! 💧 Sin agua no podemos hacer muchas actividades diarias. Es importante cerrar las llaves y reparar fugas para cuidar este recurso tan valioso."
  }
];

// Helper para obtener pantallas por trayecto
export function getScreensByTrayecto(trayecto: Trayecto): Screen[] {
  return screens.filter(s => s.trayecto === trayecto);
}

// Helper para obtener el emoji del sticker por trayecto
export function getStickerByTrayecto(trayecto: Trayecto): string {
  switch (trayecto) {
    case 1: return "🌙";
    case 2: return "🦴";
    case 3: return "🚰";
  }
}

// Títulos de trayectos
export const trayectoTitles: Record<Trayecto, string> = {
  1: "La Luna",
  2: "Animales",
  3: "Mezclas y Salud"
};

// ==================== PANTALLAS ADICIONALES ====================
export const EXTRA_SCREENS: Array<
  LearnScreen | QuizChoice | QuizDrag | QuizMatch | QuizHighlight | QuizReflect
> = [
  // ======== TRAYECTO 1 — LUNA ========
  {
    id: "t1-fases-aprende-sombra",
    trayecto: 1,
    tema: "Fases de la Luna",
    emoji: "🌙",
    kind: "learn",
    html:
      "<p><b>¿Por qué cambia la 'forma' de la Luna?</b> Porque vemos distinta <b>parte iluminada</b> por el Sol.</p>" +
      "<ul><li>Si vemos poca luz → fase <i>delgada</i>.</li><li>Si vemos toda la luz → <b>luna llena</b>.</li><li>La sombra es la parte que no recibe luz.</li></ul>"
  },
  {
    id: "t1-fases-empata-descripcion",
    trayecto: 1,
    tema: "Fases de la Luna",
    emoji: "🌙",
    kind: "quiz-match",
    prompt: "Une cada fase con su descripción.",
    left: [
      { id: "nueva", label: "Luna nueva" },
      { id: "crec", label: "Cuarto creciente" },
      { id: "llena", label: "Luna llena" },
      { id: "meng", label: "Cuarto menguante" }
    ],
    right: [
      { id: "d-nueva", label: "No se ve la parte iluminada." },
      { id: "d-crec", label: "Vemos la mitad derecha iluminada." },
      { id: "d-llena", label: "Se ve completamente iluminada." },
      { id: "d-meng", label: "Vemos la mitad izquierda iluminada." }
    ],
    pairs: {
      nueva: "d-nueva",
      crec: "d-crec",
      llena: "d-llena",
      meng: "d-meng"
    },
    explain: "Cada fase describe cuánta luz vemos desde la Tierra."
  },
  {
    id: "t1-fases-orden-inverso",
    trayecto: 1,
    tema: "Fases de la Luna",
    emoji: "🌙",
    kind: "quiz-drag",
    prompt: "Ordena las fases de la Luna de <b>Llena → Nueva</b>.",
    mode: "sort",
    items: [
      { id: "llena", label: "Luna llena" },
      { id: "meng", label: "Cuarto menguante" },
      { id: "nueva", label: "Luna nueva" },
      { id: "crec", label: "Cuarto creciente" }
    ],
    correctOrder: ["llena", "meng", "nueva", "crec"],
    explain: "Después de la luna llena viene menguante, luego nueva y vuelve a crecer."
  },
  {
    id: "t1-caras-aprende-crateres",
    trayecto: 1,
    tema: "Caras de la Luna",
    emoji: "🌝",
    kind: "learn",
    html:
      "<p>La Luna tiene <b>cara visible</b> (la que vemos) y <b>cara oculta</b>. Gracias a la <b>rotación sincrónica</b>, siempre vemos la misma cara.</p>" +
      "<p>La Luna tiene <b>cráteres</b> porque meteoritos chocaron contra su superficie.</p>"
  },
  {
    id: "t1-caras-verdadero-falso",
    trayecto: 1,
    tema: "Caras de la Luna",
    emoji: "🌝",
    kind: "quiz-choice",
    prompt: "Verdadero o falso: desde la Tierra <b>siempre</b> vemos la misma cara de la Luna.",
    options: ["Verdadero", "Falso"],
    answerIndex: 0,
    explain: "Es verdadero por la rotación sincrónica."
  },
  {
    id: "t1-caras-highlight-creciente",
    trayecto: 1,
    tema: "Caras de la Luna",
    emoji: "🌝",
    kind: "quiz-highlight",
    prompt: "Toca la <b>parte iluminada</b> de la Luna en <i>cuarto creciente</i>.",
    img: "/Studify/moon-crescent.svg",
    alt: "Disco lunar con iluminación lateral",
    hotspots: [{ id: "lado-derecho", x: 72, y: 50, r: 22 }],
    explain: "En el cuarto creciente se ilumina el lado derecho."
  },

  // ======== TRAYECTO 2 — ANIMALES ========
  {
    id: "t2-locomotor-aprende-movimientos",
    trayecto: 2,
    tema: "Sistema locomotor",
    emoji: "🐴",
    kind: "learn",
    html:
      "<p>¡Moverse es vivir! Huesos forman el esqueleto, músculos jalan los huesos y las articulaciones permiten doblar.</p>" +
      "<ul><li>Sin articulaciones no podríamos doblar codos o rodillas.</li><li>Los músculos necesitan <b>descanso</b> y <b>agua</b> para funcionar bien.</li></ul>"
  },
  {
    id: "t2-locomotor-une-funciones",
    trayecto: 2,
    tema: "Sistema locomotor",
    emoji: "🐴",
    kind: "quiz-match",
    prompt: "Une la parte del sistema con su función.",
    left: [
      { id: "h", label: "Huesos" },
      { id: "m", label: "Músculos" },
      { id: "a", label: "Articulaciones" }
    ],
    right: [
      { id: "h-f", label: "Forman el esqueleto y protegen órganos." },
      { id: "m-f", label: "Jalan los huesos para movernos." },
      { id: "a-f", label: "Unen huesos y permiten doblar." }
    ],
    pairs: { h: "h-f", m: "m-f", a: "a-f" },
    explain: "Cada parte cumple una tarea distinta pero trabajan juntas."
  },
  {
    id: "t2-aves-movilidad-choice",
    trayecto: 2,
    tema: "Movilidad de aves",
    emoji: "🕊️",
    kind: "quiz-choice",
    prompt: "El pingüino: ¿camina, vuela o nada?",
    options: ["Camina", "Vuela", "Nada", "Camina y nada"],
    answerIndex: 3,
    explain: "El pingüino camina y nada, pero no vuela."
  },
  {
    id: "t2-verte-inverte-aprende-ejemplos",
    trayecto: 2,
    tema: "Vertebrados vs. Invertebrados",
    emoji: "🐻🦋",
    kind: "learn",
    html:
      "<p><b>Vertebrados</b>: tienen columna (oso, delfín, águila).</p>" +
      "<p><b>Invertebrados</b>: sin columna (mariposa, abeja, caracol, gusano).</p>"
  },
  {
    id: "t2-verte-inverte-drag-bucket",
    trayecto: 2,
    tema: "Clasificación animal",
    emoji: "🐾",
    kind: "quiz-drag",
    prompt: "Arrastra a cada grupo: <b>Vertebrado</b> o <b>Invertebrado</b>.",
    mode: "bucket",
    items: [
      { id: "oso", label: "Oso" },
      { id: "mariposa", label: "Mariposa" },
      { id: "caracol", label: "Caracol" },
      { id: "abeja", label: "Abeja" },
      { id: "delfin", label: "Delfín" },
      { id: "pez", label: "Pez" }
    ],
    buckets: [
      { id: "v", label: "Vertebrado" },
      { id: "i", label: "Invertebrado" }
    ],
    correctBuckets: {
      oso: "v",
      delfin: "v",
      pez: "v",
      mariposa: "i",
      abeja: "i",
      caracol: "i"
    },
    explain: "Los vertebrados tienen columna; insectos y moluscos no."
  },
  {
    id: "t2-verte-razon-tamano",
    trayecto: 2,
    tema: "Vertebrados",
    emoji: "🦴",
    kind: "quiz-choice",
    prompt: "¿Por qué muchos vertebrados pueden crecer más grandes?",
    options: [
      "Porque comen más azúcar",
      "Porque tienen esqueleto interno que los sostiene",
      "Porque viven en el agua"
    ],
    answerIndex: 1,
    explain: "El esqueleto interno soporta el peso del cuerpo."
  },

  // ======== TRAYECTO 3 — MEZCLAS Y SALUD ========
  {
    id: "t3-solubilidad-aprende-temp",
    trayecto: 3,
    tema: "Solubilidad y temperatura",
    emoji: "🥤",
    kind: "learn",
    html:
      "<p>El <b>soluto</b> es lo que se disuelve (sal, azúcar). El <b>disolvente</b> es el líquido (agua, leche).</p>" +
      "<p>El agua <b>caliente</b> puede disolver más rápido algunos solutos.</p>"
  },
  {
    id: "t3-solubilidad-drag-clasifica",
    trayecto: 3,
    tema: "Clasifica soluto/disolvente",
    emoji: "🧪",
    kind: "quiz-drag",
    prompt: "Arrastra cada elemento a <b>Soluto</b> o <b>Disolvente</b>.",
    mode: "bucket",
    items: [
      { id: "azucar", label: "Azúcar" },
      { id: "choco", label: "Chocolate en polvo" },
      { id: "sal", label: "Sal" },
      { id: "jugo", label: "Jugo en polvo" },
      { id: "agua", label: "Agua" },
      { id: "leche", label: "Leche" }
    ],
    buckets: [
      { id: "soluto", label: "Soluto" },
      { id: "disolvente", label: "Disolvente" }
    ],
    correctBuckets: {
      azucar: "soluto",
      choco: "soluto",
      sal: "soluto",
      jugo: "soluto",
      agua: "disolvente",
      leche: "disolvente"
    },
    explain: "Lo que se disuelve es el soluto; el líquido que disuelve es el disolvente."
  },
  {
    id: "t3-aceite-agua-choice",
    trayecto: 3,
    tema: "Aceite y agua",
    emoji: "🫗",
    kind: "quiz-choice",
    prompt: "¿Qué ocurre al mezclar aceite y agua?",
    options: [
      "Se disuelven y queda un solo líquido",
      "No se mezclan; quedan separados",
      "El aceite se vuelve sólido"
    ],
    answerIndex: 1,
    explain: "Aceite y agua son inmiscibles y forman capas."
  },
  {
    id: "t3-agua-salud-aprende-habitos",
    trayecto: 3,
    tema: "El agua en la salud",
    emoji: "🚰",
    kind: "learn",
    html:
      "<p>Beber agua ayuda a transportar nutrientes, regular la temperatura y eliminar desechos.</p>" +
      "<ul><li>Prefiere agua simple.</li><li>Lleva tu botella.</li><li>Cierra la llave al cepillarte.</li></ul>"
  },
  {
    id: "t3-agua-salud-reflex-act",
    trayecto: 3,
    tema: "Cuidado del agua",
    emoji: "💧",
    kind: "quiz-reflect",
    prompt: "¿Qué acciones ayudan a cuidar el agua?",
    choices: [
      "Cerrar la llave mientras te cepillas",
      "Reparar fugas",
      "Bañarte 30 minutos (¡no!)",
      "Usar una cubeta para lavar el coche"
    ],
    explain: "Ahorrar agua cuida la salud y el planeta."
  },
  {
    id: "t3-sin-agua-choice-actividades",
    trayecto: 3,
    tema: "Sin agua en casa",
    emoji: "🏠",
    kind: "quiz-choice",
    prompt: "¿Qué actividades se afectan sin agua en casa?",
    options: ["Bañarse", "Cocinar", "Lavar dientes", "Todas las anteriores"],
    answerIndex: 3,
    explain: "Muchas actividades diarias dependen del agua."
  }
];

// Export combined screens array
export const ALL_SCREENS = [...screens, ...EXTRA_SCREENS];
