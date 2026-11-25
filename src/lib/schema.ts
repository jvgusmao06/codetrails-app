import { z } from "zod";

export const TheoryStepSchema = z.object({
  type: z.literal("theory"),
  title: z.string().min(1),
  content: z.string().min(1),
  codeExample: z.string().optional(),
  expectedOutput: z.string().optional(),
  keyTakeaways: z.array(z.string().min(1)).optional(),
});

export const MultipleChoiceStepSchema = z.object({
  type: z.literal("multiple_choice"),
  kind: z.enum(["quiz", "predict_output"]).optional(),
  prompt: z.string().min(1),
  codeSnippet: z.string().optional(),
  options: z.array(z.string().min(1)).min(2),
  correctIndex: z.number().int().min(0),
  hint: z.string().optional(),
  expectedOutput: z.string().optional(),
  explanation: z.string().min(1),
});

export const FillInBlankStepSchema = z.object({
  type: z.literal("fill_in_blank"),
  prompt: z.string().min(1),
  codeTemplate: z.string().min(1), // Uses {{blank}} for placeholders
  blanks: z
    .array(
      z.object({
        answer: z.string().min(1),
        placeholder: z.string().optional(),
      })
    )
    .min(1),
  options: z.array(z.string().min(1)).optional(),
  hint: z.string().optional(),
  expectedOutput: z.string().optional(),
  explanation: z.string().min(1),
});

export const OrderCodeStepSchema = z.object({
  type: z.literal("order_code"),
  prompt: z.string().min(1),
  blocks: z.array(z.string().min(1)).min(2), // Shuffled blocks shown to user
  correctOrder: z.array(z.number().int().min(0)).min(2), // Indices of `blocks` in the valid order
  hint: z.string().optional(),
  expectedOutput: z.string().optional(),
  explanation: z.string().min(1),
});

export const SpotTheBugStepSchema = z.object({
  type: z.literal("spot_the_bug"),
  prompt: z.string().min(1),
  lines: z.array(z.string().min(1)).min(2), // Code lines displayed with line numbers
  buggyLineIndex: z.number().int().min(0),
  hint: z.string().optional(),
  expectedOutput: z.string().optional(),
  explanation: z.string().min(1),
});

export const WriteCodeStepSchema = z.object({
  type: z.literal("write_code"),
  prompt: z.string().min(1),
  starterCode: z.string().optional(),
  requiredTokens: z.array(z.string().min(1)).min(1),
  sampleSolution: z.string().min(1),
  hint: z.string().optional(),
  expectedOutput: z.string().optional(),
  explanation: z.string().min(1),
});

export const StepSchema = z.discriminatedUnion("type", [
  TheoryStepSchema,
  MultipleChoiceStepSchema,
  FillInBlankStepSchema,
  OrderCodeStepSchema,
  SpotTheBugStepSchema,
  WriteCodeStepSchema,
]);

export const LessonSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  mission: z.string().optional(),
  xp: z.number().int().positive().default(10),
  steps: z.array(StepSchema).min(1),
});

export const ModuleMetaSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  lessons: z.array(z.string().min(1)).min(1),
});

export const TrackMetaSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  category: z.enum(["language", "framework", "library", "tool", "concept"]),
  languageId: z.string().optional(),
  prerequisites: z.array(z.string()).default([]),
  color: z.string().min(1),
  icon: z.string().min(1),
  author: z.string().default("Comunidade"),
  modules: z.array(ModuleMetaSchema).min(1),
});

export type TheoryStep = z.infer<typeof TheoryStepSchema>;
export type MultipleChoiceStep = z.infer<typeof MultipleChoiceStepSchema>;
export type FillInBlankStep = z.infer<typeof FillInBlankStepSchema>;
export type OrderCodeStep = z.infer<typeof OrderCodeStepSchema>;
export type SpotTheBugStep = z.infer<typeof SpotTheBugStepSchema>;
export type WriteCodeStep = z.infer<typeof WriteCodeStepSchema>;
export type LessonStep = z.infer<typeof StepSchema>;
export type Lesson = z.infer<typeof LessonSchema>;
export type ModuleMeta = z.infer<typeof ModuleMetaSchema>;
export type TrackMeta = z.infer<typeof TrackMetaSchema>;

export interface LoadedModule extends Omit<ModuleMeta, "lessons"> {
  lessons: Lesson[];
}

export interface LoadedTrack extends Omit<TrackMeta, "modules"> {
  modules: LoadedModule[];
}
