import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BedDouble, Bath, Maximize, Tent, Warehouse, MapPin, MessageCircle, ArrowLeft } from 'lucide-react';
import { useStore } from '../lib/mockStore';

const PropertyDetail = ({ propertyId, setView }) => {
  const { properties } = useStore();
  // Safe default to property 1 (The Quinta) if none provided
  const property = properties.find(p => p.id === (propertyId || '1'));
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (property) {
      document.title = `${property.title} | Balsells & Chilano`;
      const meta = document.createElement('meta');
      meta.name = "description";
      meta.content = `${property.title} en ${property.location.city}. USD ${property.price_data.amount}. ${property.attributes.bedrooms} Dormitorios, ${property.attributes.amenities.join(', ')}.`;
      document.head.appendChild(meta);
      return () => document.head.removeChild(meta);
    }
  }, [property]);

  if (!property) return <div>Property not found</div>;

  const handleNextImg = () => setCurrentImg((prev) => (prev + 1) % property.media.length);
  const handlePrevImg = () => setCurrentImg((prev) => (prev - 1 + property.media.length) % property.media.length);

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif', paddingBottom: '6rem' }}>
      
      {/* Floating WhatsApp CTA */}
      <a 
        href={`https://wa.me/5491100000000?text=Hola,%20me%20interesa%20la%20propiedad:%20${property.title}`} 
        target="_blank" 
        rel="noopener noreferrer"
        style={{
          position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 9999,
          background: 'var(--accent)', color: 'white',
          padding: '1.2rem', borderRadius: '50%',
          boxShadow: '0 15px 30px rgba(197, 160, 89, 0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'transform 0.3s ease',
          cursor: 'pointer'
        }}
        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <MessageCircle size={30} />
      </a>

      {/* Back Button */}
      <button 
        onClick={() => setView('public')}
        style={{
          position: 'absolute', top: '2rem', left: '2rem', zIndex: 100,
          background: 'rgba(255, 255, 255, 0.9)', border: 'none', padding: '0.8rem 1.5rem',
          borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem',
          fontWeight: 700, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px',
          cursor: 'pointer', boxShadow: 'var(--shadow-subtle)', color: 'var(--primary)'
        }}
      >
        <ArrowLeft size={16} /> Volver
      </button>

      {/* Main Gallery (Fullscreen Touch Slider Mock) */}
      <div style={{ position: 'relative', width: '100%', height: '80vh', backgroundColor: '#101828', overflow: 'hidden' }}>
        <AnimatePresence mode="wait">
          <motion.img 
            key={currentImg}
            src={property.media[currentImg]}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            loading="lazy"
          />
        </AnimatePresence>
        
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 40%)' }} />

        <button onClick={handlePrevImg} style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          <ChevronLeft size={30} />
        </button>
        <button onClick={handleNextImg} style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
          <ChevronRight size={30} />
        </button>

        <div style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {property.media.map((_, i) => (
            <div key={i} style={{ width: i === currentImg ? '30px' : '10px', height: '4px', background: i === currentImg ? 'var(--accent)' : 'white', borderRadius: '4px', transition: '0.3s' }} />
          ))}
        </div>
      </div>

      {/* Property Details Layout */}
      <div style={{ maxWidth: '1200px', margin: '-4rem auto 0', position: 'relative', zIndex: 10, padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '3rem' }}>
          
          {/* Main Content */}
          <div style={{ background: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-subtle)' }}>
             <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <span style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{property.operation}</span>
                <span style={{ background: 'rgba(197, 160, 89, 0.1)', color: 'var(--accent)', padding: '0.4rem 1rem', borderRadius: '100px', fontSize: '0.7rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>{property.status}</span>
             </div>
             <h1 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--primary)', lineHeight: 1.2, marginBottom: '1rem' }}>{property.title}</h1>
             <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontWeight: 500, fontSize: '1.1rem', marginBottom: '3rem' }}>
                <MapPin size={20} color="var(--accent)" /> {property.location.neighborhood}, {property.location.city}
             </div>

             {/* Specs Grid */}
             <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)', fontWeight: 800, marginBottom: '2rem' }}>Características Principales</h3>
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(197, 160, 89, 0.05)', borderRadius: '12px', color: 'var(--accent)' }}><BedDouble size={24} /></div>
                  <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{property.attributes.bedrooms}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Dormitorios</div></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(197, 160, 89, 0.05)', borderRadius: '12px', color: 'var(--accent)' }}><Bath size={24} /></div>
                  <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{property.attributes.baths}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Baños</div></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(197, 160, 89, 0.05)', borderRadius: '12px', color: 'var(--accent)' }}><Maximize size={24} /></div>
                  <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>{property.attributes.m2}</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Superficie Lote (m²)</div></div>
                </div>
                {/* Mock Amenities based on string matching for the presentation */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(197, 160, 89, 0.05)', borderRadius: '12px', color: 'var(--accent)' }}><Tent size={24} /></div>
                  <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>Piscina</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Equipada</div></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ padding: '1rem', background: 'rgba(197, 160, 89, 0.05)', borderRadius: '12px', color: 'var(--accent)' }}><Warehouse size={24} /></div>
                  <div><div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary)' }}>2 Autos</div><div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>Cochera</div></div>
                </div>
             </div>
          </div>

          {/* Right Sidebar - Price Engine Widget */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ background: 'white', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-subtle)', borderTop: '4px solid var(--accent)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '2px', marginBottom: '0.5rem' }}>Valor de la Propiedad</div>
              <div style={{ fontSize: '2.8rem', fontWeight: 900, color: 'var(--accent)', lineHeight: 1, marginBottom: '2rem' }}>
                {property.price_data.currency} {property.price_data.amount.toLocaleString()}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: 'rgba(197, 160, 89, 0.05)', borderRadius: '8px', border: '1px solid rgba(197, 160, 89, 0.2)' }}>
                   <div style={{ width: '8px', height: '8px', background: 'var(--accent)', borderRadius: '50%' }} />
                   <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>Acepta Financiación</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '1rem', background: '#F8F9FA', borderRadius: '8px', border: '1px solid var(--border)' }}>
                   <div style={{ width: '8px', height: '8px', background: 'var(--text-muted)', borderRadius: '50%' }} />
                   <span style={{ fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>Se escuchan propuestas</span>
                </div>
              </div>

              <button 
                onClick={() => document.querySelector('a[href^="https://wa.me"]').click()}
                className="btn-premium btn-premium-primary" 
                style={{ width: '100%', marginTop: '2rem', padding: '1.2rem', fontSize: '1rem' }}
              >
                Coordinar Visita
              </button>
            </div>
            
            {/* Map Placeholder for presentation */}
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-subtle)', height: '250px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'url(https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/13/2765/4962.png)', backgroundSize: 'cover', opacity: 0.8 }} />
              {/* Fake PIN */}
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: '#101828', width: '20px', height: '20px', borderRadius: '50%', border: '4px solid white', boxShadow: '0 5px 15px rgba(0,0,0,0.3)' }} />
              <button className="btn-premium" style={{ position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: 'rgba(255,255,255,0.95)', color: 'var(--primary)' }}>VER EN MAPA</button>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PropertyDetail;
