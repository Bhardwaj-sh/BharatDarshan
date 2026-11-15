import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, Menu, X, User, ShieldCheck, LogOut, Sparkles, MapPin, Search } from 'lucide-react';

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
    try {
      localStorage.removeItem('bharat_token');
      localStorage.removeItem('bharat_user');
    } catch {}
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'Discover', path: '/' },
    { name: '36 Regions', path: '/explore' },
    { name: 'Experiences', path: '/#themes' },
    { name: 'FAQ', path: '/#faq' },
    { name: 'About', path: '/about' },
  ];

  const userName = user?.name ? user.name.split(' ')[0] : 'Traveler';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3.5">
      <div className="max-w-7xl mx-auto">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300 ${
            isScrolled 
              ? 'bg-forest-900/90 backdrop-blur-2xl border border-forest-750 shadow-2xl py-2.5' 
              : 'bg-forest-900/70 backdrop-blur-xl border border-white/10 shadow-lg'
          }`}
        >
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 180, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="w-10 h-10 rounded-full bg-forest-800 border border-lime-400/40 flex items-center justify-center text-lime-400 shadow-lime-glow"
            >
              <Compass className="w-5 h-5 text-lime-400" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-black tracking-tight text-white flex items-center gap-1.5">
                Bharat Darshan
                <span className="inline-block w-2 h-2 rounded-full bg-lime-400 animate-pulse" />
              </span>
              <span className="text-[10px] tracking-widest uppercase font-bold text-lime-400 -mt-0.5">
                Discover India
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-all relative py-1 ${
                    isActive 
                      ? 'text-lime-400 font-bold' 
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-lime-400 rounded-full shadow-lime-glow"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right Action Island */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' ? (
                  <Link
                    to="/admin/dashboard"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-forest-800 text-lime-400 text-xs font-bold border border-lime-400/40 hover:bg-forest-750 transition-all shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-lime-400" />
                    Admin Panel
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-forest-800 text-emerald-200 text-xs font-bold border border-forest-700 hover:border-lime-400/50 transition-all"
                  >
                    <User className="w-4 h-4 text-lime-400" />
                    {userName}'s Trips
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Sign Out"
                  className="p-2 rounded-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  to="/login"
                  className="text-sm font-bold text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
                >
                  Log In
                </Link>
                <Link
                  to="/explore"
                  className="btn-lime-sm group"
                >
                  <span>Book Tour</span>
                  <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full bg-forest-800 text-slate-300 hover:text-white border border-forest-700 cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-lime-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </motion.nav>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-forest-900/95 backdrop-blur-2xl border border-forest-750 p-6 shadow-2xl text-slate-100"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl font-bold text-slate-200 hover:text-forest-950 hover:bg-lime-400 transition-all"
                >
                  {link.name}
                </Link>
              ))}

              <div className="pt-4 mt-2 border-t border-forest-750 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-lime w-full text-center"
                    >
                      {user.role === 'admin' ? 'Open Admin Panel' : 'My Travel Bookings'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 rounded-full text-red-400 hover:bg-red-500/10 text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Log Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-3 text-center text-sm font-bold text-slate-200 border border-forest-750 rounded-full hover:border-lime-400"
                    >
                      Log In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-lime w-full text-center"
                    >
                      Get Started Free
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
