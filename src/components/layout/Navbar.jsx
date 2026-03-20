import React from 'react';

const Navbar = ({ setView, currentView }) => {
  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: '1.2rem',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '95%',
      maxWidth: '1400px',
      zIndex: 4000, // Higher than any other panel
      padding: '1rem 3.5rem',
      borderRadius: 'var(--radius-sm)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: '1px solid rgba(16, 24, 40, 0.05)',
      background: 'rgba(255, 255, 255, 0.95)'
    }}>
      <div 
        className="logo" 
        onClick={() => setView('public')}
        style={{ 
          fontFamily: 'Montserrat, sans-serif',
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.2rem', 
          color: 'var(--primary)', 
          cursor: 'pointer',
        }}
      >
        <div style={{ fontWeight: 800, fontSize: '1.4rem', letterSpacing: '2px', lineHeight: 1 }}>
          BALSELLS <span style={{ fontWeight: 300 }}>&</span> CHILANO
        </div>
        <div style={{ fontSize: '0.55rem', letterSpacing: '4px', fontWeight: 500, opacity: 0.8, textTransform: 'uppercase' }}>
          Desarrollo Inmobiliario
        </div>
      </div>

      <div style={{ display: 'flex', gap: '3rem', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
        {['public', 'properties-list', 'map-search'].map((view) => (
          <button 
            key={view}
            onClick={() => setView(view)}
            style={{ 
              background: 'none', border: 'none', cursor: 'pointer',
              color: currentView === view ? 'var(--accent)' : 'var(--text-muted)',
              transition: 'var(--transition)',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '2px'
            }}
          >
            {view === 'public' ? 'Inicio' : view === 'properties-list' ? 'Propiedades' : 'Mapa'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
        <button className="btn-premium" style={{ border: '1px solid var(--border)', background: 'transparent', padding: '0.6rem 2rem', fontSize: '0.7rem' }}>
          Contactar
        </button>
        <button 
          onClick={() => setView('admin-dashboard')}
          className="btn-premium btn-premium-primary"
          style={{ padding: '0.6rem 2rem', fontSize: '0.7rem' }}
        >
          Dashboard
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
