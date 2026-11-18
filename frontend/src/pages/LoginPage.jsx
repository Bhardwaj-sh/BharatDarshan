import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, AlertCircle, Eye, EyeOff, ShieldCheck, Sparkles } from 'lucide-react';
import { authService } from '../services/api';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const response = await authService.login({ email: email.trim(), password });
      const { token, user } = response.data;

      localStorage.setItem('bharat_token', token);
      localStorage.setItem('bharat_user', JSON.stringify(user));
      window.dispatchEvent(new Event('storage'));

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Invalid email or password credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center relative overflow-hidden bg-[#05070F] text-slate-100 px-4">
      
      {/* Background Architectural Scenery with Cinematic Dark Gradients */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 filter blur-[2px] scale-105 pointer-events-none"
        style={{ backgroundImage: `url('/images/sceneries/amber-fort.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#05070F] via-[#05070F]/85 to-[#05070F]/70 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-amber-500/10 blur-[140px] pointer-events-none rounded-full" />

      {/* Main Luxury Authentication Card */}
      <div className="relative z-10 w-full max-w-md">
        
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link to="/" className="inline-block group mb-3">
            <img 
              src="/images/bharat_darshan_logo.png" 
              alt="Bharat Darshan - Explore the Soul of India" 
              className="h-16 w-auto mx-auto object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)] group-hover:scale-105 transition-transform duration-300" 
            />
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/25 text-amber-300 text-[11px] font-mono uppercase tracking-wider mb-2">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span>Discover Incredible India</span>
          </div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sign In to Your Account
          </h1>
          <p className="text-xs text-slate-400 mt-1.5 font-normal max-w-sm mx-auto">
            Access your curated itineraries, custom tour estimates, and confirmed bookings across India's 36 regions.
          </p>
        </div>

        {/* Card Box */}
        <div className="bg-slate-900/85 backdrop-blur-2xl border border-white/15 p-7 sm:p-9 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
          
          {errorMsg && (
            <div className="mb-5 p-3.5 rounded-2xl bg-rose-500/15 border border-rose-500/35 text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-400" />
              <span className="font-medium leading-relaxed">{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            
            {/* Email Field */}
            <div>
              <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1.5 font-mono">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-amber-400/80 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/50 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-medium transition-all"
                  autoComplete="email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold font-mono">
                  Password
                </label>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-amber-400/80 absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-11 py-3 rounded-2xl bg-black/50 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/20 font-medium transition-all"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors cursor-pointer"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Action */}
            <button
              type="submit"
              disabled={loading}
              className="w-full btn-luxury-gold py-3.5 text-xs uppercase tracking-wider font-extrabold rounded-full flex items-center justify-center gap-2 mt-4 disabled:opacity-50 cursor-pointer shadow-gold-glow transition-all active:scale-[0.99]"
            >
              <span>{loading ? 'Authenticating...' : 'Sign In to Bharat Darshan'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Navigation to Register */}
          <div className="mt-6 pt-5 border-t border-white/10 text-center text-xs text-slate-400">
            <span>Don't have an account yet?</span>{' '}
            <Link to="/register" className="text-amber-400 font-bold hover:text-amber-300 transition-colors hover:underline">
              Create an account
            </Link>
          </div>

        </div>

        {/* Security Assurance Footer */}
        <div className="mt-5 flex items-center justify-center gap-2 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Encrypted Session · Official Bharat Darshan Platform</span>
        </div>

      </div>

    </div>
  );
}
