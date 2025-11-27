import React from 'react';
import type { Operator } from '../types';

interface OperatorCardProps {
  operator: Operator;
  rank: number;
  onClick: () => void;
}

const CrownIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
        <path fillRule="evenodd" d="M18 9.333a3.375 3.375 0 0 0-3.375-3.375h-7.5A3.375 3.375 0 0 0 3.75 9.333v7.5A3.375 3.375 0 0 0 7.125 20.25h9.75A3.375 3.375 0 0 0 20.25 16.833V9.333h-2.25Zm-8.156 5.271a.75.75 0 0 1 .088-1.057 1.875 1.875 0 0 0-1.285-3.355.75.75 0 0 1-.588-1.392 3.375 3.375 0 0 1 4.518 3.985.75.75 0 0 1-1.057-.088Zm3.333-3.667a.75.75 0 0 1 1.054.221 3.375 3.375 0 0 1 2.305 4.414.75.75 0 1 1-1.353.648 1.875 1.875 0 0 0-1.28-2.45.75.75 0 0 1 .274-1.483Z" clipRule="evenodd" />
        <path d="M13.125 3.375a3.375 3.375 0 0 0-2.25 6.498V12a.75.75 0 0 0 .75.75h1.5a.75.75 0 0 0 .75-.75V9.873A3.375 3.375 0 0 0 13.125 3.375Z" />
    </svg>
);


const getRankStyling = (rank: number) => {
  switch (rank) {
    case 1:
      return {
        borderColor: 'border-yellow-400',
        bgColor: 'bg-yellow-400/10',
        textColor: 'text-yellow-400',
        congrats: '¡Felicidades, #1 del Ranking!',
        icon: <CrownIcon />,
      };
    case 2:
      return {
        borderColor: 'border-slate-400',
        bgColor: 'bg-slate-400/10',
        textColor: 'text-slate-300',
        congrats: '¡Excelente Trabajo!',
        icon: <div className="text-2xl font-bold">#2</div>,
      };
    case 3:
      return {
        borderColor: 'border-orange-500',
        bgColor: 'bg-orange-500/10',
        textColor: 'text-orange-400',
        congrats: '¡Gran Desempeño!',
        icon: <div className="text-2xl font-bold">#3</div>,
      };
    default:
      return {
        borderColor: 'border-gray-700',
        bgColor: 'bg-gray-800/50',
        textColor: 'text-gray-400',
        congrats: null,
        icon: <div className="text-2xl font-bold">#{rank}</div>,
      };
  }
};

const OperatorCard: React.FC<OperatorCardProps> = ({ operator, rank, onClick }) => {
  const { name, satisfaction, quality, shift, avatar } = operator;
  const { borderColor, bgColor, textColor, congrats, icon } = getRankStyling(rank);

  return (
    <button 
      onClick={onClick}
      className={`w-full rounded-xl border ${borderColor} ${bgColor} p-6 flex flex-col items-center text-center shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:scale-103 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-yellow-500`}
    >
      <div className={`relative mb-4 ${textColor}`}>
        <div className="absolute -top-10 -left-10 opacity-50">{icon}</div>
        <img className={`w-24 h-24 rounded-full border-4 ${borderColor}`} src={avatar} alt={name} />
      </div>

      <h3 className="text-2xl font-bold text-white">{name}</h3>
      <p className={`font-semibold ${textColor}`}>{shift}</p>

      {congrats && (
        <p className={`mt-2 text-sm font-bold ${textColor} bg-gray-900/50 px-3 py-1 rounded-full`}>
            {congrats}
        </p>
      )}

      <div className="w-full mt-6 space-y-4">
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm font-medium text-gray-300">Satisfacción</span>
            <span className="text-lg font-bold text-cyan-400">{satisfaction}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-cyan-400 h-2.5 rounded-full" style={{ width: `${satisfaction}%` }}></div>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-baseline mb-1">
            <span className="text-sm font-medium text-gray-300">Nota de Calidad</span>
            <span className="text-lg font-bold text-pink-400">{quality}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2.5">
            <div className="bg-pink-400 h-2.5 rounded-full" style={{ width: `${quality}%` }}></div>
          </div>
        </div>
      </div>
    </button>
  );
};

export default OperatorCard;