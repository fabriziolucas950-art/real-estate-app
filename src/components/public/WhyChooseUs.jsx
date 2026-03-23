import React from 'react';
import { motion } from 'framer-motion';
import { Award, Lightbulb, Share2, Zap } from 'lucide-react';

const reasons = [
  {
    icon: <Award size={28} />,
    title: 'Legado de Confianza',
    description: 'Décadas de trayectoria brindando seguridad jurídica y comercial en cada operación.',
    delay: 0.1
  },
  {
    icon: <Lightbulb size={28} />,
    title: 'Visión Estratégica',
    description: 'Analizamos el mercado para posicionar su propiedad con el máximo valor competitivo.',
    delay: 0.2
  },
  {
    icon: <Share2 size={28} />,
    title: 'Alcance Global',
    description: 'Marketing digital de alta gama para que su propiedad sea vista por los inversores adecuados.',
    delay: 0.3
  },
  {
    icon: <Zap size={28} />,
    title: 'Eficacia Ejecutiva',
    description: 'Procesos ágiles y transparentes diseñados para concretar cierres en tiempo récord.',
    delay: 0.4
  }
];

const WhyChooseUs = () => {
  return (
    <section className="why-choose-us-section" style={{ 
      background: '#0a0f1a', 
      color: 'white', 
      padding: '12rem 10%',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '8rem' }}>
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ 
              color: 'var(--accent)', 
              fontWeight: 800, 
              textTransform: 'uppercase', 
              letterSpacing: '0.4em',
              fontSize: '0.75rem',
              marginBottom: '1.5rem'
            }}
          >
            Nuestros Pilares
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', maxWidth: '800px', lineHeight: '1.2' }}
          >
            Compromiso con la <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>Excelencia</span>
          </motion.h2>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', 
          gap: '2rem' 
        }}>
          {reasons.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: item.delay }}
              style={{
                background: 'rgba(255,255,255,0.02)',
                padding: '3rem 1.5rem',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'var(--transition)'
              }}
              className="reason-card"
            >
              <div style={{ 
                width: '60px', 
                height: '60px', 
                background: 'rgba(197, 160, 89, 0.1)', 
                color: 'var(--accent)', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                marginBottom: '2.5rem'
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.75rem', marginBottom: '1.2rem', color: 'white' }}>{item.title}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: '1.8', fontSize: '1rem', fontWeight: 300 }}>
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        .reason-card:hover {
          background: rgba(197, 160, 89, 0.05) !important;
          border-color: var(--accent) !important;
          transform: translateY(-10px);
        }
      `}</style>
    </section>
  );
};

export default WhyChooseUs;