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
import { getApiBase } from '../lib/api';

const Sidebar = ({ isOpen, setIsOpen }: { isOpen: boolean, setIsOpen: (open: boolean) => void }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  const links = [
    { icon: LayoutDashboard, label: 'Analytics', path: '/admin' },
    { icon: Server, label: 'Servers', path: '/admin/servers' },
    { icon: Globe, label: 'Nodes', path: '/admin/nodes' },
    { icon: CreditCard, label: 'Plans', path: '/admin/plans' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: CreditCard, label: 'Payments', path: '/admin/payments' },
    { icon: Bell, label: 'Notifications', path: '/admin/notifications' },
    { icon: Database, label: 'Coupons', path: '/admin/coupons' },
    { icon: Activity, label: 'Logs', path: '/admin/logs' },
    { icon: Shield, label: 'Security', path: '/admin/security' },
    { icon: Edit2, label: 'Tickets', path: '/admin/tickets' },
    { icon: Database, label: 'Database', path: '/admin/database' },
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
        const apiBase = getApiBase();

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
        const apiBase = getApiBase();

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

  const handleUserAction = async (id: string, action: string) => {
    if (action === 'delete' && !window.confirm('Are you sure you want to delete this user?')) return;
    
    try {
      const apiBase = getApiBase();
      const response = await fetch(`${apiBase}/api/admin/users/${id}`, {
        method: action === 'delete' ? 'DELETE' : 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: action === 'suspend' ? JSON.stringify({ role: 'suspended' }) : undefined
      });
      
      if (response.ok) {
        if (action === 'delete') {
          setUsers(users.filter(u => u.id !== id));
        } else {
          setUsers(users.map(u => u.id === id ? { ...u, role: 'suspended' } : u));
        }
        alert(`User ${action}ed successfully`);
      } else {
        throw new Error(`Failed to ${action} user`);
      }
    } catch (error) {
      console.error(`Error ${action}ing user:`, error);
      alert(`Failed to ${action} user`);
    }
  };

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
                <td className="p-4 text-slate-300">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${user.role === 'admin' ? 'bg-brand-accent/20 text-brand-accent' : user.role === 'suspended' ? 'bg-red-500/20 text-red-400' : 'bg-slate-500/20 text-slate-400'}`}>
                    {user.role || 'User'}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => handleUserAction(user.id, 'suspend')}
                    disabled={user.role === 'suspended' || user.role === 'admin'}
                    className="text-slate-400 hover:text-orange-400 transition-colors p-2 rounded-lg hover:bg-orange-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Suspend
                  </button>
                  <button 
                    onClick={() => handleUserAction(user.id, 'delete')}
                    disabled={user.role === 'admin'}
                    className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg hover:bg-red-400/10 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Trash2 className="w-4 h-4" />
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
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingPlan, setEditingPlan] = useState<any>(null);
  const [newPlan, setNewPlan] = useState({ name: '', price: '', ram: '', cpu: '', ssd: '', type: 'minecraft' });

  const fetchPlans = async () => {
    try {
      const res = await fetch('/api/plans');
      const data = await res.json();
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleSavePlan = async () => {
    try {
      const method = editingPlan ? 'PATCH' : 'POST';
      const url = editingPlan ? `/api/admin/plans/${editingPlan.id}` : '/api/admin/plans';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlan)
      });
      
      if (response.ok) {
        fetchPlans();
        setShowModal(false);
        setEditingPlan(null);
        setNewPlan({ name: '', price: '', ram: '', cpu: '', ssd: '', type: 'minecraft' });
      }
    } catch (error) {
      console.error("Error saving plan:", error);
    }
  };

  const handleDeletePlan = async (id: string) => {
    if (window.confirm('Delete this plan?')) {
      try {
        await fetch(`/api/admin/plans/${id}`, { method: 'DELETE' });
        fetchPlans();
      } catch (error) {
        console.error("Error deleting plan:", error);
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Plan Management</h1>
          <p className="text-slate-400">Adjust pricing, resources, and availability of your hosting plans.</p>
        </div>
        <button 
          onClick={() => {
            setEditingPlan(null);
            setNewPlan({ name: '', price: '', ram: '', cpu: '', ssd: '', type: 'minecraft' });
            setShowModal(true);
          }}
          className="bg-brand-accent hover:bg-brand-accent-bright text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
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
              <th className="p-4 text-sm font-medium text-slate-400">Price</th>
              <th className="p-4 text-sm font-medium text-slate-400">RAM</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center text-slate-400">Loading plans...</td></tr>
            ) : plans.map(plan => (
              <tr key={plan.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-white font-medium flex items-center gap-3">
                  <Server className="w-5 h-5 text-brand-accent" />
                  {plan.name}
                </td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${plan.type === 'minecraft' ? 'bg-brand-accent/10 text-brand-accent' : 'bg-purple-500/10 text-purple-400'}`}>
                    {plan.type}
                  </span>
                </td>
                <td className="p-4 text-slate-300">₹{plan.price}</td>
                <td className="p-4 text-slate-300">{plan.ram}</td>
                <td className="p-4 text-right space-x-2">
                  <button 
                    onClick={() => {
                      setEditingPlan(plan);
                      setNewPlan({ name: plan.name, price: plan.price, ram: plan.ram, cpu: plan.cpu, ssd: plan.ssd, type: plan.type });
                      setShowModal(true);
                    }}
                    className="text-slate-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDeletePlan(plan.id)} className="text-red-400 hover:text-red-300 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-brand-card border border-slate-800 p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-6">{editingPlan ? 'Edit Plan' : 'Create New Plan'}</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 uppercase mb-2">Plan Name</label>
                <input 
                  type="text" 
                  value={newPlan.name} 
                  onChange={e => setNewPlan({...newPlan, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  placeholder="Iron Plan"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Price (₹)</label>
                  <input 
                    type="text" 
                    value={newPlan.price} 
                    onChange={e => setNewPlan({...newPlan, price: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                    placeholder="199"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Type</label>
                  <select 
                    value={newPlan.type} 
                    onChange={e => setNewPlan({...newPlan, type: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  >
                    <option value="minecraft">Minecraft</option>
                    <option value="bot">Bot Hosting</option>
                    <option value="vps">VPS</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">RAM</label>
                  <input 
                    type="text" 
                    value={newPlan.ram} 
                    onChange={e => setNewPlan({...newPlan, ram: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                    placeholder="4GB"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">CPU</label>
                  <input 
                    type="text" 
                    value={newPlan.cpu} 
                    onChange={e => setNewPlan({...newPlan, cpu: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                    placeholder="100%"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">SSD</label>
                  <input 
                    type="text" 
                    value={newPlan.ssd} 
                    onChange={e => setNewPlan({...newPlan, ssd: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                    placeholder="10GB"
                  />
                </div>
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setShowModal(false)} className="flex-1 bg-slate-800 text-white p-3 rounded-xl">Cancel</button>
                <button onClick={handleSavePlan} className="flex-1 bg-brand-accent text-white p-3 rounded-xl">{editingPlan ? 'Update' : 'Create'}</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
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
      const apiBase = getApiBase();

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

const CouponManagement = () => {
  const [coupons, setCoupons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newCoupon, setNewCoupon] = useState({ code: '', discount: 0, type: 'percentage', expiry: '' });

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/coupons');
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error("Error fetching coupons:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleAddCoupon = async () => {
    try {
      const response = await fetch('/api/admin/coupons', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCoupon)
      });
      if (response.ok) {
        fetchCoupons();
        setShowAddModal(false);
        setNewCoupon({ code: '', discount: 0, type: 'percentage', expiry: '' });
      }
    } catch (error) {
      console.error("Error adding coupon:", error);
    }
  };

  const handleDeleteCoupon = async (id: string) => {
    if (window.confirm('Delete this coupon?')) {
      try {
        await fetch(`/api/admin/coupons/${id}`, { method: 'DELETE' });
        fetchCoupons();
      } catch (error) {
        console.error("Error deleting coupon:", error);
      }
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Coupon Management</h1>
          <p className="text-slate-400">Create and manage discount codes.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-brand-accent hover:bg-brand-accent-bright text-white px-4 py-2 rounded-xl font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Coupon
        </button>
      </div>

      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="p-4 text-sm font-medium text-slate-400">Code</th>
              <th className="p-4 text-sm font-medium text-slate-400">Discount</th>
              <th className="p-4 text-sm font-medium text-slate-400">Type</th>
              <th className="p-4 text-sm font-medium text-slate-400">Expiry</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-4 text-center text-slate-400">Loading coupons...</td></tr>
            ) : coupons.map(coupon => (
              <tr key={coupon.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-white font-bold">{coupon.code}</td>
                <td className="p-4 text-slate-300">{coupon.discount}{coupon.type === 'percentage' ? '%' : '$'}</td>
                <td className="p-4 text-slate-300 capitalize">{coupon.type}</td>
                <td className="p-4 text-slate-300">{coupon.expiry || 'Never'}</td>
                <td className="p-4 text-right">
                  <button onClick={() => handleDeleteCoupon(coupon.id)} className="text-red-400 hover:text-red-300 p-2">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-brand-card border border-slate-800 p-8 rounded-2xl w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-6">Add New Coupon</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-slate-500 uppercase mb-2">Coupon Code</label>
                <input 
                  type="text" 
                  value={newCoupon.code} 
                  onChange={e => setNewCoupon({...newCoupon, code: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  placeholder="SAVE50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Discount</label>
                  <input 
                    type="number" 
                    value={newCoupon.discount} 
                    onChange={e => setNewCoupon({...newCoupon, discount: Number(e.target.value)})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-500 uppercase mb-2">Type</label>
                  <select 
                    value={newCoupon.type} 
                    onChange={e => setNewCoupon({...newCoupon, type: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                  >
                    <option value="percentage">Percentage</option>
                    <option value="fixed">Fixed Amount</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-slate-500 uppercase mb-2">Expiry Date (Optional)</label>
                <input 
                  type="date" 
                  value={newCoupon.expiry} 
                  onChange={e => setNewCoupon({...newCoupon, expiry: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white"
                />
              </div>
              <div className="flex gap-4 mt-8">
                <button onClick={() => setShowAddModal(false)} className="flex-1 bg-slate-800 text-white p-3 rounded-xl">Cancel</button>
                <button onClick={handleAddCoupon} className="flex-1 bg-brand-accent text-white p-3 rounded-xl">Create</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

const NodeManagement = () => {
  const nodes = [
    { id: 'node-1', name: 'Free Node 1', type: 'Free', status: 'Online', load: '45%', location: 'Germany' },
    { id: 'node-2', name: 'Paid Node 1', type: 'Paid', status: 'Online', load: '12%', location: 'USA' },
    { id: 'node-3', name: 'Paid Node 2', type: 'Paid', status: 'Maintenance', load: '0%', location: 'Singapore' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Node Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {nodes.map(node => (
          <div key={node.id} className="glass-panel p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-accent/10 flex items-center justify-center">
                <Globe className="w-5 h-5 text-brand-accent" />
              </div>
              <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${node.status === 'Online' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                {node.status}
              </span>
            </div>
            <h3 className="text-lg font-bold text-white mb-1">{node.name}</h3>
            <p className="text-xs text-slate-500 mb-4">{node.location} • {node.type} Tier</p>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-[10px] text-slate-400 mb-1 uppercase font-bold">
                  <span>CPU Load</span>
                  <span>{node.load}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-brand-accent" style={{ width: node.load }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemLogs = () => {
  const logs = [
    { time: '2026-04-01 02:45:12', level: 'INFO', msg: 'New server created: User_123', source: 'Provisioner' },
    { time: '2026-04-01 02:44:05', level: 'WARN', msg: 'High CPU load on Node-1', source: 'Monitor' },
    { time: '2026-04-01 02:42:30', level: 'ERROR', msg: 'Payment verification failed: TXN_998', source: 'Billing' },
    { time: '2026-04-01 02:40:15', level: 'INFO', msg: 'Coupon SAVE50 applied by User_456', source: 'API' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">System Logs</h1>
      <div className="glass-panel rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-900/50 border-b border-slate-800 flex justify-between items-center">
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-blue-500/10 text-blue-400 text-[10px] font-bold rounded">INFO</span>
            <span className="px-2 py-1 bg-yellow-500/10 text-yellow-400 text-[10px] font-bold rounded">WARN</span>
            <span className="px-2 py-1 bg-red-500/10 text-red-400 text-[10px] font-bold rounded">ERROR</span>
          </div>
          <button className="text-xs text-slate-400 hover:text-white">Clear Logs</button>
        </div>
        <div className="font-mono text-xs p-4 space-y-2">
          {logs.map((log, i) => (
            <div key={i} className="flex gap-4 border-b border-slate-800/50 pb-2 last:border-0">
              <span className="text-slate-500 shrink-0">{log.time}</span>
              <span className={`font-bold shrink-0 w-12 ${log.level === 'ERROR' ? 'text-red-500' : log.level === 'WARN' ? 'text-yellow-500' : 'text-blue-500'}`}>{log.level}</span>
              <span className="text-slate-400 shrink-0 w-24">[{log.source}]</span>
              <span className="text-white">{log.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const SecuritySettings = () => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Security & Access</h1>
      <div className="grid grid-cols-1 gap-6">
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Admin 2FA</h3>
          <p className="text-slate-400 text-sm mb-6">Require Two-Factor Authentication for all administrative accounts.</p>
          <button className="bg-brand-accent text-white px-6 py-2 rounded-xl font-bold text-sm">Enable 2FA</button>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">IP Whitelist</h3>
          <p className="text-slate-400 text-sm mb-4">Restrict admin panel access to specific IP addresses.</p>
          <div className="flex gap-2">
            <input type="text" placeholder="192.168.1.1" className="flex-1 bg-slate-900 border border-slate-700 rounded-xl p-2 text-white text-sm" />
            <button className="bg-white text-black px-4 py-2 rounded-xl font-bold text-sm">Add IP</button>
          </div>
        </div>
        <div className="glass-panel p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-4">Maintenance Mode</h3>
          <p className="text-slate-400 text-sm mb-6">Temporarily disable public access to the store and dashboard.</p>
          <div className="flex items-center gap-3">
            <div className="w-12 h-6 bg-slate-800 rounded-full relative cursor-pointer">
              <div className="absolute left-1 top-1 w-4 h-4 bg-slate-500 rounded-full" />
            </div>
            <span className="text-sm text-slate-500">Currently Disabled</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const SupportTickets = () => {
  const tickets = [
    { id: 'T-101', user: 'ghoshsima874@gmail.com', subject: 'Server Offline', status: 'Open', priority: 'High' },
    { id: 'T-102', user: 'user2@example.com', subject: 'Billing Issue', status: 'Closed', priority: 'Medium' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Support Tickets</h1>
      <div className="glass-panel rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/50">
              <th className="p-4 text-sm font-medium text-slate-400">ID</th>
              <th className="p-4 text-sm font-medium text-slate-400">User</th>
              <th className="p-4 text-sm font-medium text-slate-400">Subject</th>
              <th className="p-4 text-sm font-medium text-slate-400">Status</th>
              <th className="p-4 text-sm font-medium text-slate-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                <td className="p-4 text-white font-mono">{ticket.id}</td>
                <td className="p-4 text-slate-300">{ticket.user}</td>
                <td className="p-4 text-white font-medium">{ticket.subject}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${ticket.status === 'Open' ? 'bg-orange-500/10 text-orange-400' : 'bg-slate-500/10 text-slate-400'}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="text-brand-accent hover:text-white text-xs font-bold">Reply</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const DatabaseExplorer = () => {
  const collections = ['users', 'servers', 'payments', 'coupons', 'plans', 'logs'];
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-white mb-6">Database Explorer</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {collections.map(col => (
          <div key={col} className="glass-panel p-6 rounded-2xl hover:border-brand-accent transition-all cursor-pointer group">
            <Database className="w-8 h-8 text-slate-600 group-hover:text-brand-accent mb-4 transition-colors" />
            <h3 className="text-lg font-bold text-white capitalize">{col}</h3>
            <p className="text-xs text-slate-500">Manage documents</p>
          </div>
        ))}
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
            <Route path="/coupons" element={<CouponManagement />} />
            <Route path="/notifications" element={<NotificationSender />} />
            <Route path="/nodes" element={<NodeManagement />} />
            <Route path="/logs" element={<SystemLogs />} />
            <Route path="/security" element={<SecuritySettings />} />
            <Route path="/tickets" element={<SupportTickets />} />
            <Route path="/database" element={<DatabaseExplorer />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
