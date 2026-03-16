import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2070" 
          alt="Modern House" 
          className="w-full h-full object-cover brightness-50"
        />
      </div>
      <div className="relative z-10 text-center space-y-8 max-w-4xl px-4">
        <motion.h1 
          className="text-6xl md:text-8xl font-bold tracking-tighter"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          Encuentra tu <br /> <span className="text-accent">Próximo Destino</span>
        </motion.h1>
        <motion.div 
          className="glass-morphism p-2 flex gap-2 max-w-2xl mx-auto"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex-1 flex items-center gap-4 px-6">
            <Search className="text-muted" />
            <input 
              type="text" 
              placeholder="¿Qué estás buscando?" 
              className="bg-transparent border-none outline-none text-white w-full py-4"
            />
          </div>
          <button className="btn-primary">Buscar</button>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
