
import { useState, useMemo, useCallback, useEffect } from 'react';
import { InventoryItem, Settings, Category, ClassifiedInventoryItem, InventoryStats, AbcSettings, CategoryThresholds } from '../types';
import { classifyInventory, calculateStats } from '../utils/classification';

const initialItems: InventoryItem[] = [
    { id: '1', name: 'Premium Wireless Headphones', quantity: 50, unitCost: 250 },
    { id: '2', name: 'Smartwatch Series X', quantity: 75, unitCost: 400 },
    { id: '3', name: 'Gaming Laptop Pro', quantity: 30, unitCost: 1500 },
    { id: '4', name: 'USB-C Cable', quantity: 500, unitCost: 10 },
    { id: '5', name: 'Smartphone Case', quantity: 800, unitCost: 15 },
    { id: '6', name: 'Mid-Range Tablet', quantity: 150, unitCost: 300 },
    { id: '7', name: 'Ergonomic Mouse', quantity: 200, unitCost: 80 },
    { id: '8', name: 'Screen Protector', quantity: 1000, unitCost: 5 },
    { id: '9', name: 'Portable Power Bank', quantity: 300, unitCost: 45 },
    { id: '10', name: 'Mechanical Keyboard', quantity: 100, unitCost: 120 },
];

const initialSettings: Settings = {
  abc: {
    aThreshold: 80,
    bThreshold: 95,
  },
  thresholds: {
    [Category.A]: { min: 20, max: 60 },
    [Category.B]: { min: 50, max: 200 },
    [Category.C]: { min: 100, max: 1000 },
  },
};

export const useInventory = () => {
  const [items, setItems] = useState<InventoryItem[]>(initialItems);
  const [settings, setSettings] = useState<Settings>(initialSettings);

  const classifiedItems: ClassifiedInventoryItem[] = useMemo(() => {
    return classifyInventory(items, settings.abc);
  }, [items, settings.abc]);

  const stats: InventoryStats = useMemo(() => {
    return calculateStats(classifiedItems);
  }, [classifiedItems]);

  // 1) Load items from backend on mount
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/items/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }});
        
        if (!res.ok) {
          console.warn('Failed to load items from backend', res.status);
          return;
        }
        const serverItems = await res.json();
        // serverItems should match InventoryItem[] shape
        setItems(serverItems.map((it: any) => ({
          id: String(it.id ?? it.sku ?? Math.random()),
          name: it.name,
          quantity: Number(it.quantity),
          unitCost: Number(it.unit_cost ?? it.unitCost ?? 0),
          // keep any other fields if you want
        })));
      } catch (err) {
        console.warn('Error fetching items from backend:', err);
      }
    };
    load();
  }, []);

  // 2) New addItem that calls backend
  const addItem = useCallback(async (item: Omit<InventoryItem, 'id'>) => {
    try {
      const payload = {
        name: item.name,
        quantity: Number(item.quantity),
        unit_cost: Number((item as any).unitCost ?? (item as any).unit_cost ?? 0)
      };
      const res = await fetch(`http://127.0.0.1:8000/api/items/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const txt = await res.text();
        console.error('Failed to add item to backend:', res.status, txt);
        // Fallback to local add so UI still works
        setItems(prev => [{ ...item, id: String(Date.now()) }, ...prev]);
        return;
      }
      const saved = await res.json();
      // Map backend saved item to your front-end item shape
      const frontendItem: InventoryItem = {
        id: String(saved.id ?? saved.sku ?? Date.now()),
        name: saved.name,
        quantity: Number(saved.quantity),
        unitCost: Number(saved.unit_cost ?? saved.unitCost ?? 0),
      };
      setItems(prev => [frontendItem, ...prev]);
    } catch (err) {
      console.error('Error adding item:', err);
      // fallback local add
      setItems(prev => [{ ...item, id: String(Date.now()) }, ...prev]);
    }
  }, []);
  
  const deleteItem = useCallback((itemId: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== itemId));
  }, []);
  
  const updateItem = useCallback((updatedItem: InventoryItem) => {
    setItems(prevItems => prevItems.map(item => item.id === updatedItem.id ? updatedItem : item));
  }, []);

  const updateSettings = useCallback((newSettings: Settings) => {
    setSettings(newSettings);
  }, []);

  return { items, classifiedItems, settings, stats, addItem, updateSettings, deleteItem, updateItem };
};
