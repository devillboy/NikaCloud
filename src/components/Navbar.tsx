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
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple p-0.5">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-blue to-brand-purple blur-md opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative w-full h-full bg-brand-darker rounded-lg flex items-center justify-center">
                <Cloud className="w-5 h-5 text-white" />
              </div>
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-white">
              Nika<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Cloud</span>
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white text-sm font-medium transition-colors"
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
                      className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white text-sm font-medium transition-colors"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </motion.button>
                  </Link>
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
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-blue hover:bg-blue-600 text-white text-sm font-medium transition-colors"
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
                  <Link to="/admin" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-medium">
                    <LayoutDashboard className="w-5 h-5" />
                    Admin Portal
                  </Link>
                ) : (
                  <Link to="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-medium">
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
              <Link to="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-blue hover:bg-blue-600 text-white font-medium">
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
