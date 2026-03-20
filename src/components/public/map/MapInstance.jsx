import React, { useEffect } from 'react';
import { useStore } from '../../../lib/mockStore';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// PREMIUM UI: CUSTOM PIN DESIGN (Gold & Navy)
const createCustomIcon = (price) => {
  return L.divIcon({
    html: `
      <div style="
        background: #C5A059;
        color: #101828;
        padding: 6px 14px;
        border-radius: 24px;
        font-weight: 800;
        font-size: 0.85rem;
        border: 2px solid #FFFFFF;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
        white-space: nowrap;
        font-family: 'Montserrat', sans-serif;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        pointer-events: auto;
      " class="map-price-marker">
        USD ${price.toLocaleString()}
      </div>
    `,
    className: '', // Remove default leaflet styles that cause clipping
    iconSize: null, // Allows dynamic sizing based on text length!
    iconAnchor: [45, 15] // Center anchor (approximate based on pill size)
  });
};

const MapEvents = ({ setMapConfig }) => {
  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();
      setMapConfig({ 
        viewBound: [
          [bounds.getSouth(), bounds.getWest()], 
          [bounds.getNorth(), bounds.getEast()]
        ] 
      });
    }
  });

  useEffect(() => {
    // Initial sync
    const bounds = map.getBounds();
    setMapConfig({ 
      viewBound: [
        [bounds.getSouth(), bounds.getWest()], 
        [bounds.getNorth(), bounds.getEast()]
      ] 
    });
    // Expose map for custom controls
    window.mapInstance = map;
  }, [map, setMapConfig]);

  return null;
};

const MapInstance = () => {
  const { getFilteredProperties, mapConfig, setMapConfig } = useStore();
  const properties = getFilteredProperties(true); // true = ignore bounds filter for map pins

  return (
    <div style={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer 
        center={mapConfig.center} 
        zoom={mapConfig.zoom} 
        style={{ height: '100%', width: '100%', background: '#f1f5f9' }} 
        zoomControl={false}
      >
        {/* PREMIUM TILES: CartoDB Voyager (Sleeker & Cleaner than OSM) */}
        <TileLayer 
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        <MapEvents setMapConfig={setMapConfig} />

        <MarkerClusterGroup
          chunkedLoading
          showCoverageOnHover={false}
          spiderfyOnMaxZoom={true}
        >
          {properties.map(p => (
            <Marker 
              key={p.id} 
              position={[p.location.lat, p.location.lng]} 
              icon={createCustomIcon(p.price_data.amount)}
            >
              <Popup minWidth={260} className="premium-popup">
                <div style={{ borderRadius: '12px', overflow: 'hidden', padding: '0' }}>
                  <img 
                    src={p.media.find(m => m.type === 'Foto')?.url || p.media[0]?.url} 
                    style={{ width: '100%', height: '140px', objectFit: 'cover' }} 
                    alt={p.title} 
                  />
                  <div style={{ padding: '1.2rem' }}>
                    <div style={{ fontSize: '0.7rem', color: '#c5a059', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem', letterSpacing: '0.05em' }}>
                      {p.operation} • {p.attributes.rooms} Ambientes
                    </div>
                    <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#101828', marginBottom: '0.5rem', lineHeight: '1.3' }}>
                      {p.title}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem' }}>
                      <div style={{ fontWeight: 800, fontSize: '1.3rem', color: '#101828' }}>
                        USD {p.price_data.amount.toLocaleString()}
                      </div>
                      <button className="btn-premium btn-premium-primary" style={{ padding: '0.5rem 1rem', fontSize: '0.75rem', borderRadius: '8px' }}>
                        Ver Más
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>

      {/* CUSTOM FLOATING CONTROLS */}
      <div style={{ position: 'absolute', bottom: '30px', right: '30px', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button 
          onClick={() => window.mapInstance?.zoomIn()}
          style={{ 
            width: '45px', height: '45px', background: 'white', border: 'none', borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', fontSize: '1.5rem', fontWeight: 600, color: '#101828'
          }}
        >
          +
        </button>
        <button 
          onClick={() => window.mapInstance?.zoomOut()}
          style={{ 
            width: '45px', height: '45px', background: 'white', border: 'none', borderRadius: '12px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)', cursor: 'pointer', fontSize: '1.5rem', fontWeight: 600, color: '#101828'
          }}
        >
          -
        </button>
      </div>

      <style>{`
        .premium-popup .leaflet-popup-content-wrapper {
          border-radius: 16px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }
        .premium-popup .leaflet-popup-content {
          margin: 0;
          width: 260px !important;
        }
        .premium-popup .leaflet-popup-tip-container {
          filter: drop-shadow(0 0 5px rgba(0,0,0,0.1));
        }
        .map-price-marker:hover {
          transform: translate(-50%, -105%) scale(1.1);
          background: #c5a059 !important;
          border-color: #101828 !important;
        }
      `}</style>
    </div>
  );
};

export default MapInstance;