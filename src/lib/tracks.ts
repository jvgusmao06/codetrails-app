import fs from "node:fs";
import path from "node:path";
import {
  LessonSchema,
  TrackMetaSchema,
  type LoadedTrack,
  type Lesson,
} from "./schema";

// Content catalog revision: 110 lessons (10 per base language/concept track)
const TRACKS_DIR = path.join(process.cwd(), "content", "tracks");

const TRACK_ORDER = [
  "python-basics",
  "java-basics",
  "c-cpp-systems",
  "typescript-javascript",
  "sql-databases",
  "golang-cloud",
  "rust-systems",
  "csharp-dotnet",
  "git-github-workflow",
  "algorithms-data-structures",
  "fastapi-python",
  "django-python",
  "pandas-data-science",
  "numpy-python",
  "pytorch-ml-python",
  "scikit-learn-python",
  "sqlalchemy-python",
  "pydantic-python",
  "pytest-testing",
  "spring-boot-java",
  "spring-data-jpa",
  "spring-security-jwt",
  "junit-mockito",
  "mockito-java",
  "lombok-java",
  "spring-kafka-java",
  "testcontainers-java",
  "mapstruct-java",
  "stl-cpp",
  "cmake-build-system",
  "googletest-cpp",
  "boost-cpp",
  "asio-networking-cpp",
  "sdl2-raylib-cpp",
  "qt-gui-cpp",
  "nlohmann-json-cpp",
  "eigen-linalg-cpp",
  "react-fundamentals",
  "nextjs-app-router",
  "tailwind-css",
  "zod-validation",
  "nodejs-hono-api",
  "prisma-drizzle-orm",
  "vitest-testing",
  "playwright-e2e",
  "tanstack-query-ts",
  "go-web-gin",
  "go-gorm-sqlc",
  "fiber-go",
  "echo-go",
  "cobra-cli-go",
  "zap-logging-go",
  "testify-go",
  "grpc-go",
  "viper-config-go",
  "rust-axum-serde",
  "tokio-async-rust",
  "serde-serialization-rust",
  "sqlx-rust",
  "clap-cli-rust",
  "reqwest-http-rust",
  "tauri-desktop-rust",
  "rayon-parallel-rust",
  "tracing-telemetry-rust",
  "aspnet-core-csharp",
  "ef-core-csharp",
  "dapper-csharp",
  "unity-csharp",
  "blazor-csharp",
  "xunit-csharp",
  "fluentvalidation-csharp",
  "mediatr-csharp",
  "signalr-csharp",
  "redis-caching",
];

export function getAllTracks(): LoadedTrack[] {
  if (!fs.existsSync(TRACKS_DIR)) {
    return [];
  }

  const entries = fs.readdirSync(TRACKS_DIR, { withFileTypes: true });
  const tracks: LoadedTrack[] = [];

  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    const track = getTrackById(entry.name);
    if (track) {
      tracks.push(track);
    }
  }

  return tracks.sort((a, b) => {
    const idxA = TRACK_ORDER.indexOf(a.id);
    const idxB = TRACK_ORDER.indexOf(b.id);
    return (idxA === -1 ? 999 : idxA) - (idxB === -1 ? 999 : idxB);
  });
}

export function getTrackById(trackId: string): LoadedTrack | null {
  // Sanitize path segment to prevent traversal
  const safeTrackId = path.basename(trackId);
  const trackDir = path.join(TRACKS_DIR, safeTrackId);
  const trackFile = path.join(trackDir, "track.json");

  if (!fs.existsSync(trackFile)) {
    return null;
  }

  const rawTrack = JSON.parse(fs.readFileSync(trackFile, "utf-8"));
  const parsedTrack = TrackMetaSchema.parse(rawTrack);

  const loadedModules = parsedTrack.modules.map((mod) => {
    const safeModId = path.basename(mod.id);
    const modDir = path.join(trackDir, safeModId);

    const lessons: Lesson[] = mod.lessons.map((lessonFile) => {
      const safeLesson = path.basename(lessonFile);
      const lessonPath = path.join(modDir, `${safeLesson}.json`);
      const rawLesson = JSON.parse(fs.readFileSync(lessonPath, "utf-8"));
      return LessonSchema.parse(rawLesson);
    });

    return {
      ...mod,
      lessons,
    };
  });

  return {
    ...parsedTrack,
    modules: loadedModules,
  };
}

export function getLessonById(
  trackId: string,
  lessonId: string
): { track: LoadedTrack; lesson: Lesson; moduleTitle: string } | null {
  const track = getTrackById(trackId);
  if (!track) return null;

  for (const mod of track.modules) {
    const found = mod.lessons.find((l) => l.id === lessonId);
    if (found) {
      return { track, lesson: found, moduleTitle: mod.title };
    }
  }

  return null;
}
