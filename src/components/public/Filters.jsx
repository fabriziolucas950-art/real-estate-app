import React from 'react';
import { Filter, ChevronDown } from 'lucide-react';

const Filters = ({ onChange }) => {
  return (
    <div className="glass-card" style={{ padding: '1.5rem', position: 'sticky', top: '7rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontWeight: '700' }}>
        <Filter size={20} />
        <span>Filtros Avanzados</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Tipo de Propiedad</label>
          <select className="search-input" style={{ width: '100%' }}>
            <option>Todas</option>
            <option>Casa</option>
            <option>Departamento</option>
            <option>Lote</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Ambientes</label>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {['1', '2', '3', '4+'].map(num => (
              <button key={num} style={{ 
                flex: 1, 
                padding: '0.5rem', 
                border: '1px solid var(--border)', 
                borderRadius: '0.5rem', 
                background: 'white',
                fontSize: '0.75rem'
              }}>{num}</button>
            ))}
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Rango de Precio (USD)</label>
          <input type="range" min="0" max="1000000" step="10000" style={{ width: '100%' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.5rem', color: 'var(--text-muted)' }}>
            <span>$0</span>
            <span>$1M+</span>
          </div>
        </div>

        <button className="btn-primary" style={{ marginTop: '1rem', width: '100%' }}>Aplicar Filtros</button>
      </div>
    </div>
  );
};

export default Filters;
