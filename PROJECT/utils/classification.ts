
import { InventoryItem, AbcSettings, ClassifiedInventoryItem, Category, InventoryStats } from '../types';

export const classifyInventory = (items: InventoryItem[], settings: AbcSettings): ClassifiedInventoryItem[] => {
  if (items.length === 0) {
    return [];
  }

  const itemsWithTotalValue = items.map(item => ({
    ...item,
    totalValue: item.quantity * item.unitCost,
  }));

  const totalInventoryValue = itemsWithTotalValue.reduce((sum, item) => sum + item.totalValue, 0);

  if (totalInventoryValue === 0) {
    return items.map(item => ({
        ...item,
        totalValue: 0,
        percentageOfTotal: 0,
        cumulativePercentage: 0,
        category: Category.C
    }));
  }

  const sortedItems = [...itemsWithTotalValue].sort((a, b) => b.totalValue - a.totalValue);

  let cumulativeValue = 0;
  const classifiedItems = sortedItems.map(item => {
    cumulativeValue += item.totalValue;
    const percentageOfTotal = (item.totalValue / totalInventoryValue) * 100;
    const cumulativePercentage = (cumulativeValue / totalInventoryValue) * 100;

    let category: Category;
    if (cumulativePercentage <= settings.aThreshold) {
      category = Category.A;
    } else if (cumulativePercentage <= settings.bThreshold) {
      category = Category.B;
    } else {
      category = Category.C;
    }

    return {
      ...item,
      percentageOfTotal,
      cumulativePercentage,
      category,
    };
  });

  return classifiedItems;
};

export const calculateStats = (classifiedItems: ClassifiedInventoryItem[]): InventoryStats => {
  const stats: InventoryStats = {
    totalItems: classifiedItems.length,
    totalValue: 0,
    categoryA_count: 0,
    categoryA_value: 0,
    categoryB_count: 0,
    categoryB_value: 0,
    categoryC_count: 0,
    categoryC_value: 0,
  };

  classifiedItems.forEach(item => {
    stats.totalValue += item.totalValue;
    switch (item.category) {
      case Category.A:
        stats.categoryA_count++;
        stats.categoryA_value += item.totalValue;
        break;
      case Category.B:
        stats.categoryB_count++;
        stats.categoryB_value += item.totalValue;
        break;
      case Category.C:
        stats.categoryC_count++;
        stats.categoryC_value += item.totalValue;
        break;
    }
  });

  return stats;
};
