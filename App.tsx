import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import GlobalRanking from './components/GlobalRanking';
import ShiftRanking from './components/ShiftRanking';
import OperatorDetailModal from './components/OperatorDetailModal';
import AdminPanel from './components/AdminPanel';
import OperatorFormModal from './components/OperatorFormModal';
import { MOCK_OPERATORS } from './constants';
import type { Operator, View, OperatorFormData } from './types';

const App: React.FC = () => {
  const [entered, setEntered] = useState(false);
  const [currentView, setCurrentView] = useState<View>('global');

  // Operator and Modal State
  const [operators, setOperators] = useState<Operator[]>(MOCK_OPERATORS);
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  
  // Admin State
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingOperator, setEditingOperator] = useState<Operator | null>(null);

  const mainContentRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);

  // Admin Handlers
  const handleAddNewOperator = () => {
    setEditingOperator(null);
    setIsFormModalOpen(true);
  };

  const handleEditOperator = (operator: Operator) => {
    setEditingOperator(operator);
    setIsFormModalOpen(true);
  };

  const handleDeleteOperator = (operatorId: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar a este operador?')) {
      setOperators(ops => ops.filter(op => op.id !== operatorId));
    }
  };

  const handleSaveOperator = (formData: OperatorFormData) => {
    if (formData.id) {
      // Update operator
      setOperators(ops => ops.map(op => 
        op.id === formData.id ? { ...op, ...formData } as Operator : op
      ));
    } else {
      // Create new operator
      const newOperator: Operator = {
        ...formData,
        id: Date.now(), // Use timestamp for unique ID in mock environment
        avatar: formData.avatar || `https://i.pravatar.cc/150?u=${Date.now()}` // Default avatar
      } as Operator;
      setOperators(ops => [...ops, newOperator]);
    }
    setIsFormModalOpen(false);
    setEditingOperator(null);
  };

  // Optimized scroll handler to avoid React re-renders
  useEffect(() => {
    if (entered) {
      const handleScroll = () => {
        const scrollY = window.scrollY;
        window.requestAnimationFrame(() => {
          if (videoRef.current) {
            videoRef.current.style.transform = `scale(1.4) translateY(${scrollY * 0.4}px)`;
          }
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

  // Scroll to content when entering
  useEffect(() => {
    if (entered && mainContentRef.current) {
        const timer = setTimeout(() => {
            mainContentRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
        return () => clearTimeout(timer);
    }
  }, [entered]);

  const videoUrl = "https://videos.pexels.com/video-files/8051790/8051790-hd_1920_1080_30fps.mp4";

  return (
    <div className="min-h-screen bg-gray-900 font-sans">
      <div className="fixed top-0 left-0 w-full h-screen overflow-hidden -z-10">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          style={{ 
            transform: 'scale(1.4) translateY(0px)',
            transformOrigin: 'center',
            willChange: 'transform',
          }}
          src={videoUrl}
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60"></div>
      </div>

      {!entered ? (
        <div className="h-screen flex flex-col items-center justify-center text-center p-4">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg">
            Ranking de Operadores
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-200 drop-shadow-md">
            Excelencia en cada turno
          </p>
          <button 
            onClick={() => setEntered(true)}
            className="mt-8 px-8 py-4 bg-yellow-500 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-400 transition-transform duration-300 transform hover:scale-110 shadow-2xl animate-inviting-pulse"
          >
            Ingresar
          </button>
        </div>
      ) : (
        <div className="opacity-0 animate-fade-in">
          <Header 
            setCurrentView={setCurrentView} 
            currentView={currentView}
            isAdminMode={isAdminMode}
            onToggleAdminMode={() => setIsAdminMode(!isAdminMode)}
          />

          <main className="relative z-10">
            <section className="h-screen flex flex-col items-center justify-center text-center p-4">
              <h1 
                ref={titleRef}
                className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg"
                style={{ willChange: 'transform, opacity' }}
              >
                Ranking de Operadores
              </h1>
              <p 
                ref={subtitleRef}
                className="mt-4 text-xl md:text-2xl text-gray-200 drop-shadow-md"
                style={{ willChange: 'transform, opacity' }}
              >
                Excelencia en cada turno
              </p>
            </section>
            
            <div ref={mainContentRef} className="bg-gray-900/80 backdrop-blur-sm min-h-screen py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {currentView === 'global' && <GlobalRanking operators={operators} onOperatorSelect={setSelectedOperator} />}
                    {currentView === 'shifts' && <ShiftRanking operators={operators} onOperatorSelect={setSelectedOperator} />}
                </div>
            </div>
          </main>
        </div>
      )}

      {selectedOperator && (
        <OperatorDetailModal 
          operator={selectedOperator} 
          onClose={() => setSelectedOperator(null)} 
        />
      )}

      {isAdminMode && (
        <AdminPanel
          operators={operators}
          onAddNew={handleAddNewOperator}
          onEdit={handleEditOperator}
          onDelete={handleDeleteOperator}
          onClose={() => setIsAdminMode(false)}
        />
      )}

      {isFormModalOpen && (
        <OperatorFormModal
          isOpen={isFormModalOpen}
          operator={editingOperator}
          onSave={handleSaveOperator}
          onClose={() => {
            setIsFormModalOpen(false);
            setEditingOperator(null);
          }}
        />
      )}
    </div>
  );
};

export default App;
