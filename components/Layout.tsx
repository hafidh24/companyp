
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { getCompanyProfile } from '../services/companyService';
import { CompanyProfile } from '../types';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    setProfile(getCompanyProfile());
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${isScrolled ? 'py-4 glass-nav border-b border-slate-100/50 shadow-sm' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex justify-between items-center">
            <Link to="/" className="flex items-center gap-2 relative z-50">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-200">C</div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900">COMPANY<span className="text-blue-600">TEST</span></span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-semibold transition-all duration-300 hover:text-blue-600 relative group ${
                    location.pathname === link.path ? 'text-blue-600' : 'text-slate-500'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-300 ${location.pathname === link.path ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              ))}
              <Link to="/admin" className="px-6 py-3 rounded-2xl bg-slate-900 text-white text-sm font-bold hover:bg-blue-600 transition-all shadow-xl shadow-slate-200 active:scale-95">
                Admin Area
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden relative z-50 p-2 text-slate-900 focus:outline-none"
              aria-label="Toggle Menu"
            >
               <div className="w-6 h-5 relative flex flex-col justify-between">
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`w-full h-0.5 bg-current rounded-full transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
               </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[55] md:hidden transition-all duration-500 ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-white/90 backdrop-blur-2xl"></div>
        <div className="relative h-full flex flex-col justify-center px-10">
          <div className="space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-600 mb-8 animate-fade-in-up">Navigasi Utama</p>
            {NAV_LINKS.map((link, idx) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block text-4xl font-black tracking-tighter transition-all hover:text-blue-600 animate-fade-in-up ${
                  location.pathname === link.path ? 'text-blue-600 translate-x-4' : 'text-slate-900'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-10 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <Link 
                to="/admin" 
                className="inline-block px-10 py-5 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-slate-200"
              >
                Admin Area
              </Link>
            </div>
          </div>

          <div className="absolute bottom-12 left-10 right-10 flex justify-between items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
             <p className="text-xs font-bold text-slate-400">&copy; 2024 {profile?.name}</p>
             <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">IG</div>
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs">WA</div>
             </div>
          </div>
        </div>
      </div>

      <main className="flex-grow pt-20">{children}</main>

      <footer className="bg-white border-t border-slate-100 py-20 mt-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
                <span className="text-xl font-bold text-slate-900">{profile?.name || 'COMPANY TEST'}</span>
              </div>
              <p className="text-slate-500 leading-relaxed max-w-sm mb-8">
                {profile?.description || 'Membangun ekosistem teknologi masa depan melalui solusi inovatif.'}
              </p>
              <div className="flex gap-4">
                {profile?.instagram && (
                  <a href={profile.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-pink-600 hover:text-white transition-all cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.981 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.668-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                )}
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/></svg>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Layanan</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Digital Strategy</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">UI/UX Design</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">Cloud Solution</li>
                <li className="hover:text-blue-600 cursor-pointer transition-colors">AI Engineering</li>
              </ul>
            </div>
            <div>
              <h4 className="text-slate-900 font-bold mb-6 text-sm uppercase tracking-widest">Hubungi Kami</h4>
              <ul className="space-y-4 text-slate-500 text-sm">
                <li>{profile?.email}</li>
                <li>{profile?.phone}</li>
                <li>{profile?.address}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-50 mt-20 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 gap-4">
            <p>&copy; 2024 {profile?.name || 'Company Test'}. Crafted for excellence.</p>
            <div className="flex gap-8">
              <span className="hover:text-slate-900 cursor-pointer">Privacy</span>
              <span className="hover:text-slate-900 cursor-pointer">Security</span>
              <span className="hover:text-slate-900 cursor-pointer">Cookies</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
