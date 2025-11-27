import React, { useState, useMemo } from 'react';
import { Shift } from '../types';
import type { Operator, SortOption } from '../types';
import OperatorCard from './OperatorCard';
import SortControls from './SortControls';

interface ShiftRankingProps {
  operators: Operator[];
  onOperatorSelect: (operator: Operator) => void;
}

const ShiftRanking: React.FC<ShiftRankingProps> = ({ operators, onOperatorSelect }) => {
  const [activeShift, setActiveShift] = useState<Shift>(Shift.AM);
  const [sortOption, setSortOption] = useState<SortOption>({ key: 'combined', order: 'desc' });

  const shifts = [Shift.AM, Shift.PM, Shift.NT1, Shift.NT2];

  const rankedOperatorsByShift = useMemo(() => {
    return operators
      .filter(op => op.shift === activeShift)
      .sort((a, b) => {
        let valA: number;
        let valB: number;

        switch (sortOption.key) {
          case 'satisfaction':
            valA = a.satisfaction;
            valB = b.satisfaction;
            break;
          case 'quality':
            valA = a.quality;
            valB = b.quality;
            break;
          default: // 'combined'
            valA = a.satisfaction + a.quality;
            valB = b.satisfaction + b.quality;
            break;
        }
        
        return sortOption.order === 'asc' ? valA - valB : valB - valA;
      });
  }, [operators, activeShift, sortOption]);

  const tabBaseClasses = "px-6 py-3 text-lg font-medium rounded-t-lg cursor-pointer transition-all duration-300 focus:outline-none";
  const activeTabClasses = "bg-gray-800 text-yellow-400 border-b-2 border-yellow-400";
  const inactiveTabClasses = "text-gray-400 hover:text-white";

  return (
    <div>
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-12">Top Operadores por Turno</h2>
      
      <div className="border-b border-gray-700 mb-8">
        <nav className="-mb-px flex justify-center space-x-4" aria-label="Tabs">
          {shifts.map(shift => (
            <button
              key={shift}
              onClick={() => setActiveShift(shift)}
              className={`${tabBaseClasses} ${activeShift === shift ? activeTabClasses : inactiveTabClasses}`}
            >
              {shift}
            </button>
          ))}
        </nav>
      </div>
      
      <div className="mb-8">
        <SortControls sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rankedOperatorsByShift.length > 0 ? (
          rankedOperatorsByShift.map((op, index) => (
            <OperatorCard 
              key={op.id} 
              operator={op} 
              rank={index + 1} 
              onClick={() => onOperatorSelect(op)}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-400 py-8">No hay datos para este turno.</p>
        )}
      </div>
    </div>
  );
};

export default ShiftRanking;