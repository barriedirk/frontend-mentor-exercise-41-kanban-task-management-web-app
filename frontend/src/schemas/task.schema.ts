import { z } from "zod";

const taskIdSchema = z.union([
  z.string().trim().min(1, "ID cannot be empty"),
  z.number(),
]);

const subTaskBaseSchema = z.object({
  id: taskIdSchema.optional(),
  // Strapi 5 usa documentId para componentes/relaciones a veces,
  // pero en componentes suele ser solo 'id'
  name: z
    .string()
    .trim()
    .min(1, "Subtask name is required")
    .max(100, "Subtask name is too long"), // Subtareas suelen ser más largas
  completed: z.boolean().default(false),
});

const taskBaseSchema = z.object({
  id: taskIdSchema.optional(),
  documentId: z.string().optional(), // Muy importante para Strapi 5
  name: z
    .string()
    .trim()
    .min(1, "Task name is required")
    .max(100, "Task name is too long"),
  description: z
    .string()
    .trim()
    .min(1, "Task description is required")
    .max(500, "Description can be detailed"), // 300 es algo corto para descripciones técnicas
  columnId: z.string().min(1, "Task must belong to a column"),
  subTasks: z.array(subTaskBaseSchema).default([]), // Es mejor permitir 0 subtareas que obligar a tener una
});

// Para editar, el documentId es MANDATORIO en Strapi 5
export const editTaskSchema = taskBaseSchema.extend({
  documentId: z.string().min(1, "documentId is required for updates"),
});

export const addTaskSchema = taskBaseSchema.omit({ documentId: true });

export type EditTaskValues = z.infer<typeof editTaskSchema>;
export type AddTaskValues = z.infer<typeof addTaskSchema>;
