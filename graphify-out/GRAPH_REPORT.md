# Graph Report - programming-app  (2026-11-16)

## Corpus Check
- 360 files · ~97,902 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 28 file(s) not represented in the graph (top: .xml 10, (none) 5, .properties 2)

## Summary
- 422 nodes · 710 edges · 36 communities (22 shown, 14 thin omitted)
- Extraction: 89% EXTRACTED · 11% INFERRED · 0% AMBIGUOUS · INFERRED: 75 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Next.js Pages & UI
- iOS App & Scene Delegates
- Android Splash & Launcher Assets
- Next.js & Capacitor Config
- Lesson Runner & Code Editor
- Track Validation & Schema
- Package DevDependencies & Tooling
- TypeScript Compiler Config
- Docs & Contribution Guides
- GitHub Track Validation Workflow
- Core Runtime Dependencies
- Bug Report Issue Template
- New Lesson Issue Template
- CodeMirror Language Modes
- Reminders & Local Notifications
- Android Capacitor Unit Tests
- NPM & Capacitor Scripts
- ESLint Configuration
- GitHub Issue Template Config
- Public SVG Icons & Logos
- Capacitor CLI Config
- iOS AppIcon & Splash Assets
- Next.js Agent Rules Docs
- Android MainActivity Bridge
- iOS Swift Package Manifest
- CodeMirror C++ Language Mode
- CodeMirror Go Language Mode
- CodeMirror JS Language Mode

## God Nodes (most connected - your core abstractions)
1. `useUserProgress()` - 19 edges
2. `compilerOptions` - 16 edges
3. `LessonPlayer()` - 15 edges
4. `TracksExplorer()` - 14 edges
5. `getAllTracks()` - 13 edges
6. `react` - 12 edges
7. `Android Default Splash Screen` - 12 edges
8. `next` - 11 edges
9. `ReminderCard()` - 11 edges
10. `AppDelegate` - 10 edges

## Surprising Connections (you probably didn't know these)
- `Validate Tracks PR Checklist` --conceptually_related_to--> `Track Validation CLI`  [INFERRED]
  .github/PULL_REQUEST_TEMPLATE.md → CONTRIBUTING.md
- `Capacitor Mobile and PWA Runtime` --conceptually_related_to--> `Capacitor SPM Dependencies Host`  [INFERRED]
  README.md → ios/App/CapApp-SPM/README.md
- `generateStaticParams()` --calls--> `getAllTracks()`  [EXTRACTED]
  src/app/lesson/[trackId]/[lessonId]/page.tsx → src/lib/tracks.ts
- `File Icon` --semantically_similar_to--> `Globe Icon`  [INFERRED] [semantically similar]
  public/file.svg → public/globe.svg
- `File Icon` --semantically_similar_to--> `Window Icon`  [INFERRED] [semantically similar]
  public/file.svg → public/window.svg

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Android Splash Screen Density Variants** — android_app_src_main_res_drawable_land_hdpi_splash_splash_image, android_app_src_main_res_drawable_land_mdpi_splash_splash_image, android_app_src_main_res_drawable_land_xhdpi_splash_splash_image, android_app_src_main_res_drawable_land_xxhdpi_splash_splash_image, android_app_src_main_res_drawable_land_xxxhdpi_splash_splash_image, android_app_src_main_res_drawable_port_hdpi_splash_splash_image, android_app_src_main_res_drawable_port_mdpi_splash_splash_image, android_app_src_main_res_drawable_port_xhdpi_splash_splash_image, android_app_src_main_res_drawable_port_xxhdpi_splash_splash_image, android_app_src_main_res_drawable_port_xxxhdpi_splash_splash_image, android_app_src_main_res_drawable_splash_splash_image [INFERRED 0.95]
- **Android Launcher Icon Density and Shape Variants** — android_app_src_main_res_mipmap_hdpi_ic_launcher_launcher_icon, android_app_src_main_res_mipmap_hdpi_ic_launcher_foreground_launcher_icon_foreground, android_app_src_main_res_mipmap_hdpi_ic_launcher_round_launcher_round_icon, android_app_src_main_res_mipmap_mdpi_ic_launcher_launcher_icon, android_app_src_main_res_mipmap_mdpi_ic_launcher_foreground_launcher_icon_foreground, android_app_src_main_res_mipmap_mdpi_ic_launcher_round_launcher_round_icon, android_app_src_main_res_mipmap_xhdpi_ic_launcher_launcher_icon, android_app_src_main_res_mipmap_xhdpi_ic_launcher_foreground_launcher_icon_foreground, android_app_src_main_res_mipmap_xhdpi_ic_launcher_round_launcher_round_icon, android_app_src_main_res_mipmap_xxhdpi_ic_launcher_launcher_icon, android_app_src_main_res_mipmap_xxhdpi_ic_launcher_foreground_launcher_icon_foreground, android_app_src_main_res_mipmap_xxhdpi_ic_launcher_round_launcher_round_icon, android_app_src_main_res_mipmap_xxxhdpi_ic_launcher_launcher_icon, android_app_src_main_res_mipmap_xxxhdpi_ic_launcher_foreground_launcher_icon_foreground, android_app_src_main_res_mipmap_xxxhdpi_ic_launcher_round_launcher_round_icon [INFERRED 0.95]
- **iOS Splash Screen Asset Catalog Set** — ios_app_app_assets_xcassets_splash_imageset_splash_2732x2732_splash_screen, ios_app_app_assets_xcassets_splash_imageset_splash_2732x2732_1_splash_screen, ios_app_app_assets_xcassets_splash_imageset_splash_2732x2732_2_splash_screen [INFERRED 0.95]
- **iOS Capacitor Visual Branding Assets** — ios_app_app_assets_xcassets_appicon_appiconset_appicon_512_2x_app_icon, ios_app_app_assets_xcassets_splash_imageset_splash_2732x2732_splash_screen, ios_app_app_assets_xcassets_splash_imageset_splash_2732x2732_1_splash_screen, ios_app_app_assets_xcassets_splash_imageset_splash_2732x2732_2_splash_screen [INFERRED 0.85]

## Communities (36 total, 14 thin omitted)

### Community 0 - "Next.js Pages & UI"
Cohesion: 0.08
Nodes (50): lucide-react, next, CommunityPage(), dynamic, HomePage(), StatsPage(), TracksPage(), AppShell() (+42 more)

### Community 1 - "iOS App & Scene Delegates"
Cohesion: 0.09
Nodes (4): Capacitor, AppDelegate, SceneDelegate, UIKit

### Community 2 - "Android Splash & Launcher Assets"
Cohesion: 0.16
Nodes (26): Android Landscape Splash Screen (HDPI), Android Landscape Splash Screen (MDPI), Android Landscape Splash Screen (XHDPI), Android Landscape Splash Screen (XXHDPI), Android Landscape Splash Screen (XXXHDPI), Android Portrait Splash Screen (HDPI), Android Portrait Splash Screen (MDPI), Android Portrait Splash Screen (XHDPI) (+18 more)

### Community 3 - "Next.js & Capacitor Config"
Cohesion: 0.09
Nodes (18): nextConfig, @capacitor/core@^8.6.0, @serwist/turbopack@^9.5.13, @capacitor/core, @serwist/turbopack, geistMono, geistSans, metadata (+10 more)

### Community 4 - "Lesson Runner & Code Editor"
Cohesion: 0.17
Nodes (18): react@19.3.0, react, generateStaticParams(), LessonPage(), CodeHighlight(), KEYWORDS, LITERALS, ConfettiBurst() (+10 more)

### Community 5 - "Track Validation & Schema"
Cohesion: 0.09
Nodes (20): loadedTracks, tracksDir, FillInBlankStep, FillInBlankStepSchema, LoadedModule, ModuleMeta, ModuleMetaSchema, MultipleChoiceStep (+12 more)

### Community 6 - "Package DevDependencies & Tooling"
Cohesion: 0.12
Nodes (22): devDependencies, @capacitor/android@^8.6.0, @capacitor/ios@^8.6.0, esbuild@^0.28.2, tailwindcss@4.3.3, @tailwindcss/turbopack@4.3.3, @types/node@^20, @types/react@^19 (+14 more)

### Community 7 - "TypeScript Compiler Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 8 - "Docs & Contribution Guides"
Cohesion: 0.12
Nodes (18): Pull Request Template, TypeScript Typecheck PR Checklist, Validate Tracks PR Checklist, CodeTrilhas Contributing Guide, Supported Exercise Types, Git-Driven Content Workflow, Track Directory Structure & track.json, Track Validation CLI (+10 more)

### Community 9 - "GitHub Track Validation Workflow"
Cohesion: 0.12
Nodes (16): jobs, validate, name, on, pull_request, push, branches, branches (+8 more)

### Community 10 - "Core Runtime Dependencies"
Cohesion: 0.12
Nodes (17): dependencies, @capacitor/local-notifications@^8.3.1, @codemirror/lang-python@^6.2.1, @codemirror/lang-sql@^6.10.0, @codemirror/theme-one-dark@^6.1.3, lucide-react@^1.72.0, next@16.4.6, react-dom@19.3.0 (+9 more)

### Community 11 - "Bug Report Issue Template"
Cohesion: 0.13
Nodes (14): description, label, options, placeholder, body, attributes, id, type (+6 more)

### Community 12 - "New Lesson Issue Template"
Cohesion: 0.13
Nodes (14): description, label, options, placeholder, body, attributes, id, type (+6 more)

### Community 13 - "CodeMirror Language Modes"
Cohesion: 0.15
Nodes (12): @codemirror/lang-css@^6.3.1, @codemirror/lang-java@^6.0.2, @codemirror/lang-rust@^6.0.2, @uiw/react-codemirror@^4.25.12, @codemirror/lang-css, @codemirror/lang-java, @codemirror/lang-rust, @uiw/react-codemirror (+4 more)

### Community 14 - "Reminders & Local Notifications"
Cohesion: 0.37
Nodes (11): emptySubscribe(), pad2(), ReminderCard(), applyReminder(), DEFAULT_REMINDER, disableDailyReminder(), enableDailyReminder(), isNativeApp() (+3 more)

### Community 16 - "NPM & Capacitor Scripts"
Cohesion: 0.22
Nodes (9): scripts, build, cap:android, cap:ios, cap:sync, dev, lint, start (+1 more)

### Community 17 - "ESLint Configuration"
Cohesion: 0.33
Nodes (5): eslintConfig, eslint@^9, eslint-config-next@16.4.6, eslint, eslint-config-next

### Community 18 - "GitHub Issue Template Config"
Cohesion: 0.33
Nodes (5): blank_issues_enabled, contact_links, about, name, url

### Community 19 - "Public SVG Icons & Logos"
Cohesion: 0.53
Nodes (6): File Icon, Globe Icon, Programming App Icon, Next.js Logo, Vercel Logo, Window Icon

### Community 21 - "Capacitor CLI Config"
Cohesion: 0.50
Nodes (3): config, @capacitor/cli@^8.6.0, @capacitor/cli

### Community 22 - "iOS AppIcon & Splash Assets"
Cohesion: 1.00
Nodes (4): Capacitor iOS App Icon (512pt@2x), Capacitor iOS Universal Splash Screen (2x), Capacitor iOS Universal Splash Screen (1x), Capacitor iOS Universal Splash Screen (3x)

### Community 23 - "Next.js Agent Rules Docs"
Cohesion: 0.67
Nodes (3): Next.js Agent Rules, Next.js Agent Files Generator, Next.js Dist Documentation

## Knowledge Gaps
- **14 isolated node(s):** `PackageDescription`, `TypeScript Typecheck PR Checklist`, `Next.js Dist Documentation`, `Next.js Agent Files Generator`, `Git-Driven Content Workflow` (+9 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 160 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `next` connect `Next.js Pages & UI` to `Core Runtime Dependencies`, `Next.js & Capacitor Config`, `Lesson Runner & Code Editor`, `Package DevDependencies & Tooling`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Are the 3 inferred relationships involving `useUserProgress()` (e.g. with `setActiveTrack()` and `setUserLocale()`) actually correct?**
  _`useUserProgress()` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `PackageDescription`, `TypeScript Typecheck PR Checklist`, `Next.js Dist Documentation` to the rest of the system?**
  _14 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Next.js Pages & UI` be split into smaller, more focused modules?**
  _Cohesion score 0.07587382779198636 - nodes in this community are weakly interconnected._
- **Why does `react` connect `Lesson Runner & Code Editor` to `Next.js Pages & UI`, `CodeMirror Language Modes`, `Package DevDependencies & Tooling`, `Reminders & Local Notifications`?**
  _High betweenness centrality (0.046) - this node is a cross-community bridge._
- **Should `iOS App & Scene Delegates` be split into smaller, more focused modules?**
  _Cohesion score 0.08620689655172414 - nodes in this community are weakly interconnected._
- **Why does `lucide-react` connect `Next.js Pages & UI` to `Core Runtime Dependencies`, `Lesson Runner & Code Editor`, `Package DevDependencies & Tooling`, `Reminders & Local Notifications`?**
  _High betweenness centrality (0.026) - this node is a cross-community bridge._