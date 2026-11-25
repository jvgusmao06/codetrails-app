export type Locale = "pt" | "en" | "es" | "zh" | "hi" | "fr" | "ar" | "ru";

export const SUPPORTED_LOCALES: {
  code: Locale;
  label: string;
  flag: string;
}[] = [
  { code: "pt", label: "Português", flag: "🇧🇷" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

export interface UIDictionary {
  nav: {
    roadmap: string;
    catalog: string;
    stats: string;
    contribute: string;
    telemetry: string;
  };
  categories: {
    all: string;
    language: string;
    framework: string;
    library: string;
    tool: string;
    concept: string;
  };
  roadmap: {
    availableTracks: string;
    ecosystemTracks: string;
    prerequisitesLabel: string;
    prereqMet: string;
    prereqPending: string;
    backToBaseLanguage: string;
    iAlreadyKnowThis: string;
    masteredBadge: string;
    undoMastered: string;
    practiceArenaTitle: string;
    practiceArenaSubtitle: string;
    startPracticeArena: string;
    unlockPrerequisiteInstant: string;
    viewAll: string;
    progress: string;
    completed: string;
    nextStep: string;
    steps: string;
    review: string;
    run: string;
    practice: string;
    maintainer: string;
  };
  catalog: {
    title: string;
    subtitle: string;
    newTrackPr: string;
    lessonsCount: string;
    selected: string;
    openRoadmap: string;
  };
  player: {
    step: string;
    theoryBadge: string;
    practiceModeBadge: string;
    skipTheory: string;
    keyTakeaways: string;
    gotItContinue: string;
    runTest: string;
    nextStep: string;
    waitingExecution: string;
    testPassed: string;
    testFailed: string;
    suggestedTokens: string;
    moduleCompiled: string;
    completedChecks: string;
    reward: string;
    integrity: string;
    backToRoadmap: string;
  };
  community: {
    badge: string;
    title: string;
    description: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
    generatorTitle: string;
    generatorSubtitle: string;
    copyJson: string;
    copied: string;
  };
  common: {
    whyLearn: string;
    requirement: string;
    searchPlaceholder: string;
    loading: string;
    lesson: string;
    theory: string;
    exercisesShort: string;
    unlockPrereqs: string;
    hint: string;
    reset: string;
    viewSolution: string;
    referenceSolution: string;
    editorPlaceholder: string;
    toggleModeTitle: string;
    skipTheoryTitle: string;
    reminderTitle: string;
    reminderDescNative: string;
    reminderDescWeb: string;
    reminderNotifTitle: string;
    reminderNotifBody: string;
    reminderTimeLabel: string;
    enabled: string;
    disabled: string;
    permissionDenied: string;
  };
}

export const UI_DICTIONARIES: Record<Locale, UIDictionary> = {
  pt: {
    nav: {
      roadmap: "Roadmap",
      catalog: "Catálogo",
      stats: "Estatísticas",
      contribute: "Contribuir",
      telemetry: "Telemetria Local",
    },
    categories: {
      all: "Todas",
      language: "Linguagem",
      framework: "Framework",
      library: "Biblioteca",
      tool: "Ferramenta",
      concept: "Conceito CS",
    },
    roadmap: {
      availableTracks: "Linguagens Base",
      ecosystemTracks: "Frameworks & Bibliotecas desta Linguagem",
      prerequisitesLabel: "Pré-requisitos",
      prereqMet: "Desbloqueado",
      prereqPending: "Requer concluir:",
      backToBaseLanguage: "Voltar para a linguagem base",
      iAlreadyKnowThis: "Já domino esta tecnologia",
      masteredBadge: "Proficiência Declarada",
      undoMastered: "Voltar ao modo guiado",
      practiceArenaTitle: "Arena de Prática Direta (Sem Teoria)",
      practiceArenaSubtitle:
        "Como você já conhece esta tecnologia, todos os pré-requisitos dependentes foram liberados e você pode treinar diretamente nos desafios práticos.",
      startPracticeArena: "Treinar Apenas Exercícios",
      unlockPrerequisiteInstant: "Já domino",
      viewAll: "Ver catálogo completo",
      progress: "PROGRESSO",
      completed: "Concluída",
      nextStep: "Próximo Passo",
      steps: "etapas",
      review: "Revisar",
      run: "Executar",
      practice: "Só Praticar",
      maintainer: "mantenedor",
    },
    catalog: {
      title: "Catálogo de Trilhas Modular",
      subtitle:
        "Linguagens base (Python, Java, C/C++, TS/JS) e tecnologias da stack deste projeto.",
      newTrackPr: "Nova Trilha via PR",
      lessonsCount: "lições",
      selected: "Selecionada",
      openRoadmap: "Abrir Roadmap",
    },
    player: {
      step: "etapa",
      theoryBadge: "Conceito & Teoria",
      practiceModeBadge: "Modo Prática Direta (Sem Teoria)",
      skipTheory: "Pular Teoria",
      keyTakeaways: "Pontos-Chave para Lembrar",
      gotItContinue: "Entendi, Ir para Prática",
      runTest: "Executar Teste",
      nextStep: "Próxima Etapa",
      waitingExecution: "Aguardando execução da etapa...",
      testPassed: "✓ Mandou bem!",
      testFailed: "Quase lá — veja a dica e ajuste!",
      suggestedTokens:
        "Tokens sugeridos (toque para inserir ou digite no editor):",
      moduleCompiled: "Missão Concluída!",
      completedChecks: "Você dominou todas as etapas de",
      reward: "Recompensa",
      integrity: "Melhor Combo",
      backToRoadmap: "Voltar ao Roadmap",
    },
    community: {
      badge: "Governança Aberta via Git",
      title: "Crie e Aprove Trilhas pela Comunidade",
      description:
        "No CodeTrails, qualquer pessoa pode criar uma trilha de linguagem, biblioteca ou framework. Todas as lições incluem passos teóricos e exercícios JSON validados automaticamente por schema Zod via Pull Request.",
      step1Title: "1. Crie o JSON em /content",
      step1Desc:
        "Adicione sua pasta em content/tracks/<sua-trilha> com track.json e as lições.",
      step2Title: "2. Valide Localmente",
      step2Desc:
        "Rode npm run validate:tracks para testar a teoria, lacunas e índices de resposta.",
      step3Title: "3. Abra um Pull Request",
      step3Desc:
        "O GitHub Actions valida sua trilha automaticamente e a comunidade revisa a didática.",
      generatorTitle: "Gerador Rápido de Lição (Teoria + Prática)",
      generatorSubtitle:
        "Monte uma lição com introdução teórica e exercício prático para colar no seu Pull Request.",
      copyJson: "Copiar JSON",
      copied: "Copiado!",
    },
    common: {
      whyLearn: "Por que aprender",
      requirement: "Requisito",
      searchPlaceholder:
        "Buscar linguagem, framework ou conceito (ex: Rust, Gin, Pandas, SQL, ORM...)",
      loading: "Carregando...",
      lesson: "Lição",
      theory: "Teoria",
      exercisesShort: "Ex.",
      unlockPrereqs: "Liberar Pré-requisitos",
      hint: "dica",
      reset: "reiniciar",
      viewSolution: "Ver solução",
      referenceSolution: "Solução de referência:",
      editorPlaceholder: "// Escreva seu código do zero aqui...",
      toggleModeTitle:
        "Alternar entre Modo Guiado (com Teoria) e Modo Só Prática",
      skipTheoryTitle: "Pular explicação teórica e ir direto para os exercícios",
      reminderTitle: "Lembrete Diário de Ofensiva",
      reminderDescNative:
        "Receba uma notificação local todo dia para manter sua ofensiva.",
      reminderDescWeb:
        "Preferência salva localmente. As notificações disparam no app Android/iOS.",
      reminderNotifTitle: "Hora de praticar no CodeTrails!",
      reminderNotifBody:
        "Mantenha sua ofensiva diária completando uma lição rápida.",
      reminderTimeLabel: "Horário do lembrete",
      enabled: "Ativado",
      disabled: "Desativado",
      permissionDenied: "Permissão de notificação negada no dispositivo.",
    },
  },
  en: {
    nav: {
      roadmap: "Roadmap",
      catalog: "Catalog",
      stats: "Stats",
      contribute: "Contribute",
      telemetry: "Local Telemetry",
    },
    categories: {
      all: "All",
      language: "Language",
      framework: "Framework",
      library: "Library",
      tool: "Tool",
      concept: "CS Concept",
    },
    roadmap: {
      availableTracks: "Base Languages",
      ecosystemTracks: "Frameworks & Libraries for this Language",
      prerequisitesLabel: "Prerequisites",
      prereqMet: "Unlocked",
      prereqPending: "Requires completing:",
      backToBaseLanguage: "Back to base language",
      iAlreadyKnowThis: "I already know this",
      masteredBadge: "Declared Proficiency",
      undoMastered: "Switch to guided mode",
      practiceArenaTitle: "Direct Practice Arena (No Theory)",
      practiceArenaSubtitle:
        "Since you already know this technology, dependent prerequisites are unlocked and you can jump straight into coding exercises.",
      startPracticeArena: "Practice Exercises Only",
      unlockPrerequisiteInstant: "I already know",
      viewAll: "View full catalog",
      progress: "PROGRESS",
      completed: "Completed",
      nextStep: "Next Step",
      steps: "steps",
      review: "Review",
      run: "Run",
      practice: "Practice Only",
      maintainer: "maintainer",
    },
    catalog: {
      title: "Modular Tracks Catalog",
      subtitle:
        "Core languages (Python, Java, C/C++, TS/JS) and every technology powering this app.",
      newTrackPr: "New Track via PR",
      lessonsCount: "lessons",
      selected: "Selected",
      openRoadmap: "Open Roadmap",
    },
    player: {
      step: "step",
      theoryBadge: "Concept & Theory",
      practiceModeBadge: "Direct Practice Mode (No Theory)",
      skipTheory: "Skip Theory",
      keyTakeaways: "Key Takeaways",
      gotItContinue: "Got It, Start Practice",
      runTest: "Run Check",
      nextStep: "Next Step",
      waitingExecution: "Waiting for step execution...",
      testPassed: "✓ Nice work!",
      testFailed: "Almost there — check the tip and adjust!",
      suggestedTokens: "Suggested tokens (tap to insert or type in editor):",
      moduleCompiled: "Mission Complete!",
      completedChecks: "You completed all steps for",
      reward: "Reward",
      integrity: "Best Combo",
      backToRoadmap: "Back to Roadmap",
    },
    community: {
      badge: "Open Git Governance",
      title: "Create & Approve Community Tracks",
      description:
        "In CodeTrails, anyone can create a language, library, or framework track. Every lesson supports theory briefings and interactive exercises validated by Zod via Pull Request.",
      step1Title: "1. Create JSON in /content",
      step1Desc:
        "Add your folder in content/tracks/<your-track> with track.json and lessons.",
      step2Title: "2. Validate Locally",
      step2Desc:
        "Run npm run validate:tracks to check theory blocks, blanks, and answer indices.",
      step3Title: "3. Open a Pull Request",
      step3Desc:
        "GitHub Actions validates your schema and the community reviews the curriculum.",
      generatorTitle: "Quick Lesson Builder (Theory + Practice)",
      generatorSubtitle:
        "Build a lesson with a theory briefing and exercise ready to paste into your PR.",
      copyJson: "Copy JSON",
      copied: "Copied!",
    },
    common: {
      whyLearn: "Why learn it",
      requirement: "Requirement",
      searchPlaceholder:
        "Search a language, framework or concept (e.g. Rust, Gin, Pandas, SQL, ORM...)",
      loading: "Loading...",
      lesson: "Lesson",
      theory: "Theory",
      exercisesShort: "Ex.",
      unlockPrereqs: "Unlock Prerequisites",
      hint: "hint",
      reset: "reset",
      viewSolution: "Show solution",
      referenceSolution: "Reference solution:",
      editorPlaceholder: "// Write your code from scratch here...",
      toggleModeTitle:
        "Toggle between Guided Mode (with Theory) and Practice-Only Mode",
      skipTheoryTitle: "Skip the theory and go straight to the exercises",
      reminderTitle: "Daily Streak Reminder",
      reminderDescNative:
        "Get a daily local notification to keep your streak alive.",
      reminderDescWeb:
        "Preference saved locally. Notifications fire on the Android/iOS app.",
      reminderNotifTitle: "Time to practice on CodeTrails!",
      reminderNotifBody: "Keep your daily streak alive with a quick lesson.",
      reminderTimeLabel: "Reminder time",
      enabled: "Enabled",
      disabled: "Disabled",
      permissionDenied: "Notification permission denied on this device.",
    },
  },
  es: {
    nav: {
      roadmap: "Ruta",
      catalog: "Catálogo",
      stats: "Estadísticas",
      contribute: "Contribuir",
      telemetry: "Telemetría Local",
    },
    categories: {
      all: "Todas",
      language: "Lenguaje",
      framework: "Framework",
      library: "Librería",
      tool: "Herramienta",
      concept: "Concepto CS",
    },
    roadmap: {
      availableTracks: "Lenguajes Base",
      ecosystemTracks: "Frameworks y Librerías de este Lenguaje",
      prerequisitesLabel: "Prerrequisitos",
      prereqMet: "Desbloqueado",
      prereqPending: "Requiere completar:",
      backToBaseLanguage: "Volver al lenguaje base",
      iAlreadyKnowThis: "Ya domino esta tecnología",
      masteredBadge: "Competencia Declarada",
      undoMastered: "Volver al modo guiado",
      practiceArenaTitle: "Arena de Práctica Directa (Sin Teoría)",
      practiceArenaSubtitle:
        "Como ya dominas esta tecnología, se desbloquearon sus prerrequisitos y puedes entrenar directamente en los ejercicios.",
      startPracticeArena: "Entrenar Solo Ejercicios",
      unlockPrerequisiteInstant: "Ya sé",
      viewAll: "Ver catálogo completo",
      progress: "PROGRESO",
      completed: "Completada",
      nextStep: "Siguiente Paso",
      steps: "pasos",
      review: "Repasar",
      run: "Ejecutar",
      practice: "Solo Practicar",
      maintainer: "mantenedor",
    },
    catalog: {
      title: "Catálogo Modular de Rutas",
      subtitle:
        "Lenguajes base (Python, Java, C/C++, TS/JS) y las tecnologías usadas en esta app.",
      newTrackPr: "Nueva Ruta vía PR",
      lessonsCount: "lecciones",
      selected: "Seleccionada",
      openRoadmap: "Abrir Ruta",
    },
    player: {
      step: "paso",
      theoryBadge: "Concepto y Teoría",
      practiceModeBadge: "Modo Práctica Directa (Sin Teoría)",
      skipTheory: "Saltar Teoría",
      keyTakeaways: "Puntos Clave para Recordar",
      gotItContinue: "Entendido, Ir a la Práctica",
      runTest: "Ejecutar Prueba",
      nextStep: "Siguiente Paso",
      waitingExecution: "Esperando ejecución del paso...",
      testPassed: "✓ Prueba superada",
      testFailed: "✗ Fallo en la verificación",
      suggestedTokens:
        "Tokens sugeridos (toca para insertar o escribe en el editor):",
      moduleCompiled: "¡Módulo Compilado con Éxito!",
      completedChecks: "Has completado todas las verificaciones de",
      reward: "Recompensa",
      integrity: "Integridad",
      backToRoadmap: "Volver a la Ruta",
    },
    community: {
      badge: "Gobernanza Abierta vía Git",
      title: "Crea y Aprueba Rutas en Comunidad",
      description:
        "En CodeTrails, cualquier persona puede crear una ruta de lenguaje, librería o framework con pasos teóricos y ejercicios validados por Zod mediante Pull Request.",
      step1Title: "1. Crea el JSON en /content",
      step1Desc:
        "Añade tu carpeta en content/tracks/<tu-ruta> con track.json y las lecciones.",
      step2Title: "2. Valida Localmente",
      step2Desc:
        "Ejecuta npm run validate:tracks para probar la teoría y las respuestas.",
      step3Title: "3. Abre un Pull Request",
      step3Desc:
        "GitHub Actions valida tu ruta automáticamente y la comunidad revisa el contenido.",
      generatorTitle: "Generador Rápido de Lección (Teoría + Práctica)",
      generatorSubtitle:
        "Arma una lección con introducción teórica y ejercicio para tu Pull Request.",
      copyJson: "Copiar JSON",
      copied: "¡Copiado!",
    },
    common: {
      whyLearn: "Por qué aprenderlo",
      requirement: "Requisito",
      searchPlaceholder:
        "Buscar lenguaje, framework o concepto (ej: Rust, Gin, Pandas, SQL, ORM...)",
      loading: "Cargando...",
      lesson: "Lección",
      theory: "Teoría",
      exercisesShort: "Ej.",
      unlockPrereqs: "Desbloquear Prerrequisitos",
      hint: "pista",
      reset: "reiniciar",
      viewSolution: "Ver solución",
      referenceSolution: "Solución de referencia:",
      editorPlaceholder: "// Escribe tu código desde cero aquí...",
      toggleModeTitle:
        "Alternar entre Modo Guiado (con Teoría) y Modo Solo Práctica",
      skipTheoryTitle: "Saltar la teoría e ir directo a los ejercicios",
      reminderTitle: "Recordatorio Diario de Racha",
      reminderDescNative:
        "Recibe una notificación local cada día para mantener tu racha.",
      reminderDescWeb:
        "Preferencia guardada localmente. Las notificaciones se envían en la app Android/iOS.",
      reminderNotifTitle: "¡Hora de practicar en CodeTrails!",
      reminderNotifBody:
        "Mantén tu racha diaria completando una lección rápida.",
      reminderTimeLabel: "Hora del recordatorio",
      enabled: "Activado",
      disabled: "Desactivado",
      permissionDenied: "Permiso de notificaciones denegado en el dispositivo.",
    },
  },
  zh: {
    nav: {
      roadmap: "学习路线",
      catalog: "课程目录",
      stats: "学习统计",
      contribute: "社区贡献",
      telemetry: "本地状态",
    },
    categories: {
      all: "全部",
      language: "编程语言",
      framework: "框架",
      library: "核心库",
      tool: "工具",
      concept: "计算机基础",
    },
    roadmap: {
      availableTracks: "基础编程语言",
      ecosystemTracks: "该语言的专属框架与核心库",
      prerequisitesLabel: "前置要求",
      prereqMet: "已解锁",
      prereqPending: "需先完成：",
      backToBaseLanguage: "返回基础语言",
      iAlreadyKnowThis: "我已掌握该技术（跳过理论）",
      masteredBadge: "已声明掌握",
      undoMastered: "恢复引导学习模式",
      practiceArenaTitle: "纯实战训练场（无理论讲解）",
      practiceArenaSubtitle:
        "由于你已掌握该技术，相关前置限制已全部解锁，可直接进行代码练习。",
      startPracticeArena: "仅练习实战题",
      unlockPrerequisiteInstant: "我已掌握",
      viewAll: "查看完整目录",
      progress: "当前进度",
      completed: "已完成",
      nextStep: "下一步",
      steps: "步骤",
      review: "复习",
      run: "开始学习",
      practice: "纯练习",
      maintainer: "维护者",
    },
    catalog: {
      title: "模块化编程课程目录",
      subtitle:
        "涵盖主流语言（Python、Java、C/C++、TS/JS）以及构建本应用所使用的全部技术栈。",
      newTrackPr: "通过 PR 提交新课程",
      lessonsCount: "课时",
      selected: "已选择",
      openRoadmap: "打开路线图",
    },
    player: {
      step: "步骤",
      theoryBadge: "核心概念与理论讲解",
      practiceModeBadge: "纯实战练习模式（已跳过理论）",
      skipTheory: "跳过理论",
      keyTakeaways: "核心要点总结",
      gotItContinue: "已理解，进入实战练习",
      runTest: "运行验证",
      nextStep: "下一步",
      waitingExecution: "等待执行验证...",
      testPassed: "✓ 验证通过",
      testFailed: "✗ 验证未通过",
      suggestedTokens: "候选代码片段（点击插入或直接在编辑器中输入）：",
      moduleCompiled: "模块编译完成！",
      completedChecks: "你已完成该课时的全部理论与练习：",
      reward: "获得经验",
      integrity: "编译完整度",
      backToRoadmap: "返回学习路线",
    },
    community: {
      badge: "Git 开源社区治理",
      title: "由社区共同创建与审核课程",
      description:
        "在 CodeTrails 中，任何人都可以创建语言、库或框架教程。所有课时均包含理论讲解与互动练习，并通过 Pull Request 和 Zod 自动校验。",
      step1Title: "1. 在 /content 下创建 JSON",
      step1Desc: "在 content/tracks/<课程名> 中添加 track.json 和课时文件。",
      step2Title: "2. 本地校验",
      step2Desc: "运行 npm run validate:tracks 验证理论步骤与填空答案。",
      step3Title: "3. 提交 Pull Request",
      step3Desc: "GitHub Actions 自动校验格式，社区审核教学质量。",
      generatorTitle: "快速课时生成器（理论 + 练习）",
      generatorSubtitle: "在线编写理论介绍与代码填空题，一键复制 JSON 用于 PR。",
      copyJson: "复制 JSON",
      copied: "已复制！",
    },
    common: {
      whyLearn: "为什么要学",
      requirement: "前置要求",
      searchPlaceholder: "搜索语言、框架或概念（如：Rust、Gin、Pandas、SQL、ORM...）",
      loading: "加载中...",
      lesson: "课时",
      theory: "理论",
      exercisesShort: "练习",
      unlockPrereqs: "解锁前置课程",
      hint: "提示",
      reset: "重置",
      viewSolution: "查看答案",
      referenceSolution: "参考答案：",
      editorPlaceholder: "// 在这里从零开始编写代码...",
      toggleModeTitle: "在引导模式（含理论）与纯练习模式之间切换",
      skipTheoryTitle: "跳过理论讲解，直接进入练习",
      reminderTitle: "每日连续学习提醒",
      reminderDescNative: "每天接收一条本地通知，保持连续学习记录。",
      reminderDescWeb: "偏好已保存在本地。通知将在 Android/iOS 应用中发送。",
      reminderNotifTitle: "该在 CodeTrails 练习了！",
      reminderNotifBody: "完成一节简短课程，保持你的每日连胜。",
      reminderTimeLabel: "提醒时间",
      enabled: "已开启",
      disabled: "已关闭",
      permissionDenied: "设备已拒绝通知权限。",
    },
  },
  hi: {
    nav: {
      roadmap: "रोडमैप",
      catalog: "कैटलॉग",
      stats: "आँकड़े",
      contribute: "योगदान दें",
      telemetry: "लोकल टेलीमेट्री",
    },
    categories: {
      all: "सभी",
      language: "प्रोग्रामिंग भाषा",
      framework: "फ़्रेमवर्क",
      library: "लाइब्रेरी",
      tool: "टूल",
      concept: "कंप्यूटर विज्ञान",
    },
    roadmap: {
      availableTracks: "मुख्य भाषाएँ (Base Languages)",
      ecosystemTracks: "इस भाषा के फ़्रेमवर्क और लाइब्रेरी",
      prerequisitesLabel: "आवश्यक शर्तें (Prerequisites)",
      prereqMet: "अनलॉक",
      prereqPending: "पहले इसे पूरा करें:",
      backToBaseLanguage: "मुख्य भाषा पर वापस जाएँ",
      iAlreadyKnowThis: "मैं यह तकनीक पहले से जानता हूँ",
      masteredBadge: "दक्षता घोषित (Mastered)",
      undoMastered: "गाइडेड मोड में वापस जाएँ",
      practiceArenaTitle: "सीधा अभ्यास क्षेत्र (बिना थ्योरी)",
      practiceArenaSubtitle:
        "चूंकि आप यह तकनीक जानते हैं, सभी शर्तें अनलॉक कर दी गई हैं और आप सीधे अभ्यास कर सकते हैं।",
      startPracticeArena: "केवल अभ्यास करें",
      unlockPrerequisiteInstant: "मैं जानता हूँ",
      viewAll: "पूरा कैटलॉग देखें",
      progress: "प्रगति",
      completed: "पूर्ण",
      nextStep: "अगला चरण",
      steps: "चरण",
      review: "रिव्यू करें",
      run: "शुरू करें",
      practice: "केवल अभ्यास",
      maintainer: "निर्माता",
    },
    catalog: {
      title: "मॉड्यूलर प्रोग्रामिंग कैटलॉग",
      subtitle:
        "प्रमुख भाषाएँ (Python, Java, C/C++, TS/JS) और इस ऐप में उपयोग की गई प्रत्येक तकनीक।",
      newTrackPr: "PR द्वारा नया ट्रैक जोड़ें",
      lessonsCount: "पाठ",
      selected: "चयनित",
      openRoadmap: "रोडमैप खोलें",
    },
    player: {
      step: "चरण",
      theoryBadge: "सिद्धांत और अवधारणा (Theory)",
      practiceModeBadge: "सीधा अभ्यास मोड (No Theory)",
      skipTheory: "थ्योरी छोड़ें",
      keyTakeaways: "मुख्य बिंदु (Key Takeaways)",
      gotItContinue: "समझ गया, अभ्यास शुरू करें",
      runTest: "टेस्ट चलाएँ",
      nextStep: "अगला चरण",
      waitingExecution: "चरण के निष्पादन की प्रतीक्षा है...",
      testPassed: "✓ टेस्ट सफल रहा",
      testFailed: "✗ सत्यापन विफल",
      suggestedTokens: "सुझाए गए कोड टोकन (जोड़ने के लिए टैप करें या टाइप करें):",
      moduleCompiled: "मॉड्यूल सफलतापूर्वक पूर्ण हुआ!",
      completedChecks: "आपने इसके सभी सिद्धांत और अभ्यास पूरे कर लिए हैं:",
      reward: "इनाम",
      integrity: "बिल्ड स्थिति",
      backToRoadmap: "रोडमैप पर वापस जाएँ",
    },
    community: {
      badge: "ओपन गिट गवर्नेंस",
      title: "समुदाय के साथ ट्रैक बनाएँ और स्वीकृत करें",
      description:
        "CodeTrails में कोई भी व्यक्ति नई भाषा, लाइब्रेरी या फ़्रेमवर्क का ट्रैक बना सकता है। प्रत्येक पाठ में थ्योरी और अभ्यास होते हैं जिन्हें Pull Request के माध्यम से सत्यापित किया जाता है।",
      step1Title: "1. /content में JSON बनाएँ",
      step1Desc: "content/tracks/<track> में track.json और पाठ फ़ाइलें जोड़ें।",
      step2Title: "2. लोकल जांच करें",
      step2Desc: "थ्योरी और उत्तरों की जांच के लिए npm run validate:tracks चलाएँ।",
      step3Title: "3. Pull Request खोलें",
      step3Desc: "GitHub Actions स्वचालित रूप से स्कीमा की जांच करता है।",
      generatorTitle: "त्वरित पाठ जनरेटर (Theory + Practice)",
      generatorSubtitle: "अपने PR के लिए थ्योरी और अभ्यास JSON आसानी से तैयार करें।",
      copyJson: "JSON कॉपी करें",
      copied: "कॉपी हो गया!",
    },
    common: {
      whyLearn: "क्यों सीखें",
      requirement: "आवश्यकता",
      searchPlaceholder:
        "भाषा, फ़्रेमवर्क या कॉन्सेप्ट खोजें (जैसे: Rust, Gin, Pandas, SQL, ORM...)",
      loading: "लोड हो रहा है...",
      lesson: "पाठ",
      theory: "थ्योरी",
      exercisesShort: "अभ्यास",
      unlockPrereqs: "आवश्यक शर्तें अनलॉक करें",
      hint: "संकेत",
      reset: "रीसेट",
      viewSolution: "समाधान देखें",
      referenceSolution: "संदर्भ समाधान:",
      editorPlaceholder: "// यहाँ शुरू से अपना कोड लिखें...",
      toggleModeTitle:
        "गाइडेड मोड (थ्योरी सहित) और केवल अभ्यास मोड के बीच बदलें",
      skipTheoryTitle: "थ्योरी छोड़कर सीधे अभ्यास पर जाएँ",
      reminderTitle: "दैनिक स्ट्रीक रिमाइंडर",
      reminderDescNative:
        "अपनी स्ट्रीक बनाए रखने के लिए हर दिन एक लोकल सूचना पाएँ।",
      reminderDescWeb:
        "पसंद लोकल रूप से सहेजी गई। सूचनाएँ Android/iOS ऐप में आती हैं।",
      reminderNotifTitle: "CodeTrails पर अभ्यास का समय!",
      reminderNotifBody: "एक छोटा पाठ पूरा करके अपनी दैनिक स्ट्रीक बनाए रखें।",
      reminderTimeLabel: "रिमाइंडर का समय",
      enabled: "चालू",
      disabled: "बंद",
      permissionDenied: "इस डिवाइस पर सूचना की अनुमति अस्वीकृत है।",
    },
  },
  fr: {
    nav: {
      roadmap: "Parcours",
      catalog: "Catalogue",
      stats: "Statistiques",
      contribute: "Contribuer",
      telemetry: "Télémétrie Locale",
    },
    categories: {
      all: "Toutes",
      language: "Langage",
      framework: "Framework",
      library: "Bibliothèque",
      tool: "Outil",
      concept: "Concept CS",
    },
    roadmap: {
      availableTracks: "Langages de base",
      ecosystemTracks: "Frameworks & Bibliothèques de ce langage",
      prerequisitesLabel: "Prérequis",
      prereqMet: "Débloqué",
      prereqPending: "Requiert :",
      backToBaseLanguage: "Retour au langage de base",
      iAlreadyKnowThis: "Je maîtrise déjà",
      masteredBadge: "Maîtrisé",
      undoMastered: "Annuler la maîtrise",
      practiceArenaTitle: "Arène de Pratique Directe (Sans Théorie)",
      practiceArenaSubtitle:
        "Vous maîtrisez déjà cette technologie. Entraînez-vous directement sur les exercices pratiques.",
      startPracticeArena: "Pratiquer sans théorie",
      unlockPrerequisiteInstant: "Je maîtrise",
      viewAll: "Voir tout le catalogue",
      progress: "PROGRESSION",
      completed: "Terminée",
      nextStep: "SUIVANT",
      steps: "étapes",
      review: "Revoir",
      run: "Démarrer",
      practice: "Pratiquer",
      maintainer: "mainteneur",
    },
    catalog: {
      title: "Catalogue des Parcours",
      subtitle:
        "Choisissez un langage de base puis explorez ses frameworks et bibliothèques.",
      newTrackPr: "Nouveau Parcours (PR)",
      lessonsCount: "leçons",
      selected: "Actif dans le Parcours",
      openRoadmap: "Ouvrir le Parcours",
    },
    player: {
      step: "ÉTAPE",
      theoryBadge: "THÉORIE & CONCEPT",
      practiceModeBadge: "MODE PRATIQUE",
      skipTheory: "Passer la théorie",
      keyTakeaways: "Points clés à retenir",
      gotItContinue: "Compris, pratiquer",
      runTest: "Vérifier",
      nextStep: "Continuer",
      waitingExecution: "En attente de votre réponse...",
      testPassed: "✓ Test réussi",
      testFailed: "✗ Vérification échouée",
      suggestedTokens: "Blocs suggérés (touchez pour ajouter ou tapez) :",
      moduleCompiled: "Module terminé avec succès !",
      completedChecks: "Vous avez terminé toute la théorie et la pratique de :",
      reward: "Récompense",
      integrity: "Statut du Build",
      backToRoadmap: "Retour au Parcours",
    },
    community: {
      badge: "Gouvernance Open Git",
      title: "Créez et validez des parcours avec la communauté",
      description:
        "Sur CodeTrails, chacun peut proposer un nouveau langage ou framework via Pull Request sur GitHub.",
      step1Title: "1. Créez un JSON dans /content",
      step1Desc: "Ajoutez track.json et vos leçons dans content/tracks/<id>.",
      step2Title: "2. Validez en local",
      step2Desc: "Exécutez npm run validate:tracks pour vérifier le schéma Zod.",
      step3Title: "3. Ouvrez une Pull Request",
      step3Desc: "GitHub Actions vérifie automatiquement le contenu.",
      generatorTitle: "Générateur rapide de leçon",
      generatorSubtitle: "Générez le JSON de théorie et exercices pour votre PR.",
      copyJson: "Copier le JSON",
      copied: "Copié !",
    },
    common: {
      whyLearn: "Pourquoi l'apprendre",
      requirement: "Prérequis",
      searchPlaceholder:
        "Rechercher un langage, framework ou concept (ex : Rust, Gin, Pandas, SQL, ORM...)",
      loading: "Chargement...",
      lesson: "Leçon",
      theory: "Théorie",
      exercisesShort: "Ex.",
      unlockPrereqs: "Débloquer les prérequis",
      hint: "indice",
      reset: "réinitialiser",
      viewSolution: "Voir la solution",
      referenceSolution: "Solution de référence :",
      editorPlaceholder: "// Écrivez votre code à partir de zéro ici...",
      toggleModeTitle:
        "Basculer entre le Mode Guidé (avec théorie) et le Mode Pratique seule",
      skipTheoryTitle: "Passer la théorie et aller directement aux exercices",
      reminderTitle: "Rappel Quotidien de Série",
      reminderDescNative:
        "Recevez une notification locale chaque jour pour garder votre série.",
      reminderDescWeb:
        "Préférence enregistrée localement. Les notifications sont envoyées dans l'app Android/iOS.",
      reminderNotifTitle: "C'est l'heure de pratiquer sur CodeTrails !",
      reminderNotifBody: "Gardez votre série quotidienne avec une leçon rapide.",
      reminderTimeLabel: "Heure du rappel",
      enabled: "Activé",
      disabled: "Désactivé",
      permissionDenied: "Autorisation de notification refusée sur cet appareil.",
    },
  },
  ar: {
    nav: {
      roadmap: "المسار",
      catalog: "الدليل",
      stats: "الإحصائيات",
      contribute: "ساهم",
      telemetry: "الحالة المحلية",
    },
    categories: {
      all: "الكل",
      language: "لغة برمجة",
      framework: "إطار عمل",
      library: "مكتبة",
      tool: "أداة",
      concept: "مفهوم علوم الحاسب",
    },
    roadmap: {
      availableTracks: "اللغات الأساسية",
      ecosystemTracks: "أطر العمل والمكتبات لهذه اللغة",
      prerequisitesLabel: "المتطلبات الأساسية",
      prereqMet: "مفتوح",
      prereqPending: "يتطلب إكمال:",
      backToBaseLanguage: "العودة إلى اللغة الأساسية",
      iAlreadyKnowThis: "أتقن هذه التقنية بالفعل",
      masteredBadge: "متقن",
      undoMastered: "إلغاء الإتقان",
      practiceArenaTitle: "ساحة التدريب المباشر (بدون شرح نظري)",
      practiceArenaSubtitle:
        "لقد أعلنت إتقانك لهذه التقنية. انتقل مباشرة إلى التمارين العملية.",
      startPracticeArena: "تدرب بدون شرح",
      unlockPrerequisiteInstant: "أتقن",
      viewAll: "عرض الدليل الكامل",
      progress: "التقدم",
      completed: "مكتمل",
      nextStep: "التالي",
      steps: "خطوات",
      review: "مراجعة",
      run: "ابدأ",
      practice: "تدريب",
      maintainer: "المشرف",
    },
    catalog: {
      title: "دليل المسارات",
      subtitle: "اختر لغة أساسية ثم استكشف أطر العمل والمكتبات الخاصة بها.",
      newTrackPr: "مسار جديد (PR)",
      lessonsCount: "دروس",
      selected: "نشط في المسار",
      openRoadmap: "فتح المسار",
    },
    player: {
      step: "خطوة",
      theoryBadge: "مفهوم وشرح نظري",
      practiceModeBadge: "وضع التدريب",
      skipTheory: "تخطي الشرح",
      keyTakeaways: "نقاط رئيسية للتذكر",
      gotItContinue: "فهمت، لنبدأ التدريب",
      runTest: "تحقق",
      nextStep: "متابعة",
      waitingExecution: "في انتظار إجابتك...",
      testPassed: "✓ نجح الاختبار",
      testFailed: "✗ فشل التحقق",
      suggestedTokens: "رموز مقترحة (اضغط للإضافة أو اكتب):",
      moduleCompiled: "تم إكمال الوحدة بنجاح!",
      completedChecks: "لقد أكملت الشرح والتمارين لـ:",
      reward: "المكافأة",
      integrity: "حالة البناء",
      backToRoadmap: "العودة إلى المسار",
    },
    community: {
      badge: "حوكمة Git المفتوحة",
      title: "أنشئ واعتمد مسارات تعليمية مع المجتمع",
      description:
        "يمكن لأي شخص إضافة لغة أو إطار عمل جديد في CodeTrails عبر Pull Request على GitHub.",
      step1Title: "1. أنشئ ملف JSON",
      step1Desc: "أضف track.json والدروس داخل content/tracks/<id>.",
      step2Title: "2. تحقق محلياً",
      step2Desc: "شغّل npm run validate:tracks للتحقق من المخطط.",
      step3Title: "3. افتح Pull Request",
      step3Desc: "يتحقق GitHub Actions تلقائياً من صحة المحتوى.",
      generatorTitle: "منشئ الدروس السريع",
      generatorSubtitle: "أنشئ JSON للنظري والتمارين لطلب الدمج.",
      copyJson: "نسخ JSON",
      copied: "تم النسخ!",
    },
    common: {
      whyLearn: "لماذا تتعلمها",
      requirement: "متطلب",
      searchPlaceholder:
        "ابحث عن لغة أو إطار عمل أو مفهوم (مثل: Rust، Gin، Pandas، SQL، ORM...)",
      loading: "جارٍ التحميل...",
      lesson: "درس",
      theory: "شرح نظري",
      exercisesShort: "تمارين",
      unlockPrereqs: "فتح المتطلبات الأساسية",
      hint: "تلميح",
      reset: "إعادة تعيين",
      viewSolution: "عرض الحل",
      referenceSolution: "الحل المرجعي:",
      editorPlaceholder: "// اكتب الكود من الصفر هنا...",
      toggleModeTitle: "التبديل بين الوضع الموجَّه (مع الشرح) ووضع التدريب فقط",
      skipTheoryTitle: "تخطَّ الشرح النظري وانتقل مباشرة إلى التمارين",
      reminderTitle: "تذكير السلسلة اليومية",
      reminderDescNative: "احصل على إشعار محلي يومياً للحفاظ على سلسلتك.",
      reminderDescWeb:
        "تم حفظ التفضيل محلياً. تُرسل الإشعارات في تطبيق Android/iOS.",
      reminderNotifTitle: "حان وقت التدريب على CodeTrails!",
      reminderNotifBody: "حافظ على سلسلتك اليومية بإكمال درس سريع.",
      reminderTimeLabel: "وقت التذكير",
      enabled: "مفعّل",
      disabled: "معطّل",
      permissionDenied: "تم رفض إذن الإشعارات على هذا الجهاز.",
    },
  },
  ru: {
    nav: {
      roadmap: "Карта",
      catalog: "Каталог",
      stats: "Статистика",
      contribute: "Участвовать",
      telemetry: "Локальный статус",
    },
    categories: {
      all: "Все",
      language: "Язык",
      framework: "Фреймворк",
      library: "Библиотека",
      tool: "Инструмент",
      concept: "Концепция CS",
    },
    roadmap: {
      availableTracks: "Базовые языки",
      ecosystemTracks: "Фреймворки и библиотеки этого языка",
      prerequisitesLabel: "Требования",
      prereqMet: "Открыто",
      prereqPending: "Требуется:",
      backToBaseLanguage: "Назад к базовому языку",
      iAlreadyKnowThis: "Я уже знаю это",
      masteredBadge: "Изучено",
      undoMastered: "Сбросить статус",
      practiceArenaTitle: "Арена практики (без теории)",
      practiceArenaSubtitle:
        "Вы уже владеете этой технологией. Переходите сразу к практическим заданиям.",
      startPracticeArena: "Практика без теории",
      unlockPrerequisiteInstant: "Уже знаю",
      viewAll: "Открыть каталог",
      progress: "ПРОГРЕСС",
      completed: "Пройдено",
      nextStep: "ДАЛЕЕ",
      steps: "шагов",
      review: "Повторить",
      run: "Начать",
      practice: "Практика",
      maintainer: "автор",
    },
    catalog: {
      title: "Каталог треков",
      subtitle: "Выберите базовый язык и изучите его фреймворки и библиотеки.",
      newTrackPr: "Новый трек (PR)",
      lessonsCount: "уроков",
      selected: "Выбран",
      openRoadmap: "Открыть карту",
    },
    player: {
      step: "ШАГ",
      theoryBadge: "ТЕОРИЯ И КОНЦЕПЦИЯ",
      practiceModeBadge: "РЕЖИМ ПРАКТИКИ",
      skipTheory: "Пропустить теорию",
      keyTakeaways: "Главное запомнить",
      gotItContinue: "Понятно, к практике",
      runTest: "Проверить",
      nextStep: "Далее",
      waitingExecution: "Ожидание ответа...",
      testPassed: "✓ Тест пройден",
      testFailed: "✗ Ошибка проверки",
      suggestedTokens: "Подсказки (нажмите или введите вручную):",
      moduleCompiled: "Модуль успешно завершён!",
      completedChecks: "Вы прошли теорию и практику по теме:",
      reward: "Награда",
      integrity: "Статус сборки",
      backToRoadmap: "Назад к карте",
    },
    community: {
      badge: "Открытое управление Git",
      title: "Создавайте треки вместе с сообществом",
      description:
        "Любой может добавить новый язык или фреймворк в CodeTrails через Pull Request на GitHub.",
      step1Title: "1. Создайте JSON в /content",
      step1Desc: "Добавьте track.json и уроки в content/tracks/<id>.",
      step2Title: "2. Проверьте локально",
      step2Desc: "Запустите npm run validate:tracks для проверки схемы Zod.",
      step3Title: "3. Откройте Pull Request",
      step3Desc: "GitHub Actions автоматически проверит корректность.",
      generatorTitle: "Быстрый генератор урока",
      generatorSubtitle: "Сгенерируйте JSON теории и практики для вашего PR.",
      copyJson: "Копировать JSON",
      copied: "Скопировано!",
    },
    common: {
      whyLearn: "Зачем изучать",
      requirement: "Требование",
      searchPlaceholder:
        "Поиск языка, фреймворка или концепции (напр.: Rust, Gin, Pandas, SQL, ORM...)",
      loading: "Загрузка...",
      lesson: "Урок",
      theory: "Теория",
      exercisesShort: "упр.",
      unlockPrereqs: "Открыть требования",
      hint: "подсказка",
      reset: "сброс",
      viewSolution: "Показать решение",
      referenceSolution: "Эталонное решение:",
      editorPlaceholder: "// Напишите свой код с нуля здесь...",
      toggleModeTitle:
        "Переключение между режимом с теорией и режимом только практики",
      skipTheoryTitle: "Пропустить теорию и сразу перейти к упражнениям",
      reminderTitle: "Ежедневное напоминание о серии",
      reminderDescNative:
        "Получайте локальное уведомление каждый день, чтобы не прерывать серию.",
      reminderDescWeb:
        "Настройка сохранена локально. Уведомления приходят в приложении Android/iOS.",
      reminderNotifTitle: "Время практиковаться в CodeTrails!",
      reminderNotifBody: "Сохраните ежедневную серию — пройдите короткий урок.",
      reminderTimeLabel: "Время напоминания",
      enabled: "Включено",
      disabled: "Выключено",
      permissionDenied: "Доступ к уведомлениям на устройстве запрещён.",
    },
  },
};
