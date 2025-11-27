import React, { useMemo, useState } from 'react';
import type { Operator, SortOption } from '../types';
import OperatorCard from './OperatorCard';
import SortControls from './SortControls';

interface GlobalRankingProps {
  operators: Operator[];
  onOperatorSelect: (operator: Operator) => void;
}

const GlobalRanking: React.FC<GlobalRankingProps> = ({ operators, onOperatorSelect }) => {
  const [sortOption, setSortOption] = useState<SortOption>({ key: 'combined', order: 'desc' });

  const topOperators = useMemo(() => {
    return [...operators]
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
      })
      .slice(0, 5);
  }, [operators, sortOption]);

  return (
    <div>
      <h2 className="text-4xl font-bold text-center text-yellow-400 mb-2">Ranking Calidad Top 5 Global</h2>
      <p className="text-center text-gray-300 mb-8">Los mejores operadores en todas las categorías.</p>
      
      <div className="mb-8">
        <SortControls sortOption={sortOption} setSortOption={setSortOption} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topOperators.map((op, index) => (
          <OperatorCard 
            key={op.id} 
            operator={op} 
            rank={index + 1} 
            onClick={() => onOperatorSelect(op)}
          />
        ))}
      </div>
    </div>
  );
};

export default GlobalRanking;