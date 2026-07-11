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
  const inStock = vehicle.quantity > 0;

  return (
    <div className="card p-6 flex flex-col justify-between">
      {/* Top */}
      <div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900">{vehicle.make} {vehicle.model}</h3>
            <span className="badge mt-1">{vehicle.category}</span>
          </div>
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
            inStock
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-600 border border-red-200'
          }`}>
            {inStock ? `${vehicle.quantity} in stock` : 'Out of stock'}
          </span>
        </div>

        <p className="text-2xl font-extrabold text-primary-600 mt-4 mb-1">
          ${vehicle.price.toLocaleString()}
        </p>
        <p className="text-xs text-slate-400 mb-5">Manufacturer's Suggested Price</p>
      </div>

      {/* Actions */}
      <div className="space-y-2 pt-4 border-t border-slate-100">
        <button
          onClick={() => onPurchase(vehicle.id)}
          disabled={!inStock}
          className="btn-primary w-full py-2.5"
        >
          {inStock ? 'Purchase Vehicle' : 'Sold Out'}
        </button>

        {isAdmin && (
          <div className="flex gap-2 pt-1">
            <button
              onClick={() => onRestock && onRestock(vehicle.id, 5)}
              className="btn-ghost flex-1"
            >
              + Restock
            </button>
            <button
              onClick={() => onDelete && onDelete(vehicle.id)}
              className="btn-danger flex-1"
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
