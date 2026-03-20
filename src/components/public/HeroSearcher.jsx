import React, { useState, useEffect } from 'react';
import { Search, MapPin, Building, Home as HomeIcon, Key } from 'lucide-react';
import { useStore } from '../../lib/mockStore';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSearcher = () => {
  const { heroKeywords } = useStore();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % heroKeywords.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [heroKeywords]);

  return (
    <div style={{ width: '100%', position: 'relative', zIndex: 10 }}>
      {/* Dynamic Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{ textAlign: 'center', marginBottom: '4rem' }}
      >
        <h1 style={{ 
          fontSize: 'clamp(2rem, 5vw, 4.5rem)', 
          color: 'white', 
          marginBottom: '1rem',
          fontWeight: 700,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'Playfair Display, serif',
          lineHeight: 1.1,
          letterSpacing: '-0.03em'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <span>Encontrá tu próximo</span>
            <div style={{ height: '1.2em', overflow: 'hidden', display: 'inline-flex', alignItems: 'center', minWidth: '220px', justifyContent: 'start' }}>
              <AnimatePresence mode="wait">
                <motion.span
                  key={heroKeywords[index]}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  style={{ color: 'var(--accent)', display: 'inline-block', fontWeight: 800, fontFamily: 'Montserrat, sans-serif' }}
                >
                  {heroKeywords[index]}
                </motion.span>
              </AnimatePresence>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
            <span>con nosotros</span>
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              style={{ color: 'var(--accent)' }}
            >
              <Key size={60} strokeWidth={1.5} />
            </motion.div>
          </div>
        </h1>
        
        <p style={{ 
          color: 'rgba(255,255,255,0.7)', 
          fontSize: '1.25rem', 
          maxWidth: '650px', 
          margin: '0 auto', 
          fontFamily: 'Outfit, sans-serif',
          fontWeight: 300,
          letterSpacing: '0.5px'
        }}>
          Ofrecemos asesoramiento personalizado para encontrar su lugar ideal.
        </p>
      </motion.div>

      {/* SEARCH BAR PANEL */}
      <div className="glass-panel" style={{
        padding: '1.5rem 2rem',
        borderRadius: 'var(--radius-sm)',
        width: '100%',
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.5fr 1fr 1fr 0.8fr',
        gap: '2.5rem',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.95)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.3)',
        border: 'none'
      }}>
        <div style={{ textAlign: 'left', borderRight: '1px solid var(--border)', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            <MapPin size={16} color="var(--accent)" /> 
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Ubicación</span>
          </div>
          <input 
            type="text" 
            placeholder="¿Dónde buscamos?" 
            style={{ 
              width: '100%', padding: '0.3rem 0', background: 'transparent', 
              border: 'none', outline: 'none', fontSize: '1.1rem', 
              fontWeight: 600, color: 'var(--primary)',
              fontFamily: 'Outfit, sans-serif'
            }} 
          />
        </div>

        <div style={{ textAlign: 'left', borderRight: '1px solid var(--border)', paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            <Building size={16} color="var(--accent)" /> 
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Operación</span>
          </div>
          <select style={{ 
            width: '100%', padding: '0.3rem 0', background: 'transparent', 
            border: 'none', outline: 'none', fontSize: '1.1rem', 
            fontWeight: 600, color: 'var(--primary)', cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif'
          }}>
            <option value="Venta">Venta</option>
            <option value="Alquiler">Alquiler</option>
          </select>
        </div>

        <div style={{ textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
            <HomeIcon size={16} color="var(--accent)" /> 
            <span style={{ fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Tipo</span>
          </div>
          <select style={{ 
            width: '100%', padding: '0.3rem 0', background: 'transparent', 
            border: 'none', outline: 'none', fontSize: '1.1rem', 
            fontWeight: 600, color: 'var(--primary)', cursor: 'pointer',
            fontFamily: 'Outfit, sans-serif'
          }}>
            <option value="Casas">Casas</option>
            <option value="Departamentos">Departamentos</option>
            <option value="Terrenos">Terrenos</option>
          </select>
        </div>

        <button 
          className="btn-premium btn-premium-primary" 
          style={{ 
            padding: '1.2rem', 
            justifyContent: 'center', 
            width: '100%',
            height: '100%',
            fontSize: '0.8rem',
            letterSpacing: '2px',
            borderRadius: '0'
          }}
        >
          <Search size={20} />
          <span>BUSCAR AHORA</span>
        </button>
      </div>
    </div>
  );
};

export default HeroSearcher;
