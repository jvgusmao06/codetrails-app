# >_ CodeTrilhas — Aprendizado Modular de Programação Open Source

**CodeTrilhas** é uma plataforma web e mobile (PWA) de código aberto para o ensino interativo e gamificado de **linguagens de programação, bibliotecas e frameworks**. Projetado para ser mantido pela comunidade via Git/GitHub, cada trilha combina **explicações teóricas diretas** com **desafios práticos rápidos** em uma interface inspirada em IDEs modernas e grafos de commits.

---

## ✨ Principais Funcionalidades

- **📚 5 Mecânicas Interativas (Teoria + Prática)**:
  - `theory`: Explicações diretas com exemplos de código comentados e pontos-chave antes dos exercícios.
  - `multiple_choice`: Perguntas de múltipla escolha com *snippets* de código.
  - `fill_in_blank`: Preenchimento de lacunas (`{{blank}}`) com banco de tokens amigável para telas *touch*.
  - `order_code`: **Parson's Puzzle** — ordenação interativa de blocos de código ou pipelines de comandos.
  - `spot_the_bug`: **Inspetor de Debug** — seleção direta da linha exata onde ocorre um bug lógico, *race condition*, *borrow error* ou vulnerabilidade.
- **🌍 Internacionalização Nativa (8 Idiomas)**: Interface, estatísticas e catálogo disponíveis nos 8 idiomas mais falados globalmente:
  - 🇧🇷 Português (`pt`) | 🇺🇸 English (`en`) | 🇪🇸 Español (`es`) | 🇨🇳 中文 (`zh`)
  - 🇮🇳 हिन्दी (`hi`) | 🇫🇷 Français (`fr`) | 🇸🇦 العربية (`ar`) | 🇷🇺 Русский (`ru`)
- **📊 Painel de Estatísticas (`/stats`) & Syntax Highlighting**:
  - Acompanhamento de **Nível de Desenvolvedor**, XP total, ofensiva diária, progresso percentual por ecossistema e **Conquistas** desbloqueáveis.
  - Destaque de sintaxe leve (*Syntax Highlighting* offline) em todos os blocos de código, exemplos e desafios de debug.
- **⚡ Modo "Já Domino esta Tecnologia" & Arena de Prática (Sem Teoria)**:
  - Usuários que já conhecem uma linguagem, biblioteca ou framework podem clicar em **"Já domino esta tecnologia"** (`masteredTracks`).
  - Isso **libera imediatamente todos os pré-requisitos dependentes** (ex: declarar que domina TypeScript/JS e React libera o Next.js na hora) e ativa a **Arena de Prática Direta (`?mode=practice`)**, que pula todas as etapas teóricas e vai direto para os exercícios práticos.
- **📲 App Nativo Mobile com Capacitor (Android & iOS) + PWA**:
  - Exportação estática (`output: "export"`) integrada ao **Capacitor** com projetos nativos gerados em `/android` e `/ios`, além de suporte a PWA standalone.
  - Layout adaptável: **Sidebar técnica** no Desktop e **Bottom Navigation Bar** com *safe-area* no Mobile.
  - Feedback tátil (**Web Vibration API**) e efeitos sonoros sintetizados em tempo real via **Web Audio API** (zero arquivos de áudio externos).
- **🔀 Governança Comunitária via Git**:
  - Nenhuma dependência obrigatória de banco de dados para servir o conteúdo: todas as trilhas vivem em `content/tracks/` como arquivos JSON validados com **Zod**.
  - Qualquer pessoa pode criar novas trilhas ou lições usando o **Gerador Interativo na aba Contribuir** (`/community`) e submeter via Pull Request.
- **⚡ Progresso Instantâneo Sem Barreira de Login**: XP, ofensiva diária (*streak*), integridade de compilação (`CPU 5/5`) e lições concluídas são salvos automaticamente no `localStorage`.

---

## 🧭 Trilhas e Árvore de Pré-Requisitos (26 Trilhas / 46 Lições)

As trilhas são organizadas de forma hierárquica: o estudante escolhe uma **Linguagem Base** ou **Conceito de Ciência da Computação** no topo e, dentro de cada linguagem, visualiza apenas os **Frameworks, Bibliotecas e Ferramentas daquele ecossistema**, com verificação automática de pré-requisitos (`prerequisites` e `languageId`):

### 1. 🐍 Ecossistema Python (`python-basics`)
- **Python Essencial** (Linguagem Base — variáveis, tipos, condicionais, listas, `def` com *Type Hints*, dicionários e *List Comprehensions*)
  - ↳ ⚡ **FastAPI & APIs REST** (`fastapi-python`) — *Requer concluir: Python Essencial*
  - ↳ 🐼 **Pandas & Data Science** (`pandas-data-science`) — *Requer concluir: Python Essencial*
  - ↳ 🧪 **Pytest & Qualidade** (`pytest-testing`) — *Requer concluir: Python Essencial*

### 2. ☕ Ecossistema Java (`java-basics`)
- **Java & POO** (Linguagem Base — `main`, tipos estáticos, classes, `record`, Lambdas `->` e `Streams API`)
  - ↳ 🍃 **Spring Boot** (`spring-boot-java`) — *Requer concluir: Java & POO*
  - ↳ 🗄️ **Spring Data JPA & Hibernate** (`spring-data-jpa`) — *Requer concluir: Java & POO + Spring Boot*
  - ↳ 🎯 **JUnit 5 & Mockito** (`junit-mockito`) — *Requer concluir: Java & POO*

### 3. ⚙️ Ecossistema C / C++ (`c-cpp-systems`)
- **C & C++ Sistemas** (Linguagem Base — I/O nativo, ponteiros, referências `&`, `struct` e *Smart Pointers* `std::unique_ptr` / RAII)
  - ↳ 🧰 **C++ STL & Containers** (`stl-cpp`) — *Requer concluir: C & C++ Sistemas*
  - ↳ 🛠️ **CMake & Build C/C++** (`cmake-build-system`) — *Requer concluir: C & C++ Sistemas*

### 4. 📘 Ecossistema TypeScript & JavaScript (`typescript-javascript`)
- **TypeScript & JavaScript** (Linguagem Base — `const/let`, *arrow functions*, *destructuring*, métodos de array, `interfaces`, `async/await` e `Generics <T>`)
  - ↳ ⚛️ **React & Hooks** (`react-fundamentals`) — *Requer concluir: TypeScript & JavaScript*
  - ↳ ▲ **Next.js App Router** (`nextjs-app-router`) — *Requer concluir: TypeScript & JavaScript + React & Hooks*
  - ↳ 🎨 **Tailwind CSS** (`tailwind-css`) — *Requer concluir: TypeScript & JavaScript*
  - ↳ 🛡️ **Zod & Validação** (`zod-validation`) — *Requer concluir: TypeScript & JavaScript*
  - ↳ 🟢 **Node.js & Hono / Express APIs** (`nodejs-hono-api`) — *Requer concluir: TypeScript & JavaScript*
  - ↳ 🔺 **Prisma & Drizzle ORM** (`prisma-drizzle-orm`) — *Requer concluir: TypeScript & JavaScript + SQL & PostgreSQL*
  - ↳ ⚡ **Vitest & Testes em TS/JS** (`vitest-testing`) — *Requer concluir: TypeScript & JavaScript*

### 5. 🗄️ SQL & Bancos Relacionais (`sql-databases`)
- **SQL & PostgreSQL** (Linguagem Base — `SELECT`, `WHERE`, `JOIN`, agregações, `CREATE TABLE`, `INSERT`, Transações ACID `BEGIN/COMMIT` e `CREATE INDEX`)

### 6. 🐹 Ecossistema Go / Golang (`golang-cloud`)
- **Go (Golang)** (Linguagem Base — sintaxe base, `for`, `slices`, `maps`, `defer`, `structs`, interfaces implícitas, *Goroutines* e *Channels*)
  - ↳ 🌐 **Go Web APIs (`net/http` & Gin)** (`go-web-gin`) — *Requer concluir: Go (Golang)*

### 7. 🦀 Ecossistema Rust (`rust-systems`)
- **Rust & Segurança de Memória** (Linguagem Base — expressões sem `;`, macros `!`, `struct/impl`, *Ownership*, *Borrowing*, `match`, `Option<T>` e `Result<T, E>`)
  - ↳ 🚀 **Axum, Tokio & Serde (Rust Web)** (`rust-axum-serde`) — *Requer concluir: Rust & Segurança de Memória*

### 8. 🌿 Fundamentos & Conceitos Universais (`category: "concept"` / `"tool"`)
- **Git & Fluxo GitHub** (`git-github-workflow`) — `commit`, `branch`, `merge` e fluxo de Pull Requests
- **Algoritmos & Estruturas (Big O)** (`algorithms-data-structures`) — Complexidade de tempo/espaço, Hash Maps $O(1)$ e Busca Binária $O(\log n)$

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Papel no Projeto |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16 (App Router)](https://nextjs.org/) + React 19 | Renderização estática/híbrida, rotas dinâmicas e Web App Manifest nativo |
| **Linguagem** | [TypeScript 5](https://www.typescriptlang.org/) | Tipagem estática ponta a ponta |
| **Estilização** | [Tailwind CSS v4](https://tailwindcss.com/) | Estética *Developer IDE / Git Graph* responsiva e mobile-first |
| **Validação de Conteúdo** | [Zod](https://zod.dev/) | Validação estrita das trilhas e lições JSON submetidas pela comunidade |
| **Ícones** | [Lucide React](https://lucide.dev/) | Ícones leves e consistentes |

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** 20+ instalado
- **npm** (ou pnpm/yarn/bun)

### Passo a passo

1. **Instale as dependências:**
   ```bash
   npm install
   ```

2. **Valide a integridade de todas as trilhas e lições:**
   ```bash
   npm run validate:tracks
   ```

3. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Comandos Disponíveis

| Comando | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor de desenvolvimento com Turbopack |
| `npm run validate:tracks` | Valida todos os arquivos JSON em `content/tracks/` contra o schema Zod |
| `npm run build` | Gera a exportação estática otimizada (`out/`) para Web e Capacitor |
| `npm run cap:sync` | Compila o app Next.js e sincroniza os assets com os projetos nativos Android e iOS |
| `npm run cap:android` | Abre o projeto nativo Android no Android Studio |
| `npm run cap:ios` | Abre o projeto nativo iOS no Xcode |
| `npm run lint` | Executa a verificação do ESLint |

---

## 📂 Estrutura de Diretórios

```text
programming-app/
├── content/
│   └── tracks/                  # Trilhas modulares da comunidade (Git-based)
│       ├── python-basics/
│       │   ├── track.json       # Metadados da trilha e ordem dos módulos
│       │   ├── mod-01-fundamentos/
│       │   │   ├── lesson-01-print-vars.json
│       │   │   └── lesson-02-tipos-strings.json
│       │   └── mod-02-fluxo/
│       ├── java-basics/
│       ├── c-cpp-systems/
│       ├── typescript-javascript/
│       ├── react-fundamentals/
│       ├── nextjs-app-router/
│       ├── tailwind-css/
│       └── zod-validation/
├── public/
│   └── icon.svg                 # Ícone vetorial do PWA
├── scripts/
│   └── validate-tracks.mjs      # Validador CLI para CI / Pull Requests
├── src/
│   ├── app/
│   │   ├── community/page.tsx   # Portal de contribuição + Gerador de JSON
│   │   ├── lesson/[trackId]/[lessonId]/page.tsx # Player de lição
│   │   ├── tracks/page.tsx      # Catálogo com filtros por categoria
│   │   ├── layout.tsx           # Root Layout + Metadados PWA
│   │   ├── manifest.ts          # Web App Manifest nativo
│   │   └── page.tsx             # Home (Roadmap estilo Git Branch)
│   ├── components/
│   │   ├── AppShell.tsx         # Sidebar, Topbar, Seletor de Idioma e Bottom Nav
│   │   ├── LessonPlayer.tsx     # Motor interativo (Teoria + Múltipla Escolha + Lacunas)
│   │   ├── SkillTree.tsx        # Visualizador de módulos e linha do tempo
│   │   └── TracksExplorer.tsx   # Explorador de trilhas
│   └── lib/
│       ├── i18n.ts              # Dicionários em 5 idiomas (PT, EN, ES, ZH, HI)
│       ├── progress.ts          # Estado local, Streak, XP, Web Audio & Vibration
│       ├── schema.ts            # Schemas Zod (Theory, MultipleChoice, FillInBlank)
│       ├── track-i18n.ts        # Traduções dos metadados das trilhas
│       └── tracks.ts            # Loader seguro das trilhas do filesystem
└── CONTRIBUTING.md              # Guia detalhado para criadores de trilhas
```

---

## 🤝 Como Criar uma Nova Trilha ou Lição (Comunidade)

1. Crie uma pasta dentro de `content/tracks/<id-da-sua-trilha>/` contendo um `track.json`.
2. Crie as pastas dos módulos e os arquivos `.json` das lições seguindo o formato:

```json
{
  "id": "exemplo-01",
  "title": "Título da Lição",
  "description": "Resumo curto do que será aprendido.",
  "xp": 15,
  "steps": [
    {
      "type": "theory",
      "title": "Conceito Principal",
      "content": "Explicação clara apresentada antes dos exercícios.",
      "codeExample": "// Exemplo de código\nconst x = 10;",
      "keyTakeaways": [
        "Primeiro ponto-chave para lembrar.",
        "Segundo ponto-chave."
      ]
    },
    {
      "type": "multiple_choice",
      "prompt": "Pergunta sobre o conceito apresentado:",
      "options": ["Opção A", "Opção B", "Opção C"],
      "correctIndex": 0,
      "explanation": "Explicação exibida após a verificação."
    },
    {
      "type": "fill_in_blank",
      "prompt": "Complete a lacuna no código abaixo:",
      "codeTemplate": "const x = {{blank}};",
      "blanks": [
        { "answer": "10", "placeholder": "valor" }
      ],
      "options": ["10", "20", "null"],
      "explanation": "Explicação didática da resposta."
    }
  ]
}
```

3. Você também pode abrir a aba **Contribuir** (`/community`) dentro do próprio app para gerar esse JSON visualmente.
4. Execute `npm run validate:tracks` para garantir que não há erros de schema ou contagem de lacunas e abra seu **Pull Request**! Consulte o [CONTRIBUTING.md](./CONTRIBUTING.md) para mais detalhes.

---

## 🗺️ Roadmap de Implementações Futuras

- [ ] **Execução Real de Código Offline (Sandbox Wasm)**:
  - Integrar **Pyodide** (Python) e **sql.js** (SQLite) para rodar código real do usuário direto no navegador/Capacitor sem depender de servidor.
- [ ] **Editor Touch Mobile (CodeMirror 6)**:
  - Novo tipo de desafio `code_runner` com autocompletar e numeração de linhas otimizada para telas de celular.
- [ ] **Sync em Nuvem Opcional (GitHub / Google Login)**:
  - Sincronização de XP, *streak* e conquistas entre dispositivos mantendo o `localStorage` como modo convidado instantâneo.
- [ ] **Lembretes Nativos & Offline Total**:
  - `@capacitor/local-notifications` para lembretes diários de ofensiva no Android/iOS e **Serwist** para cache 100% offline no PWA.
- [ ] **Publicação Direta via PR na Aba Contribuir**:
  - Fluxo guiado com GitHub OAuth para abrir Pull Requests de novas lições diretamente pela interface do app.

---

## 📄 Licença

Distribuído sob a licença **MIT**. Sinta-se livre para estudar, modificar, criar novas trilhas e contribuir!
