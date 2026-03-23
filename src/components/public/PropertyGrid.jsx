import React, { useState } from 'react';
import { useStore } from '../../lib/mockStore';
import { Maximize, Bath, Bed, MapPin, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MapsModal from './MapsModal';

const PropertyGrid = ({ setView, limit }) => {
  const properties = useStore((state) => state.properties);
  const filters = useStore((state) => state.filters);
  const getFilteredProperties = useStore((state) => state.getFilteredProperties);
  const [selectedProp, setSelectedProp] = useState(null);

  let displayProps = getFilteredProperties();
  const isEmpty = displayProps.length === 0;

  if (isEmpty) {
    displayProps = properties.slice(0, 3);
  } else if (limit) {
    displayProps = displayProps.slice(0, limit);
  }

  return (
    <div className="property-grid-container property-grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--grid-gap, 3rem)' }}>
      <MapsModal 
        isOpen={!!selectedProp} 
        onClose={() => setSelectedProp(null)} 
        address={selectedProp?.location.address}
        city={selectedProp?.location.city}
      />

      {isEmpty && (
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <AnimatePresence mode="wait">
          <h3 key={setView} className="text-h3" style={{ color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
            {setView === 'public' ? 'Propiedades Recientes' : 'Explorar Mapa'}
          </h3>
        </AnimatePresence>
        <p className="text-body-large" style={{ color: 'var(--text-muted)' }}>Pero estas opciones destacadas te pueden interesar:</p>
      </div>
      )}

      {displayProps.map((p, idx) => (
        <motion.article 
          key={p.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: idx * 0.1, duration: 0.8 }}
          className="property-card"
          style={{ 
            display: 'flex', 
            flexDirection: 'column',
            border: 'none',
            background: 'transparent'
          }}
        >
          <div style={{ position: 'relative', height: '350px', overflow: 'hidden', marginBottom: '1.2rem', borderRadius: '16px' }}>
            <img 
              onClick={() => setView('property-detail', p.id)}
              src={p.media.find(m => m.type === 'Foto')?.url || p.media[0]?.url} 
              alt={p.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)', cursor: 'pointer' }} 
              className="card-img"
            />
            <div style={{ 
              position: 'absolute', 
              top: '1.5rem', 
              left: '1.5rem', 
              background: 'rgba(16, 24, 40, 0.7)', backdropFilter: 'blur(8px)',
                padding: '0.4rem 1rem', borderRadius: '100px',
                color: 'white', fontWeight: 800, textTransform: 'uppercase', 
                letterSpacing: '1px'
            }}>
              {p.operation}
            </div>
            
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedProp(p); }}
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                right: '1.5rem',
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                background: 'var(--white)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-premium)',
                color: 'var(--primary)'
              }}
            >
              <MapPin size={18} />
            </button>
          </div>

          <div style={{ padding: '2rem' }}>
            <div className="text-body-small" style={{ color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
              {p.operation} | {p.type}
            </div>
            
            <h3 
              onClick={() => setView('property-detail', p.id)}
              className="text-h4"
              style={{ 
                lineHeight: '1.2', 
                fontWeight: 800, 
                marginBottom: '1rem', 
                color: 'var(--primary)', 
                cursor: 'pointer'
              }}
            >
              {p.title}
            </h3>
            
            <div className="text-body-medium" style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', color: 'var(--text-muted)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bed size={16} strokeWidth={1.5} /> <span>{p.attributes.bedrooms} Dorm.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Maximize size={16} strokeWidth={1.5} /> <span>{p.attributes.m2} m² cubiertos</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <div className="text-h4" style={{ color: p.is_price_hidden ? 'var(--accent)' : 'var(--primary)', fontWeight: p.is_price_hidden ? 900 : undefined }}>
                {p.is_price_hidden ? (
                  'CONSULTAR'
                ) : (
                  <>
                    <span className="text-body-small" style={{ marginRight: '5px' }}>USD</span>
                    {p.price_data.amount.toLocaleString()}
                  </>
                )}
              </div>
              <button className={`text-button ${p.is_price_hidden ? 'pulse-text' : ''}`} style={{ 
                  background: 'transparent', border: 'none', color: 'var(--accent)', 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer',
                  borderBottom: '2px solid transparent', paddingBottom: '2px', transition: 'var(--transition)'
                }}
                onMouseOver={(e) => e.currentTarget.style.borderBottom = '2px solid var(--accent)'} 
                onClick={() => setView('property-detail', p.id)}
              >
                Ver Detalles <ArrowRight size={14} />
              </button>
            </div>
          </div>
        </motion.article>
      ))}

      <style>{`
        .property-card:hover .card-img {
          transform: scale(1.05);
        }
        @keyframes pulseSoftText {
          0% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.03); }
          100% { opacity: 0.7; transform: scale(1); }
        }
        .pulse-text {
          animation: pulseSoftText 2s infinite ease-in-out;
          text-transform: uppercase;
          font-weight: 800;
        }
      `}</style>
    </div>
  );
};

export default PropertyGrid;