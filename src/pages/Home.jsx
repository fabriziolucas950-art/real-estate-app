import React from 'react';
import { motion } from 'framer-motion';
import HeroSearcher from '../components/public/HeroSearcher';
import PropertyGrid from '../components/public/PropertyGrid';
import WhyChooseUs from '../components/public/WhyChooseUs';
import Appraisals from '../components/public/Appraisals';

const Home = ({ setView }) => {
  return (
    <div className="home-page">
      {/* HERO SECTION - MASTERPIECE STYLE INTEGRATED */}
      <div className="hero-section" style={{
        height: '107vh', 
        background: `linear-gradient(rgba(10, 15, 26, 0.7), rgba(10, 15, 26, 0.4)), url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 5%',
        position: 'relative'
      }}>
        {/* Transparent & Integrated Searcher */}
        <HeroSearcher />
        
        {/* Sutil scroll indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ position: 'absolute', bottom: '2rem', color: 'white', opacity: 0.5, fontSize: '0.7rem', letterSpacing: '3px', textTransform: 'uppercase', fontWeight: 700 }}
        >
          Deslizar para descubrir ↓
        </motion.div>
      </div>

      {/* PROPERTIES SECTION */}
      <section style={{ padding: '12rem 10% 8rem', background: 'var(--white)' }}>
        <div style={{ marginBottom: '8rem' }}>
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <span style={{ 
              color: 'var(--accent)', 
              textTransform: 'uppercase', 
              fontWeight: 800, 
              letterSpacing: '8px', 
              fontSize: '0.7rem',
              display: 'block',
              marginBottom: '1.5rem',
              fontFamily: 'Montserrat, sans-serif'
            }}>Collection 2026</span>
            <h2 style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', marginBottom: '2.5rem', maxWidth: '900px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Residencias de Autor</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.8', maxWidth: '700px', fontWeight: 300 }}>
              Descubra una selección privada de propiedades que trascienden lo convencional en Junín. Cada detalle ha sido curado para los gustos más exigentes.
            </p>
          </motion.div>
        </div>
        <PropertyGrid setView={setView} />
      </section>

      {/* WHY CHOOSE US */}
      <WhyChooseUs />

      {/* APPRAISALS (TASACIONES) */}
      <Appraisals />
      
      <div style={{ padding: '8rem 0' }} />
    </div>
  );
};

export default Home;
