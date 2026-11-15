import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, User, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { authService } from '../services/api';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await authService.register({ name, email, password });
      const { token, user } = response.data;

      localStorage.setItem('bharat_token', token);
      localStorage.setItem('bharat_user', JSON.stringify(user));

      navigate('/dashboard');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Registration failed. Please check your details.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-midnight-950 px-4 text-slate-100">
      <div className="w-full max-w-md bg-midnight-900/90 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-cyan-500/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mx-auto mb-4 shadow-cyan-glow">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-display text-2xl font-bold text-white">Join Bharat Darshan</h2>
          <p className="text-xs text-slate-400 mt-1 font-light">Create an account to submit tour enquiries and track your journeys</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5 font-mono">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-midnight-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-medium transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5 font-mono">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-midnight-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-medium transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-slate-300 font-semibold mb-1.5 font-mono">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-cyan-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-midnight-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-medium transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-luxury-cyan py-3.5 text-xs uppercase tracking-wider font-extrabold rounded-full flex items-center justify-center gap-2 mt-3 disabled:opacity-50 cursor-pointer shadow-cyan-glow"
          >
            <span>{loading ? 'Creating Account...' : 'Register as Traveller'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
            Sign In here
          </Link>
        </div>

      </div>
    </div>
  );
}
