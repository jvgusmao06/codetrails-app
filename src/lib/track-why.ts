import type { Locale } from "./i18n";

const TRACK_WHY_PT: Record<string, string> = {
  "algorithms-data-structures":
    "Base essencial para resolver problemas complexos, escrever código eficiente (Big O) e mandar bem em entrevistas técnicas.",
  "asio-networking-cpp":
    "Padrão em C++ para programação de rede assíncrona de baixíssima latência, servidores e sistemas em tempo real.",
  "aspnet-core-csharp":
    "Framework web corporativo de alta performance da Microsoft para APIs REST, microsserviços e aplicações em nuvem.",
  "blazor-csharp":
    "Permite construir interfaces web interativas usando C# e .NET no lugar de JavaScript, compartilhando código com o backend.",
  "boost-cpp":
    "Coleção de bibliotecas C++ testadas em produção que complementam a STL em grafos, regex, threads e utilitários avançados.",
  "c-cpp-systems":
    "Domine controle de memória, ponteiros e performance máxima para sistemas operacionais, games, embarcados e compiladores.",
  "clap-cli-rust":
    "Biblioteca padrão de fato em Rust para criar ferramentas de linha de comando (CLIs) rápidas, tipadas e com ajuda automática.",
  "cmake-build-system":
    "Sistema de build multiplataforma padrão da indústria para gerenciar projetos C e C++ de qualquer porte.",
  "cobra-cli-go":
    "Framework usado por ferramentas como Docker, kubectl e GitHub CLI para criar CLIs robustas em Go.",
  "csharp-dotnet":
    "Linguagem moderna, fortemente tipada e versátil para backend corporativo, jogos (Unity), desktop e cloud Azure.",
  "dapper-csharp":
    "Micro-ORM ultrarrápido para .NET quando você quer controle total do SQL sem abrir mão de mapeamento tipado.",
  "django-python":
    "Framework web completo (batteries-included) com admin automático, ORM e segurança pronta para lançar produtos rápido.",
  "echo-go":
    "Microframework web minimalista e veloz em Go, ideal para APIs REST limpas com roteamento e middlewares simples.",
  "ef-core-csharp":
    "ORM oficial do .NET para trabalhar com bancos relacionais usando LINQ, migrations e tipagem forte em C#.",
  "eigen-linalg-cpp":
    "Biblioteca C++ de alta performance para álgebra linear, matrizes e vetores, usada em robótica, visão computacional e games.",
  "fastapi-python":
    "Um dos frameworks mais rápidos para criar APIs em Python, com validação automática (Pydantic) e documentação OpenAPI nativa.",
  "fiber-go":
    "Framework web em Go inspirado no Express.js, focado em latência mínima e altíssimo throughput de requisições.",
  "fluentvalidation-csharp":
    "Padrão elegante em .NET para separar regras de validação complexas das entidades com sintaxe fluente e testável.",
  "git-github-workflow":
    "Ferramenta indispensável em qualquer equipe de software para versionar código, revisar PRs e colaborar sem perder histórico.",
  "go-gorm-sqlc":
    "Domine persistência em Go: desde a produtividade de um ORM (GORM) até SQL puro compilado com segurança de tipos (sqlc).",
  "go-web-gin":
    "Framework web mais popular do ecossistema Go para construir APIs e microsserviços rápidos com baixo consumo de memória.",
  "golang-cloud":
    "Linguagem criada pelo Google para concorrência simples (goroutines), binários únicos e infraestrutura cloud-native (Docker, K8s).",
  "googletest-cpp":
    "Framework padrão do Google para escrever testes unitários e mocks confiáveis em projetos C++.",
  "grpc-go":
    "Comunicação RPC de alta performance com Protocol Buffers, ideal para microsserviços de baixa latência em Go.",
  "java-basics":
    "Uma das linguagens mais demandadas no mercado corporativo, presente em bancos, grandes sistemas distribuídos e Android.",
  "junit-mockito":
    "Dupla essencial em Java para garantir qualidade de código com testes unitários isolados e mocks de dependências.",
  "lombok-java":
    "Elimina código repetitivo (getters, setters, builders) em Java, mantendo classes limpas e legíveis.",
  "mapstruct-java":
    "Gera mapeadores de DTOs em tempo de compilação em Java, evitando reflexão lenta e erros manuais de conversão.",
  "mediatr-csharp":
    "Implementa o padrão Mediator/CQRS em .NET para desacoplar handlers, comandos e eventos em arquiteturas limpas.",
  "mockito-java":
    "Biblioteca líder em Java para simular dependências em testes unitários e verificar comportamentos com clareza.",
  "nextjs-app-router":
    "Framework React full-stack líder de mercado para SEO, Server Components, rotas em pastas e apps web rápidos.",
  "nlohmann-json-cpp":
    "Forma mais intuitiva e moderna de ler, manipular e serializar JSON em C++ com sintaxe parecida com Python.",
  "nodejs-hono-api":
    "Framework web ultraleve e multi-runtime (Node, Cloudflare Workers, Bun) para APIs modernas na borda (edge).",
  "numpy-python":
    "Base numérica de toda a ciência de dados e IA em Python, oferecendo arrays vetorizados em velocidade de C.",
  "pandas-data-science":
    "Ferramenta padrão para limpar, transformar e analisar planilhas e grandes tabelas de dados em Python.",
  "playwright-e2e":
    "Automação moderna de navegadores para testar fluxos completos (E2E) com confiabilidade em Chrome, Firefox e WebKit.",
  "prisma-drizzle-orm":
    "Os ORMs modernos mais usados em TypeScript para consultar bancos SQL com autocomplete e segurança de tipos.",
  "pydantic-python":
    "Validação de dados e contratos em Python usando Type Hints, essencial em APIs modernas (FastAPI) e agentes de IA.",
  "pytest-testing":
    "Framework de testes mais produtivo do Python, com fixtures poderosas e asserções simples sem boilerplate.",
  "python-basics":
    "Linguagem versátil e acessível, líder absoluta em Ciência de Dados, Inteligência Artificial, automação e backend rápido.",
  "pytorch-ml-python":
    "Framework de Deep Learning preferido por pesquisadores e engenheiros para treinar redes neurais e modelos de IA.",
  "qt-gui-cpp":
    "Framework multiplataforma clássico para criar interfaces gráficas nativas e software desktop/embarcado em C++.",
  "rayon-parallel-rust":
    "Transforma iteradores sequenciais em processamento paralelo seguro com uma linha de código em Rust.",
  "react-fundamentals":
    "Biblioteca mais popular do mundo para construir interfaces web reativas e componentizadas, base do ecossistema frontend.",
  "redis-caching":
    "Banco em memória ultrarrápido essencial para cache, filas, sessões e rate limiting em sistemas de alta escala.",
  "reqwest-http-rust":
    "Cliente HTTP ergonômico e assíncrono em Rust para consumir APIs externas com segurança e performance.",
  "rust-axum-serde":
    "Stack moderna do Rust para APIs web seguras, ergonômicas e extremamente rápidas com serialização zero-cost.",
  "rust-systems":
    "Garante segurança de memória sem garbage collector, sendo a escolha moderna para sistemas, WebAssembly, CLIs e infraestrutura.",
  "scikit-learn-python":
    "Porta de entrada prática para Machine Learning clássico (classificação, regressão e clustering) em Python.",
  "sdl2-raylib-cpp":
    "Bibliotecas diretas para criar jogos 2D/3D, engines e gráficos em tempo real com C/C++.",
  "serde-serialization-rust":
    "Padrão ouro do Rust para serializar e desserializar JSON, YAML e formatos binários sem custo de runtime.",
  "signalr-csharp":
    "Adiciona comunicação em tempo real (WebSockets) em apps .NET para chats, notificações e dashboards ao vivo.",
  "spring-boot-java":
    "Principal framework do ecossistema Java para criar APIs e microsserviços corporativos prontos para produção.",
  "spring-data-jpa":
    "Simplifica drasticamente o acesso a bancos SQL no Spring Boot gerando queries a partir de interfaces Java.",
  "spring-kafka-java":
    "Integra aplicações Java ao Apache Kafka para arquiteturas orientadas a eventos e streaming de dados em escala.",
  "spring-security-jwt":
    "Protege APIs Spring Boot com autenticação stateless via JWT, filtros e controle fino de permissões.",
  "sql-databases":
    "Linguagem universal para consultar, modelar e garantir integridade em bancos relacionais — essencial em backend e dados.",
  "sqlalchemy-python":
    "ORM e toolkit SQL mais completo do Python para modelar bancos relacionais com segurança e flexibilidade.",
  "sqlx-rust":
    "Executa queries SQL assíncronas em Rust verificando a sintaxe e os tipos direto no banco em tempo de compilação.",
  "stl-cpp":
    "Biblioteca padrão do C++ (vetores, mapas, algoritmos) que evita reinventar a roda e garante código eficiente.",
  "tailwind-css":
    "Framework CSS utility-first que acelera a criação de interfaces responsivas e consistentes direto no HTML/JSX.",
  "tanstack-query-ts":
    "Resolve cache, sincronização e estados de carregamento de requisições em React sem precisar gerenciar tudo na mão.",
  "tauri-desktop-rust":
    "Permite criar apps desktop leves e seguros usando frontend web com backend nativo em Rust no lugar do Electron.",
  "testcontainers-java":
    "Sobe bancos de dados e serviços reais em containers Docker durante os testes em Java, evitando mocks frágeis.",
  "testify-go":
    "Adiciona asserções expressivas e mocks aos testes nativos do Go, deixando a suíte de testes mais legível.",
  "tokio-async-rust":
    "Runtime assíncrono padrão do Rust para construir servidores de rede, APIs e tarefas concorrentes de alta escala.",
  "tracing-telemetry-rust":
    "Instrumentação estruturada em Rust para logs, spans e observabilidade em sistemas assíncronos e distribuídos.",
  "typescript-javascript":
    "Linguagem fundamental da web (frontend e Node.js), com tipagem estática no TypeScript para escalar projetos com segurança.",
  "unity-csharp":
    "Engine mais popular para criar jogos 2D, 3D, mobile e experiências interativas usando C#.",
  "viper-config-go":
    "Solução completa em Go para carregar configurações de arquivos, variáveis de ambiente e flags de CLI.",
  "vitest-testing":
    "Test runner ultrarrápido nativo para ecossistemas Vite/TypeScript com API compatível com Jest.",
  "xunit-csharp":
    "Framework de testes moderno e extensível mais adotado pela comunidade .NET e pela própria Microsoft.",
  "zap-logging-go":
    "Logger estruturado de altíssima performance da Uber para serviços Go que exigem zero alocação em produção.",
  "zod-validation":
    "Validação de schemas TypeScript-first para garantir segurança nos dados de formulários, APIs e variáveis de ambiente.",
};

const TRACK_WHY_EN: Record<string, string> = {
  "algorithms-data-structures":
    "Essential foundation for solving complex problems, writing efficient code (Big O), and acing technical interviews.",
  "asio-networking-cpp":
    "Industry standard in C++ for ultra-low-latency async networking, servers, and real-time systems.",
  "aspnet-core-csharp":
    "Microsoft's high-performance enterprise web framework for REST APIs, microservices, and cloud apps.",
  "blazor-csharp":
    "Build interactive web UIs using C# and .NET instead of JavaScript while sharing code with your backend.",
  "boost-cpp":
    "Battle-tested C++ libraries complementing the STL for graphs, regex, threading, and advanced utilities.",
  "c-cpp-systems":
    "Master memory control, pointers, and peak performance for operating systems, games, embedded devices, and compilers.",
  "clap-cli-rust":
    "De facto Rust library for building fast, type-safe command-line tools with automatic help output.",
  "cmake-build-system":
    "Industry-standard cross-platform build system for managing C and C++ projects of any scale.",
  "cobra-cli-go":
    "Framework powering tools like Docker, kubectl, and GitHub CLI for building robust Go CLIs.",
  "csharp-dotnet":
    "Modern, strongly typed language versatile across enterprise backends, Unity games, desktop, and Azure cloud.",
  "dapper-csharp":
    "Ultra-fast micro-ORM for .NET when you want full SQL control with typed object mapping.",
  "django-python":
    "Batteries-included Python web framework with built-in admin, ORM, and security to ship products fast.",
  "echo-go":
    "Minimalist, high-speed Go web microframework for clean REST APIs with simple routing and middleware.",
  "ef-core-csharp":
    "Official .NET ORM for working with relational databases using LINQ, migrations, and strong typing.",
  "eigen-linalg-cpp":
    "High-performance C++ linear algebra library for matrices and vectors, used in robotics, vision, and games.",
  "fastapi-python":
    "One of the fastest Python API frameworks, featuring automatic Pydantic validation and native OpenAPI docs.",
  "fiber-go":
    "Express-inspired Go web framework focused on minimal latency and maximum request throughput.",
  "fluentvalidation-csharp":
    "Clean .NET pattern for separating complex validation rules from entities with fluent, testable syntax.",
  "git-github-workflow":
    "Indispensable tool for every software team to version code, review PRs, and collaborate safely.",
  "go-gorm-sqlc":
    "Master Go persistence: from ORM productivity (GORM) to type-safe compiled raw SQL (sqlc).",
  "go-web-gin":
    "Go's most popular web framework for building fast APIs and microservices with low memory footprint.",
  "golang-cloud":
    "Google-designed language for simple concurrency (goroutines), single binaries, and cloud-native infrastructure.",
  "googletest-cpp":
    "Google's standard framework for writing reliable unit tests and mocks in C++ projects.",
  "grpc-go":
    "High-performance RPC communication with Protocol Buffers, ideal for low-latency Go microservices.",
  "java-basics":
    "One of the most in-demand enterprise languages, powering banking, distributed systems, and Android.",
  "junit-mockito":
    "Essential Java duo for ensuring code quality with isolated unit tests and dependency mocks.",
  "lombok-java":
    "Eliminates boilerplate (getters, setters, builders) in Java, keeping classes clean and readable.",
  "mapstruct-java":
    "Generates compile-time DTO mappers in Java, avoiding slow reflection and manual conversion bugs.",
  "mediatr-csharp":
    "Implements Mediator/CQRS in .NET to decouple handlers, commands, and events in clean architectures.",
  "mockito-java":
    "Leading Java mocking library to simulate dependencies in unit tests and verify behavior clearly.",
  "nextjs-app-router":
    "Market-leading full-stack React framework for SEO, Server Components, file routing, and fast web apps.",
  "nlohmann-json-cpp":
    "The most intuitive, modern way to parse, manipulate, and serialize JSON in C++ with Python-like syntax.",
  "nodejs-hono-api":
    "Ultrafast multi-runtime web framework (Node, Cloudflare Workers, Bun) for modern edge APIs.",
  "numpy-python":
    "Numerical foundation of Python data science and AI, providing vectorized arrays at C speed.",
  "pandas-data-science":
    "Standard Python toolkit for cleaning, transforming, and analyzing spreadsheets and tabular datasets.",
  "playwright-e2e":
    "Modern browser automation for reliable end-to-end testing across Chrome, Firefox, and WebKit.",
  "prisma-drizzle-orm":
    "Leading modern TypeScript ORMs for querying SQL databases with autocomplete and full type safety.",
  "pydantic-python":
    "Data validation and contracts in Python using Type Hints, powering FastAPI and modern AI agents.",
  "pytest-testing":
    "Python's most productive testing framework, with powerful fixtures and clean, boilerplate-free assertions.",
  "python-basics":
    "Versatile, approachable language leading Data Science, AI, automation, and rapid backend development.",
  "pytorch-ml-python":
    "Preferred Deep Learning framework for researchers and engineers training neural networks and AI models.",
  "qt-gui-cpp":
    "Classic cross-platform framework for building native GUIs and desktop or embedded software in C++.",
  "rayon-parallel-rust":
    "Turns sequential iterators into safe parallel processing with a single line of Rust code.",
  "react-fundamentals":
    "World's most popular library for building reactive, component-driven web UIs and frontend ecosystems.",
  "redis-caching":
    "Blazing-fast in-memory store essential for caching, queues, sessions, and rate limiting at scale.",
  "reqwest-http-rust":
    "Ergonomic, async HTTP client in Rust for consuming external APIs safely and efficiently.",
  "rust-axum-serde":
    "Modern Rust stack for safe, ergonomic, ultra-fast web APIs with zero-cost serialization.",
  "rust-systems":
    "Guarantees memory safety without a garbage collector—the modern choice for systems, Wasm, CLIs, and infra.",
  "scikit-learn-python":
    "Practical gateway to classic Machine Learning (classification, regression, clustering) in Python.",
  "sdl2-raylib-cpp":
    "Direct libraries for building 2D/3D games, engines, and real-time graphics in C and C++.",
  "serde-serialization-rust":
    "Rust's gold standard for serializing and deserializing JSON, YAML, and binary formats at zero runtime cost.",
  "signalr-csharp":
    "Adds real-time WebSocket communication to .NET apps for live chats, notifications, and dashboards.",
  "spring-boot-java":
    "Primary Java ecosystem framework for building production-ready enterprise APIs and microservices.",
  "spring-data-jpa":
    "Drastically simplifies SQL database access in Spring Boot by generating queries from Java interfaces.",
  "spring-kafka-java":
    "Connects Java apps to Apache Kafka for event-driven architectures and large-scale data streaming.",
  "spring-security-jwt":
    "Secures Spring Boot APIs with stateless JWT authentication, filters, and fine-grained permissions.",
  "sql-databases":
    "Universal language for querying, modeling, and ensuring integrity in relational databases across backend and data.",
  "sqlalchemy-python":
    "Python's most complete ORM and SQL toolkit for modeling relational databases safely and flexibly.",
  "sqlx-rust":
    "Runs async SQL queries in Rust while checking syntax and types against your database at compile time.",
  "stl-cpp":
    "C++ Standard Template Library (vectors, maps, algorithms) so you write fast code without reinventing the wheel.",
  "tailwind-css":
    "Utility-first CSS framework that speeds up building responsive, consistent UIs directly in HTML/JSX.",
  "tanstack-query-ts":
    "Handles request caching, syncing, and loading states in React without manual boilerplate.",
  "tauri-desktop-rust":
    "Build lightweight, secure desktop apps using a web frontend with a native Rust backend instead of Electron.",
  "testcontainers-java":
    "Spins up real databases and services in Docker containers during Java tests, avoiding fragile mocks.",
  "testify-go":
    "Adds expressive assertions and mocks to Go's native tests, making test suites much cleaner to read.",
  "tokio-async-rust":
    "Standard async runtime in Rust for building high-scale network servers, APIs, and concurrent tasks.",
  "tracing-telemetry-rust":
    "Structured instrumentation in Rust for logs, spans, and observability in async distributed systems.",
  "typescript-javascript":
    "Core language of the web (frontend and Node.js), with static typing in TypeScript to scale safely.",
  "unity-csharp":
    "Most popular game engine for building 2D, 3D, mobile, and interactive experiences with C#.",
  "viper-config-go":
    "Complete Go solution for loading configuration from files, environment variables, and CLI flags.",
  "vitest-testing":
    "Blazing-fast test runner built for Vite/TypeScript ecosystems with a Jest-compatible API.",
  "xunit-csharp":
    "Modern, extensible testing framework most widely adopted by the .NET community and Microsoft.",
  "zap-logging-go":
    "Uber's ultra-fast structured logger for Go services requiring zero-allocation performance in production.",
  "zod-validation":
    "TypeScript-first schema validation to keep forms, APIs, and environment variables type-safe at runtime.",
};

export function getWhyLearn(
  trackId: string,
  locale: Locale = "pt"
): string | undefined {
  if (locale === "pt") return TRACK_WHY_PT[trackId];
  return TRACK_WHY_EN[trackId] ?? TRACK_WHY_PT[trackId];
}
