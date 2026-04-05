import { HasPosition } from "../types/has-position";

export function sortByPosition<T extends HasPosition>(a: T, b: T): number {
  const posA = a.position ?? Number.MAX_SAFE_INTEGER;
  const posB = b.position ?? Number.MAX_SAFE_INTEGER;

  return posA - posB;
}
