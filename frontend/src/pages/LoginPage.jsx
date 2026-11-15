import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Compass, Mail, Lock, ArrowRight, AlertCircle } from 'lucide-react';
import { authService } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await authService.login({ email, password });
      const { token, user } = response.data;

      localStorage.setItem('bharat_token', token);
      localStorage.setItem('bharat_user', JSON.stringify(user));

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid email or password credentials');
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
          <h2 className="font-display text-2xl font-bold text-white">Sign In to Bharat Darshan</h2>
          <p className="text-xs text-slate-400 mt-1 font-light">Access your saved trips, itinerary snapshots, and booking enquiries</p>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="mb-6 p-3.5 rounded-2xl bg-midnight-950 border border-white/10 text-[11px] text-slate-300 space-y-1 font-mono">
          <div className="text-cyan-400 font-semibold uppercase tracking-wider text-[10px]">Demo Test Credentials:</div>
          <div>👤 <strong className="text-white">Traveller:</strong> aarav@example.com / Travel@123</div>
          <div>🛡️ <strong className="text-white">Admin:</strong> admin@bharatdarshan.com / Admin@123</div>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
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
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-midnight-950 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 font-medium transition-colors"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-luxury-cyan py-3.5 text-xs uppercase tracking-wider font-extrabold rounded-full flex items-center justify-center gap-2 mt-3 disabled:opacity-50 cursor-pointer shadow-cyan-glow"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don't have an account?{' '}
          <Link to="/register" className="text-cyan-400 font-semibold hover:underline">
            Register here
          </Link>
        </div>

      </div>
    </div>
  );
}
