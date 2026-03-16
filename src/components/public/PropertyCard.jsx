import React from 'react';
import { Link } from 'react-router-dom';
import { Maximize, Bed, Bath, MapPin } from 'lucide-react';

const PropertyCard = ({ property }) => {
  return (
    <Link to={`/property/${property.id}`} className="property-card fade-in">
      <div className="badge badge-venta">{property.operation_type}</div>
      <img src={property.images?.[0] || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800'} alt={property.title} className="card-image" />
      
      <div className="card-content">
        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '0.5rem' }}>{property.title}</h3>
        <p style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>
          <MapPin size={16} /> {property.location}
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--accent)' }}>
            USD {property.price.toLocaleString()}
          </span>
        </div>

        <div style={{ display: 'flex', gap: '1rem', borderTop: '1px solid var(--border)', paddingTop: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Maximize size={16} /> {property.m2} m²
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Bed size={16} /> {property.rooms}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            <Bath size={16} /> {property.bathrooms}
          </span>
        </div>
      </div>
      
      {/* Hover reveal data */}
      <div className="hover-info" style={{ 
        position: 'absolute', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        background: 'var(--accent)', 
        color: 'white', 
        padding: '0.5rem', 
        textAlign: 'center',
        transform: 'translateY(100%)',
        transition: 'transform 0.3s'
      }}>
        Ver Detalles
      </div>
    </Link>
  );
};

export default PropertyCard;
