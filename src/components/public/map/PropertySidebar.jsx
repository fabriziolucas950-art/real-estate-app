import React from 'react';
import { useStore } from '../../../lib/mockStore';
import { Bed, Bath, Maximize, MapPin, ExternalLink } from 'lucide-react';

const PropertySidebar = () => {
  const { getFilteredProperties } = useStore();
  const properties = getFilteredProperties();

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      background: 'white', 
      overflowY: 'auto',
      borderLeft: '1px solid var(--border)',
      padding: '1.5rem'
    }}>
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
          {properties.length} Propiedades encontradas
        </h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Explora los resultados en el área visible.
        </p>
      </div>

      <div style={{ display: 'grid', gap: '1.5rem' }}>
        {properties.map(p => (
          <div 
            key={p.id} 
            className="property-card"
            onClick={() => {
              if (window.mapInstance) {
                window.mapInstance.flyTo([p.location.lat, p.location.lng], 16, {
                  duration: 1.5
                });
              }
            }}
            style={{ 
              display: 'flex', 
              flexDirection: 'column',
              cursor: 'pointer',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)'
            }}
          >
            <div style={{ position: 'relative', height: '140px' }}>
              <img 
                src={p.media.find(m => m.type === 'Foto')?.url || p.media[0]?.url} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                alt={p.title} 
              />
              <div style={{ 
                position: 'absolute', 
                top: '0.8rem', 
                left: '0.8rem', 
                background: 'var(--primary)', 
                color: 'white', 
                padding: '0.2rem 0.6rem', 
                borderRadius: '20px',
                fontSize: '0.65rem',
                fontWeight: 700
              }}>
                {p.operation}
              </div>
            </div>

            <div style={{ padding: '1rem' }}>
              <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)', marginBottom: '0.2rem' }}>
                USD {p.price_data.amount.toLocaleString()}
              </div>
              <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.8rem', color: 'var(--text)' }}>
                {p.title}
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Bed size={14}/> {p.attributes.bedrooms}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Bath size={14}/> {p.attributes.baths}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Maximize size={14}/> {p.attributes.m2}m²</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                <MapPin size={12} /> {p.location.neighborhood}, {p.location.city}
              </div>
            </div>
          </div>
        ))}

        {properties.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            <p>No hay propiedades en esta zona.</p>
            <p style={{ fontSize: '0.8rem' }}>Intenta mover el mapa o cambiar los filtros.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertySidebar;