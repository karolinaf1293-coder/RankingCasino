import React, { useState } from 'react';

interface PasswordPromptModalProps {
  onClose: () => void;
  onSubmit: (password: string) => void;
  error: string;
}

const PasswordPromptModal: React.FC<PasswordPromptModalProps> = ({ onClose, onSubmit, error }) => {
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-gray-800 border border-yellow-500/50 rounded-2xl shadow-2xl w-full max-w-sm mx-auto text-white p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-yellow-400 mb-4 text-center">Acceso de Administrador</h2>
        <p className="text-center text-gray-300 mb-6">Por favor, introduce la contraseña para continuar.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="password-input" className="sr-only">Contraseña</label>
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-3 px-4 text-white text-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder="********"
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 px-4 rounded-md transition-colors duration-300"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordPromptModal;
