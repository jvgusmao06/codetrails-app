import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getAllTracks, getLessonById } from "@/lib/tracks";
import { LessonPlayer } from "@/components/LessonPlayer";

export function generateStaticParams() {
  const tracks = getAllTracks();
  const params: { trackId: string; lessonId: string }[] = [];

  for (const track of tracks) {
    for (const mod of track.modules) {
      for (const lesson of mod.lessons) {
        params.push({ trackId: track.id, lessonId: lesson.id });
      }
    }
  }

  return params;
}

export default async function LessonPage({
  params,
}: {
  params: Promise<{ trackId: string; lessonId: string }>;
}) {
  const { trackId, lessonId } = await params;
  const data = getLessonById(trackId, lessonId);

  if (!data) {
    notFound();
  }

  const orderedLessonIds = data.track.modules.flatMap((m) =>
    m.lessons.map((l) => l.id)
  );
  const currentLessonIndex = orderedLessonIds.indexOf(data.lesson.id);
  const nextLessonId =
    currentLessonIndex !== -1 && currentLessonIndex + 1 < orderedLessonIds.length
      ? orderedLessonIds[currentLessonIndex + 1]
      : undefined;

  return (
    <Suspense
      fallback={
        <div className="min-h-dvh bg-background text-muted flex items-center justify-center font-mono text-xs">
          Carregando módulo...
        </div>
      }
    >
      <LessonPlayer
        trackId={data.track.id}
        trackTitle={data.track.title}
        languageId={data.track.languageId ?? data.track.id}
        moduleTitle={data.moduleTitle}
        lesson={data.lesson}
        nextLessonId={nextLessonId}
      />
    </Suspense>
  );
}
