import React from 'react';
import type { View } from '../types';

interface HeaderProps {
  setCurrentView: (view: View) => void;
  currentView: View;
  isAuthenticated: boolean;
  onAdminClick: () => void;
}

const AdminIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M11.078 2.25c-.917 0-1.699.663-1.946 1.55l-.162.59c-.27.986-.713 1.91-1.31 2.74l-.422.593c-.63.878-1.623 1.38-2.654 1.38H3.375a1.125 1.125 0 0 0-1.125 1.125v2.25c0 .621.504 1.125 1.125 1.125h2.09c1.03 0 2.024.502 2.654 1.38l.422.593c.597.83 1.04 1.754 1.31 2.74l.162.59c.247.887 1.029 1.55 1.946 1.55h1.844c.917 0 1.699-.663 1.946-1.55l.162-.59c.27-.986.713-1.91 1.31-2.74l.422-.593c.63-.878 1.623-1.38 2.654-1.38h2.09a1.125 1.125 0 0 0 1.125-1.125v-2.25a1.125 1.125 0 0 0-1.125-1.125h-2.09c-1.03 0-2.024-.502-2.654-1.38l-.422-.593c-.597-.83-1.04-1.754-1.31-2.74l-.162-.59A2.125 2.125 0 0 0 12.922 2.25h-1.844ZM12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ setCurrentView, currentView, isAuthenticated, onAdminClick }) => {
  const navItemClasses = "cursor-pointer px-4 py-2 rounded-md transition-colors duration-300";
  const activeClasses = "bg-yellow-500 text-gray-900 font-bold";
  const inactiveClasses = "hover:bg-gray-700";

  return (
    <header className="sticky top-0 z-50 bg-gray-900/50 backdrop-blur-lg shadow-lg">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold text-white">Casino Royale</span>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <button 
                  onClick={() => setCurrentView('global')}
                  className={`${navItemClasses} ${currentView === 'global' ? activeClasses : inactiveClasses}`}
                >
                  Ranking Global Top 5
                </button>
                <button
                  onClick={() => setCurrentView('shifts')}
                  className={`${navItemClasses} ${currentView === 'shifts' ? activeClasses : inactiveClasses}`}
                >
                  Top Operadores por Turno
                </button>
              </div>
            </div>
            <div className="ml-4">
              <button 
                onClick={onAdminClick} 
                className={`p-2 rounded-full transition-colors duration-300 ${isAuthenticated ? 'bg-yellow-500 text-gray-900' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                aria-label="Admin Mode"
              >
                <AdminIcon />
              </button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
