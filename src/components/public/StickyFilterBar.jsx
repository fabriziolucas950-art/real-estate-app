import React, { useState, useEffect } from 'react';
import { useStore } from '../../lib/mockStore';
import { Search, MapPin, Building, Home as HomeIcon, SlidersHorizontal, X, Check, DollarSign } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const amenitiesList = [
  'Piscina', 'Cochera', 'Parrilla', 'Parque', 'Balcón', 'Sum', 'Gym', 'Seguridad', 'Apto Profesional', 'Patio'
];

const StickyFilterBar = () => {
  const { filters, setFilters, properties } = useStore();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    // Extract unique cities and neighborhoods from available properties for datalist
    const uniqueLocations = [...new Set(properties.flatMap(p => [p.location.city, p.location.neighborhood]))];
    setCities(uniqueLocations);
  }, [properties]);

  useEffect(() => {
    // Sync filters to URL visually
    const params = new URLSearchParams();
    if (filters.operation !== 'Todos') params.set('operacion', filters.operation.toLowerCase());
    if (filters.propertyType !== 'Todos') params.set('tipo', filters.propertyType.toLowerCase());
    if (filters.location) params.set('ubicacion', filters.location.toLowerCase());
    
    const newUrl = params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname;
    window.history.replaceState({}, '', newUrl);
  }, [filters]);

  const handleAmenityToggle = (amenity) => {
    const current = filters.amenities || [];
    const updated = current.includes(amenity) 
      ? current.filter(a => a !== amenity)
      : [...current, amenity];
    setFilters({ amenities: updated });
  };

  const InputWrapper = ({ children, isActive }) => (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '0.8rem',
      padding: '0.6rem 1.2rem', borderRadius: '100px',
      border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
      background: isActive ? 'rgba(197, 160, 89, 0.05)' : 'white',
      transition: 'all 0.2s',
      cursor: 'pointer'
    }}>
      {children}
    </div>
  );

  return (
    <>
      <div style={{
        position: 'sticky', top: '90px', zIndex: 3000,
        background: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '1rem 2rem',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        border: '1px solid var(--border)',
        display: 'flex', gap: '1rem', alignItems: 'center',
        flexWrap: 'wrap', marginBottom: '3rem'
      }}>
        
        {/* Location Explorer */}
        <InputWrapper isActive={!!filters.location}>
          <Search size={16} color={filters.location ? 'var(--accent)' : 'var(--text-muted)'} />
          <input 
            type="text" 
            list="locations"
            placeholder="Ingresá ciudades o barrios" 
            value={filters.location}
            onChange={(e) => setFilters({ location: e.target.value })}
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', width: '200px', color: 'var(--primary)' }}
          />
          <datalist id="locations">
            {cities.map((city, i) => <option key={i} value={city} />)}
          </datalist>
        </InputWrapper>

        {/* Operation */}
        <InputWrapper isActive={filters.operation !== 'Todos'}>
          <select 
            value={filters.operation}
            onChange={(e) => setFilters({ operation: e.target.value })}
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: 'var(--primary)', cursor: 'pointer' }}
          >
            <option value="Todos">Comprar o Alquilar</option>
            <option value="Venta">Comprar</option>
            <option value="Alquiler">Alquilar</option>
          </select>
        </InputWrapper>

        {/* Property Type */}
        <InputWrapper isActive={filters.propertyType !== 'Todos'}>
          <Building size={16} color={filters.propertyType !== 'Todos' ? 'var(--accent)' : 'var(--text-muted)'} />
          <select 
            value={filters.propertyType}
            onChange={(e) => setFilters({ propertyType: e.target.value })}
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: 'var(--primary)', cursor: 'pointer' }}
          >
            <option value="Todos">Tipo de Propiedad</option>
            <option value="Casa">Casa</option>
            <option value="Departamento">Departamento</option>
            <option value="Quinta">Quinta</option>
            <option value="Lote">Lote</option>
            <option value="Local">Local</option>
          </select>
        </InputWrapper>

        {/* Rooms / Ambientes */}
        <InputWrapper isActive={filters.bedrooms !== 'Todos'}>
          <HomeIcon size={16} color={filters.bedrooms !== 'Todos' ? 'var(--accent)' : 'var(--text-muted)'} />
          <select 
            value={filters.bedrooms}
            onChange={(e) => setFilters({ bedrooms: e.target.value })}
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Montserrat, sans-serif', color: 'var(--primary)', cursor: 'pointer' }}
          >
            <option value="Todos">Amb | Dorm</option>
            <option value="1">1+ Dormitorios</option>
            <option value="2">2+ Dormitorios</option>
            <option value="3">3+ Dormitorios</option>
            <option value="4">4+ Dormitorios</option>
          </select>
        </InputWrapper>

        <div style={{ flex: 1 }} />

        {/* Advanced Filters Button */}
        <button 
          onClick={() => setDrawerOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.8rem 1.5rem', borderRadius: '100px',
            background: 'var(--primary)', color: 'white',
            border: 'none', cursor: 'pointer', fontWeight: 700,
            fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px',
            boxShadow: 'var(--shadow-subtle)'
          }}
        >
          <SlidersHorizontal size={16} /> Más Filtros
          {(filters.amenities?.length > 0) && (
            <span style={{ background: 'var(--accent)', padding: '0.1rem 0.5rem', borderRadius: '100px', fontSize: '0.7rem' }}>
              {filters.amenities.length}
            </span>
          )}
        </button>

      </div>

      {/* Advanced Filters Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setDrawerOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(16, 24, 40, 0.4)', zIndex: 4000, backdropFilter: 'blur(4px)' }} 
            />
            <motion.div 
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0, width: '400px', maxWidth: '100vw',
                background: 'white', zIndex: 4001, boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
                padding: '2rem', display: 'flex', flexDirection: 'column', fontFamily: 'Montserrat, sans-serif'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px', margin: 0, color: 'var(--primary)' }}>Filtros Avanzados</h3>
                <button onClick={() => setDrawerOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
              </div>

              <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                
                {/* Price Range Simulator */}
                <div>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Rango de Precio (USD)</h4>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                     <div style={{ flex: 1, position: 'relative' }}>
                       <DollarSign size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                       <input type="number" placeholder="Mínimo" value={filters.priceRange[0] === 0 ? '' : filters.priceRange[0]} onChange={(e) => setFilters({ priceRange: [Number(e.target.value) || 0, filters.priceRange[1]] })} style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }} />
                     </div>
                     <span style={{ color: 'var(--text-muted)' }}>-</span>
                     <div style={{ flex: 1, position: 'relative' }}>
                       <DollarSign size={14} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                       <input type="number" placeholder="Máximo" value={filters.priceRange[1] >= 1000000 ? '' : filters.priceRange[1]} onChange={(e) => setFilters({ priceRange: [filters.priceRange[0], Number(e.target.value) || 1000000] })} style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.5rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none' }} />
                     </div>
                   </div>
                </div>

                {/* Amenities */}
                <div>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--text-muted)', marginBottom: '1rem' }}>Comodidades & Extras</h4>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                     {amenitiesList.map(amenity => {
                       const isActive = filters.amenities?.includes(amenity);
                       return (
                         <button
                           key={amenity}
                           onClick={() => handleAmenityToggle(amenity)}
                           style={{
                             padding: '0.6rem 1.2rem', borderRadius: '100px',
                             background: isActive ? 'var(--primary)' : 'white',
                             color: isActive ? 'white' : 'var(--primary)',
                             border: `1px solid ${isActive ? 'var(--primary)' : 'var(--border)'}`,
                             fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                             display: 'flex', alignItems: 'center', gap: '0.4rem'
                           }}
                         >
                           {isActive && <Check size={14} color="var(--accent)" />} {amenity}
                         </button>
                       );
                     })}
                   </div>
                </div>

              </div>
              
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
                 <button 
                   onClick={() => setFilters({ amenities: [], priceRange: [0, 1000000] })}
                   style={{ flex: 1, padding: '1.2rem', background: 'white', border: '1px solid var(--border)', borderRadius: '8px', fontWeight: 800, textTransform: 'uppercase', cursor: 'pointer', color: 'var(--text-muted)' }}
                 >
                   Limpiar
                 </button>
                 <button 
                   onClick={() => setDrawerOpen(false)}
                   className="btn-premium btn-premium-primary"
                   style={{ flex: 2, padding: '1.2rem', borderRadius: '8px', fontWeight: 800, textTransform: 'uppercase' }}
                 >
                   Ver Resultados
                 </button>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

    </>
  );
};

export default StickyFilterBar;
