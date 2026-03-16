import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { Save, ChevronRight, ChevronLeft, Upload, X } from 'lucide-react';

const PropertyForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    operation_type: 'Venta',
    location: '',
    m2: '',
    rooms: '',
    bathrooms: '',
    expenses: 0,
    status: 'Disponible',
    images: []
  });

  useEffect(() => {
    if (id) {
      const fetchProperty = async () => {
        const { data } = await supabase.from('properties').select('*').eq('id', id).single();
        if (data) setFormData(data);
      };
      fetchProperty();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = id 
      ? await supabase.from('properties').update(formData).eq('id', id)
      : await supabase.from('properties').insert([formData]);

    if (error) alert('Error al guardar: ' + error.message);
    else navigate('/admin');
    setLoading(false);
  };

  const renderStep1 = () => (
    <div className="fade-in">
      <h3 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Información Básica</h3>
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Título de la Propiedad</label>
          <input 
            className="search-input" style={{ width: '100%' }}
            value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
            placeholder="Ej: Lujoso Departamento en Belgrano"
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Tipo de Operación</label>
            <select 
              className="search-input" style={{ width: '100%' }}
              value={formData.operation_type} onChange={e => setFormData({...formData, operation_type: e.target.value})}
            >
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Precio (USD)</label>
            <input 
              type="number" className="search-input" style={{ width: '100%' }}
              value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})}
            />
          </div>
        </div>
        {formData.operation_type === 'Alquiler' && (
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Expensas (ARS/USD)</label>
            <input 
              type="number" className="search-input" style={{ width: '100%' }}
              value={formData.expenses} onChange={e => setFormData({...formData, expenses: e.target.value})}
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="fade-in">
      <h3 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Detalles Técnicos</h3>
      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Ubicación</label>
          <input 
            className="search-input" style={{ width: '100%' }}
            value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})}
          />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Superficie (m²)</label>
            <input type="number" className="search-input" style={{ width: '100%' }} value={formData.m2} onChange={e => setFormData({...formData, m2: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Ambientes</label>
            <input type="number" className="search-input" style={{ width: '100%' }} value={formData.rooms} onChange={e => setFormData({...formData, rooms: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Baños</label>
            <input type="number" className="search-input" style={{ width: '100%' }} value={formData.bathrooms} onChange={e => setFormData({...formData, bathrooms: e.target.value})} />
          </div>
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Descripción</label>
          <textarea 
            className="search-input" style={{ width: '100%', minHeight: '120px' }}
            value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>
      </div>
    </div>
  );

  const handleImageUpload = (e) => {
    // Simulated watermarking: appending a watermark flag to the URL
    const files = Array.from(e.target.files);
    const newImages = files.map(f => `https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800&wm=LUXREALTY`);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
    alert('Fotos subidas y marca de agua aplicada automáticamente.');
  };

  const renderStep3 = () => (
    <div className="fade-in">
      <h3 style={{ marginBottom: '1.5rem', fontWeight: '700' }}>Multimedia</h3>
      <div 
        style={{ border: '2px dashed var(--border)', borderRadius: '1rem', padding: '3rem', textAlign: 'center', cursor: 'pointer' }}
        onClick={() => document.getElementById('imageInput').click()}
      >
        <Upload size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
        <p style={{ fontWeight: '600' }}>Click para subir fotos</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Marca de agua personalizada será aplicada.</p>
        <input id="imageInput" type="file" multiple hidden onChange={handleImageUpload} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginTop: '2rem' }}>
        {formData.images.map((img, i) => (
          <div key={i} style={{ position: 'relative', borderRadius: '0.5rem', overflow: 'hidden', height: '100px' }}>
            <img src={img} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <button style={{ position: 'absolute', top: '0.25rem', right: '0.25rem', background: 'rgba(0,0,0,0.5)', color: 'white', borderRadius: '50%', padding: '0.2rem' }}><X size={12} /></button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '2rem' }}>
        {id ? 'Editar Propiedad' : 'Añadir Nueva Propiedad'}
      </h1>

      <div className="glass-card" style={{ padding: '2.5rem' }}>
        {/* Progress Bar */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '2.5rem' }}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{ flex: 1, height: '4px', background: s <= step ? 'var(--accent)' : 'var(--border)', borderRadius: '2px', transition: 'all 0.3s' }}></div>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '3rem' }}>
            <button 
              type="button" 
              className="glass-card" 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', visibility: step === 1 ? 'hidden' : 'visible' }}
              onClick={() => setStep(s => s - 1)}
            >
              <ChevronLeft size={20} /> Anterior
            </button>
            
            {step < 3 ? (
              <button 
                type="button" 
                className="btn-primary" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                onClick={() => setStep(s => s + 1)}
              >
                Siguiente <ChevronRight size={20} />
              </button>
            ) : (
              <button 
                type="submit" 
                className="btn-primary" 
                style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 2.5rem' }}
                disabled={loading}
              >
                <Save size={20} /> {loading ? 'Guardando...' : 'Finalizar y Guardar'}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyForm;
