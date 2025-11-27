
import React from 'react';
import type { SortOption, SortKey, SortOrder } from '../types';

interface SortControlsProps {
    sortOption: SortOption;
    setSortOption: (option: SortOption) => void;
}

const SortControls: React.FC<SortControlsProps> = ({ sortOption, setSortOption }) => {

    const handleKeyChange = (key: SortKey) => {
        setSortOption({ ...sortOption, key });
    };

    const handleOrderChange = () => {
        const newOrder: SortOrder = sortOption.order === 'desc' ? 'asc' : 'desc';
        setSortOption({ ...sortOption, order: newOrder });
    };

    const buttonBaseClasses = "px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500";
    const activeClasses = "bg-yellow-500 text-gray-900";
    const inactiveClasses = "bg-gray-700 text-gray-300 hover:bg-gray-600";

    return (
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-2 p-1 bg-gray-800 rounded-lg">
                <button
                    onClick={() => handleKeyChange('combined')}
                    className={`${buttonBaseClasses} ${sortOption.key === 'combined' ? activeClasses : inactiveClasses}`}
                >
                    Puntuación
                </button>
                <button
                    onClick={() => handleKeyChange('satisfaction')}
                    className={`${buttonBaseClasses} ${sortOption.key === 'satisfaction' ? activeClasses : inactiveClasses}`}
                >
                    Satisfacción
                </button>
                <button
                    onClick={() => handleKeyChange('quality')}
                    className={`${buttonBaseClasses} ${sortOption.key === 'quality' ? activeClasses : inactiveClasses}`}
                >
                    Calidad
                </button>
            </div>
            <button
                onClick={handleOrderChange}
                className="p-2 bg-gray-700 rounded-md hover:bg-gray-600 transition-colors duration-200"
                aria-label={`Sort ${sortOption.order === 'desc' ? 'ascending' : 'descending'}`}
            >
                {sortOption.order === 'desc' ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l3.293-3.293a1 1 0 111.414 1.414l-5 5a1 1 0 01-1.414 0l-5-5a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 17a1 1 0 01-1-1V5.414L5.707 8.707a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0l5 5a1 1 0 01-1.414 1.414L11 5.414V16a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </div>
    );
};

export default SortControls;