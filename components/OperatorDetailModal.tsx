import React from 'react';
import type { Operator } from '../types';

interface OperatorDetailModalProps {
  operator: Operator;
  onClose: () => void;
}

const OperatorDetailModal: React.FC<OperatorDetailModalProps> = ({ operator, onClose }) => {
  if (!operator) return null;

  const { name, avatar, shift, satisfaction, quality, chatsHandled, neutralRatings, negativeRatings } = operator;
  const totalScore = satisfaction + quality;

  return (
    <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="operator-modal-title"
    >
      <div 
        className="bg-gray-800 border border-yellow-500/50 rounded-2xl shadow-2xl w-full max-w-lg mx-auto text-white p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in"
        style={{ animationFillMode: 'forwards', animationDelay: '0.1s' }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        
        <div className="flex flex-col items-center">
            <img className="w-32 h-32 rounded-full border-4 border-yellow-400 -mt-24 mb-4" src={avatar} alt={name} />
            <h2 id="operator-modal-title" className="text-3xl font-bold text-yellow-400">{name}</h2>
            <p className="text-gray-300 font-semibold mb-6">Turno: {shift}</p>

            <div className="w-full bg-gray-900/50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between items-center text-lg">
                    <span className="font-medium text-gray-400">Puntuación Total</span>
                    <span className="font-bold text-2xl text-white">{totalScore}</span>
                </div>
                <hr className="border-gray-700"/>
                <div className="flex justify-between items-center">
                    <span className="text-gray-300">Satisfacción del Cliente</span>
                    <span className="font-semibold text-cyan-400">{satisfaction}%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-300">Nota de Calidad</span>
                    <span className="font-semibold text-pink-400">{quality}%</span>
                </div>
                <hr className="border-gray-700"/>
                <div className="flex justify-between items-center">
                    <span className="text-gray-300">Chats Atendidos</span>
                    <span className="font-semibold text-white">{chatsHandled.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-300">Calificaciones Neutras</span>
                    <span className="font-semibold text-gray-400">{neutralRatings}</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-gray-300">Calificaciones Negativas</span>
                    <span className="font-semibold text-red-500">{negativeRatings}</span>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorDetailModal;