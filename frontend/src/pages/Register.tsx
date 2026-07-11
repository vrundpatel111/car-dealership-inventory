import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await api.post('/auth/register', { name, email, password });
      navigate('/login');
    } catch (err: any) {
      setError(err.response?.data?.error?.message || 'Failed to register');
    }
  };

  return (
    <div className="min-h-[calc(100vh-73px)] flex items-center justify-center p-4">
      <div className="glass-card w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Create Account</h2>
        {error && <div className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-2 rounded mb-6 text-sm">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-400 mb-1 text-sm">Full Name</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition"
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1 text-sm">Email</label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition"
              required
            />
          </div>
          <div>
            <label className="block text-slate-400 mb-1 text-sm">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              minLength={6}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-electric transition"
              required
            />
          </div>
          <button type="submit" className="w-full bg-electric hover:bg-blue-600 text-white font-medium py-2 rounded-lg transition shadow-lg shadow-blue-500/30 mt-4">
            Register
          </button>
        </form>
        <p className="text-slate-400 text-center mt-6 text-sm">
          Already have an account? <Link to="/login" className="text-electric hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};
