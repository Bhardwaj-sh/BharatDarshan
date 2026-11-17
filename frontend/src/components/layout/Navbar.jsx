import React, { useState, useSyncExternalStore, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ShieldCheck, LogOut, Search } from 'lucide-react';

const subscribeStorage = (callback) => {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
};

const getStorageUser = () => localStorage.getItem('bharat_user');

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const userJson = useSyncExternalStore(subscribeStorage, getStorageUser, () => null);
  const user = useMemo(() => {
    try {
      return JSON.parse(userJson || 'null');
    } catch {
      return null;
    }
  }, [userJson]);

  const [prevPath, setPrevPath] = useState(location.pathname);
  if (prevPath !== location.pathname) {
    setPrevPath(location.pathname);
    setMobileMenuOpen(false);
  }

  const handleLogout = () => {
    try {
      localStorage.removeItem('bharat_token');
      localStorage.removeItem('bharat_user');
      window.dispatchEvent(new Event('storage'));
    } catch { }
    navigate('/');
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Experiences', path: '/#experiences' },
    { name: 'Interactive Map', path: '/#interactive-map' },
    { name: 'All 36 Regions', path: '/explore' },
    { name: 'About', path: '/about' },
  ];

  const userName = user?.name ? user.name.split(' ')[0] : 'Traveler';

  return (
    <header className="absolute top-0 left-0 right-0 z-40 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-transparent text-white pointer-events-auto">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Logo matching user's uploaded logo (Pin with Taj Mahal & Airplane + BharatDarshan) */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/images/bharat_darshan_logo.png" 
            alt="BharatDarshan - Explore the Soul of India" 
            className="h-11 sm:h-13 md:h-15 lg:h-16 w-auto object-contain drop-shadow-[0_3px_14px_rgba(0,0,0,0.5)] group-hover:scale-105 transition-transform" 
          />
        </Link>

        {/* Center Navigation Links (Matching reference frosted glass capsule) */}
        <div className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/25 shadow-[0_8px_32px_rgba(0,0,0,0.15)] text-white">
          {navLinks.map((link) => {
            const isExact = link.path === '/'
              ? (location.pathname === '/' && !location.hash)
              : (location.pathname === link.path || (link.path.startsWith('/#') && location.pathname === '/' && location.hash === link.path.replace('/', '')));

            return (
              <a
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  if (link.path === '/') {
                    if (location.pathname === '/') {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  } else if (link.path.startsWith('/#') && location.pathname === '/') {
                    e.preventDefault();
                    const targetId = link.path.replace('/#', '');
                    const el = document.getElementById(targetId);
                    if (el) {
                      el.scrollIntoView({ behavior: 'smooth' });
                    }
                  }
                }}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-full transition-all tracking-wide ${
                  isExact
                    ? 'text-white bg-white/25 font-bold shadow-sm'
                    : 'text-white/85 hover:text-white hover:bg-white/15'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </div>

        {/* Right Action Island (Search + User / Book Now Pill) */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/explore"
            className="p-2 rounded-full bg-white/15 hover:bg-white/25 border border-white/25 text-white transition-all cursor-pointer shadow-sm"
            title="Search Regions"
          >
            <Search className="w-4 h-4 text-white" />
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold border border-white/30 hover:bg-white/30 transition-all shadow-sm"
              >
                {user.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5 text-amber-400" /> : <User className="w-3.5 h-3.5 text-white" />}
                <span>{userName}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Sign Out"
                className="p-1.5 rounded-full text-white/60 hover:text-red-400 hover:bg-white/10 transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="text-xs font-semibold px-3 py-1.5 text-white/90 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <a
                href="#interactive-map"
                className="text-xs py-2 px-5 rounded-full font-bold bg-[#1a2e4c] hover:bg-[#14233a] text-white border border-white/20 shadow-md hover:scale-105 transition-all cursor-pointer shadow-[0_4px_16px_rgba(0,0,0,0.25)]"
              >
                <span>Book Now</span>
              </a>
            </div>
          )}
        </div>

        {/* Mobile Menu Hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-full shadow-sm cursor-pointer transition-colors bg-white/20 text-white border border-white/30"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden mt-3 max-w-7xl mx-auto rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-white/20 p-6 shadow-2xl text-white"
          >
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (link.path === '/') {
                      if (location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    } else if (link.path.startsWith('/#') && location.pathname === '/') {
                      e.preventDefault();
                      const targetId = link.path.replace('/#', '');
                      const el = document.getElementById(targetId);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }
                  }}
                  className="text-sm font-semibold text-white/90 hover:text-white py-1.5 border-b border-white/10"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 flex flex-col gap-2">
                <Link
                  to="/explore"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center text-xs font-bold rounded-full bg-white text-slate-900 shadow-md"
                >
                  Explore All 36 Regions
                </Link>
                {user ? (
                  <button
                    onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                    className="w-full py-2 text-center text-xs font-semibold text-red-400 hover:bg-white/10 rounded-xl"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-2 text-center text-xs font-semibold text-white/80 hover:bg-white/10 rounded-xl"
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
