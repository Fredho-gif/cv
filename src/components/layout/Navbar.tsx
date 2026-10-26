import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText, ChevronRight } from 'lucide-react';
import { cn } from '../../utils/cn';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const isLanding = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <>
      <nav
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled || !isLanding
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-md group-hover:shadow-indigo-500/40 transition-shadow">
                <FileText className="w-4 h-4 text-white" />
              </div>
              <span
                className={cn(
                  'text-xl font-bold font-poppins tracking-tight transition-colors',
                  scrolled || !isLanding ? 'text-slate-900' : 'text-slate-900'
                )}
              >
                Profil<span className="gradient-text">ick</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <NavLink to="/#how-it-works" scrolled={scrolled || !isLanding}>
                How it works
              </NavLink>
              <NavLink to="/#templates" scrolled={scrolled || !isLanding}>
                Templates
              </NavLink>
              <NavLink to="/#pricing" scrolled={scrolled || !isLanding}>
                Templates
              </NavLink>
            </div>

            {/* CTA */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                to="/builder"
                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-4 py-2"
              >
                Create CV
              </Link>
              <Link
                to="/builder"
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white text-sm font-semibold shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:-translate-y-0.5 transition-all duration-200"
              >
                Create CV Free
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-100 shadow-xl px-4 py-6 space-y-4">
            <Link
              to="/#how-it-works"
              className="block py-2 text-slate-700 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              How it works
            </Link>
            <Link
              to="/#templates"
              className="block py-2 text-slate-700 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Templates
            </Link>
            <Link
              to="/#pricing"
              className="block py-2 text-slate-700 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              Templates
            </Link>
            <div className="pt-2 border-t border-slate-100">
              <Link
                to="/builder"
                className="block w-full text-center px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-600 text-white font-semibold shadow-lg"
                onClick={() => setMobileOpen(false)}
              >
                Create CV Free
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavLink({
  to,
  children,
  scrolled,
}: {
  to: string;
  children: React.ReactNode;
  scrolled: boolean;
}) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const hash = to.split('#')[1];
    if (hash) {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <a
      href={to}
      onClick={handleClick}
      className={cn(
        'text-sm font-medium transition-colors hover:text-indigo-600',
        scrolled ? 'text-slate-600' : 'text-slate-700'
      )}
    >
      {children}
    </a>
  );
}
