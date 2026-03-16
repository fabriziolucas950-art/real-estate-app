import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ background: 'var(--primary)', color: 'white', padding: '5rem 0 2rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4rem', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
               <span style={{ color: 'var(--accent)' }}>LUX</span>REALTY
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: '1.6' }}>
              Redefiniendo el mercado inmobiliario con transparencia, exclusividad y tecnología de vanguardia.
            </p>
          </div>
          
          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '1.5rem' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><MapPin size={18} /> Av. Libertador 1234, CABA</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Phone size={18} /> +54 11 4444-5555</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Mail size={18} /> contacto@luxrealty.com</div>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '1.5rem' }}>Enlaces Rápidos</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
              <a href="#">Propiedades en Venta</a>
              <a href="#">Alquileres Temporarios</a>
              <a href="#">Tasaciones</a>
              <a href="#">Sobre Nosotros</a>
            </div>
          </div>

          <div>
            <h4 style={{ fontWeight: '700', marginBottom: '1.5rem' }}>Seguinos</h4>
            <div style={{ display: 'flex', gap: '1.5rem' }}>
              <a href="#" style={{ color: 'white' }}><Instagram /></a>
              <a href="#" style={{ color: 'white' }}><Facebook /></a>
              <a href="#" style={{ color: 'white' }}><Twitter /></a>
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>
          © 2026 LUXREALTY. Todos los derechos reservados. Desarrollado con Antigravity.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
