
import React, { useState } from 'react';
import { InventoryItem } from '../types';
import { XIcon } from './icons/Icons';

interface AddItemFormProps {
  onClose: () => void;
  onAddItem: (item: Omit<InventoryItem, 'id'>) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onClose, onAddItem }) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unitCost, setUnitCost] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !quantity || !unitCost) {
      // Basic validation
      alert('Please fill in all fields.');
      return;
    }
    onAddItem({
      name,
      quantity: parseInt(quantity, 10),
      unitCost: parseFloat(unitCost),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Add New Item</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Item Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Quantity
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              min="0"
            />
          </div>
          <div>
            <label htmlFor="unitCost" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Unit Cost ($)
            </label>
            <input
              type="number"
              id="unitCost"
              value={unitCost}
              onChange={(e) => setUnitCost(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
              min="0"
              step="0.01"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200 rounded-md hover:bg-slate-300 dark:hover:bg-slate-500 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemForm;
