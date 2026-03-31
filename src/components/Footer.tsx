import { Github, Twitter, Terminal, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Discord } from './Icons';

export default function Footer() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/admin') || 
                     location.pathname === '/login' || 
                     location.pathname === '/claim-free-server' || 
                     location.pathname === '/dashboard';

  if (hideFooter) return null;

  return (
    <footer className="bg-black border-t border-white/10 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-4 mb-8 group">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center rounded-2xl group-hover:rotate-12 transition-transform duration-500 shadow-lg shadow-orange-500/20">
                <Terminal className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white tracking-tight">Nika<span className="text-orange-500">Cloud</span></span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-md mb-10">
              Next-generation infrastructure for high-performance compute. Enterprise-grade DDoS mitigation, NVMe storage arrays, and low-latency global networking.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-500/50 transition-all">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-500/50 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-orange-500 hover:border-orange-500/50 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-8">Infrastructure</h3>
            <ul className="space-y-4">
              <li><a href="/#features" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Network Features</a></li>
              <li><a href="/#plans" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Compute Nodes</a></li>
              <li><a href="/billing" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Resource Billing</a></li>
              <li><a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Status Page</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-8">Protocol</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">About Infrastructure</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
              <li><a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-500 hover:text-orange-500 transition-colors">Support Terminal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} NikaCloud Infrastructure. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-xs text-gray-600">
            <span>Powered by</span>
            <Cpu className="w-4 h-4 text-orange-500" />
            <span>Enterprise Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
