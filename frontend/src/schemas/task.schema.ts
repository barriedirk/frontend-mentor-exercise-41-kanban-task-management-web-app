import { z } from "zod";

const subTaskBaseSchema = z.object({
  id: z.string().trim().min(1).optional(),
  name: z
    .string()
    .trim()
    .min(1, "Task name is required")
    .max(50, "Task name is too long"),
  completed: z.boolean().default(false),
});

const taskBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Task name is required")
    .max(50, "Task name is too long"),
  description: z
    .string()
    .trim()
    .min(1, "Task description is required")
    .max(300, "Task description is too long"),
  columnId: z.string().trim().min(1, "Column is required"),
  subTasks: z
    .array(subTaskBaseSchema)
    .min(1, "At least one column is required"),
});

export const editTaskSchema = taskBaseSchema.extend({
  id: z.string().min(1),
});

/**
 * Column schema used inside Add Board
 */
export const addTaskSchema = taskBaseSchema.extend({
  id: z.string().min(1).optional(), // or omit entirely
});

export type EditTaskValues = z.infer<typeof editTaskSchema>;
export type AddTaskValues = z.infer<typeof addTaskSchema>;
