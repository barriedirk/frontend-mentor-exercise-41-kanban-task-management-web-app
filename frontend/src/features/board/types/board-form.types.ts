/**
 * Base form type used by react-hook-form.
 * Compatible with BOTH addBoardSchema and editBoardSchema
 */
export type BoardFormBase = {
  name: string;
  columns: {
    id: string;
    name: string;
    position?: number;
  }[];
};
