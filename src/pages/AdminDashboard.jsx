import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, Inbox, Settings, LogOut } from 'lucide-react';
import InventoryManager from '../components/admin/InventoryManager';
import PropertyForm from '../components/admin/PropertyForm';
import LeadInbox from '../components/admin/LeadInbox';

const AdminDashboard = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f1f5f9' }}>
      {/* Sidebar */}
      <aside style={{ width: '280px', background: 'var(--primary)', color: 'white', padding: '2rem 1.5rem' }}>
        <h2 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '3rem', color: 'var(--accent)' }}>ADMIN PANEL</h2>
        
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <Link to="/admin" className="admin-nav-link">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/admin/add" className="admin-nav-link">
            <PlusCircle size={20} /> Añadir Propiedad
          </Link>
          <Link to="/admin/leads" className="admin-nav-link">
            <Inbox size={20} /> Consultas
          </Link>
          <Link to="/admin/settings" className="admin-nav-link">
            <Settings size={20} /> Configuración
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
          <button style={{ background: 'transparent', color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LogOut size={20} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '3rem' }}>
        <Routes>
          <Route path="/" element={<InventoryManager />} />
          <Route path="/add" element={<PropertyForm />} />
          <Route path="/edit/:id" element={<PropertyForm />} />
          <Route path="/leads" element={<LeadInbox />} />
        </Routes>
      </main>

      <style>{`
        .admin-nav-link {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          color: rgba(255,255,255,0.7);
          transition: all 0.2s;
        }
        .admin-nav-link:hover {
          background: rgba(255,255,255,0.1);
          color: white;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
