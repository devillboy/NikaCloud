import { AdminPayments } from './AdminPayments';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
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
  Plus,
  X,
  Menu,
  Trash2,
  Cpu,
  Globe,
  Shield
} from 'lucide-react';
import { Link, Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const links = [
    { icon: LayoutDashboard, label: 'Analytics', path: '/admin' },
    { icon: Server, label: 'Servers', path: '/admin/servers' },
    { icon: CreditCard, label: 'Plans', path: '/admin/plans' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 md:hidden" onClick={() => setIsOpen(false)} />
      )}
      
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-brand-card border-r border-slate-800 flex flex-col transform transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800">
          <Link to="/" className="flex items-center gap-2">
            <Cloud className="w-6 h-6 text-brand-accent" />
            <span className="font-bold text-xl text-white">NikaCloud</span>
          </Link>
          <button className="md:hidden text-slate-400" onClick={() => setIsOpen(false)}>
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 py-6 px-4 space-y-2">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'bg-brand-accent/10 text-brand-accent border border-brand-accent/20' 
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
    </>
  );
};

const Topbar = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { user } = useAuth();
  
  return (
    <header className="h-20 bg-brand-darker border-b border-slate-800 flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button className="md:hidden text-slate-400" onClick={toggleSidebar}>
          <Menu className="w-6 h-6" />
        </button>
        <div className="relative w-full md:w-96">
          <Search className="w-5 h-5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-slate-900/50 border border-slate-700 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-accent transition-colors"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <button className="relative text-slate-400 hover:text-white transition-colors">
          <Bell className="w-6 h-6" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-brand-accent rounded-full"></span>
        </button>
        <div className="flex items-center gap-3 pl-6 border-l border-slate-800">
          <div className="text-right hidden md:block">
            <div className="text-sm font-medium text-white">{user?.displayName || 'Admin User'}</div>
            <div className="text-xs text-slate-500">{user?.email || 'admin@nikacloud.com'}</div>
          </div>
          {user?.photoURL ? (
            <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-10 h-10 rounded-full bg-brand-accent flex items-center justify-center text-white font-bold">
              {user?.displayName?.charAt(0) || 'A'}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

const Analytics = () => {
  const [servers, setServers] = useState<any[]>([]);
  const [usersCount, setUsersCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiBase = window.location.hostname.includes('localhost') || window.location.hostname.includes('run.app') 
          ? '' 
          : 'https://ais-dev-i2s6j473uusrp3lsvm4alv-781732712074.asia-southeast1.run.app';

        const response = await fetch(`${apiBase}/api/admin/stats`);
        const data = await response.json();
        setServers(data.servers || []);
        setUsersCount(data.usersCount || 0);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const stats = [
    { label: 'Active Servers', value: servers.length.toString(), icon: Server, color: 'text-brand-accent', bg: 'bg-brand-accent/10' },
    { label: 'Total Users', value: usersCount.toString(), icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Network Traffic', value: 'Live', icon: Activity, color: 'text-brand-accent-bright', bg: 'bg-brand-accent-bright/10' },
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
            <button className="text-sm text-brand-accent hover:text-brand-accent-bright font-medium">View All</button>
          </div>
          <div className="space-y-4">
            {loading ? (
              <div className="text-slate-400">Loading servers...</div>
            ) : servers.length === 0 ? (
              <div className="text-slate-400">No servers deployed yet.</div>
            ) : servers.slice(0, 5).map((server, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-900/50 border border-slate-800 hover:bg-slate-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className={`w-3 h-3 rounded-full ${server.status === 'Online' ? 'bg-brand-accent shadow-[0_0_10px_rgba(255,107,0,0.5)]' : 'bg-yellow-500'}`} />
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
                <div className="h-full bg-brand-accent w-[45%]" />
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
                <div className="h-full bg-brand-accent-bright w-[32%]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserManagement = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const apiBase = window.location.hostname.includes('localhost') || window.location.hostname.includes('run.app') 
          ? '' 
          : 'https://ais-dev-i2s6j473uusrp3lsvm4alv-781732712074.asia-southeast1.run.app';

        const response = await fetch(`${apiBase}/api/admin/users`);
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">User Management</h1>
        <p className="text-slate-400">Manage user accounts, permissions, and status.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="p-4 text-sm font-medium text-slate-400">User</th>
              <th className="p-4 text-sm font-medium text-slate-400">Email</th>
              <th className="p-4 text-sm font-medium text-slate-400">Role</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-4 text-center text-slate-400">Loading users...</td></tr>
            ) : users.map(user => (
              <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-white font-medium">{user.displayName || 'N/A'}</td>
                <td className="p-4 text-slate-300">{user.email}</td>
                <td className="p-4 text-slate-300">{user.role || 'User'}</td>
                <td className="p-4 text-right">
                  <button className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-400/10">
                    Suspend
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

const ServerManagement = () => {
  const [servers, setServers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServers = async () => {
      try {
        const response = await fetch('/api/admin/servers');
        const data = await response.json();
        setServers(data);
      } catch (error) {
        console.error("Error fetching servers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchServers();
  }, []);

  const handlePowerAction = async (id: string, signal: string) => {
    try {
      const response = await fetch(`/api/servers/${id}/power`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ signal })
      });
      const data = await response.json();
      alert(data.message || `Signal ${signal} sent`);
    } catch (error) {
      console.error(`Error sending ${signal} signal:`, error);
      alert(`Failed to send ${signal} signal`);
    }
  };

  const handleDeleteServer = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this server?')) {
      try {
        const response = await fetch(`/api/admin/servers/${id}`, {
          method: 'DELETE'
        });
        if (response.ok) {
          setServers(servers.filter(s => s.id !== id));
          alert('Server deleted successfully');
        } else {
          throw new Error('Failed to delete server');
        }
      } catch (error) {
        console.error('Error deleting server:', error);
        alert('Failed to delete server');
      }
    }
  };

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">Server Management</h1>
        <p className="text-slate-400">Manage your deployed servers.</p>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[600px]">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="p-4 text-sm font-medium text-slate-400">Server Name</th>
              <th className="p-4 text-sm font-medium text-slate-400">Status</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-4 text-center text-slate-400">Loading servers...</td></tr>
            ) : servers.map(server => (
              <tr key={server.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-white font-medium">{server.name}</td>
                <td className="p-4 text-slate-300">{server.status || 'Unknown'}</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handlePowerAction(server.id, 'start')} className="text-brand-accent hover:text-brand-accent-bright transition-colors p-2 rounded-lg hover:bg-brand-accent/10">Start</button>
                  <button onClick={() => handlePowerAction(server.id, 'stop')} className="text-yellow-400 hover:text-yellow-300 transition-colors p-2 rounded-lg hover:bg-yellow-400/10">Stop</button>
                  <button onClick={() => handlePowerAction(server.id, 'restart')} className="text-brand-accent-bright hover:text-yellow-300 transition-colors p-2 rounded-lg hover:bg-brand-accent-bright/10">Restart</button>
                  <button onClick={() => handleDeleteServer(server.id)} className="text-red-400 hover:text-red-300 transition-colors p-2 rounded-lg hover:bg-red-400/10"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const PlanManagement = () => {
  const plans = [
    { id: 1, name: 'Dirt Tier', type: 'Minecraft', price: 4.99, ram: '4GB', status: 'Active', icon: Server },
    { id: 2, name: 'Iron Tier', type: 'Minecraft', price: 9.99, ram: '8GB', status: 'Active', icon: Cpu },
    { id: 3, name: 'Diamond Tier', type: 'Minecraft', price: 19.99, ram: '16GB', status: 'Active', icon: Shield },
    { id: 4, name: 'Starter VM', type: 'VPS', price: 5.00, ram: '2GB', status: 'Active', icon: Globe },
    { id: 5, name: 'Pro VM', type: 'VPS', price: 12.00, ram: '8GB', status: 'Active', icon: Server },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Plan Management</h1>
          <p className="text-slate-400">Adjust pricing, resources, and availability of your hosting plans.</p>
        </div>
        <button className="bg-brand-accent hover:bg-brand-accent-bright text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
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
                <td className="p-4 text-white font-medium flex items-center gap-3">
                  <plan.icon className="w-5 h-5 text-brand-accent" />
                  {plan.name}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${plan.type === 'Minecraft' ? 'bg-brand-accent/10 text-brand-accent' : 'bg-purple-500/10 text-purple-400'}`}>
                    {plan.type}
                  </span>
                </td>
                <td className="p-4 text-slate-300">${plan.price.toFixed(2)}</td>
                <td className="p-4 text-slate-300">{plan.ram}</td>
                <td className="p-4">
                  <span className="px-2 py-1 rounded text-xs font-medium bg-brand-accent/10 text-brand-accent">
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

const NotificationSender = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [type, setType] = useState<'push' | 'email'>('push');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!title || !body) return alert('Please fill in all fields');
    
    setSending(true);
    try {
      const apiBase = window.location.hostname.includes('localhost') || window.location.hostname.includes('run.app') 
        ? '' 
        : 'https://ais-dev-i2s6j473uusrp3lsvm4alv-781732712074.asia-southeast1.run.app';

      const endpoint = type === 'email' ? '/api/admin/send-email-announcement' : '/api/admin/send-push-announcement';
      
      const response = await fetch(`${apiBase}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, body })
      });
      
      const data = await response.json();
      if (data.success) {
        alert(`Announcement sent successfully!`);
        setTitle('');
        setBody('');
      } else {
        throw new Error(data.error || 'Failed to send announcement');
      }
    } catch (error: any) {
      console.error("Error sending announcement:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto glass-panel rounded-2xl">
      <h2 className="text-xl font-bold text-white mb-6">Send Global Announcement</h2>
      <div className="space-y-4">
        <div className="flex gap-4 mb-4">
          <button 
            onClick={() => setType('push')}
            className={`flex-1 p-3 rounded-xl font-medium transition-colors ${type === 'push' ? 'bg-brand-accent text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
          >
            Push Notification
          </button>
          <button 
            onClick={() => setType('email')}
            className={`flex-1 p-3 rounded-xl font-medium transition-colors ${type === 'email' ? 'bg-brand-accent text-white' : 'bg-slate-900 text-slate-400 border border-slate-700'}`}
          >
            Email Announcement
          </button>
        </div>
        <input 
          type="text" 
          placeholder="Announcement Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
        />
        <textarea 
          placeholder="Announcement Body (HTML supported for email)" 
          value={body} 
          onChange={(e) => setBody(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white h-32"
        />
        <button 
          onClick={handleSend} 
          disabled={sending}
          className="w-full bg-brand-accent hover:bg-brand-accent-bright text-white p-3 rounded-xl font-medium disabled:opacity-50"
        >
          {sending ? 'Sending...' : 'Send Announcement'}
        </button>
      </div>
    </div>
  );
};

const SettingsPage = () => {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">System Settings</h1>
      <div className="glass-panel rounded-2xl p-6">
        <p className="text-slate-400">General system configuration settings will appear here.</p>
      </div>
    </div>
  );
};

export default function AdminDashboard() {
  const { user, isAdmin, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex-1 flex flex-col md:ml-64">
        <Topbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto p-6 bg-slate-950">
          <Routes>
            <Route path="/" element={<Analytics />} />
            <Route path="/servers" element={<ServerManagement />} />
            <Route path="/plans" element={<PlanManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/payments" element={<AdminPayments />} />
            <Route path="/notifications" element={<NotificationSender />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
