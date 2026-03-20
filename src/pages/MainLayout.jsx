import React, { useState } from 'react';
import Home from './Home';
import MapSearch from './MapSearch';
import PropertiesList from './PropertiesList';
import AdminDashboard from '../pages/AdminDashboard';
import PropertyDetail from '../pages/PropertyDetail';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WhatsAppCTA from '../components/public/WhatsAppCTA';

const MainLayout = () => {
  const [view, setView] = useState('public');
  const [selectedPropertyId, setSelectedPropertyId] = useState('1');

  const handleSetView = (newView, propertyId = null) => {
    setView(newView);
    if (propertyId) setSelectedPropertyId(propertyId);
  };

  const renderView = () => {
    switch(view) {
      case 'public': return (
        <>
          <Home setView={handleSetView} />
          <Footer />
        </>
      );
      case 'map-search': return <MapSearch />;
      case 'properties-list': return (
        <>
          <PropertiesList setView={handleSetView} />
          <Footer />
        </>
      );
      case 'property-detail': return (
        <PropertyDetail propertyId={selectedPropertyId} setView={setView} />
      );
      case 'admin-dashboard': return (
        <div className="container" style={{ paddingTop: '8rem', minHeight: '100vh', paddingBottom: '4rem' }}>
          <AdminDashboard />
          <Footer />
        </div>
      );
      default: return <Home />;
    }
  };

  return (
    <div className="ecosystem-shell" style={{ backgroundColor: 'var(--background)' }}>
      <WhatsAppCTA />
      
      <div className="main-content">
        <Navbar setView={handleSetView} currentView={view} />
        {renderView()}
      </div>
    </div>
  );
};

export default MainLayout;
