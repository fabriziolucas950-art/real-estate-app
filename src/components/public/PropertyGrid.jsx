import React, { useMemo } from 'react';
import { useStore } from '../../lib/mockStore';
import { Bed, Bath, ArrowRight, Grid, LayoutList } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PropertyGrid = ({ setView }) => {
  const { properties, filteredProperties, filters, setDetailedPropertyId } = useStore();

  const isFiltered = filters.location !== '' || filters.operation !== 'Todas' || filters.type !== 'Todos' || filters.rooms !== 'Todos';
  
  // Use filtered properties if active, otherwise grab visually top properties
  const displayProps = isFiltered 
    ? filteredProperties 
    : properties.filter(p => p.status === 'Destacado').slice(0, 3);
  
  const isEmpty = isFiltered && filteredProperties.length === 0;

  const onPropertySelect = (id) => {
    setDetailedPropertyId(id);
    setView('property-detail');
  };

  return (
    <div className="container" id="properties" style={{ padding: '6rem 5%' }}>
      
      {!isFiltered && (
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <AnimatePresence mode="wait">
          <h3 key={setView} className="text-h3" style={{ color: 'var(--primary)', marginBottom: '0.5rem', letterSpacing: '-0.5px' }}>
            {setView === 'public' ? 'Propiedades Recientes' : 'Explorar Mapa'}
          </h3>
        </AnimatePresence>
        <p className="text-body-large" style={{ color: 'var(--text-muted)' }}>Pero estas opciones destacadas te pueden interesar:</p>
      </div>
      )}

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
        <motion.div 
          key={p.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: idx * 0.1 }}
          className="property-card"
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(400px, 1fr) 1.2fr',
            borderRadius: 'var(--radius-md)',
            marginBottom: '3rem',
            background: 'var(--white)',
            boxShadow: 'var(--shadow-subtle)',
            border: '1px solid var(--border)'
          }}
        >
          {/* Image Side */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <div 
              className="card-img"
              style={{
                width: '100%',
                height: '100%',
                minHeight: '350px',
                backgroundImage: `url(${p.media.find(m => m.type === 'Foto')?.url || p.media[0]?.url})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
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
            
            <button style={{
              position: 'absolute',
              bottom: '1.5rem',
              right: '1.5rem',
              background: 'rgba(255,255,255,0.9)',
              border: 'none',
              padding: '0.6rem',
              borderRadius: '50%',
              cursor: 'pointer',
              color: 'var(--primary)',
              backdropFilter: 'blur(5px)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}>
              <Grid size={18} />
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
                <Bath size={16} strokeWidth={1.5} /> <span>{p.attributes.baths} Baños</span>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
              <div className="text-h4" style={{ color: 'var(--primary)' }}>
                <span className="text-body-small" style={{ marginRight: '5px' }}>USD</span>
                {p.price_data.amount.toLocaleString()}
              </div>
              <button className="text-button" style={{ 
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
        </motion.div>
      ))}

      {isFiltered && displayProps.length > 0 && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button className="btn-premium" style={{ background: 'transparent', border: '2px solid var(--border)', color: 'var(--primary)' }}>
            Cargar Más Resultados
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyGrid;