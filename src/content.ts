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
    media: { img: "/moon-phases.svg", alt: "Fases de la Luna" }
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
    media: { img: "/moon-rotation.svg", alt: "Rotación sincrónica de la Luna" }
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
    img: "/moon-crescent.svg",
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
    media: { img: "/locomotor-system.svg", alt: "Sistema locomotor" }
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
    media: { img: "/vertebrados-invertebrados.svg", alt: "Vertebrados e Invertebrados" }
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
    media: { img: "/solubilidad.svg", alt: "Soluto y disolvente" }
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
    media: { img: "/aceite-agua.svg", alt: "Aceite y agua separados" }
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
    media: { img: "/agua-salud.svg", alt: "Importancia del agua" }
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
