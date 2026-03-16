import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import PropertyCard from './PropertyCard';

const PropertyGrid = ({ filters }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      let query = supabase
        .from('properties')
        .select('*')
        .order('status', { ascending: true }) // 'Disponible' comes before 'Vendido' alphabetically? Or custom logic.
        .order('featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (filters.operation) {
        query = query.eq('operation_type', filters.operation);
      }
      
      const { data, error } = await query;
      
      if (error) console.error(error);
      else setProperties(data);
      setLoading(false);
    };

    fetchProperties();
  }, [filters]);

  if (loading) return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
      {[1, 2, 3].map(i => (
        <div key={i} className="glass-card" style={{ height: '400px', animation: 'pulse 1.5s infinite' }}></div>
      ))}
    </div>
  );

  return (
    <div className="property-grid">
      {properties.map(property => (
        <PropertyCard key={property.id} property={property} />
      ))}
      {properties.length === 0 && (
        <div style={{ textAlign: 'center', padding: '4rem', width: '100%' }}>
          <h3>No se encontraron propiedades que coincidan con tu búsqueda.</h3>
          <p>Probá ajustando los filtros.</p>
        </div>
      )}
    </div>
  );
};

export default PropertyGrid;
