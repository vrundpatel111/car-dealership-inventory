import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { VehicleCard } from '../components/VehicleCard';
import { Search, SlidersHorizontal } from 'lucide-react';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

interface Filters {
  make: string;
  model: string;
  category: string;
  minPrice: string;
  maxPrice: string;
}

const CATEGORIES = ['All', 'Sedan', 'SUV', 'Truck', 'Coupe'];

export const Dashboard = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<Filters>({ make: '', model: '', category: '', minPrice: '', maxPrice: '' });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error'>('success');

  const fetchVehicles = async (f: Filters) => {
    try {
      const hasFilter = f.make || f.model || f.category || f.minPrice || f.maxPrice;
      let res;
      if (hasFilter) {
        const params = new URLSearchParams();
        if (f.make) params.append('make', f.make);
        if (f.model) params.append('model', f.model);
        if (f.category) params.append('category', f.category);
        if (f.minPrice) params.append('minPrice', f.minPrice);
        if (f.maxPrice) params.append('maxPrice', f.maxPrice);
        res = await api.get(`/vehicles/search?${params.toString()}`);
      } else {
        res = await api.get('/vehicles');
      }
      setVehicles(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchVehicles(filters), 350);
    return () => clearTimeout(timer);
  }, [filters]);

  const handlePurchase = async (id: number) => {
    try {
      await api.post(`/vehicles/${id}/purchase`);
      setMessage('Purchase successful! 🎉');
      setMessageType('success');
      fetchVehicles(filters);
      setTimeout(() => setMessage(''), 4000);
    } catch (err: any) {
      setMessage(err.response?.data?.error?.message || 'Purchase failed');
      setMessageType('error');
      setTimeout(() => setMessage(''), 4000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Vehicle Inventory</h1>
        <p className="text-slate-500 mt-1">Browse and purchase from our current stock</p>
      </div>

      {/* ── Filter Panel ── */}
      <div className="glass-card p-5 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <SlidersHorizontal size={16} className="text-primary-600" />
          <span className="text-sm font-semibold text-slate-700">Filter Vehicles</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <div>
            <label className="label">Make</label>
            <input
              type="text"
              placeholder="e.g. Toyota"
              value={filters.make}
              onChange={e => setFilters({ ...filters, make: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Model</label>
            <input
              type="text"
              placeholder="e.g. Camry"
              value={filters.model}
              onChange={e => setFilters({ ...filters, model: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Category</label>
            <select
              value={filters.category || 'All'}
              onChange={e => setFilters({ ...filters, category: e.target.value === 'All' ? '' : e.target.value })}
              className="input-field"
            >
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Min Price ($)</label>
            <input
              type="number"
              placeholder="0"
              min={0}
              value={filters.minPrice}
              onChange={e => setFilters({ ...filters, minPrice: e.target.value })}
              className="input-field"
            />
          </div>
          <div>
            <label className="label">Max Price ($)</label>
            <input
              type="number"
              placeholder="Any"
              min={0}
              value={filters.maxPrice}
              onChange={e => setFilters({ ...filters, maxPrice: e.target.value })}
              className="input-field"
            />
          </div>
        </div>
      </div>

      {/* Feedback */}
      {message && (
        <div className={`mb-6 ${messageType === 'success' ? 'banner-success' : 'banner-error'}`}>
          {message}
        </div>
      )}

      {/* Vehicle Grid */}
      {loading ? (
        <div className="text-center py-20 text-slate-400">
          <Search size={32} className="mx-auto mb-3 opacity-40" />
          Loading vehicles...
        </div>
      ) : vehicles.length > 0 ? (
        <>
          <p className="text-sm text-slate-500 mb-4">{vehicles.length} vehicle{vehicles.length !== 1 ? 's' : ''} found</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {vehicles.map(v => (
              <VehicleCard key={v.id} vehicle={v} onPurchase={handlePurchase} />
            ))}
          </div>
        </>
      ) : (
        <div className="text-center py-20 text-slate-400 glass-card">
          <Search size={32} className="mx-auto mb-3 opacity-40" />
          <p className="font-medium">No vehicles found</p>
          <p className="text-sm mt-1">Try adjusting your filters</p>
        </div>
      )}
    </div>
  );
};
