import { z } from "zod";

const taskIdSchema = z.union([
  z.string().trim().min(1, "ID cannot be empty"),
  z.number(),
]);

const subTaskBaseSchema = z.object({
  id: taskIdSchema.optional(),
  name: z
    .string()
    .trim()
    .min(1, "Subtask name is required")
    .max(100, "Subtask name is too long"),
  completed: z.boolean().default(false),
});

const taskBaseSchema = z.object({
  id: taskIdSchema.optional(),
  documentId: z.string().optional(),
  name: z
    .string()
    .trim()
    .min(1, "Task name is required")
    .max(100, "Task name is too long"),
  description: z
    .string()
    .trim()
    .min(1, "Task description is required")
    .max(500, "Description can be detailed"),
  columnId: z.string().min(1, "Task must belong to a column"),
  subTasks: z.array(subTaskBaseSchema).default([]),
});

export const editTaskSchema = taskBaseSchema.extend({
  documentId: z.string().min(1, "documentId is required for updates"),
});

export const addTaskSchema = taskBaseSchema.omit({ documentId: true });

export type EditTaskValues = z.infer<typeof editTaskSchema>;
export type AddTaskValues = z.infer<typeof addTaskSchema>;
