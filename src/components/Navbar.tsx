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
    { name: 'My Plans', href: '/plans', authOnly: true },
    { name: 'Discord', href: 'https://discord.gg/nikacloud', external: true },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between h-24 items-center">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-orange-500/20">
              <Terminal className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">Nika<span className="text-orange-500">Cloud</span></span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => {
              if (link.authOnly && !user) return null;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-orange-500 transition-colors"
                >
                  {link.name}
                </a>
              );
            })}
            
            {user ? (
              <div className="flex items-center gap-8">
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all"
                >
                  <LayoutDashboard className="w-4 h-4 text-orange-500" />
                  {isAdmin ? "Admin" : "Terminal"}
                </Link>
                <button 
                  onClick={() => logout()} 
                  className="text-gray-500 hover:text-red-500 transition-colors"
                  title="Terminate Session"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20"
              >
                <LogIn className="w-4 h-4" />
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
            className="md:hidden bg-black border-b border-white/10 overflow-hidden"
          >
            <div className="px-6 pt-4 pb-12 space-y-6">
              {navLinks.map((link) => {
                if (link.authOnly && !user) return null;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 hover:text-orange-500"
                  >
                    {link.name}
                  </a>
                );
              })}
              <div className="pt-6 border-t border-white/10">
                {user ? (
                  <div className="space-y-4">
                    <Link
                      to={isAdmin ? "/admin" : "/dashboard"}
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-[10px] font-bold uppercase tracking-widest"
                    >
                      <LayoutDashboard className="w-4 h-4 text-orange-500" />
                      {isAdmin ? "Admin Portal" : "Terminal"}
                    </Link>
                    <button
                      onClick={() => { logout(); setIsOpen(false); }}
                      className="flex items-center justify-center gap-3 w-full py-4 border border-red-500/30 rounded-2xl text-red-500 text-[10px] font-bold uppercase tracking-widest"
                    >
                      <LogOut className="w-4 h-4" />
                      Terminate
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-3 w-full py-4 bg-orange-500 text-white rounded-2xl text-[10px] font-bold uppercase tracking-widest"
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
