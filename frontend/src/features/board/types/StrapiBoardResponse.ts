export interface StrapiColumn {
  id: number;
  attributes: {
    name: string;
    position: number;
  };
}

export interface StrapiBoard {
  id: number;
  attributes: {
    name: string;
    // @todo, shareToken and shareMode will be implemented later
    shareToken?: string | null;
    shareMode?: "read" | "edit" | null;
    columns: {
      data: StrapiColumn[];
    };
  };
}
