
import React from 'react';
import { InventoryStats } from '../types';
import { CubeIcon, CurrencyDollarIcon, CollectionIcon } from './icons/Icons';

interface SummaryCardsProps {
  stats: InventoryStats;
}

const SummaryCard: React.FC<{ title: string; value: string; subValue?: string; icon: React.ReactNode, color: string }> = ({ title, value, subValue, icon, color }) => (
  <div className={`bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md flex items-start border-l-4 ${color}`}>
    <div className="flex-shrink-0 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 truncate">{title}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{value}</p>
      {subValue && <p className="text-xs text-slate-500 dark:text-slate-400">{subValue}</p>}
    </div>
  </div>
);

const SummaryCards: React.FC<SummaryCardsProps> = ({ stats }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const aValuePercent = stats.totalValue > 0 ? (stats.categoryA_value / stats.totalValue * 100).toFixed(1) : 0;
  const bValuePercent = stats.totalValue > 0 ? (stats.categoryB_value / stats.totalValue * 100).toFixed(1) : 0;
  const cValuePercent = stats.totalValue > 0 ? (stats.categoryC_value / stats.totalValue * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      <SummaryCard 
        title="Total Value" 
        value={formatCurrency(stats.totalValue)} 
        subValue={`${stats.totalItems} unique items`}
        icon={<CurrencyDollarIcon className="h-8 w-8 text-indigo-500" />}
        color="border-indigo-500"
      />
      <SummaryCard 
        title="Category A" 
        value={formatCurrency(stats.categoryA_value)} 
        subValue={`${stats.categoryA_count} items (${aValuePercent}%)`}
        icon={<CollectionIcon className="h-8 w-8 text-red-500" />}
        color="border-red-500"
      />
      <SummaryCard 
        title="Category B" 
        value={formatCurrency(stats.categoryB_value)} 
        subValue={`${stats.categoryB_count} items (${bValuePercent}%)`}
        icon={<CollectionIcon className="h-8 w-8 text-yellow-500" />}
        color="border-yellow-500"
      />
      <SummaryCard 
        title="Category C" 
        value={formatCurrency(stats.categoryC_value)} 
        subValue={`${stats.categoryC_count} items (${cValuePercent}%)`}
        icon={<CollectionIcon className="h-8 w-8 text-green-500" />}
        color="border-green-500"
      />
    </div>
  );
};

export default SummaryCards;
