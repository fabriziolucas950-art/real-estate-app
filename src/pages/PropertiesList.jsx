import React from 'react';
import PropertyGrid from '../components/public/PropertyGrid';
import StickyFilterBar from '../components/public/StickyFilterBar';
import { useStore } from '../lib/mockStore';

const PropertiesList = ({ setView }) => {
  const { filters, setFilters } = useStore();

  return (
    <div style={{ paddingTop: '8rem', minHeight: '100vh', background: 'var(--white)', paddingBottom: '6rem', fontFamily: 'Montserrat, sans-serif' }}>
      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 2rem' }}>
        
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 900, textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '-1px', marginBottom: '1rem' }}>
            Nuestras Propiedades
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
            Explora nuestra colección curada de residencias y oportunidades de inversión.
          </p>
        </div>

        <StickyFilterBar />

        {/* Results Grid Engine */}
        <PropertyGrid setView={setView} limit={100} />

      </div>
    </div>
  );
};

export default PropertiesList;
