import { Cloud, Disc as Discord, Github, Twitter } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function Footer() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  if (isAdmin) return null;

  return (
    <footer className="border-t border-white/10 bg-brand-darker relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[1px] bg-gradient-to-r from-transparent via-brand-blue/50 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <Cloud className="w-6 h-6 text-brand-blue" />
              <span className="font-display font-bold text-xl text-white">
                Nika<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-blue to-brand-purple">Cloud</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm max-w-sm mb-6">
              Next-generation hosting solutions for gamers, developers, and businesses. High performance, low latency, and 24/7 support.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://discord.gg/nikacloud" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-purple hover:bg-brand-purple/20 transition-all">
                <Discord className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand-blue hover:bg-brand-blue/20 transition-all">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/30 hover:bg-white/10 transition-all">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#minecraft" className="hover:text-brand-blue transition-colors">Minecraft Hosting</a></li>
              <li><a href="#vps" className="hover:text-brand-blue transition-colors">VPS Hosting</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Dedicated Servers</a></li>
              <li><a href="#" className="hover:text-brand-blue transition-colors">Web Hosting (Soon)</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-brand-purple transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-purple transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NikaCloud Hosting. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <span>Powered by</span>
            <Cloud className="w-4 h-4" />
          </div>
        </div>
      </div>
    </footer>
  );
}
