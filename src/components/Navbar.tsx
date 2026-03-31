import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutDashboard, Menu, X, LogOut, Terminal, LogIn } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const isAuthPage = location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/claim-free-server';

  if (isAuthPage) return null;

  const navLinks = [
    { name: 'Infrastructure', href: '/#features' },
    { name: 'Nodes', href: '/#plans' },
    { name: 'Billing', href: '/billing' },
    { name: 'Discord', href: 'https://discord.gg/nikacloud', external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-brand-darker/80 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-brand-accent flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
              <Terminal className="w-6 h-6 text-brand-darker" />
            </div>
            <span className="text-xl font-bold text-white tracking-tighter uppercase">Nika<span className="text-brand-accent">Cloud</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              link.external ? (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </a>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-brand-accent transition-colors"
                >
                  {link.name}
                </a>
              )
            ))}
            
            {user ? (
              <div className="flex items-center gap-6">
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 px-5 py-2 border border-brand-accent text-brand-accent text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-brand-accent hover:text-brand-darker transition-all"
                >
                  <LayoutDashboard className="w-3 h-3" />
                  {isAdmin ? "Admin" : "Terminal"}
                </Link>
                <button 
                  onClick={() => logout()} 
                  className="text-slate-400 hover:text-brand-accent transition-colors"
                  title="Terminate Session"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-2 px-5 py-2 bg-brand-accent text-brand-darker text-[10px] font-mono font-bold uppercase tracking-widest hover:bg-white transition-all"
              >
                <LogIn className="w-3 h-3" />
                Authorize
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-400 hover:text-white transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-brand-dark border-b border-brand-border overflow-hidden"
          >
            <div className="px-4 pt-4 pb-8 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-xs font-mono font-bold uppercase tracking-widest text-slate-400 hover:text-brand-accent"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-4 border-t border-brand-border">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      to={isAdmin ? "/admin" : "/dashboard"}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-2 w-full py-3 border border-brand-accent text-brand-accent text-xs font-mono font-bold uppercase tracking-widest"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      {isAdmin ? "Admin Portal" : "Terminal"}
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex items-center justify-center gap-2 w-full py-3 border border-red-500/50 text-red-500 text-xs font-mono font-bold uppercase tracking-widest"
                    >
                      <LogOut className="w-4 h-4" />
                      Terminate
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 bg-brand-accent text-brand-darker text-xs font-mono font-bold uppercase tracking-widest"
                  >
                    <LogIn className="w-4 h-4" />
                    Authorize
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
