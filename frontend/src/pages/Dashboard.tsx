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

export const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchVehicles = async () => {
    try {
      const res = await api.get(`/vehicles?make=${search}`);
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchVehicles();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const handlePurchase = async (id: number) => {
    try {
      await api.post(`/vehicles/${id}/purchase`);
      setMessage('Purchase successful!');
      fetchVehicles();
      setTimeout(() => setMessage(''), 3000);
    } catch (err: any) {
      setMessage(err.response?.data?.error?.message || 'Purchase failed');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-white">Available Vehicles</h1>
        <input 
          type="text" 
          placeholder="Search by make (e.g. Toyota)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-72 bg-slate-800 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition"
        />
      </div>
      
      {message && (
        <div className="bg-emerald-500/20 border border-emerald-500/50 text-emerald-200 px-4 py-3 rounded-lg mb-6 text-center animate-pulse">
          {message}
        </div>
      )}

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading vehicles...</div>
      ) : vehicles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vehicles.map(v => (
            <VehicleCard key={v.id} vehicle={v} onPurchase={handlePurchase} />
          ))}
        </div>
      ) : (
        <div className="text-center text-slate-400 py-12 bg-slate-800/30 rounded-xl border border-slate-700/50">
          No vehicles found matching your search.
        </div>
      )}
    </div>
  );
};
