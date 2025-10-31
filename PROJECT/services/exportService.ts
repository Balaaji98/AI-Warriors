
import { ClassifiedInventoryItem } from '../types';

declare const jspdf: any;
declare const Papa: any;

export const exportToCSV = (items: ClassifiedInventoryItem[]) => {
  const data = items.map(item => ({
    'ID': item.id,
    'Name': item.name,
    'Category': item.category,
    'Quantity': item.quantity,
    'Unit Cost ($)': item.unitCost.toFixed(2),
    'Total Value ($)': item.totalValue.toFixed(2),
    '% of Total Value': item.percentageOfTotal.toFixed(2),
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'inventory_report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};

export const exportToPDF = (items: ClassifiedInventoryItem[]) => {
  const { jsPDF } = jspdf;
  const doc = new jsPDF();

  doc.text("Inventory Classification Report", 14, 16);
  doc.setFontSize(10);
  doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 22);

  const tableColumn = ["Name", "Category", "Qty", "Unit Cost", "Total Value", "% of Total"];
  const tableRows: any[] = [];

  items.forEach(item => {
    const itemData = [
      item.name,
      item.category,
      item.quantity,
      `$${item.unitCost.toFixed(2)}`,
      `$${item.totalValue.toFixed(2)}`,
      `${item.percentageOfTotal.toFixed(2)}%`,
    ];
    tableRows.push(itemData);
  });

  (doc as any).autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: 'striped',
    headStyles: { fillColor: [34, 49, 63] },
  });

  doc.save('inventory_report.pdf');
};
