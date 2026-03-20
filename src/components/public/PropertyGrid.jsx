import React, { useState } from 'react';
import { useStore } from '../../lib/mockStore';
import { Maximize, Bath, Bed, MapPin, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
    <div className="property-grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '4rem' }}>
      <MapsModal 
        isOpen={!!selectedProp} 
        onClose={() => setSelectedProp(null)} 
        address={selectedProp?.location.address}
        city={selectedProp?.location.city}
      />

      {isEmpty && (
        <div style={{ gridColumn: '1 / -1', background: 'rgba(197, 160, 89, 0.05)', padding: '3rem', borderRadius: 'var(--radius-lg)', textAlign: 'center', border: '1px solid rgba(197, 160, 89, 0.2)', marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
            No encontramos propiedades con esos filtros exactos.
          </h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>Pero estas opciones destacadas te pueden interesar:</p>
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
          <div style={{ position: 'relative', height: '500px', overflow: 'hidden', marginBottom: '1.5rem' }}>
            <img 
              onClick={() => setView('property-detail', p.id)}
              src={p.media[0]} 
              alt={p.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'var(--transition)', cursor: 'pointer' }} 
              className="card-img"
            />
            <div style={{ 
              position: 'absolute', 
              top: '1.5rem', 
              left: '1.5rem', 
              padding: '0.5rem 1.2rem', 
              background: 'var(--white)', 
              color: 'var(--primary)', 
              fontSize: '0.7rem', 
              fontWeight: 800,
              textTransform: 'uppercase',
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

          <div style={{ padding: '0.5rem 0' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
              {p.location.neighborhood} • {p.attributes.rooms} AMB.
            </div>
            <h3 
              onClick={() => setView('property-detail', p.id)}
              style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--primary)', letterSpacing: '-0.02em', cursor: 'pointer' }}
            >
              {p.title}
            </h3>
            
            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Bed size={16} strokeWidth={1.5} /> <span>{p.attributes.bedrooms} Dorm.</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Maximize size={16} strokeWidth={1.5} /> <span>{p.attributes.m2} m² cubiertos</span>
              </div>
            </div>

            <div style={{ display: 'flex', justify-content: 'space-between', alignItems: 'baseline', marginTop: '1.5rem' }}>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)' }}>
                <span style={{ fontSize: '0.9rem', marginRight: '5px', fontWeight: 400 }}>USD</span>
                {p.price_data.amount.toLocaleString()}
              </div>
              <button 
                onClick={() => setView('property-detail', p.id)}
                style={{ 
                  background: 'none', border: 'none', color: 'var(--primary)', 
                  fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', 
                  letterSpacing: '1px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem'
                }}
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
      `}</style>
    </div>
  );
};

export default PropertyGrid;
