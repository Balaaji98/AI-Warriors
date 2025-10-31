
import React, { useState } from 'react';
import { ClassifiedInventoryItem } from '../types';
import { exportToCSV, exportToPDF } from '../services/exportService';
import { PlusIcon, CogIcon, DownloadIcon, XIcon, DocumentTextIcon, TableCellsIcon } from './icons/Icons';

interface HeaderProps {
  onAddItemClick: () => void;
  onSettingsClick: () => void;
  classifiedItems: ClassifiedInventoryItem[];
}

const Header: React.FC<HeaderProps> = ({ onAddItemClick, onSettingsClick, classifiedItems }) => {
  const [isExportMenuOpen, setExportMenuOpen] = useState(false);
  
  const handleExportCSV = () => {
    exportToCSV(classifiedItems);
    setExportMenuOpen(false);
  };
  
  const handleExportPDF = () => {
    exportToPDF(classifiedItems);
    setExportMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-slate-800 shadow-md sticky top-0 z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Smart Inventory</h1>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={onAddItemClick}
              className="flex items-center space-x-2 bg-indigo-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span className="hidden sm:inline">Add Item</span>
            </button>
            <div className="relative">
              <button
                onClick={() => setExportMenuOpen(!isExportMenuOpen)}
                className="flex items-center space-x-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-300 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
              >
                <DownloadIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Export</span>
              </button>
              {isExportMenuOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white dark:bg-slate-700 ring-1 ring-black ring-opacity-5 z-30">
                  <button onClick={handleExportCSV} className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600">
                    <TableCellsIcon className="w-4 h-4 mr-2" />
                    Export as CSV
                  </button>
                  <button onClick={handleExportPDF} className="w-full text-left flex items-center px-4 py-2 text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-600">
                    <DocumentTextIcon className="w-4 h-4 mr-2" />
                    Export as PDF
                  </button>
                </div>
              )}
            </div>
             <button
              onClick={onSettingsClick}
              className="p-2 rounded-md text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors"
            >
              <CogIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
