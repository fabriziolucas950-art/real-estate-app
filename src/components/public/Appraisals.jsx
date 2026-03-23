import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ClipboardCheck, X } from 'lucide-react';
import { useStore } from '../../lib/mockStore';

const Appraisals = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const addAppraisal = useStore(state => state.addAppraisal);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    type: 'Casa',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store lead in Dashboard
    addAppraisal(formData);

    // Simulate Email
    console.log('[EMAIL NOTIFICACIÓN] Enviando ficha técnica a tasaciones@balsellschilano.com', formData);

    // Prepare WhatsApp Message
    const texto = `Hola Balsells & Chilano, quiero solicitar una tasación para mi propiedad en ${formData.address}. Mi nombre es ${formData.name}.`;
    const numero = "5493462123456"; // Empresa
    const wsUrl = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    
    // Redirect to WhatsApp
    window.open(wsUrl, '_blank');
    
    setIsModalOpen(false);
    setFormData({ name: '', phone: '', address: '', type: 'Casa', message: '' });
  };

  return (
    <>
      {/* SECCIÓN VALORACIÓN TÉCNICA */}
      <section className="appraisals-section" style={{ padding: '10rem 10%', background: 'var(--white)' }}>
        <div className="appraisals-flex" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '6rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ flex: '1', minWidth: '350px' }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span style={{ 
                color: '#C5A059', // Ocre Dorado 
                fontWeight: 800, 
                textTransform: 'uppercase', 
                letterSpacing: '0.4em', 
                fontSize: '0.75rem',
                display: 'block',
                marginBottom: '1.5rem'
              }}>VALORACIÓN TÉCNICA</span>
              <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '2.5rem', lineHeight: '1.1', color: '#101828' }}>
                Descubra el valor <span style={{ fontStyle: 'italic', fontWeight: 400 }}>real</span> de su propiedad.
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', lineHeight: '1.8', marginBottom: '3rem' }}>
                Nuestras tasaciones combinan el análisis profundo del mercado local con criterios técnicos de vanguardia. Obtenga un informe detallado que será la base de su éxito comercial.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                style={{
                  background: '#101828',
                  color: 'white',
                  padding: '1rem 2.5rem',
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.3s'
                }}
                onMouseOver={(e) => e.target.style.background = '#C5A059'}
                onMouseOut={(e) => e.target.style.background = '#101828'}
              >
                SOLICITAR TASACIÓN <ArrowRight size={18} />
              </button>
            </motion.div>
          </div>

          <div style={{ flex: '1', minWidth: '350px', position: 'relative' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="appraisals-image"
              style={{ 
                height: '550px', 
                background: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                boxShadow: 'var(--shadow-premium)',
                borderRadius: '8px'
              }}
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '-2rem', 
              right: '-2rem', 
              background: '#C5A059', 
              padding: '3rem',
              color: 'white',
              maxWidth: '250px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
              borderRadius: '8px'
            }}>
              <ClipboardCheck size={40} />
              <div style={{ fontWeight: 800, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Tasación bonificada
              </div>
              <p style={{ fontSize: '0.9rem', lineHeight: '1.4', opacity: 0.9 }}>Para propietarios que buscan exclusividad en la venta.</p>
            </div>
          </div>
        </div>
      </section>

      {/* MODAL DE TASACIÓN */}
      <AnimatePresence>
        {isModalOpen && (
          <div style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'rgba(16, 24, 40, 0.8)',
            backdropFilter: 'blur(8px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              style={{
                background: 'white',
                width: '100%',
                maxWidth: '600px',
                borderRadius: '16px',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              {/* Header Modal */}
              <div style={{ background: '#101828', color: 'white', padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <h3 style={{ color: 'white', fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Solicitud de Tasación</h3>
                  <p style={{ color: '#C5A059', margin: 0, fontSize: '0.9rem' }}>Conozca el verdadero valor de su propiedad</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%', transition: 'background 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <X size={24} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} style={{ padding: '2rem' }}>
                <div className="modal-form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
                  
                  {/* Nombre */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#101828' }}>Nombre y Apellido</label>
                    <input 
                      required
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#101828' }}>WhatsApp de contacto</label>
                    <input 
                      required
                      type="tel" 
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+54 9..."
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* Tipo */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#101828' }}>Tipo de propiedad</label>
                    <select 
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', background: 'white' }}
                    >
                      <option value="Casa">Casa</option>
                      <option value="Departamento">Departamento</option>
                      <option value="Lote">Lote</option>
                      <option value="Local">Local</option>
                      <option value="Quinta">Quinta / Campo</option>
                    </select>
                  </div>

                  {/* Dirección */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#101828' }}>Dirección de la propiedad</label>
                    <input 
                      required
                      type="text" 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Ej. Calle 123, Barrio..."
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '1rem', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </div>

                  {/* Detalle */}
                  <div style={{ gridColumn: '1 / -1' }}>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem', color: '#101828' }}>Mensaje Breve (Opcional)</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Algún detalle adicional sobre la propiedad..."
                      style={{ width: '100%', padding: '0.8rem 1rem', borderRadius: '8px', border: '1px solid #E5E7EB', fontSize: '1rem', outline: 'none', fontFamily: 'inherit', resize: 'vertical' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                  <button 
                    type="button" 
                    onClick={() => setIsModalOpen(false)}
                    style={{ background: 'transparent', border: '1px solid #E5E7EB', padding: '0.8rem 1.5rem', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit" 
                    style={{ background: '#C5A059', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '8px', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 10px rgba(197, 160, 89, 0.3)' }}
                  >
                    Enviar Solicitud
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Appraisals;