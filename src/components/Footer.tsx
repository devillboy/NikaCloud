import { Disc as Discord, Github, Twitter, Terminal, Cpu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const hideFooter = location.pathname.startsWith('/admin') || 
                     location.pathname === '/login' || 
                     location.pathname === '/claim-free-server' || 
                     location.pathname === '/dashboard';

  if (hideFooter) return null;

  return (
    <footer className="bg-brand-darker border-t border-brand-border py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3 mb-8 group">
              <div className="w-10 h-10 bg-brand-accent flex items-center justify-center group-hover:rotate-90 transition-transform duration-500">
                <Terminal className="w-6 h-6 text-brand-darker" />
              </div>
              <span className="text-xl font-bold text-white tracking-tighter uppercase">Nika<span className="text-brand-accent">Cloud</span></span>
            </Link>
            <p className="text-slate-500 font-mono text-xs leading-relaxed max-w-md mb-10 uppercase tracking-wider">
              Next-generation infrastructure for high-performance compute. Enterprise-grade DDoS mitigation, NVMe storage arrays, and low-latency global networking.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-brand-border flex items-center justify-center text-slate-500 hover:text-brand-accent hover:border-brand-accent transition-all">
                <Discord className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-brand-border flex items-center justify-center text-slate-500 hover:text-brand-accent hover:border-brand-accent transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 border border-brand-border flex items-center justify-center text-slate-500 hover:text-brand-accent hover:border-brand-accent transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.3em] mb-8">Infrastructure</h3>
            <ul className="space-y-4">
              <li><a href="/#features" className="text-[10px] font-mono text-slate-500 hover:text-brand-accent uppercase tracking-widest transition-colors">Network Features</a></li>
              <li><a href="/#plans" className="text-[10px] font-mono text-slate-500 hover:text-brand-accent uppercase tracking-widest transition-colors">Compute Nodes</a></li>
              <li><a href="/billing" className="text-[10px] font-mono text-slate-500 hover:text-brand-accent uppercase tracking-widest transition-colors">Resource Billing</a></li>
              <li><a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-slate-500 hover:text-brand-accent uppercase tracking-widest transition-colors">Status Page</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="text-[10px] font-mono font-bold text-white uppercase tracking-[0.3em] mb-8">Protocol</h3>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-[10px] font-mono text-slate-500 hover:text-brand-accent uppercase tracking-widest transition-colors">About Infrastructure</Link></li>
              <li><Link to="/terms" className="text-[10px] font-mono text-slate-500 hover:text-brand-accent uppercase tracking-widest transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-[10px] font-mono text-slate-500 hover:text-brand-accent uppercase tracking-widest transition-colors">Privacy Policy</Link></li>
              <li><a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="text-[10px] font-mono text-slate-500 hover:text-brand-accent uppercase tracking-widest transition-colors">Support Terminal</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-brand-border flex flex-col md:flex-row items-center justify-between gap-8">
          <p className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            © {new Date().getFullYear()} NikaCloud Infrastructure. All rights reserved.
          </p>
          <div className="flex items-center gap-3 text-[9px] font-mono text-slate-600 uppercase tracking-widest">
            <span>Powered by</span>
            <Cpu className="w-3 h-3" />
            <span>Enterprise Core</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
