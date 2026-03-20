import React from 'react';
import MapInstance from '../components/public/map/MapInstance';
import MapControlBar from '../components/public/map/MapControlBar';
import PropertySidebar from '../components/public/map/PropertySidebar';

const MapSearch = () => {
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ height: '6.5rem' }} /> {/* Navbar Spacer */}
      <MapControlBar />
      
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* SIDEBAR: 330px fixed on desktop, hidden or drawer on mobile */}
        <div style={{ width: '330px', height: '100%', flexShrink: 0 }}>
          <PropertySidebar />
        </div>

        {/* MAP: Flexible area */}
        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
          <MapInstance />
        </div>
      </div>
    </div>
  );
};


export default MapSearch;