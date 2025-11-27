import React, { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabaseClient';
import Header from './components/Header';
import GlobalRanking from './components/GlobalRanking';
import ShiftRanking from './components/ShiftRanking';
import OperatorDetailModal from './components/OperatorDetailModal';
import AdminPanel from './components/AdminPanel';
import OperatorFormModal from './components/OperatorFormModal';
import PasswordPromptModal from './components/PasswordPromptModal';
import type { Operator, View, OperatorFormData } from './types';

const ADMIN_PASSWORD = 'admin123'; // Simple password for this example

const App: React.FC = () => {
  const [entered, setEntered] = useState(false);
  const [currentView, setCurrentView] = useState<View>('global');

  // Data State
  const [operators, setOperators] = useState<Operator[]>([]);
  const [loading, setLoading] = useState(true);

  // UI State
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  
  // Admin State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPasswordPromptOpen, setIsPasswordPromptOpen] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);

  const mainContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Fetch initial data from Supabase
  useEffect(() => {
    const fetchOperators = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('operators')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching operators:', error);
      } else if (data) {
        setOperators(data);
      }
      setLoading(false);
    };

    fetchOperators();
  }, []);

  // --- Admin Handlers ---
  const handleAdminClick = () => {
    if (isAuthenticated) {
      setIsAuthenticated(false);
    } else {
      setIsPasswordPromptOpen(true);
    }
  };
  
  const handlePasswordSubmit = (password: string) => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setIsPasswordPromptOpen(false);
      setPasswordError('');
    } else {
      setPasswordError('Contraseña incorrecta. Inténtalo de nuevo.');
    }
  };

  const handleAddNewOperator = () => {
    setEditingOperator(null);
    setIsFormModalOpen(true);
  };

  const handleEditOperator = (operator: Operator) => {
    setEditingOperator(operator);
    setIsFormModalOpen(true);
  };

  const handleDeleteOperator = async (operatorId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este operador?')) {
      const { error } = await supabase.from('operators').delete().eq('id', operatorId);
      if (error) {
        console.error('Error deleting operator:', error);
      } else {
        setOperators(ops => ops.filter(op => op.id !== operatorId));
      }
    }
  };

  const handleSaveOperator = async (formData: OperatorFormData) => {
    if (formData.id) {
      // Update
      const { data, error } = await supabase
        .from('operators')
        .update(formData)
        .eq('id', formData.id)
        .select();
      if (error) {
        console.error('Error updating operator:', error);
      } else if (data) {
        setOperators(ops => ops.map(op => (op.id === data[0].id ? data[0] : op)));
      }
    } else {
      // Create
      const { id, ...newOperatorData } = formData;
       const finalData = {
        ...newOperatorData,
        avatar: newOperatorData.avatar || `https://i.pravatar.cc/150?u=${Date.now()}`
      };
      const { data, error } = await supabase
        .from('operators')
        .insert(finalData)
        .select();
      if (error) {
        console.error('Error creating operator:', error);
      } else if (data) {
        setOperators(ops => [...ops, data[0]]);
      }
    }
    setIsFormModalOpen(false);
    setEditingOperator(null);
  };

  // Parallax Effect
  useEffect(() => {
    if (entered) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        window.requestAnimationFrame(() => {
          if (videoRef.current) videoRef.current.style.transform = `scale(1.4) translateY(${scrollY * 0.4}px)`;
          if (titleRef.current) {
            const opacity = Math.max(0, 1 - scrollY / 300);
            titleRef.current.style.transform = `translateY(-${scrollY * 0.2}px)`;
            titleRef.current.style.opacity = `${opacity}`;
          }
          if (subtitleRef.current) {
            const opacity = Math.max(0, 1 - scrollY / 300);
            subtitleRef.current.style.transform = `translateY(-${scrollY * 0.15}px)`;
            subtitleRef.current.style.opacity = `${opacity}`;
          }
        });
      };
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [entered]);

  useEffect(() => {
    if (entered && mainContentRef.current) {
      const timer = setTimeout(() => mainContentRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      return () => clearTimeout(timer);
    }
  }, [entered]);

  const videoUrl = "https://videos.pexels.com/video-files/8051790/8051790-hd_1920_1080_30fps.mp4";

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden -z-10">
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover" style={{ transform: 'scale(1.4) translateY(0px)', transformOrigin: 'center', willChange: 'transform' }} src={videoUrl} />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </div>

      {!entered ? (
        <div className="h-screen flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">Ranking de Operadores</h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200 drop-shadow-md">Excelencia en cada turno</p>
          <button onClick={() => setEntered(true)} className="mt-8 px-8 py-4 bg-yellow-500 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-400 transition-transform duration-300 transform hover:scale-110 shadow-2xl animate-inviting-pulse">Ingresar</button>
        </div>
      ) : (
        <div className="opacity-0 animate-fade-in">
          <Header setCurrentView={setCurrentView} currentView={currentView} isAuthenticated={isAuthenticated} onAdminClick={handleAdminClick} />
          <main className="relative z-10">
            <section className="h-screen flex flex-col items-center justify-center text-center p-4">
              <h1 ref={titleRef} className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg" style={{ willChange: 'transform, opacity' }}>Ranking de Operadores</h1>
              <p ref={subtitleRef} className="mt-4 text-xl md:text-2xl text-gray-200 drop-shadow-md" style={{ willChange: 'transform, opacity' }}>Excelencia en cada turno</p>
            </section>
            <div ref={mainContentRef} className="bg-gray-900/80 backdrop-blur-sm min-h-screen py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                {loading ? (
                  <p className="text-center text-xl text-gray-300">Cargando datos...</p>
                ) : (
                  <>
                    {currentView === 'global' && <GlobalRanking operators={operators} onOperatorSelect={setSelectedOperator} />}
                    {currentView === 'shifts' && <ShiftRanking operators={operators} onOperatorSelect={setSelectedOperator} />}
                  </>
                )}
              </div>
            </div>
          </main>
        </div>
      )}

      {selectedOperator && <OperatorDetailModal operator={selectedOperator} onClose={() => setSelectedOperator(null)} />}
      {isAuthenticated && <AdminPanel operators={operators} onAddNew={handleAddNewOperator} onEdit={handleEditOperator} onDelete={handleDeleteOperator} onClose={() => setIsAuthenticated(false)} />}
      {isPasswordPromptOpen && <PasswordPromptModal onClose={() => setIsPasswordPromptOpen(false)} onSubmit={handlePasswordSubmit} error={passwordError} />}
      {isFormModalOpen && <OperatorFormModal isOpen={isFormModalOpen} operator={editingOperator} onSave={handleSaveOperator} onClose={() => { setIsFormModalOpen(false); setEditingOperator(null); }} />}
    </div>
  );
};

export default App;
