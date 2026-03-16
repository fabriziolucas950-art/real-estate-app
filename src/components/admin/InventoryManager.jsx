import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, ExternalLink, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const InventoryManager = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProperties = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error(error);
    else setProperties(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar esta propiedad?')) {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) alert('Error al eliminar');
      else fetchProperties();
    }
  };

  const filteredProperties = properties.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800' }}>Gestión de Inventario</h1>
        <Link to="/admin/add" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          Añadir Propiedad
        </Link>
      </div>

      <div className="glass-card" style={{ padding: '2rem' }}>
        <div style={{ position: 'relative', marginBottom: '2rem', maxWidth: '400px' }}>
          <Search size={20} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Buscar por título o ubicación..." 
            className="search-input" 
            style={{ paddingLeft: '3rem', width: '100%', background: 'var(--background)' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid var(--border)', textAlign: 'left' }}>
              <th style={{ padding: '1rem' }}>Propiedad</th>
              <th style={{ padding: '1rem' }}>Precio</th>
              <th style={{ padding: '1rem' }}>Estado</th>
              <th style={{ padding: '1rem' }}>Operación</th>
              <th style={{ padding: '1rem' }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map(property => (
              <tr key={property.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ fontWeight: '700' }}>{property.title}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{property.location}</div>
                </td>
                <td style={{ padding: '1rem', fontWeight: '600' }}>USD {property.price.toLocaleString()}</td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    padding: '0.25rem 0.75rem', 
                    borderRadius: '1rem', 
                    fontSize: '0.75rem', 
                    fontWeight: '700',
                    background: property.status === 'Disponible' ? '#dcfce7' : '#fee2e2',
                    color: property.status === 'Disponible' ? '#166534' : '#991b1b'
                  }}>
                    {property.status}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>{property.operation_type}</td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <Link to={`/admin/edit/${property.id}`} style={{ color: 'var(--text-muted)' }}><Edit2 size={18} /></Link>
                    <button onClick={() => handleDelete(property.id)} style={{ background: 'transparent', color: '#ef4444' }}><Trash2 size={18} /></button>
                    <Link to={`/property/${property.id}`} target="_blank" style={{ color: 'var(--accent)' }}><ExternalLink size={18} /></Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <p style={{ padding: '2rem', textAlign: 'center' }}>Cargando propiedades...</p>}
      </div>
    </div>
  );
};

export default InventoryManager;
