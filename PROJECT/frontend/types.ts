
export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unitCost: number;
}

export enum Category {
  A = 'A',
  B = 'B',
  C = 'C',
}

export interface ClassifiedInventoryItem extends InventoryItem {
  totalValue: number;
  percentageOfTotal: number;
  cumulativePercentage: number;
  category: Category;
}

export interface AbcSettings {
  aThreshold: number; // e.g., 80, meaning 0-80% cumulative value is 'A'
  bThreshold: number; // e.g., 95, meaning 80-95% is 'B', and >95% is 'C'
}

export interface ReorderThresholds {
  min: number;
  max: number;
}

export interface CategoryThresholds {
  [Category.A]: ReorderThresholds;
  [Category.B]: ReorderThresholds;
  [Category.C]: ReorderThresholds;
}

export interface Settings {
  abc: AbcSettings;
  thresholds: CategoryThresholds;
}

export interface InventoryStats {
  totalItems: number;
  totalValue: number;
  categoryA_count: number;
  categoryA_value: number;
  categoryB_count: number;
  categoryB_value: number;
  categoryC_count: number;
  categoryC_value: number;
}
