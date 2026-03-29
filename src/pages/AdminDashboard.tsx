import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Server, 
  CreditCard, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Activity,
  Users,
  Database,
  ChevronRight,
  Cloud
} from 'lucide-react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  
  const links = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: Server, label: 'My Servers', path: '/admin/servers' },
    { icon: CreditCard, label: 'Billing', path: '/admin/billing' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="w-64 h-screen bg-brand-card border-r border-white/5 flex flex-col fixed left-0 top-0">
      <div className="h-20 flex items-center px-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2">
          <Cloud className="w-6 h-6 text-brand-blue" />
          <span className="font-display font-bold text-xl text-white">NikaCloud</span>
        </Link>
      </div>
      
      <div className="flex-1 py-6 px-4 space-y-2">
        {links.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link 
              key={link.path} 
              to={link.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive 
                  ? 'bg-brand-blue/10 text-brand-blue border border-brand-blue/20' 
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-white/5">
        <button className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-400/10 transition-colors">
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

const Topbar = () => {
  return (
    <header className="h-20 bg-brand-darker border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="w-5 h-5 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search servers, invoices..." 
            className="w-full bg-brand-card border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-gray-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-brand-blue rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-white/10">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-white">Admin User</div>
            <div className="text-xs text-gray-500">admin@nikacloud.com</div>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple flex items-center justify-center text-white font-bold">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

const Overview = () => {
  const stats = [
    { label: 'Active Servers', value: '12', icon: Server, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
    { label: 'Total Users', value: '1,248', icon: Users, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { label: 'Network Traffic', value: '4.2 TB', icon: Activity, color: 'text-green-400', bg: 'bg-green-400/10' },
    { label: 'Storage Used', value: '850 GB', icon: Database, color: 'text-orange-400', bg: 'bg-orange-400/10' },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Welcome back, Admin</h1>
        <p className="text-gray-400">Here's what's happening with your infrastructure today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-panel p-6 rounded-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-sm text-gray-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Servers</h2>
            <button className="text-sm text-brand-blue hover:text-brand-blue/80 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Survival SMP', type: 'Minecraft - Iron', status: 'Online', ip: '192.168.1.101:25565' },
              { name: 'Web Server', type: 'VPS - Pro', status: 'Online', ip: '10.0.0.45' },
              { name: 'Lobby', type: 'Minecraft - Dirt', status: 'Offline', ip: '192.168.1.102:25565' },
            ].map((server, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${server.status === 'Online' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500'}`} />
                  <div>
                    <div className="font-medium text-white">{server.name}</div>
                    <div className="text-xs text-gray-400">{server.type}</div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-mono text-gray-300">{server.ip}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">System Status</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Global CPU Load</span>
                <span className="text-white font-medium">45%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-brand-blue w-[45%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Global RAM Usage</span>
                <span className="text-white font-medium">78%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-brand-purple w-[78%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-400">Network Capacity</span>
                <span className="text-white font-medium">32%</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-green-400 w-[32%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-brand-darker flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/servers" element={<div className="p-8 text-white">Servers Page (Coming Soon)</div>} />
            <Route path="/billing" element={<div className="p-8 text-white">Billing Page (Coming Soon)</div>} />
            <Route path="/settings" element={<div className="p-8 text-white">Settings Page (Coming Soon)</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
