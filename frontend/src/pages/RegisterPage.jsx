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
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center bg-forest-950 px-4">
      <div className="w-full max-w-md bg-forest-900/90 backdrop-blur-md border border-white/10 p-8 rounded-3xl shadow-2xl text-ivory-100">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 mx-auto mb-4">
            <Compass className="w-6 h-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">Join Bharat Darshan</h2>
          <p className="text-xs text-ivory-300 mt-1">Create an account to submit tour enquiries and track your journeys</p>
        </div>

        {errorMsg && (
          <div className="mb-4 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="block text-xs uppercase tracking-wider text-ivory-300 font-semibold mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Aarav Sharma"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-950 border border-white/10 text-xs text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ivory-300 font-semibold mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aarav@example.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-950 border border-white/10 text-xs text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-wider text-ivory-300 font-semibold mb-1.5">
              Create Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-gold-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-forest-950 border border-white/10 text-xs text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold-500"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full btn-gold py-3 text-xs uppercase tracking-wider font-semibold rounded-xl flex items-center justify-center gap-2 mt-2 disabled:opacity-50"
          >
            <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-ivory-300">
          Already have an account?{' '}
          <Link to="/login" className="text-gold-400 font-semibold hover:underline">
            Sign in
          </Link>
        </div>

      </div>
    </div>
  );
}
