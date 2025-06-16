import { jsPDF } from 'jspdf';
import * as XLSX from 'xlsx';

export const exportToCSV = (data: any[], filename: string) => {
  const csvContent = data.map((row) => Object.values(row).join(',')).join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
};

export const exportToExcel = (data: any[], filename: string) => {
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatórios');
  XLSX.writeFile(workbook, filename);
};

export const exportToPDF = (data: any[], filename: string) => {
  const doc = new jsPDF();
  data.forEach((row, index) => {
    doc.text(`${index + 1}. ${row.name}: ${row.value}`, 10, 10 + index * 10);
  });
  doc.save(filename);
};
