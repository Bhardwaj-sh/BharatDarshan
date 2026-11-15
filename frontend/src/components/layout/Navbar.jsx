import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Compass, Menu, X, User, ShieldCheck, LogOut, ChevronRight } from 'lucide-react';

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

  // Update user state whenever route changes
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
    { name: 'Home', path: '/' },
    { name: 'Explore India', path: '/explore' },
    { name: 'Experiences', path: '/#categories' },
    { name: 'About', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 py-3 md:py-4">
      <div className="max-w-7xl mx-auto">
        <nav className={`flex items-center justify-between px-5 md:px-7 py-3 rounded-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-forest-950/90 backdrop-blur-md border border-white/10 shadow-card py-2.5' 
            : 'bg-forest-900/75 backdrop-blur-sm border border-white/10 shadow-soft'
        }`}>
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-full bg-gold-500/20 border border-gold-500/50 flex items-center justify-center text-gold-400 group-hover:scale-105 transition-transform">
              <Compass className="w-5 h-5 text-gold-400 animate-spin-slow" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg md:text-xl font-bold tracking-wide text-ivory-50 group-hover:text-gold-400 transition-colors">
                Bharat Darshan
              </span>
              <span className="text-[10px] tracking-widest uppercase text-gold-400/80 -mt-1 font-sans">
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
                  className={`text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive 
                      ? 'text-gold-400' 
                      : 'text-ivory-100/90 hover:text-gold-300'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500 rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {user.role === 'admin' ? (
                  <Link
                    to="/admin"
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-gold-400 bg-forest-800 border border-gold-500/40 px-3.5 py-2 rounded-full hover:bg-forest-700 transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-gold-400" />
                    <span>Admin Portal</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-1.5 text-xs font-bold text-ivory-100 hover:text-gold-300 bg-forest-800/80 border border-white/10 px-4 py-2 rounded-full transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-gold-400" />
                    <span>My Trips</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="p-2 text-ivory-300 hover:text-rose-400 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium text-ivory-100 hover:text-gold-300 px-4 py-2 rounded-full transition-colors"
              >
                Sign In
              </Link>
            )}
            
            <Link
              to="/explore"
              className="btn-gold text-xs uppercase tracking-wider py-2.5 px-5"
            >
              Explore 36 Regions
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ivory-100 hover:text-gold-400 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-4 top-20 bg-forest-950/95 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="flex items-center justify-between text-base font-medium text-ivory-100 hover:text-gold-400 py-2 border-b border-white/5"
              >
                <span>{link.name}</span>
                <ChevronRight className="w-4 h-4 text-gold-400/60" />
              </Link>
            ))}

            <div className="pt-2 flex flex-col gap-3">
              {user ? (
                <>
                  <Link
                    to={user.role === 'admin' ? '/admin' : '/dashboard'}
                    className="w-full text-center py-2.5 text-sm font-medium text-gold-400 border border-gold-500/40 rounded-full"
                  >
                    {user.role === 'admin' ? '🛡️ Admin Operations' : '👤 My Trips Dashboard'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 text-xs text-rose-400 hover:underline"
                  >
                    Sign Out ({user.name})
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="w-full text-center py-2.5 text-sm font-medium text-ivory-100 border border-white/10 rounded-full hover:bg-white/5"
                >
                  Sign In / Register
                </Link>
              )}

              <Link
                to="/explore"
                className="btn-gold w-full text-center text-xs uppercase tracking-wider py-3"
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
