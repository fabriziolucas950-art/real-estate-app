import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, BedDouble, Bath, Maximize, MapPin, MessageCircle, ArrowLeft, Image as ImageIcon, Map, PlayCircle, CheckCircle } from 'lucide-react';
import { useStore } from '../lib/mockStore';

const PropertyDetail = ({ propertyId, setView }) => {
  const { properties } = useStore();
  const property = properties.find(p => p.id === (propertyId || '1'));
  
  const [currentImg, setCurrentImg] = useState(0);
  const [mediaTab, setMediaTab] = useState('Foto'); // 'Foto', 'Plano', 'Video'

  useEffect(() => {
    if (property) {
      document.title = `${property.title} | Balsells & Chilano`;
      window.scrollTo(0, 0); // scroll to top on load
    }
  }, [property]);

  if (!property) return <div>Property not found</div>;

  const currentMediaArray = property.media.filter(m => m.type === mediaTab);
  const displayMedia = currentMediaArray.length > 0 ? currentMediaArray : property.media.filter(m => m.type === 'Foto');

  // Reset slider when changing tabs
  useEffect(() => {
    setCurrentImg(0);
  }, [mediaTab]);

  const handleNextImg = () => setCurrentImg((prev) => (prev + 1) % displayMedia.length);
  const handlePrevImg = () => setCurrentImg((prev) => (prev - 1 + displayMedia.length) % displayMedia.length);

  return (
    <div style={{ background: '#F8F9FA', minHeight: '100vh', fontFamily: 'Montserrat, sans-serif', paddingBottom: '6rem' }}>
      
      {/* Back Button */}
      <button 
        onClick={() => setView('public')}
        style={{
          position: 'absolute', top: '7rem', left: '2rem', zIndex: 100,
          background: 'rgba(255, 255, 255, 0.95)', border: 'none', padding: '0.8rem 1.5rem',
          borderRadius: '100px', display: 'flex', alignItems: 'center', gap: '0.5rem',
          textTransform: 'uppercase', letterSpacing: '1px',
          cursor: 'pointer', boxShadow: 'var(--shadow-subtle)', color: 'var(--primary)'
        }}
      >
        <ArrowLeft size={16} /> Volver al listado
      </button>

      {/* Main Tabbed Gallery */}
      <div style={{ position: 'relative', width: '100%', height: '75vh', backgroundColor: '#101828', overflow: 'hidden' }}>
        
        {/* Tab Selector inside Gallery */}
        <div style={{ 
          position: 'absolute', top: '7rem', left: '50%', transform: 'translateX(-50%)', 
          zIndex: 10, display: 'flex', gap: '0.5rem', background: 'rgba(16, 24, 40, 0.6)', 
          padding: '0.5rem', borderRadius: '100px', backdropFilter: 'blur(10px)' 
        }}>
           <button onClick={() => setMediaTab('Foto')} style={{ ...tabStyle(mediaTab === 'Foto') }}><ImageIcon size={16} /> Fotos</button>
           <button onClick={() => setMediaTab('Plano')} style={{ ...tabStyle(mediaTab === 'Plano') }}><Map size={16} /> Planos</button>
           <button onClick={() => setMediaTab('Video')} style={{ ...tabStyle(mediaTab === 'Video') }}><PlayCircle size={16} /> Video</button>
        </div>

        <AnimatePresence mode="wait">
          {displayMedia.length > 0 ? (
            <motion.div 
               key={displayMedia[currentImg].url}
               initial={{ opacity: 0, scale: 1.02 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.5 }}
               style={{ width: '100%', height: '100%', position: 'absolute', inset: 0 }}
            >
              {mediaTab === 'Video' ? (
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
                   <PlayCircle size={80} color="var(--accent)" style={{ opacity: 0.8 }} />
                   <img src={displayMedia[currentImg].url} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.5 }} alt="Video Mock" />
                </div>
              ) : (
                <img src={displayMedia[currentImg].url} style={{ width: '100%', height: '100%', objectFit: mediaTab === 'Plano' ? 'contain' : 'cover' }} alt="Propiedad" />
              )}
            </motion.div>
          ) : (
             <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600 }}>Media no disponible</div>
          )}
        </AnimatePresence>
        
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%)' }} />

        {displayMedia.length > 1 && (
          <>
            <button onClick={handlePrevImg} style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
              <ChevronLeft size={30} />
            </button>
            <button onClick={handleNextImg} style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,0.2)', border: 'none', color: 'white', padding: '1rem', borderRadius: '50%', cursor: 'pointer', backdropFilter: 'blur(10px)' }}>
              <ChevronRight size={30} />
            </button>
            <div style={{ position: 'absolute', bottom: '2rem', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
              {displayMedia.map((_, i) => (
                <div key={i} style={{ width: i === currentImg ? '30px' : '10px', height: '4px', background: i === currentImg ? 'var(--accent)' : 'rgba(255,255,255,0.4)', borderRadius: '4px', transition: '0.3s' }} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content Layout */}
      <div style={{ maxWidth: '1200px', margin: '3rem auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) 1fr', gap: '4rem', alignItems: 'start' }}>
          
          {/* Main Info Column */}
          <div>
             <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem' }}>
                <span className="text-body-small" style={{ background: 'var(--primary)', color: 'white', padding: '0.4rem 1rem', borderRadius: '0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>{property.operation}</span>
                <span className="text-body-small" style={{ background: 'rgba(197, 160, 89, 0.1)', color: 'var(--accent)', padding: '0.4rem 1rem', borderRadius: '0', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px' }}>{property.status}</span>
             </div>
             <h1 className="text-h1" style={{ color: 'var(--primary)', marginBottom: '1rem' }}>{property.title}</h1>
             <div className="text-body-large" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: '3rem' }}>
                <MapPin size={20} color="var(--accent)" /> {property.location.neighborhood}, {property.location.city}
             </div>

             {/* The "Technical Sheet" Grid */}
             <div style={{ marginBottom: '4rem' }}>
                <h3 className="text-h4" style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)', marginBottom: '2rem', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                  Ficha Técnica
                </h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem 1.5rem', border: '1px solid var(--border)', padding: '2.5rem', borderRadius: 'var(--radius-md)', background: 'white' }}>
                   <TechItem label="Sup. Total" value={`${property.attributes.m2} m²`} />
                   <TechItem label="Ambientes" value={property.attributes.rooms} />
                   <TechItem label="Dormitorios" value={property.attributes.bedrooms} />
                   <TechItem label="Baños" value={property.attributes.baths} />
                   <TechItem label="Antigüedad" value={property.attributes.antiguedad === 0 ? 'A estrenar' : `${property.attributes.antiguedad} años`} />
                   <TechItem label="Orientación" value={property.attributes.orientacion || 'S/D'} />
                   <TechItem label="Luminosidad" value={property.attributes.luminosidad || 'Normal'} />
                   <TechItem label="Estado" value={property.attributes.estado || 'Excelente'} />
                   <TechItem label="Apto Crédito" value={property.price_data.apto_credito ? 'Sí' : 'No'} highlight={property.price_data.apto_credito} />
                </div>
             </div>

             {/* Amenities Section */}
             {property.attributes.amenities.length > 0 && (
               <div style={{ marginBottom: '4rem' }}>
                  <h3 className="text-h4" style={{ textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--primary)', marginBottom: '2rem', borderBottom: '2px solid var(--accent)', paddingBottom: '0.5rem', display: 'inline-block' }}>
                    Comodidades y Extras
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
                    {property.attributes.amenities.map(amenity => (
                      <div key={amenity} className="text-body-large" style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--primary)' }}>
                        <CheckCircle size={18} color="var(--accent)" /> {amenity}
                      </div>
                    ))}
                  </div>
               </div>
             )}
          </div>

          {/* Sticky Contact Sidebar */}
          <div style={{ position: 'sticky', top: '100px' }}>
            <div style={{ background: 'white', border: '1px solid var(--accent)', padding: '2.5rem', borderRadius: 'var(--radius-lg)', boxShadow: '0 20px 40px rgba(0,0,0,0.08)' }}>
              
              <div className="text-body-small" style={{ color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '2px', marginBottom: '0.5rem' }}>Valor Referencial</div>
              <div className="text-h2" style={{ color: 'var(--accent)', marginBottom: '2rem' }}>
                {property.price_data.currency} {property.price_data.amount.toLocaleString()}
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginBottom: '2.5rem' }}>
                <div className="text-body-medium" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.8rem', borderBottom: '1px solid var(--border)' }}>
                   <span style={{ color: 'var(--text-muted)' }}>Expensas</span>
                   <span style={{ color: 'var(--primary)' }}>${property.price_data.expenses?.toLocaleString() || '0'}</span>
                </div>
                <div className="text-body-medium" style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.8rem', borderBottom: '1px solid var(--border)' }}>
                   <span style={{ color: 'var(--text-muted)' }}>Impuestos</span>
                   <span style={{ color: 'var(--primary)' }}>${property.price_data.impuestos?.toLocaleString() || '0'}</span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <button 
                  className="btn-premium btn-premium-primary text-button" 
                  style={{ width: '100%', padding: '1.2rem', borderRadius: '8px', justifyContent: 'center' }}
                >
                  Consultar Ahora
                </button>
                <button 
                  className="text-button"
                  onClick={() => window.open(`https://wa.me/5491100000000?text=Hola,%20me%20interesa%20la%20propiedad:%20${property.title}`, '_blank')}
                  style={{ 
                    width: '100%', padding: '1.2rem', borderRadius: '8px', 
                    background: '#25D366', color: 'white', border: 'none', 
                    display: 'flex', 
                    alignItems: 'center', justifyContent: 'center', gap: '0.8rem', cursor: 'pointer',
                    boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)', transition: 'transform 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <MessageCircle size={20} /> Contactar por WhatsApp
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

// Sub-component for Tech Items
const TechItem = ({ label, value, highlight }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
    <span className="text-body-small" style={{ textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)' }}>{label}</span>
    <span className="text-body-large" style={{ color: highlight ? 'var(--accent)' : 'var(--primary)' }}>{value}</span>
  </div>
);

// Helper for Tab Styling
const tabStyle = (isActive) => ({
  background: isActive ? 'var(--accent)' : 'transparent',
  color: isActive ? 'white' : 'white',
  border: 'none',
  padding: '0.6rem 1.5rem',
  borderRadius: '100px',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  cursor: 'pointer',
  transition: '0.3s',
  textTransform: 'uppercase',
  letterSpacing: '1px'
});

export default PropertyDetail;