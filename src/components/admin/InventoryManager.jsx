import React, { useState } from 'react';
import { useStore } from '../../lib/mockStore';
import { Plus, Trash2, Edit3, Save, X, Image as ImageIcon, Map, PlayCircle, CheckCircle } from 'lucide-react';

const InventoryManager = () => {
  const { properties, updatePrice, addProperty } = useStore();
  const [isAdding, setIsAdding] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [tempPrice, setTempPrice] = useState('');

  // SKILL: GET-SHIT-DONE CRUD LOGIC
  const handleSavePrice = (id) => {
    updatePrice(id, parseFloat(tempPrice));
    setEditingId(null);
  };

  const handlePublishMock = () => {
    setIsAdding(false);
    alert('Propiedad guardada en el catálogo (MOCK).');
  };

  if (isAdding) {
    return (
      <div className="admin-inventory animate-fade" style={{ background: 'white', padding: '3rem', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-subtle)', fontFamily: 'Montserrat, sans-serif' }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: 'var(--primary)' }}>Nueva Propiedad (Miranda Bosch System)</h2>
            <p style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Ficha técnica completa, finanzas y categorización multimedia.</p>
          </div>
          <button onClick={() => setIsAdding(false)} style={{ background: 'var(--border)', border: 'none', cursor: 'pointer', color: 'var(--primary)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </header>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          {/* IDENTIFICATION & FINANCIAL */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.5fr) 1fr', gap: '3rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <SectionTitle title="Datos Básicos" />
              <FormInput label="Título de la Publicación" placeholder="Ej: Residencia de Autor Premium..." />
              <FormInput label="Dirección / Barrio" placeholder="Ej: San Ignacio, Junín" />
              <div style={{ display: 'flex', gap: '1rem' }}>
                 <FormSelect label="Operación" options={['Venta', 'Alquiler']} />
                 <FormSelect label="Tipo" options={['Casa', 'Departamento', 'Lote', 'Local', 'Quinta']} />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <SectionTitle title="Finanzas & Gastos Mensuales" />
              <FormInput label="Precio Base (USD / ARS)" placeholder="Ej: 320000" type="number" />
              <div style={{ display: 'flex', gap: '1rem' }}>
                 <FormInput label="Expensas Mensuales" placeholder="Ej: 8000" type="number" />
                 <FormInput label="Impuestos (ARBA, Mun)" placeholder="Ej: 15000" type="number" />
              </div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer', marginTop: '0.5rem' }}>
                <input type="checkbox" style={{ width: '18px', height: '18px', accentColor: 'var(--accent)' }} />
                <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--primary)' }}>Apto Crédito Bancario</span>
              </label>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px dashed var(--border)' }} />

          {/* TECHNICAL SPEC SHEET */}
          <div>
            <SectionTitle title="Ficha Técnica & Edificio" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
              <FormInput label="Superficie Total (m²)" placeholder="Ej: 120" type="number" />
              <FormInput label="Superficie Cub. (m²)" placeholder="Ej: 90" type="number" />
              <FormInput label="Ambientes Totales" placeholder="Ej: 4" type="number" />
              <FormInput label="Dormitorios" placeholder="Ej: 3" type="number" />
              <FormInput label="Baños" placeholder="Ej: 2" type="number" />
              <FormInput label="Antigüedad (años)" placeholder="Ej: 5 (0 = A estrenar)" type="number" />
              <FormSelect label="Luminosidad" options={['Muy Luminoso', 'Normal', 'Bajo']} />
              <FormSelect label="Orientación" options={['Norte', 'Sur', 'Este', 'Oeste', 'Noreste', 'Noroeste', 'Sureste', 'Suroeste']} />
              <FormSelect label="Estado Actual" options={['Excelente', 'Muy Bueno', 'Bueno', 'A Refaccionar', 'Nuevo']} />
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px dashed var(--border)' }} />

          {/* MEDIA UPLOADER */}
          <div>
            <SectionTitle title="Categorización Multimedia" />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
               <MediaDropzone title="Renders & Fotos" icon={<ImageIcon size={30} />} desc="JPG, PNG. Max 5MB." />
               <MediaDropzone title="Planos Arquitectónicos" icon={<Map size={30} />} desc="PDF, JPG. Escala legible." />
               <MediaDropzone title="Tour Virtual / Video" icon={<PlayCircle size={30} />} desc="MP4 o Link de YouTube." />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
            <button className="btn-premium btn-premium-primary" onClick={handlePublishMock} style={{ padding: '1.2rem 3rem', fontSize: '1rem', borderRadius: '8px' }}>
              <Save size={18} /> Publicar Ficha de Autor
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
          <Plus size={18} /> Nueva Ficha de Propiedad
        </button>
      </header>

      {/* Table-based CRUD Engine */}
      <div className="glass-panel" style={{ overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', boxShadow: 'var(--shadow-subtle)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--primary)', color: 'white' }}>
              <th style={{ padding: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Propiedad</th>
              <th style={{ padding: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Estado / Info</th>
              <th style={{ padding: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Finanzas (USD)</th>
              <th style={{ padding: '1.5rem', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {properties.map(p => {
              const mainFoto = p.media.find(m => m.type === 'Foto')?.url || p.media[0]?.url;
              return (
              <tr key={p.id} style={{ borderBottom: '1px solid var(--border)', background: 'white' }}>
                <td style={{ padding: '1.5rem', display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
                  <img src={mainFoto} style={{ width: '60px', height: '60px', borderRadius: 'var(--radius-sm)', objectFit: 'cover', border: '1px solid var(--border)' }} alt="" />
                  <div>
                    <div style={{ fontWeight: 800, fontSize: '0.95rem', color: 'var(--primary)' }}>{p.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>{p.location.neighborhood} • {p.attributes.rooms || 0} AMB • {p.attributes.m2 || 0}m²</div>
                  </div>
                </td>
                <td style={{ padding: '1.5rem' }}>
                   <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                     <span style={{ 
                       padding: '0.3rem 0.8rem', 
                       background: p.status === 'Disponible' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                       color: p.status === 'Disponible' ? '#16a34a' : '#dc2626',
                       borderRadius: '100px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px'
                     }}>
                       {p.status}
                     </span>
                     {p.price_data.apto_credito && (
                       <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.7rem', color: 'var(--accent)', fontWeight: 700 }}><CheckCircle size={12} /> Apto Crédito</span>
                     )}
                   </div>
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
            )})}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- MOCK COMPONENTS PARA EL FORMULARIO PREMIUM ---

const SectionTitle = ({ title }) => (
  <h3 style={{ fontSize: '0.85rem', color: 'var(--accent)', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>{title}</h3>
);

const FormInput = ({ label, placeholder, type = "text" }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
     <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</label>
     <input type={type} placeholder={placeholder} style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontSize: '0.95rem', fontFamily: 'Montserrat, sans-serif', color: 'var(--primary)', background: '#F8F9FA' }} />
  </div>
);

const FormSelect = ({ label, options }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1 }}>
     <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{label}</label>
     <select style={{ width: '100%', padding: '0.9rem 1.2rem', borderRadius: '8px', border: '1px solid var(--border)', outline: 'none', fontSize: '0.95rem', fontFamily: 'Montserrat, sans-serif', color: 'var(--primary)', background: '#F8F9FA', cursor: 'pointer' }}>
        {options.map(o => <option key={o} value={o}>{o}</option>)}
     </select>
  </div>
);

const MediaDropzone = ({ title, icon, desc }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
    <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px' }}>{title}</label>
    <div style={{
      border: '2px dashed var(--border)', borderRadius: '12px', padding: '3rem 1rem', 
      textAlign: 'center', background: 'transparent', cursor: 'pointer',
      transition: 'all 0.3s'
    }} onMouseOver={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.background = 'rgba(197, 160, 89, 0.05)' }} onMouseOut={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.background = 'transparent'; }}>
      <div style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{icon}</div>
      <div style={{ fontWeight: 800, color: 'var(--primary)', marginBottom: '0.2rem', fontSize: '0.9rem' }}>Arrastra tus {title.toLowerCase()}</div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{desc}</div>
    </div>
  </div>
);

export default InventoryManager;