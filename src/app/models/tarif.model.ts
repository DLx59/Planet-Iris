export interface DimensionItem {
  dimension: string;
  iris: number[];
  frame: number | null;
}

export interface RatioEntry {
  name: string;
  dimensions: DimensionItem[];
}

export interface SupportEntry {
  support: string;
  ratios: RatioEntry[];
}

export type TarifData = Record<string, Record<string, DimensionItem[]>>;
