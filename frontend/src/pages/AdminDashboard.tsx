import { useState, useEffect } from 'react';
import api from '../services/api';
import { VehicleCard } from '../components/VehicleCard';
import { PlusCircle } from 'lucide-react';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

export const AdminDashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ make: '', model: '', category: 'Sedan', price: '', quantity: '' });
  const [formError, setFormError] = useState('');

  const fetchVehicles = async () => {
    try {
      const res = await api.get('/vehicles');
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchVehicles(); }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    try {
      await api.post('/vehicles', {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      });
      setFormData({ make: '', model: '', category: 'Sedan', price: '', quantity: '' });
      fetchVehicles();
    } catch (err: any) {
      setFormError(err.response?.data?.error?.message || 'Failed to add vehicle');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Delete this vehicle?')) {
      try {
        await api.delete(`/vehicles/${id}`);
        fetchVehicles();
      } catch { alert('Failed to delete vehicle'); }
    }
  };

  const handleRestock = async (id: number, amount: number) => {
    try {
      await api.post(`/vehicles/${id}/restock`, { amount });
      fetchVehicles();
    } catch { alert('Failed to restock'); }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Admin Panel</h1>
        <p className="text-slate-500 mt-1">Manage inventory, add vehicles, and restock</p>
      </div>

      {/* Add Vehicle Form */}
      <div className="glass-card p-6 mb-10">
        <div className="flex items-center gap-2 mb-5">
          <PlusCircle size={18} className="text-primary-600" />
          <h2 className="text-lg font-semibold text-slate-800">Add New Vehicle</h2>
        </div>

        {formError && <div className="banner-error mb-4">{formError}</div>}

        <form onSubmit={handleAdd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 items-end">
          <div>
            <label className="label">Make</label>
            <input required type="text" placeholder="Toyota" value={formData.make}
              onChange={e => setFormData({ ...formData, make: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="label">Model</label>
            <input required type="text" placeholder="Camry" value={formData.model}
              onChange={e => setFormData({ ...formData, model: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="label">Category</label>
            <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} className="input-field">
              <option>Sedan</option>
              <option>SUV</option>
              <option>Truck</option>
              <option>Coupe</option>
            </select>
          </div>
          <div>
            <label className="label">Price ($)</label>
            <input required type="number" placeholder="25000" value={formData.price}
              onChange={e => setFormData({ ...formData, price: e.target.value })} className="input-field" />
          </div>
          <div>
            <label className="label">Quantity</label>
            <input type="number" placeholder="1" value={formData.quantity} min={0}
              onChange={e => setFormData({ ...formData, quantity: e.target.value })} className="input-field" />
          </div>
          <div>
            <button type="submit" className="btn-primary w-full py-2.5">
              Add Vehicle
            </button>
          </div>
        </form>
      </div>

      {/* Manage Inventory */}
      <h2 className="text-xl font-bold text-slate-800 mb-5">Manage Inventory</h2>

      {loading ? (
        <div className="text-center py-16 text-slate-400">Loading inventory...</div>
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {vehicles.map(v => (
            <VehicleCard
              key={v.id}
              vehicle={v}
              onPurchase={() => {}}
              isAdmin={true}
              onDelete={handleDelete}
              onRestock={handleRestock}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-400 glass-card">
          No vehicles in inventory yet. Add one above.
        </div>
      )}
    </div>
  );
};
