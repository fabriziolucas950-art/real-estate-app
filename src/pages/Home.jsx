import React, { useState } from 'react';
import { useStore } from '../lib/mockStore';
import HeroSearcher from '../components/public/HeroSearcher';
import MapsModal from '../components/public/MapsModal';
import { motion } from 'framer-motion';

const Home = ({ setView }) => {
  const { properties, footerSettings } = useStore();
  const [selectedProp, setSelectedProp] = useState(null);

  return (
    <div style={{ fontFamily: 'Montserrat, sans-serif' }}>
      {/* PREMIUM HERO */}
      <div style={{
        position: 'relative',
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 2rem',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0
        }}>
          {/* Gradients to ensure text readability */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(16, 24, 40, 0.7) 0%, rgba(16, 24, 40, 0.4) 100%)' }} />
        </div>

        <HeroSearcher />
      </div>

      {/* PROPERTIES SECTION */}
      <section style={{ padding: '8rem 10% 6rem', background: 'var(--white)' }}>
        <div style={{ marginBottom: '4rem' }}>
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
              marginBottom: '1rem',
              fontFamily: 'Montserrat, sans-serif'
            }}>Collection 2026</span>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', maxWidth: '900px', textTransform: 'uppercase', letterSpacing: '-0.02em' }}>Residencias de Autor</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', maxWidth: '700px', fontWeight: 300 }}>
              Descubra una selección privada de propiedades que trascienden lo convencional en Junín. Cada detalle ha sido curado para los gustos más exigentes.
            </p>
          </motion.div>
        </div>

        {/* Instead of doing it inline, we proxy the setView to PropertyGrid */}
        {/* We use the custom component for the unified look */}
        <div>
           {/* For the Home page we just want to display a subset, so we could modify PropertyGrid or just use it as is */}
        </div>
      </section>
    </div>
  );
};

export default Home;
