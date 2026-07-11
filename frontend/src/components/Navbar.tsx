import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { LogOut, Car, LayoutDashboard, ShieldCheck } from 'lucide-react';

export const Navbar = () => {
  const { isAuthenticated, isAdmin, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 py-3.5 flex justify-between items-center">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary-600 p-1.5 rounded-lg">
            <Car size={18} className="text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">
            Auto<span className="text-primary-600">Inventory</span>
          </span>
        </Link>

        {/* Nav */}
        <div className="flex items-center gap-1">
          {isAuthenticated ? (
            <>
              <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition">
                <LayoutDashboard size={15} />
                Dashboard
              </Link>
              {isAdmin && (
                <Link to="/admin" className="flex items-center gap-1.5 text-sm text-primary-600 hover:text-primary-700 hover:bg-primary-50 px-3 py-2 rounded-lg transition font-medium">
                  <ShieldCheck size={15} />
                  Admin
                </Link>
              )}
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-slate-200">
                <span className="text-xs text-slate-500">Hi, <b className="text-slate-700">{user?.name}</b></span>
                <button onClick={handleLogout} className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-danger hover:bg-red-50 px-3 py-2 rounded-lg transition">
                  <LogOut size={14} />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded-lg transition">
                Sign In
              </Link>
              <Link to="/register" className="btn-primary ml-1">
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
