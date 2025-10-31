
import React from 'react';
import { Settings, Category } from '../types';

interface SettingsPanelProps {
  settings: Settings;
  onSettingsChange: (newSettings: Settings) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({ settings, onSettingsChange }) => {

  const handleAbcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSettingsChange({
      ...settings,
      abc: {
        ...settings.abc,
        [name]: parseInt(value) || 0,
      },
    });
  };

  const handleThresholdChange = (category: Category, field: 'min' | 'max', value: string) => {
    onSettingsChange({
      ...settings,
      thresholds: {
        ...settings.thresholds,
        [category]: {
          ...settings.thresholds[category],
          [field]: parseInt(value) || 0,
        },
      },
    });
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-md space-y-6 h-full">
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">Classification Rules</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Define the value thresholds for A, B, and C categories.</p>
        <div className="mt-4 space-y-4">
          <div>
            <label htmlFor="aThreshold" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category A Threshold (%)</label>
            <input
              type="number"
              name="aThreshold"
              id="aThreshold"
              value={settings.abc.aThreshold}
              onChange={handleAbcChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. 80"
            />
             <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Top {settings.abc.aThreshold}% of value.</p>
          </div>
          <div>
            <label htmlFor="bThreshold" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Category B Threshold (%)</label>
            <input
              type="number"
              name="bThreshold"
              id="bThreshold"
              value={settings.abc.bThreshold}
              onChange={handleAbcChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="e.g. 95"
            />
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">Next {settings.abc.bThreshold - settings.abc.aThreshold}% of value.</p>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-medium leading-6 text-slate-900 dark:text-white">Inventory Thresholds</h3>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Set min/max quantity levels for reorder alerts.</p>
        <div className="mt-4 space-y-4">
          {(Object.keys(settings.thresholds) as Category[]).map(cat => (
            <div key={cat}>
              <h4 className="font-medium text-slate-800 dark:text-slate-200">Category {cat}</h4>
              <div className="flex items-center space-x-2 mt-1">
                <input
                  type="number"
                  placeholder="Min"
                  value={settings.thresholds[cat].min}
                  onChange={(e) => handleThresholdChange(cat, 'min', e.target.value)}
                  className="w-1/2 block px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <input
                  type="number"
                  placeholder="Max"
                   value={settings.thresholds[cat].max}
                   onChange={(e) => handleThresholdChange(cat, 'max', e.target.value)}
                  className="w-1/2 block px-3 py-2 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
