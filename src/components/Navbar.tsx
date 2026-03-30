import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { Cloud, LayoutDashboard, Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, logout } = useAuth();
  const isAuthPage = location.pathname.startsWith('/admin') || location.pathname === '/login' || location.pathname === '/claim-free-server';

  if (isAuthPage) return null; // Admin has its own sidebar/nav

  return (
    <nav className="fixed w-full z-50 top-0 transition-all duration-300 glass-panel border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center gap-3 group">
            {/* Logo */}
            <img src="/logo.png" alt="NikaCloud Logo" className="w-12 h-12 object-contain" onError={(e) => (e.currentTarget.style.display = 'none')} />
            <span className="font-display font-bold text-3xl tracking-tighter text-white">
              Nika<span className="text-fiery-gradient">Cloud</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Features</a>
            <a href="#minecraft" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Minecraft</a>
            <a href="#vps" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">VPS</a>
            <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-300 hover:text-white transition-colors">Discord</a>
            
            {user ? (
              <div className="flex items-center gap-4">
                {isAdmin ? (
                  <Link to="/admin">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-fiery-gradient hover:opacity-90 text-white text-sm font-medium transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Admin Portal
                    </motion.button>
                  </Link>
                ) : (
                  <Link to="/dashboard">
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-fiery-gradient hover:opacity-90 text-white text-sm font-medium transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </motion.button>
                  </Link>
                )}
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full object-cover border border-white/10" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-fiery-gradient flex items-center justify-center text-white font-bold">
                    {user?.displayName?.charAt(0) || user?.email?.charAt(0) || 'U'}
                  </div>
                )}
                <button onClick={() => logout()} className="text-gray-300 hover:text-white transition-colors">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-fiery-gradient hover:opacity-90 text-white text-sm font-medium transition-colors"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Client Area
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-panel border-t border-white/10"
        >
          <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
            <a href="#features" onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">Features</a>
            <a href="#minecraft" onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">Minecraft</a>
            <a href="#vps" onClick={() => setIsOpen(false)} className="text-base font-medium text-gray-300 hover:text-white">VPS</a>
            <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="text-base font-medium text-gray-300 hover:text-white">Discord</a>
            
            {user ? (
              <>
                {isAdmin ? (
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-fiery-gradient hover:opacity-90 text-white font-medium">
                    <LayoutDashboard className="w-5 h-5" />
                    Admin Portal
                  </Link>
                ) : (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-fiery-gradient hover:opacity-90 text-white font-medium">
                    <LayoutDashboard className="w-5 h-5" />
                    Dashboard
                  </Link>
                )}
                <button onClick={() => { logout(); setIsOpen(false); }} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 font-medium">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-fiery-gradient hover:opacity-90 text-white font-medium">
                <LayoutDashboard className="w-5 h-5" />
                Client Area
              </Link>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
}
