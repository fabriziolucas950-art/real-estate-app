import { Routes, Route } from 'react-router-dom';
import InventoryManager from '../components/admin/InventoryManager';
import LeadInbox from '../components/admin/LeadInbox';
import PropertyForm from '../components/admin/PropertyForm';

const AdminDashboard = () => {
  return (
    <div className="container py-12">
      <div className="flex gap-12">
        <nav className="w-64 glass-morphism p-6 h-fit sticky top-24">
          <ul className="space-y-4 text-muted">
            <li><a href="/admin" className="hover:text-accent">Inventario</a></li>
            <li><a href="/admin/leads" className="hover:text-accent">Leads</a></li>
          </ul>
        </nav>
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<InventoryManager />} />
            <Route path="/new" element={<PropertyForm />} />
            <Route path="/edit/:id" element={<PropertyForm />} />
            <Route path="/leads" element={<LeadInbox />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
