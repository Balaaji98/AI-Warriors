
import React from 'react';
import { ClassifiedInventoryItem } from '../types';
import { XIcon, LightBulbIcon } from './icons/Icons';

interface AISuggestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: ClassifiedInventoryItem;
  suggestion: string;
  isLoading: boolean;
  error: string;
}

const AISuggestionModal: React.FC<AISuggestionModalProps> = ({ isOpen, onClose, item, suggestion, isLoading, error }) => {
  if (!isOpen) return null;
  
  const formattedSuggestion = suggestion.split('\n').map((line, index) => {
    if (line.startsWith('Recommendation for')) {
        return <strong key={index} className="block text-lg mb-2">{line}</strong>;
    }
    return <span key={index}>{line}<br/></span>;
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-2xl p-6 w-full max-w-lg m-4 transform transition-all animate-scale-in">
        <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-3">
            <LightBulbIcon className="w-6 h-6 text-indigo-500"/>
            <h2 className="text-xl font-semibold">AI-Powered Suggestion</h2>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
            <XIcon className="w-6 h-6" />
          </button>
        </div>
        <div className="mt-4">
          <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Analysis for: <strong className="text-slate-800 dark:text-white">{item.name}</strong>
          </p>
          <div className="bg-slate-50 dark:bg-slate-900/50 p-4 rounded-lg min-h-[150px]">
            {isLoading && (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
                <span className="ml-3 text-slate-500">Generating insights...</span>
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!isLoading && !error && (
              <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">{formattedSuggestion}</p>
            )}
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AISuggestionModal;
