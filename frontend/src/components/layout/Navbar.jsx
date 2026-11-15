import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, User, ShieldCheck, LogOut, ChevronRight, Sparkles, MapPin } from 'lucide-react';

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
        <nav className={`flex items-center justify-between px-6 py-3 rounded-2xl transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-xl border border-slate-200/80 shadow-card py-2.5' 
            : 'bg-white/80 backdrop-blur-md border border-white/60 shadow-soft'
        }`}>
          
          {/* Logo with Vibrant Radiant Gradient */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-saffron-500 to-amber-400 flex items-center justify-center text-white shadow-glow-saffron group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-extrabold tracking-tight text-slate-950 flex items-center gap-1.5">
                Bharat Darshan
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-saffron-500" />
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-saffron-600 -mt-0.5">
                Incredible India
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-semibold transition-all relative py-1 ${
                    isActive 
                      ? 'text-saffron-600' 
                      : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-saffron-500 to-amber-500 rounded-full" />
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
                    className="flex items-center gap-1.5 text-xs font-bold text-white bg-midnight-950 px-4 py-2 rounded-xl shadow-md hover:bg-midnight-800 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-saffron-400" />
                    <span>Admin Console</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 text-xs font-bold text-slate-800 bg-slate-100 border border-slate-200/80 px-4 py-2 rounded-xl hover:bg-slate-200 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-saffron-600" />
                    <span>My Trips</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-bold text-slate-700 hover:text-slate-950 px-4 py-2 transition-colors"
              >
                Sign In
              </Link>
            )}

            <Link
              to="/explore"
              className="btn-gradient text-xs uppercase tracking-wider py-2.5 px-5 shadow-glow-saffron"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Explore 36 Regions</span>
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-saffron-600 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-white/95 backdrop-blur-2xl border border-slate-200 rounded-3xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center justify-between text-base font-bold text-slate-800 hover:text-saffron-600 py-2 border-b border-slate-100"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </Link>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="w-full text-center py-2.5 text-sm font-bold text-slate-900 bg-slate-100 rounded-2xl"
                  >
                    {user.role === 'admin' ? '🛡️ Admin Console' : '👤 My Trips Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 text-xs font-semibold text-rose-500 hover:underline"
                  >
                    Sign Out ({user.name})
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 text-sm font-bold text-slate-700 border border-slate-200 rounded-2xl"
                >
                  Sign In / Register
                </Link>
              )}

              <Link
                to="/explore"
                className="btn-gradient w-full text-center text-xs uppercase tracking-wider py-3"
              >
                Explore All 36 Regions
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
