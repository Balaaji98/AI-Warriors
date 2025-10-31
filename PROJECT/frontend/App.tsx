
import React, { useState, useCallback } from 'react';
import { useInventory } from './hooks/useInventory';
import Header from './components/Header';
import AddItemForm from './components/AddItemForm';
import SettingsPanel from './components/SettingsPanel';
import Dashboard from './components/Dashboard';
import AISuggestionModal from './components/AISuggestionModal';
import { InventoryItem, ClassifiedInventoryItem } from './types';
import { generateSuggestion } from './services/geminiService';

export default function App() {
  const {
    items,
    classifiedItems,
    settings,
    stats,
    addItem,
    updateSettings,
    deleteItem,
    updateItem,
  } = useInventory();

  const [isAddItemFormVisible, setAddItemFormVisible] = useState(false);
  const [isSettingsPanelVisible, setSettingsPanelVisible] = useState(false);
  
  const [isSuggestionModalOpen, setSuggestionModalOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [suggestionError, setSuggestionError] = useState('');
  const [isGeneratingSuggestion, setIsGeneratingSuggestion] = useState(false);
  const [currentItemForSuggestion, setCurrentItemForSuggestion] = useState<ClassifiedInventoryItem | null>(null);

  const handleGetSuggestion = useCallback(async (item: ClassifiedInventoryItem) => {
    setCurrentItemForSuggestion(item);
    setSuggestionModalOpen(true);
    setIsGeneratingSuggestion(true);
    setSuggestion('');
    setSuggestionError('');
    try {
      const result = await generateSuggestion(item, settings);
      setSuggestion(result);
    } catch (error) {
      console.error("Error generating suggestion:", error);
      setSuggestionError("Failed to generate suggestion. Please check your API key and try again.");
    } finally {
      setIsGeneratingSuggestion(false);
    }
  }, [settings]);

  return (
    <div className="min-h-screen font-sans">
      <Header
        onAddItemClick={() => setAddItemFormVisible(true)}
        onSettingsClick={() => setSettingsPanelVisible(!isSettingsPanelVisible)}
        classifiedItems={classifiedItems}
      />
      
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className={`transition-all duration-300 ${isSettingsPanelVisible ? 'lg:w-1/4 mb-6 lg:mb-0' : 'w-0 overflow-hidden'}`}>
             {isSettingsPanelVisible && <SettingsPanel settings={settings} onSettingsChange={updateSettings} />}
          </div>
          <div className="flex-1">
            <Dashboard
              stats={stats}
              classifiedItems={classifiedItems}
              onGetSuggestion={handleGetSuggestion}
              settings={settings}
              onDeleteItem={deleteItem}
              onUpdateItem={updateItem}
            />
          </div>
        </div>
      </main>

      {isAddItemFormVisible && (
        <AddItemForm
          onClose={() => setAddItemFormVisible(false)}
          onAddItem={addItem}
        />
      )}

      {isSuggestionModalOpen && currentItemForSuggestion && (
        <AISuggestionModal
          item={currentItemForSuggestion}
          isOpen={isSuggestionModalOpen}
          onClose={() => setSuggestionModalOpen(false)}
          suggestion={suggestion}
          isLoading={isGeneratingSuggestion}
          error={suggestionError}
        />
      )}
    </div>
  );
}
