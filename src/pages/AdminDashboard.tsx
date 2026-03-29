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
  Cloud,
  Edit2,
  Plus
} from 'lucide-react';
import { Link, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const links = [
    { icon: LayoutDashboard, label: 'Analytics', path: '/admin' },
    { icon: Server, label: 'Plan Management', path: '/admin/plans' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="w-64 h-screen bg-brand-card border-r border-slate-800 flex flex-col fixed left-0 top-0">
      <div className="h-20 flex items-center px-6 border-b border-slate-800">
        <Link to="/" className="flex items-center gap-2">
          <Cloud className="w-6 h-6 text-brand-blue" />
          <span className="font-bold text-xl text-white">NikaCloud</span>
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
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-slate-800">
        <button 
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-red-400 hover:bg-red-400/10 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

const Topbar = () => {
  const { user } = useAuth();
  
  return (
    <header className="h-20 bg-brand-darker border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-96">
          <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-blue transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-brand-blue rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-white">{user?.displayName || 'Admin User'}</div>
            <div className="text-xs text-slate-500">{user?.email || 'admin@nikacloud.com'}</div>
          </div>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold">
              {user?.displayName?.charAt(0) || 'A'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const Analytics = () => {
  const [servers, setServers] = useState<any[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const serversSnapshot = await getDocs(collection(db, 'servers'));
        const serversList = serversSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setServers(serversList);

        const usersSnapshot = await getDocs(collection(db, 'users'));
        setUsersCount(usersSnapshot.size);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Active Servers', value: servers.length.toString(), icon: Server, color: 'text-brand-blue', bg: 'bg-brand-blue/10' },
    { label: 'Total Users', value: usersCount.toString(), icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Network Traffic', value: 'Live', icon: Activity, color: 'text-green-500', bg: 'bg-green-500/10' },
    { label: 'Storage Used', value: 'Dynamic', icon: Database, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Analytics Overview</h1>
        <p className="text-slate-400">Monitor your hosting infrastructure and user metrics.</p>
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
            <div className="text-sm text-slate-400">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-panel rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white">Recent Deployments</h2>
            <button className="text-sm text-brand-blue hover:text-blue-400 font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-slate-400">Loading servers...</div>
            ) : servers.length === 0 ? (
              <div className="text-slate-400">No servers deployed yet.</div>
            ) : servers.slice(0, 5).map((server, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${server.status === 'Online' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-yellow-500'}`} />
                  <div>
                    <div className="font-medium text-white">{server.name}</div>
                    <div className="text-xs text-slate-400">{server.type}</div>
                  </div>
                </div>
                <div className="text-right hidden sm:block">
                  <div className="text-sm font-mono text-slate-300">{server.ip || 'Pending...'}</div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-500" />
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">System Status</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Global CPU Load</span>
                <span className="text-white font-medium">45%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-brand-blue w-[45%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Global RAM Usage</span>
                <span className="text-white font-medium">78%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-purple-500 w-[78%]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Network Capacity</span>
                <span className="text-white font-medium">32%</span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[32%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanManagement = () => {
  const plans = [
    { id: 1, name: 'Dirt Tier', type: 'Minecraft', price: 4.99, ram: '4GB', status: 'Active' },
    { id: 2, name: 'Iron Tier', type: 'Minecraft', price: 9.99, ram: '8GB', status: 'Active' },
    { id: 3, name: 'Diamond Tier', type: 'Minecraft', price: 19.99, ram: '16GB', status: 'Active' },
    { id: 4, name: 'Starter VM', type: 'VPS', price: 5.00, ram: '2GB', status: 'Active' },
    { id: 5, name: 'Pro VM', type: 'VPS', price: 12.00, ram: '8GB', status: 'Active' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Plan Management</h1>
          <p className="text-slate-400">Adjust pricing, resources, and availability of your hosting plans.</p>
        </div>
        <button className="bg-brand-blue hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Create New Plan
        </button>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="p-4 text-sm font-medium text-slate-400">Plan Name</th>
              <th className="p-4 text-sm font-medium text-slate-400">Type</th>
              <th className="p-4 text-sm font-medium text-slate-400">Price/mo</th>
              <th className="p-4 text-sm font-medium text-slate-400">RAM</th>
              <th className="p-4 text-sm font-medium text-slate-400">Status</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {plans.map(plan => (
              <tr key={plan.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-white font-medium">{plan.name}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${plan.type === 'Minecraft' ? 'bg-green-500/10 text-green-400' : 'bg-purple-500/10 text-purple-400'}`}>
                    {plan.type}
                  </span>
                </td>
                <td className="p-4 text-slate-300">${plan.price.toFixed(2)}</td>
                <td className="p-4 text-slate-300">{plan.ram}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-brand-blue/10 text-brand-blue">
                    {plan.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800">
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-brand-darker flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex-1 bg-brand-darker flex">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/plans" element={<PlanManagement />} />
            <Route path="/users" element={<div className="p-8 text-slate-400">Users Management (Coming Soon)</div>} />
            <Route path="/settings" element={<div className="p-8 text-slate-400">Settings Page (Coming Soon)</div>} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
