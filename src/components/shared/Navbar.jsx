import { Link } from 'react-router-dom';
import { Home, User, Mail, Search } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 glass-morphism mx-4 mt-4 py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-accent to-accent-light bg-clip-text text-transparent">
        ESTATE PREM
      </Link>
      <div className="flex gap-8 items-center">
        <Link to="/" className="hover:text-accent flex items-center gap-2"><Home size={20} /> Inicio</Link>
        <Link to="/admin" className="hover:text-accent flex items-center gap-2"><User size={20} /> Admin</Link>
        <button className="btn-primary flex items-center gap-2">
          <Mail size={18} /> Contactar
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
