
import React, { useState } from 'react';
import { ClassifiedInventoryItem, Settings, InventoryItem } from '../types';
import { LightBulbIcon, PencilIcon, TrashIcon, CheckIcon, XIcon as XMarkIcon } from './icons/Icons';

interface InventoryTableProps {
  items: ClassifiedInventoryItem[];
  onGetSuggestion: (item: ClassifiedInventoryItem) => void;
  settings: Settings;
  onDeleteItem: (id: string) => void;
  onUpdateItem: (item: InventoryItem) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, onGetSuggestion, settings, onDeleteItem, onUpdateItem }) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<InventoryItem | null>(null);

  const handleEditClick = (item: InventoryItem) => {
    setEditingId(item.id);
    setEditFormData({ ...item });
  };

  const handleCancelClick = () => {
    setEditingId(null);
    setEditFormData(null);
  };

  const handleSaveClick = () => {
    if (editFormData) {
      onUpdateItem(editFormData);
      setEditingId(null);
      setEditFormData(null);
    }
  };

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if(editFormData) {
      setEditFormData({
        ...editFormData,
        [name]: name === 'quantity' || name === 'unitCost' ? parseFloat(value) : value,
      });
    }
  };

  const getStatusIndicator = (item: ClassifiedInventoryItem) => {
    const { min, max } = settings.thresholds[item.category];
    if (item.quantity < min) {
      return <div className="h-2.5 w-2.5 rounded-full bg-red-500" title={`Low Stock (Min: ${min})`}></div>;
    }
    if (item.quantity > max) {
      return <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" title={`Overstocked (Max: ${max})`}></div>;
    }
    return <div className="h-2.5 w-2.5 rounded-full bg-green-500" title="In Stock"></div>;
  };

  const categoryColorMap = {
    A: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    B: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    C: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
  };

  if (items.length === 0) {
    return <div className="text-center py-10 text-slate-500">No items found for the selected filter.</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
        <thead className="bg-slate-50 dark:bg-slate-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Status</th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Item Name</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Category</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Quantity</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Unit Cost</th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Total Value</th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
          {items.map((item) => (
            <tr key={item.id}>
              {editingId === item.id && editFormData ? (
                <>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center">{getStatusIndicator(item)}</div></td>
                  <td className="px-6 py-4"><input type="text" name="name" value={editFormData.name} onChange={handleFormChange} className="w-full bg-slate-100 dark:bg-slate-700 p-1 rounded"/></td>
                  <td className="px-6 py-4 text-center"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColorMap[item.category]}`}>{item.category}</span></td>
                  <td className="px-6 py-4 text-right"><input type="number" name="quantity" value={editFormData.quantity} onChange={handleFormChange} className="w-20 bg-slate-100 dark:bg-slate-700 p-1 rounded text-right"/></td>
                  <td className="px-6 py-4 text-right"><input type="number" name="unitCost" value={editFormData.unitCost} onChange={handleFormChange} className="w-24 bg-slate-100 dark:bg-slate-700 p-1 rounded text-right"/></td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500 dark:text-slate-400">${(editFormData.quantity * editFormData.unitCost).toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button onClick={handleSaveClick} className="text-green-600 hover:text-green-900"><CheckIcon className="w-5 h-5"/></button>
                      <button onClick={handleCancelClick} className="text-red-600 hover:text-red-900"><XMarkIcon className="w-5 h-5"/></button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4 whitespace-nowrap"><div className="flex justify-center">{getStatusIndicator(item)}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-slate-900 dark:text-white">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${categoryColorMap[item.category]}`}>
                      {item.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500 dark:text-slate-400">{item.quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500 dark:text-slate-400">${item.unitCost.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-slate-500 dark:text-slate-400">${item.totalValue.toFixed(2)}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <div className="flex justify-center space-x-2">
                      <button onClick={() => onGetSuggestion(item)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200" title="Get AI Suggestion">
                        <LightBulbIcon className="w-5 h-5"/>
                      </button>
                      <button onClick={() => handleEditClick(item)} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200" title="Edit Item">
                        <PencilIcon className="w-5 h-5"/>
                      </button>
                      <button onClick={() => onDeleteItem(item.id)} className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-200" title="Delete Item">
                        <TrashIcon className="w-5 h-5"/>
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
