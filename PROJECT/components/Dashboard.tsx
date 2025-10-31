
import React, { useState } from 'react';
import { InventoryStats, ClassifiedInventoryItem, Settings, Category, InventoryItem } from '../types';
import SummaryCards from './SummaryCards';
import InventoryTable from './InventoryTable';

interface DashboardProps {
  stats: InventoryStats;
  classifiedItems: ClassifiedInventoryItem[];
  onGetSuggestion: (item: ClassifiedInventoryItem) => void;
  settings: Settings;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: InventoryItem) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ stats, classifiedItems, onGetSuggestion, settings, onDeleteItem, onUpdateItem }) => {
  const [filter, setFilter] = useState<Category | 'ALL'>('ALL');

  const filteredItems = filter === 'ALL'
    ? classifiedItems
    : classifiedItems.filter(item => item.category === filter);

  const getFilterButtonClass = (category: Category | 'ALL') => {
    const baseClass = "px-4 py-2 text-sm font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-100 dark:focus:ring-offset-slate-900";
    if (filter === category) {
      switch(category) {
        case 'A': return `${baseClass} bg-red-500 text-white focus:ring-red-400`;
        case 'B': return `${baseClass} bg-yellow-500 text-white focus:ring-yellow-400`;
        case 'C': return `${baseClass} bg-green-500 text-white focus:ring-green-400`;
        default: return `${baseClass} bg-indigo-600 text-white focus:ring-indigo-500`;
      }
    } else {
        return `${baseClass} bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-600`;
    }
  };

  return (
    <div className="space-y-6">
      <SummaryCards stats={stats} />
      <div className="bg-white dark:bg-slate-800 p-4 sm:p-6 rounded-lg shadow-md">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h2 className="text-xl font-semibold mb-3 sm:mb-0">Inventory Details</h2>
          <div className="flex space-x-2">
            <button onClick={() => setFilter('ALL')} className={getFilterButtonClass('ALL')}>All</button>
            <button onClick={() => setFilter(Category.A)} className={getFilterButtonClass(Category.A)}>A</button>
            <button onClick={() => setFilter(Category.B)} className={getFilterButtonClass(Category.B)}>B</button>
            <button onClick={() => setFilter(Category.C)} className={getFilterButtonClass(Category.C)}>C</button>
          </div>
        </div>
        <InventoryTable 
          items={filteredItems} 
          onGetSuggestion={onGetSuggestion} 
          settings={settings}
          onDeleteItem={onDeleteItem}
          onUpdateItem={onUpdateItem}
        />
      </div>
    </div>
  );
};

export default Dashboard;
