import React, { useState } from 'react';
import { useStore } from '../lib/mockStore';
import InventoryManager from '../components/admin/InventoryManager';
import NavigationManager from '../components/admin/NavigationManager';
import { Settings, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminDashboard = () => {
  const { heroKeywords, setHeroKeywords } = useStore();
  const [toastVisible, setToastVisible] = useState(false);
  const [tempKeywords, setTempKeywords] = useState(heroKeywords.join(', '));

  const handleSaveHero = () => {
    const newKeywords = tempKeywords.split(',').map(s => s.trim()).filter(s => s.length > 0);
    setHeroKeywords(newKeywords);
    setToastVisible(true);
    setTimeout(() => setToastVisible(false), 3000); // hide after 3 seconds
  };

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
      
      {/* Toast Notification */}
      <AnimatePresence>
        {toastVisible && (
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{
              position: 'fixed',
              top: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: '#101828', // Navy brand color
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '8px',
              fontWeight: 800,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              zIndex: 9999,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.4)',
              border: '1px solid #c5a059' // Gold accent border
            }}
          >
            <CheckCircle2 size={20} style={{ color: '#c5a059' }} /> Web actualizada con éxito
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ marginBottom: '3rem' }}>
        <h1 style={{ fontSize: '2.5rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '1px' }}>
          Command Center
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', fontWeight: 500 }}>
          Gestión unificada de todo el ecosistema web.
        </p>
      </div>

      {/* Module A: Global Settings (Hero Control) */}
      <section className="glass-panel" style={{ padding: '2.5rem', borderRadius: 'var(--radius-lg)', marginBottom: '4rem', border: '1px solid var(--border)', background: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem' }}>
          <Settings size={22} style={{ color: 'var(--accent)' }} />
          <h3 style={{ fontSize: '1.1rem', margin: 0, color: 'var(--primary)', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '2px' }}>
            Configuración del Hero (Global Settings)
          </h3>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '300px' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.8rem', display: 'block', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
              Palabras Dinámicas en Portada (separadas por comas)
            </label>
            <input 
              type="text" 
              value={tempKeywords} 
              onChange={(e) => setTempKeywords(e.target.value)}
              placeholder="lugar, hogar, negocio..."
              style={{ 
                width: '100%', padding: '1.2rem', borderRadius: '8px', border: '1px solid var(--border)', 
                outline: 'none', fontSize: '1rem', fontFamily: 'Montserrat, sans-serif', fontWeight: 600,
                color: 'var(--primary)', background: '#F8FAFC',
                transition: 'border 0.2s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
            />
          </div>
          <button 
            onClick={handleSaveHero}
            className="btn-premium btn-premium-primary" 
            style={{ padding: '1.2rem 3rem', fontSize: '0.9rem', borderRadius: '8px' }}
          >
            Sincronizar Web
          </button>
        </div>
      </section>

      {/* Module B: Inventory Engine */}
      <section style={{ marginBottom: '4rem' }}>
        <InventoryManager />
      </section>

      {/* Module C: Navigation Settings */}
      <section style={{ marginBottom: '2rem' }}>
        <NavigationManager />
      </section>

    </div>
  );
};

export default AdminDashboard;
