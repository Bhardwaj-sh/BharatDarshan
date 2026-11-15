import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, User, ShieldCheck, LogOut, ChevronRight, Sparkles } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const syncUser = () => {
    try {
      const saved = JSON.parse(localStorage.getItem('bharat_user') || 'null');
      setUser(saved);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    syncUser();
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    syncUser();
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('bharat_token');
    localStorage.removeItem('bharat_user');
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: 'All 36 Regions', path: '/explore' },
    { name: 'Themes', path: '/#categories' },
    { name: 'Our Vision', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
            isScrolled 
              ? 'bg-[#05070F]/90 backdrop-blur-2xl border border-white/15 shadow-[0_10px_35px_rgba(0,0,0,0.8)] py-2.5' 
              : 'bg-[#070A14]/75 backdrop-blur-xl border border-white/10 shadow-lg'
          }`}
        >
          {/* Logo with Radiant Gradient Icon */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.8, ease: 'easeInOut' }}
              className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-rose-500 flex items-center justify-center text-white shadow-[0_0_20px_rgba(245,158,11,0.5)]"
            >
              <Compass className="w-5 h-5 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-white flex items-center gap-1.5">
                Bharat Darshan
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-amber-400 -mt-0.5">
                Incredible India
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-all relative py-1 ${
                    isActive 
                      ? 'text-amber-400' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full shadow-[0_0_8px_#F59E0B]"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Controls */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-slate-900 border border-amber-500/40 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:bg-slate-800 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                    <span>Admin Console</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-xs font-bold text-white bg-slate-900 border border-white/10 px-4 py-2 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>My Trips</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-bold text-slate-300 hover:text-white px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
            )}

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/explore"
                className="btn-gradient text-xs uppercase tracking-wider py-2.5 px-5 shadow-[0_0_20px_rgba(245,158,11,0.5)]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explore 36 Regions</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-amber-400 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-4 top-20 bg-[#070A14]/95 backdrop-blur-2xl border border-white/15 rounded-3xl p-6 shadow-2xl z-50 text-white"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className="flex items-center justify-between text-base font-bold text-slate-200 hover:text-amber-400 py-2 border-b border-white/5"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </Link>
              ))}

              <div className="pt-2 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to={user.role === 'admin' ? '/admin' : '/dashboard'}
                      className="w-full text-center py-2.5 text-sm font-bold text-amber-400 bg-slate-900 border border-amber-500/40 rounded-2xl"
                    >
                      {user.role === 'admin' ? '🛡️ Admin Console' : '👤 My Trips Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-center py-2 text-xs font-semibold text-rose-400 hover:underline"
                    >
                      Sign Out ({user.name})
                    </button>
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="w-full text-center py-2.5 text-sm font-bold text-slate-300 border border-white/10 rounded-2xl"
                  >
                    Sign In / Register
                  </Link>
                )}

                <Link
                  to="/explore"
                  className="btn-gradient w-full text-center text-xs uppercase tracking-wider py-3 font-bold"
                >
                  Explore All 36 Regions
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
