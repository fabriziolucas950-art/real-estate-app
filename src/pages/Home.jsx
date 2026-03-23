import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import HeroSearcher from '../components/public/HeroSearcher';
import PropertyGrid from '../components/public/PropertyGrid';
import WhyChooseUs from '../components/public/WhyChooseUs';
import Appraisals from '../components/public/Appraisals';
import { useStore } from '../lib/mockStore';

const Home = ({ setView }) => {
  const { heroBanners } = useStore();
  const activeBanners = [...heroBanners].filter(b => b.active).sort((a,b) => a.order - b.order);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Preload Images
  useEffect(() => {
    activeBanners.forEach(banner => {
      const img = new Image();
      img.src = banner.url;
    });
  }, [activeBanners]);

  // Rotator Logic
  useEffect(() => {
    if (activeBanners.length < 2) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % activeBanners.length);
    }, 5000); // 5 seconds interval
    return () => clearInterval(interval);
  }, [activeBanners]);

  const handlePrev = () => {
    setCurrentSlide(prev => (prev - 1 + activeBanners.length) % activeBanners.length);
  };
  const handleNext = () => {
    setCurrentSlide(prev => (prev + 1) % activeBanners.length);
  };

  return (
    <div className="home-page">
      {/* HERO SECTION - DYNAMIC BACKGROUND ROTATOR */}
      <div className="hero-section hero-section-padding" style={{
        height: '107vh', 
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 5%',
        overflow: 'hidden'
      }}>
        
        {/* Animated Backgrounds (Cross-fade) */}
        <AnimatePresence mode="popLayout">
          {activeBanners.length > 0 && (
            <motion.div
              key={activeBanners[currentSlide].id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }} // premium cross-fade
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `linear-gradient(rgba(10, 15, 26, 0.5), rgba(10, 15, 26, 0.7)), url(${activeBanners[currentSlide].url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                zIndex: 0
              }}
            />
          )}
        </AnimatePresence>

        {/* Navigation Overlays */}
        {activeBanners.length > 1 && (
          <>
            <button 
              onClick={handlePrev} 
              style={{ position: 'absolute', left: '2rem', zIndex: 20, background: 'rgba(255,255,255,0.05)', border: 'none', color: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(5px)', transition: 'all 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            >
              <ChevronLeft size={30} />
            </button>
            <button 
              onClick={handleNext} 
              style={{ position: 'absolute', right: '2rem', zIndex: 20, background: 'rgba(255,255,255,0.05)', border: 'none', color: 'rgba(255,255,255,0.5)', padding: '1rem', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(5px)', transition: 'all 0.3s' }}
              onMouseOver={(e) => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)' }}
              onMouseOut={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)' }}
            >
              <ChevronRight size={30} />
            </button>
            
            {/* Dots */}
            <div style={{ position: 'absolute', bottom: '6rem', zIndex: 20, display: 'flex', gap: '0.8rem' }}>
              {activeBanners.map((banner, idx) => (
                <button 
                  key={banner.id}
                  onClick={() => setCurrentSlide(idx)}
                  style={{ 
                    width: currentSlide === idx ? '30px' : '10px', 
                    height: '4px', 
                    borderRadius: '4px', 
                    background: currentSlide === idx ? 'var(--accent)' : 'rgba(255,255,255,0.3)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s'
                  }}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Content Wrapper (keeps z-index above background) */}
        <div style={{ position: 'relative', zIndex: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
      </div>

      {/* PROPERTIES SECTION */}
      <section className="home-properties-section" style={{ padding: '8rem 10% 6rem', background: 'var(--white)' }}>
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