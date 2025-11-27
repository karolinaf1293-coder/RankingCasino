import React from 'react';
import type { Operator } from '../types';

interface AdminPanelProps {
  operators: Operator[];
  onAddNew: () => void;
  onEdit: (operator: Operator) => void;
  onDelete: (operatorId: number) => void;
  onClose: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ operators, onAddNew, onEdit, onDelete, onClose }) => {
  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-yellow-500/50 rounded-2xl shadow-2xl w-full max-w-6xl mx-auto text-white p-6 relative flex flex-col"
        style={{ maxHeight: '90vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-700">
          <h2 className="text-2xl font-bold text-yellow-400">Panel de Administración</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="flex-grow overflow-y-auto pr-2">
          <table className="w-full text-left table-auto">
            <thead className="sticky top-0 bg-gray-800 text-sm text-gray-300 uppercase">
              <tr>
                <th className="p-3">Nombre</th>
                <th className="p-3">Turno</th>
                <th className="p-3 text-right">Satisfacción</th>
                <th className="p-3 text-right">Calidad</th>
                <th className="p-3 text-right">Chats</th>
                <th className="p-3 text-right">Neutras</th>
                <th className="p-3 text-right">Negativas</th>
                <th className="p-3 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {operators.map(op => (
                <tr key={op.id} className="border-b border-gray-700 hover:bg-gray-700/50 text-sm">
                  <td className="p-3 font-semibold text-white">{op.name}</td>
                  <td className="p-3">{op.shift}</td>
                  <td className="p-3 text-right">{op.satisfaction}%</td>
                  <td className="p-3 text-right">{op.quality}%</td>
                  <td className="p-3 text-right">{op.chatsHandled}</td>
                  <td className="p-3 text-right">{op.neutralRatings}</td>
                  <td className="p-3 text-right">{op.negativeRatings}</td>
                  <td className="p-3 text-right">
                    <button onClick={() => onEdit(op)} className="font-medium text-blue-400 hover:text-blue-300 mr-4">Editar</button>
                    <button onClick={() => onDelete(op.id)} className="font-medium text-red-500 hover:text-red-400">Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-700">
          <button 
            onClick={onAddNew}
            className="w-full bg-yellow-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-yellow-400 transition-colors"
          >
            Añadir Nuevo Operador
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;