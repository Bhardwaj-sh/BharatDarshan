import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ShieldCheck, LogOut, Search, ChevronRight, Compass, Sparkles, MapPin } from 'lucide-react';

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
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] text-slate-900' 
        : 'bg-white/30 backdrop-blur-md border-b border-white/40 text-slate-900 shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Brand Logo matching reference: ▲ geometric symbol + name */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-slate-900 text-white font-black text-xs shadow-md group-hover:scale-105 transition-transform">
            <span>▲</span>
            <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-400 border border-white" />
          </div>
          <span className="font-display text-lg sm:text-xl font-extrabold tracking-tight text-slate-900">
            bharat<span className="font-light text-slate-600">darshan</span>
          </span>
        </Link>

        {/* Center Navigation Links (Matching reference "home service tour date") */}
        <div className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/70 backdrop-blur-lg border border-slate-200/80 shadow-sm">
          {navLinks.map((link) => {
            const isExact = location.pathname === link.path;
            return (
              <a
                key={link.name}
                href={link.path}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all tracking-wide ${
                  isExact
                    ? 'text-slate-900 bg-slate-100 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Action Island (Search + User) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/explore"
            className="p-2 rounded-full bg-white/80 hover:bg-slate-100 border border-slate-200 text-slate-700 hover:text-slate-900 transition-all cursor-pointer shadow-sm"
            title="Search Regions"
          >
            <Search className="w-4 h-4 text-slate-700" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 text-xs font-bold border border-slate-200 hover:bg-slate-200 transition-all shadow-sm"
              >
                {user.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> : <User className="w-3.5 h-3.5 text-slate-700" />}
                <span>{userName}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-1.5 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 px-3 py-1.5 transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/explore"
                className="btn-classy-dark text-xs py-2 px-4 shadow-sm"
              >
                <span>Explore</span>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full bg-white/80 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-sm cursor-pointer"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-white/95 backdrop-blur-2xl border border-slate-200 p-6 shadow-2xl text-slate-900"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-semibold text-slate-700 hover:text-slate-900 py-1.5 border-b border-slate-100"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-classy-dark text-xs py-2 px-4 w-full text-center"
                >
                  Explore All 36 Regions
                </Link>
                {user ? (
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="w-full py-2 text-center text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 text-center text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-xl"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
