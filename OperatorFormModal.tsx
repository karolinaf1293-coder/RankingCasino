import React, { useState, useEffect } from 'react';
import { Shift } from '../types';
import type { Operator, OperatorFormData } from '../types';

interface OperatorFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (operator: OperatorFormData) => void;
  operator: Operator | null;
}

const OperatorFormModal: React.FC<OperatorFormModalProps> = ({ isOpen, onClose, onSave, operator }) => {
  const [formData, setFormData] = useState<OperatorFormData>({
    name: '',
    shift: Shift.AM,
    satisfaction: 80,
    quality: 80,
    avatar: '',
    chatsHandled: 0,
    neutralRatings: 0,
    negativeRatings: 0,
  });

  useEffect(() => {
    if (operator) {
      setFormData(operator);
    } else {
      // Reset form for new operator
      setFormData({
        name: '',
        shift: Shift.AM,
        satisfaction: 80,
        quality: 80,
        avatar: '',
        chatsHandled: 0,
        neutralRatings: 0,
        negativeRatings: 0,
      });
    }
  }, [operator, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'name' || name === 'shift' || name === 'avatar' ? value : Number(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const isEditing = !!operator;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-yellow-500/50 rounded-2xl shadow-2xl w-full max-w-md mx-auto text-white p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-6">{isEditing ? 'Editar Operador' : 'Añadir Nuevo Operador'}</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre</label>
            <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
          </div>

          <div>
            <label htmlFor="shift" className="block text-sm font-medium text-gray-300">Turno</label>
            <select name="shift" id="shift" value={formData.shift} onChange={handleChange} className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500">
              {Object.values(Shift).map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="satisfaction" className="block text-sm font-medium text-gray-300">Satisfacción (%)</label>
                <input type="number" name="satisfaction" id="satisfaction" min="0" max="100" value={formData.satisfaction} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label htmlFor="quality" className="block text-sm font-medium text-gray-300">Calidad (%)</label>
                <input type="number" name="quality" id="quality" min="0" max="100" value={formData.quality} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
          </div>
          
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="chatsHandled" className="block text-sm font-medium text-gray-300">Chats</label>
                <input type="number" name="chatsHandled" id="chatsHandled" min="0" value={formData.chatsHandled} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label htmlFor="neutralRatings" className="block text-sm font-medium text-gray-300">Neutras</label>
                <input type="number" name="neutralRatings" id="neutralRatings" min="0" value={formData.neutralRatings} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
              <div>
                <label htmlFor="negativeRatings" className="block text-sm font-medium text-gray-300">Negativas</label>
                <input type="number" name="negativeRatings" id="negativeRatings" min="0" value={formData.negativeRatings} onChange={handleChange} required className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-yellow-500 focus:border-yellow-500" />
              </div>
           </div>

          <div className="flex justify-end gap-4 pt-4">
            <button type="button" onClick={onClose} className="bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-md transition-colors">Cancelar</button>
            <button type="submit" className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-md transition-colors">Guardar Cambios</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OperatorFormModal;
