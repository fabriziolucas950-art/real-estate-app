import React, { useState } from 'react';
import { useStore } from '../../lib/mockStore';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, BedDouble, Bath, Maximize } from 'lucide-react';
import MapsModal from './MapsModal';

const PropertyGrid = ({ setView, limit }) => {
  // Using the new filtered getter instead of raw properties
  const allFilteredProperties = useStore(state => state.getFilteredProperties());
  const filters = useStore(state => state.filters); // added to listen to changes
  
  const [selectedProp, setSelectedProp] = useState(null);

  // Apply limit if provided (e.g for Home page)
  const properties = limit ? allFilteredProperties.slice(0, limit) : allFilteredProperties;

  if (properties.length === 0) {
    // Empty State Handling
    return (
      <div style={{ textAlign: 'center', padding: '6rem 2rem', background: '#F8F9FA', borderRadius: 'var(--radius-lg)', border: '1px dashed var(--border)' }}>
        <h3 style={{ fontSize: '2rem', color: 'var(--primary)', fontWeight: 800, marginBottom: '1rem', letterSpacing: '-1px' }}>No encontramos propiedades exactas.</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', marginBottom: '2rem' }}>Prueba ajustando los filtros o revisa estas recomendaciones destacadas:</p>
        <button 
          onClick={() => useStore.getState().setFilters({ location: '', operation: 'Todos', propertyType: 'Todos', bedrooms: 'Todos', bathrooms: 'Todos', amenities: [], priceRange: [0, 1000000] })}
          className="btn-premium" style={{ background: 'white', color: 'var(--primary)' }}
        >
          Limpiar todos los filtros
        </button>
      </div>
    );
  }

  return (
    <div className="property-grid-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem' }}>
      <MapsModal 
        isOpen={!!selectedProp} 
        onClose={() => setSelectedProp(null)} 
        property={selectedProp} 
      />

      <AnimatePresence>
        {properties.map((p, i) => (
          <motion.div 
            key={p.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="property-card glass-panel"
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
                src={p.media[0]} 
                alt={p.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease', cursor: 'pointer' }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                loading="lazy"
              />
              <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', gap: '0.8rem' }}>
                <span className="badge-premium" style={{ background: 'var(--primary)' }}>{p.operation}</span>
                {p.status !== 'Disponible' && (
                  <span className="badge-premium" style={{ background: 'var(--accent)', color: 'white' }}>{p.status}</span>
                )}
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setSelectedProp(p); }}
                style={{ 
                  position: 'absolute', bottom: '1.5rem', right: '1.5rem', 
                  background: 'rgba(255,255,255,0.9)', border: 'none', 
                  width: '45px', height: '45px', borderRadius: '50%', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                  transition: 'transform 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
              >
                <MapPin size={20} color="var(--primary)" />
              </button>
            </div>

            <div style={{ padding: '0 0.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.8rem' }}>
                <MapPin size={14} color="var(--accent)" />
                {p.location.neighborhood}, {p.location.city}
              </div>
              <h3 
                onClick={() => setView('property-detail', p.id)}
                style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--primary)', letterSpacing: '-0.02em', cursor: 'pointer' }}
              >
                {p.title}
              </h3>
              
              <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '1rem 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <BedDouble size={18} color="var(--accent)"/> {p.attributes.rooms}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <Bath size={18} color="var(--accent)"/> {p.attributes.baths}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>
                  <Maximize size={18} color="var(--accent)"/> {p.attributes.m2}m²
                </div>
              </div>

              <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', paddingBottom: '0.5rem' }}>Valor</div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>
                  {p.price_data.currency} {p.price_data.amount.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default PropertyGrid;
