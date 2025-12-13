import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { label: 'Accueil', path: '/' },
    { label: 'Flotte', path: '/fleet' },
    { label: 'Contact', path: '/contact' },
  ];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-6 px-4">
      <nav className="glass-nav rounded-full px-6 py-3 flex items-center justify-between gap-8 shadow-glass w-full max-w-5xl transition-all duration-300 relative">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex items-center justify-center size-10 rounded-full bg-black text-primary transition-colors border border-primary/20">
            <span className="material-symbols-outlined text-2xl">directions_car</span>
          </div>
          <div className="flex flex-col justify-center">
            <h2 className="text-xl font-display font-black tracking-tight text-black leading-none">AUSFOUR</h2>
            <span className="text-[0.55rem] font-bold text-primary uppercase tracking-[0.15em] leading-none mt-0.5">Location de Voiture</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`text-sm font-medium transition-colors relative group ${
                isActive(link.path) ? 'text-primary' : 'text-text-main hover:text-primary'
              }`}
            >
              {link.label}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
              }`}></span>
            </Link>
          ))}
        </div>

        {/* Action Button & Mobile Toggle */}
        <div className="flex items-center gap-3">
            <Link to="/fleet" className="hidden sm:flex btn-gold-gradient rounded-full px-6 py-2.5 text-sm font-bold text-white shadow-sm items-center gap-2">
            <span>Réserver</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </Link>
            
            <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden flex items-center justify-center size-10 rounded-full bg-gray-100 hover:bg-gray-200 text-text-main transition-colors"
            >
                <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
            </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
            <div className="absolute top-full left-0 right-0 mt-4 p-4 glass-nav rounded-3xl flex flex-col gap-4 shadow-xl md:hidden">
                 {navLinks.map((link) => (
                    <Link
                    key={link.label}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`text-base font-bold text-center py-2 ${
                        isActive(link.path) ? 'text-primary' : 'text-text-main'
                    }`}
                    >
                    {link.label}
                    </Link>
                ))}
                 <Link 
                    to="/fleet" 
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-gold-gradient rounded-xl px-6 py-3 text-sm font-bold text-white shadow-sm flex items-center justify-center gap-2"
                >
                    <span>Réserver</span>
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
            </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;