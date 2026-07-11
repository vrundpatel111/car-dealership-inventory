import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Car } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-slate-850 border-b border-slate-700 px-6 py-4 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-electric flex items-center gap-2">
          <Car size={24} />
          AutoInventory
        </Link>
        <div className="flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/" className="text-slate-300 hover:text-white transition">Dashboard</Link>
              {isAdmin && (
                <Link to="/admin" className="text-emerald hover:text-white transition">Admin Panel</Link>
              )}
              <div className="flex items-center gap-4 ml-4 pl-4 border-l border-slate-700">
                <span className="text-sm text-slate-400">Hi, {user?.name}</span>
                <button 
                  onClick={handleLogout}
                  className="text-slate-400 hover:text-red-400 transition flex items-center gap-1"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-slate-300 hover:text-white transition">Login</Link>
              <Link to="/register" className="bg-electric hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-blue-500/30">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
