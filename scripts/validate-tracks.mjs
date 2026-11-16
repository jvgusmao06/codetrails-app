import fs from "node:fs";
import path from "node:path";
import { LessonSchema, TrackMetaSchema } from "../src/lib/schema.ts";
import { matchRequiredTokens } from "../src/lib/code-validation.ts";

const tracksDir = path.join(process.cwd(), "content", "tracks");

let trackCount = 0;
let lessonCount = 0;
const loadedTracks = new Map();

for (const entry of fs.readdirSync(tracksDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;
  const trackPath = path.join(tracksDir, entry.name, "track.json");
  const rawTrack = JSON.parse(fs.readFileSync(trackPath, "utf-8"));
  const track = TrackMetaSchema.parse(rawTrack);
  loadedTracks.set(track.id, track);
  trackCount++;

  for (const mod of track.modules) {
    for (const lessonFile of mod.lessons) {
      const lessonPath = path.join(
        tracksDir,
        entry.name,
        mod.id,
        `${lessonFile}.json`
      );
      const rawLesson = JSON.parse(fs.readFileSync(lessonPath, "utf-8"));
      const lesson = LessonSchema.parse(rawLesson);

      // Extra semantic check: blanks count matches {{blank}} occurrences
      for (const step of lesson.steps) {
        if (step.type === "fill_in_blank") {
          const occurrences =
            step.codeTemplate.split("{{blank}}").length - 1;
          if (occurrences !== step.blanks.length) {
            throw new Error(
              `[${lesson.id}] O número de {{blank}} (${occurrences}) não coincide com blanks.length (${step.blanks.length})`
            );
          }
        } else if (step.type === "multiple_choice") {
          if (step.correctIndex >= step.options.length) {
            throw new Error(
              `[${lesson.id}] correctIndex (${step.correctIndex}) fora do limite de options (${step.options.length})`
            );
          }
        } else if (step.type === "order_code") {
          if (step.correctOrder.length !== step.blocks.length) {
            throw new Error(
              `[${lesson.id}] correctOrder (${step.correctOrder.length}) deve ter o mesmo tamanho de blocks (${step.blocks.length})`
            );
          }
          for (const idx of step.correctOrder) {
            if (idx < 0 || idx >= step.blocks.length) {
              throw new Error(
                `[${lesson.id}] índice inválido (${idx}) em correctOrder`
              );
            }
          }
        } else if (step.type === "spot_the_bug") {
          if (step.buggyLineIndex >= step.lines.length) {
            throw new Error(
              `[${lesson.id}] buggyLineIndex (${step.buggyLineIndex}) fora do limite de lines (${step.lines.length})`
            );
          }
        } else if (step.type === "write_code") {
          const { matched } = matchRequiredTokens(
            step.sampleSolution,
            step.requiredTokens,
            track.languageId ?? track.id,
            track.id
          );
          step.requiredTokens.forEach((tok, idx) => {
            if (!matched[idx]) {
              throw new Error(
                `[${lesson.id}] sampleSolution não contém o requiredToken "${tok}" (fora de comentários)`
              );
            }
          });
        }
      }
      lessonCount++;
    }
  }
}

for (const [id, track] of loadedTracks.entries()) {
  if (track.languageId && !loadedTracks.has(track.languageId)) {
    throw new Error(
      `[${id}] languageId "${track.languageId}" não aponta para uma trilha existente`
    );
  }
  for (const reqId of track.prerequisites ?? []) {
    if (!loadedTracks.has(reqId)) {
      throw new Error(
        `[${id}] pré-requisito "${reqId}" não aponta para uma trilha existente`
      );
    }
  }
}

console.log(
  `✓ Sucesso! ${trackCount} trilhas e ${lessonCount} lições validadas sem erros.`
);
