import { motion } from 'framer-motion';
import Hero from '../components/public/Hero';
import PropertyGrid from '../components/public/PropertyGrid';
import Filters from '../components/public/Filters';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <div className="container py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64">
            <Filters />
          </aside>
          <div className="flex-1">
            <PropertyGrid />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
