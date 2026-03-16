import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Heart, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="navbar glass-card" style={{ 
      position: 'sticky', 
      top: '1rem', 
      margin: '0 1rem', 
      zIndex: 1000, 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '1rem 2rem',
      alignItems: 'center'
    }}>
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', fontSize: '1.5rem', color: 'var(--primary)' }}>
        <Home size={28} color="var(--accent)" />
        <span>LUX<span style={{ color: 'var(--accent)' }}>REALTY</span></span>
      </Link>
      
      <div style={{ display: 'flex', gap: '2rem', fontWeight: '500' }}>
        <Link to="/" className="nav-link">Propiedades</Link>
        <Link to="/#servicios" className="nav-link">Servicios</Link>
        <Link to="/#contacto" className="nav-link">Contacto</Link>
      </div>

      <div style={{ display: 'flex', gap: '1rem' }}>
        <button className="icon-btn"><Heart size={20} /></button>
        <Link to="/admin" className="icon-btn"><User size={20} /></Link>
      </div>
    </nav>
  );
};

export default Navbar;
