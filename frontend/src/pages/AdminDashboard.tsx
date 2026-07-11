import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { VehicleCard } from '../components/VehicleCard';

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

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/vehicles', {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity)
      });
      setFormData({ make: '', model: '', category: 'Sedan', price: '', quantity: '' });
      fetchVehicles();
    } catch (err) {
      alert('Failed to add vehicle');
    }
  };

  const handleDelete = async (id: number) => {
    if(window.confirm('Are you sure you want to delete this vehicle?')) {
      try {
        await api.delete(`/vehicles/${id}`);
        fetchVehicles();
      } catch (err) {
        alert('Failed to delete vehicle');
      }
    }
  };

  const handleRestock = async (id: number, amount: number) => {
    try {
      await api.post(`/vehicles/${id}/restock`, { amount });
      fetchVehicles();
    } catch (err) {
      alert('Failed to restock');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-white mb-8">Admin Operations</h1>
      
      <div className="glass-card p-6 mb-12">
        <h2 className="text-xl font-bold text-white mb-4">Add New Vehicle</h2>
        <form onSubmit={handleAdd} className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
          <div>
            <label className="block text-slate-400 text-xs mb-1">Make</label>
            <input required type="text" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm" />
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">Model</label>
            <input required type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm" />
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">Category</label>
            <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm">
              <option>Sedan</option>
              <option>SUV</option>
              <option>Truck</option>
              <option>Coupe</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">Price</label>
            <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white text-sm" />
          </div>
          <button type="submit" className="w-full bg-emerald hover:bg-emerald-600 text-white font-medium py-2 rounded transition">
            Add Vehicle
          </button>
        </form>
      </div>

      <h2 className="text-2xl font-bold text-white mb-6">Manage Inventory</h2>
      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading inventory...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
      )}
    </div>
  );
};
