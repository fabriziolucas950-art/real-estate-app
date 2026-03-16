import React, { useState, useEffect } from 'react';
import Hero from '../components/public/Hero';
import PropertyGrid from '../components/public/PropertyGrid';
import Filters from '../components/public/Filters';
import SEOManager from '../components/shared/SEOManager';

const Home = () => {
  const [filters, setFilters] = useState({
    operation: '',
    location: '',
    priceRange: [0, 1000000],
  });

  return (
    <div className="home-page">
      <SEOManager />
      <Hero onSearch={(f) => setFilters(prev => ({ ...prev, ...f }))} />
      <div className="container" style={{ display: 'flex', gap: '2rem', padding: '4rem 1.5rem' }}>
        <aside style={{ width: '300px' }}>
          <Filters onChange={(f) => setFilters(prev => ({ ...prev, ...f }))} />
        </aside>
        <section style={{ flex: 1 }}>
          <PropertyGrid filters={filters} />
        </section>
      </div>
    </div>
  );
};

export default Home;
