import React from 'react';

interface Vehicle {
  id: number;
  make: string;
  model: string;
  category: string;
  price: number;
  quantity: number;
}

interface Props {
  vehicle: Vehicle;
  onPurchase: (id: number) => void;
  isAdmin?: boolean;
  onDelete?: (id: number) => void;
  onRestock?: (id: number, amount: number) => void;
}

export const VehicleCard: React.FC<Props> = ({ vehicle, onPurchase, isAdmin, onDelete, onRestock }) => {
  return (
    <div className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform duration-300">
      <div>
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-white">{vehicle.make} {vehicle.model}</h3>
          <span className="bg-slate-700 text-slate-300 text-xs px-2 py-1 rounded-full uppercase tracking-wider font-semibold">
            {vehicle.category}
          </span>
        </div>
        <p className="text-2xl font-bold text-electric mb-2">${vehicle.price.toLocaleString()}</p>
        <p className={`text-sm mb-6 ${vehicle.quantity > 0 ? 'text-emerald' : 'text-red-400'}`}>
          {vehicle.quantity > 0 ? `${vehicle.quantity} in stock` : 'Out of stock'}
        </p>
      </div>

      <div className="space-y-3">
        <button 
          onClick={() => onPurchase(vehicle.id)}
          disabled={vehicle.quantity <= 0}
          className="w-full bg-electric hover:bg-blue-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-medium py-2 rounded-lg transition shadow-lg shadow-blue-500/20"
        >
          {vehicle.quantity > 0 ? 'Purchase Vehicle' : 'Sold Out'}
        </button>

        {isAdmin && (
          <div className="flex gap-2 border-t border-slate-700 pt-3 mt-3">
            <button 
              onClick={() => onRestock && onRestock(vehicle.id, 5)}
              className="flex-1 bg-slate-700 hover:bg-slate-600 text-white font-medium py-2 rounded-lg transition"
            >
              Restock (+5)
            </button>
            <button 
              onClick={() => onDelete && onDelete(vehicle.id)}
              className="flex-1 bg-red-900/40 hover:bg-red-800 border border-red-800 text-red-200 font-medium py-2 rounded-lg transition"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
