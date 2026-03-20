import React, { useState } from 'react';
import { useStore } from '../../lib/mockStore';
import { Plus, Trash2, Edit3, Save, X, Image as ImageIcon, DollarSign } from 'lucide-react';

const InventoryManager = () => {
  const { properties, updatePrice, addProperty, heroKeywords, setHeroKeywords } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  // SKILL: GET-SHIT-DONE CRUD LOGIC
  const handleSavePrice = (id) => {
    updatePrice(id, parseFloat(tempPrice));
    setEditingId(null);
  };

  if (isAdding) {
    return (
      <div className="admin-inventory animate-fade" style={{ background: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-subtle)', fontFamily: 'Montserrat, sans-serif' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)' }}>Nueva Propiedad</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Sube el material multimedia y define los atributos estructurales.</p>
          </div>
          <button onClick={() => setIsAdding(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
        </header>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Título y Ubicación</label>
            <input type="text" placeholder="Ej: Quinta a Estrenar..." style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontSize: '1rem', fontFamily: 'Montserrat, sans-serif' }} />
            <input type="text" placeholder="Precio (USD)" style={{ padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontSize: '1rem', fontFamily: 'Montserrat, sans-serif' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Media (Drag & Drop)</label>
            <div style={{
              border: '2px dashed var(--accent)', borderRadius: '12px', padding: '4rem 2rem', 
              textAlign: 'center', background: 'rgba(197, 160, 89, 0.05)', cursor: 'pointer',
              transition: 'background 0.3s'
            }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(197, 160, 89, 0.1)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(197, 160, 89, 0.05)'}>
              <ImageIcon size={48} color="var(--accent)" style={{ margin: '0 auto 1rem' }} />
              <div style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Arrastra tus fotos aquí</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>o haz click para explorar. Soporta JPG, PNG, WEBP.</div>
            </div>
            <button className="btn-premium btn-premium-primary" onClick={() => setIsAdding(false)} style={{ marginTop: '2rem', padding: '1.2rem', fontSize: '1rem' }}>
              <Save size={18} /> Publicar Propiedad
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-inventory animate-fade" style={{ padding: '2rem 0', fontFamily: 'Montserrat, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>Gestión de Inventario</h2>
          <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Control total de tus publicaciones en tiempo real.</p>
        </div>
        <button className="btn-premium btn-premium-primary" onClick={() => setIsAdding(true)} style={{ padding: '0.8rem 2rem', fontSize: '0.75rem' }}>
          <Plus size={18} /> Nueva Propiedad
        </button>
      </header>

// Hero config moved to AdminDashboard


      {/* Table-based CRUD Engine */}
      <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-subtle)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--primary)', color: 'white' }}>
              <th style={{ padding: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Propiedad</th>
              <th style={{ padding: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Estado</th>
              <th style={{ padding: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Precio (USD)</th>
              <th style={{ padding: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', background: 'white' }}>
                <td style={{ padding: '1.5rem', display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                  <img src={p.media[0]} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--border)' }} alt="" />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{p.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{p.location.neighborhood}</div>
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                   <span style={{ 
                     padding: '0.4rem 1rem', 
                     background: p.status === 'Disponible' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                     color: p.status === 'Disponible' ? '#16a34a' : '#dc2626',
                     borderRadius: '100px',
                     fontSize: '0.7rem',
                     fontWeight: 800,
                     textTransform: 'uppercase',
                     letterSpacing: '1px'
                   }}>
                     {p.status}
                   </span>
                </td>
                <td style={{ padding: '1.5rem' }}>
                  {editingId === p.id ? (
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <input 
                        type="number" 
                        value={tempPrice} 
                        onChange={(e) => setTempPrice(e.target.value)}
                        style={{ width: '130px', padding: '0.6rem', borderRadius: '4px', border: '1px solid var(--accent)', outline: 'none', fontFamily: 'Montserrat, sans-serif', fontWeight: 700 }}
                      />
                      <button onClick={() => handleSavePrice(p.id)} style={{ color: 'var(--accent)', cursor: 'pointer', background: 'none', border: 'none' }}><Save size={20}/></button>
                      <button onClick={() => setEditingId(null)} style={{ color: '#ef4444', cursor: 'pointer', background: 'none', border: 'none' }}><X size={20}/></button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                      <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)' }}>{p.price_data.amount.toLocaleString()}</span>
                      <button 
                        onClick={() => { setEditingId(p.id); setTempPrice(p.price_data.amount); }}
                        style={{ color: 'var(--text-muted)', cursor: 'pointer', background: 'none', border: 'none', opacity: 0.5, transition: '0.2s' }}
                        onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                        onMouseOut={(e) => e.currentTarget.style.opacity = '0.5'}
                      >
                        <Edit3 size={16} />
                      </button>
                    </div>
                  )}
                </td>
                <td style={{ padding: '1.5rem' }}>
                   <button 
                     style={{ color: '#ef4444', cursor: 'pointer', background: 'none', border: 'none', opacity: 0.5, transition: '0.2s' }}
                     onMouseOver={(e) => e.currentTarget.style.opacity = '1'}
                     onMouseOut={(e) => e.currentTarget.style.opacity = '0.5'}
                   >
                     <Trash2 size={20} />
                   </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryManager;
