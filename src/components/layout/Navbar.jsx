import React, { useState, useEffect } from 'react';

const Navbar = ({ setView, currentView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 50) {
        setScrolled(true);
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
          setHidden(true); // scrolling down
        } else {
          setHidden(false); // scrolling up
        }
      } else {
        setScrolled(false);
        setHidden(false);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const isDetail = currentView === 'property-detail';
  const isTransparent = isDetail && !scrolled;

  return (
    <nav className="glass-panel" style={{
      position: 'fixed',
      top: isTransparent ? '0' : '1.2rem',
      left: '50%',
      transform: `translate(-50%, ${hidden ? '-150%' : '0'})`,
      width: isTransparent ? '100%' : '95%',
      maxWidth: isTransparent ? '100%' : '1400px',
      zIndex: 4000, 
      padding: isTransparent ? '1.5rem 4rem' : '1rem 3.5rem',
      borderRadius: isTransparent ? '0' : 'var(--radius-sm)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      border: isTransparent ? 'none' : '1px solid rgba(16, 24, 40, 0.05)',
      background: isTransparent ? 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)' : 'rgba(255, 255, 255, 0.95)',
      boxShadow: isTransparent ? 'none' : '0 10px 30px rgba(0,0,0,0.05)',
      transition: 'all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)'
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
          color: isTransparent ? 'white' : 'var(--primary)', 
          cursor: 'pointer',
          textShadow: isTransparent ? '0 2px 4px rgba(0,0,0,0.5)' : 'none',
          transition: 'color 0.3s'
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
              color: currentView === view 
                 ? 'var(--accent)' 
                 : (isTransparent ? 'white' : 'var(--text-muted)'),
              transition: 'var(--transition)',
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '2px',
              textShadow: isTransparent && currentView !== view ? '0 2px 4px rgba(0,0,0,0.5)' : 'none'
            }}
          >
            {view === 'public' ? 'Inicio' : view === 'properties-list' ? 'Propiedades' : 'Mapa'}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', gap: '1.5rem' }}>
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
