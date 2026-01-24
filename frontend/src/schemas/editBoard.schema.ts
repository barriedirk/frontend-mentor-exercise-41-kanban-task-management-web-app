import { z } from "zod";

/**
 * Column schema used inside Edit Board
 */
export const editBoardColumnSchema = z.object({
  id: z.string().min(1),
  name: z
    .string()
    .trim()
    .min(1, "Column name is required")
    .max(50, "Column name is too long"),
  position: z.number().optional(),
});

/**
 * Edit Board schema
 */
export const editBoardSchema = z.object({
  id: z.string().min(1),
  name: z
    .string()
    .trim()
    .min(1, "Board name is required")
    .max(100, "Board name is too long"),
  columns: z
    .array(editBoardColumnSchema)
    .min(1, "At least one column is required"),
  shareMode: z.enum(["read", "edit"]).nullable().optional(),
  shareToken: z.string().nullable().optional(),
});

/**
 * Useful inferred types
 */
export type EditBoardValues = z.infer<typeof editBoardSchema>;
export type EditBoardColumnValues = z.infer<typeof editBoardColumnSchema>;
