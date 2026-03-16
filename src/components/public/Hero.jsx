import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';

const Hero = ({ onSearch }) => {
  const [localFilters, setLocalFilters] = useState({
    operation: 'Venta',
    location: '',
  });

  const handleSearch = () => {
    onSearch(localFilters);
  };

  return (
    <section className="hero">
      <div className="container">
        <h1 className="fade-in">Encontrá tu próximo <br/><span style={{ color: 'var(--accent)' }}>espacio ideal</span></h1>
        <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Descubrí las propiedades más exclusivas en las mejores ubicaciones.
        </p>
        
        <div className="search-container fade-in" style={{ animationDelay: '0.2s' }}>
          <div className="search-bar">
            <select 
              className="search-input" 
              style={{ maxWidth: '150px' }}
              value={localFilters.operation}
              onChange={(e) => setLocalFilters({...localFilters, operation: e.target.value})}
            >
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
            
            <div style={{ flex: 1, position: 'relative' }}>
              <MapPin size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
              <input 
                type="text" 
                placeholder="¿Dónde querés vivir?" 
                className="search-input"
                style={{ paddingLeft: '3rem' }}
                value={localFilters.location}
                onChange={(e) => setLocalFilters({...localFilters, location: e.target.value})}
              />
            </div>
            
            <button className="btn-primary" onClick={handleSearch}>
              <Search size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
