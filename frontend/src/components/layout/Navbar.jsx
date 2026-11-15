import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ShieldCheck, LogOut, Search, ChevronRight } from 'lucide-react';

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
    { name: 'Destinations', path: '/#showcase' },
    { name: 'Experiences', path: '/#experiences' },
    { name: 'Interactive Map', path: '/#interactive-map' },
    { name: 'All 36 Regions', path: '/explore' },
    { name: 'About', path: '/about' },
  ];

  const userName = user?.name ? user.name.split(' ')[0] : 'Traveler';

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 ${
      isScrolled ? 'bg-midnight-950/80 backdrop-blur-md border-b border-white/10' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo with Electric Cyan Dot (Inspired by • MERIDIAN in reference) */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-cyan-glow group-hover:scale-125 transition-transform" />
          <span className="font-display text-lg sm:text-xl font-black tracking-widest text-white uppercase flex items-center gap-1.5">
            BHARAT DARSHAN
          </span>
        </Link>

        {/* Center Frosted Glass Navigation Pill (Reference Layout) */}
        <div className="hidden md:flex items-center gap-1 px-5 py-2 rounded-full bg-midnight-950/60 backdrop-blur-2xl border border-white/15 shadow-2xl">
          {navLinks.map((link) => {
            const isExact = location.pathname === link.path;
            return (
              <a
                key={link.name}
                href={link.path}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-full transition-all tracking-wide ${
                  isExact
                    ? 'text-cyan-400 bg-white/10'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Action Island */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/explore"
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 text-slate-200 hover:text-white transition-all cursor-pointer"
            title="Search Regions"
          >
            <Search className="w-4 h-4 text-cyan-400" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-cyan-300 text-xs font-bold border border-white/15 hover:border-cyan-400/50 transition-all shadow-sm"
              >
                {user.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" /> : <User className="w-3.5 h-3.5 text-cyan-400" />}
                <span>{userName}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-2 rounded-full text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-bold text-slate-300 hover:text-white px-3 py-1.5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/explore"
                className="btn-luxury-white text-xs py-2 px-4 shadow-sm"
              >
                <span>Explore Tour</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-midnight-950/80 text-slate-300 hover:text-white border border-white/15 cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
        </button>

      </div>

      {/* Mobile Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-midnight-950/95 backdrop-blur-2xl border border-white/15 p-6 shadow-2xl text-slate-100"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-4 py-3 rounded-2xl font-bold text-slate-200 hover:text-midnight-950 hover:bg-cyan-400 transition-all flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </a>
              ))}

              <div className="pt-4 mt-2 border-t border-white/10 flex flex-col gap-3">
                {user ? (
                  <>
                    <Link
                      to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-luxury-white w-full text-center text-xs"
                    >
                      {user.role === 'admin' ? 'Open Admin Panel' : 'My Trips Dashboard'}
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full py-2.5 rounded-full text-red-400 hover:bg-red-500/10 text-xs font-semibold cursor-pointer"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Link
                      to="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="w-full py-2.5 text-center text-xs font-bold text-slate-200 border border-white/20 rounded-full hover:border-cyan-400"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="btn-luxury-cyan w-full text-center text-xs"
                    >
                      Create Account
                    </Link>
                  </div>
                )}

                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-luxury-cyan w-full text-center text-xs uppercase tracking-wider py-3 font-bold"
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
