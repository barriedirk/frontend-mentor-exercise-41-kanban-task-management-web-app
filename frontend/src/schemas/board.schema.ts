import { z } from "zod";

const boardColumnBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Column name is required")
    .max(50, "Column name is too long"),
  position: z.number().optional(),
});

/**
 * Column schema used inside Edit Board
 */
export const editBoardColumnSchema = boardColumnBaseSchema.extend({
  id: z.string().min(1),
});

/**
 * Column schema used inside Add Board
 */
export const addBoardColumnSchema = boardColumnBaseSchema.extend({
  id: z.string().min(1),
});

const boardBaseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "Board name is required")
    .max(100, "Board name is too long"),
  shareMode: z.enum(["read", "edit"]).nullable().optional(),
  shareToken: z.string().nullable().optional(),
});

/**
 * Edit Board schema
 */
export const editBoardSchema = boardBaseSchema.extend({
  id: z.string().min(1).optional(),
  columns: z
    .array(editBoardColumnSchema)
    .min(1, "At least one column is required"),
});

/**
 * Add Board schema
 */
export const addBoardSchema = boardBaseSchema.extend({
  columns: z
    .array(addBoardColumnSchema)
    .min(1, "At least one column is required"),
});

/**
 * Useful inferred types
 */
export type EditBoardValues = z.infer<typeof editBoardSchema>;
export type AddBoardValues = z.infer<typeof addBoardSchema>;
export type EditBoardColumnValues = z.infer<typeof editBoardColumnSchema>;
export type AddBoardColumnValues = z.infer<typeof addBoardColumnSchema>;
