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

export function getWhyLearn(trackId: string): string | undefined {
  return TRACK_WHY_PT[trackId];
}
