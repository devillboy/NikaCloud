import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Server, FileText, CreditCard, Headphones, Settings, Bell } from 'lucide-react';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function UserPanel() {
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'notifications'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newNotifications = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setNotifications(newNotifications);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      <div className="flex">
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
          <h2 className="text-xl font-bold mb-6">User Panel</h2>
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><LayoutDashboard size={20} /> Dashboard</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><Server size={20} /> My Servers</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><FileText size={20} /> File Manager</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><CreditCard size={20} /> Billing</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><Headphones size={20} /> Support</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><Settings size={20} /> Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">My Dashboard</h1>
            <div className="relative">
              <Bell size={24} className="text-slate-400" />
              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">{notifications.length}</span>
              )}
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Notifications</h2>
            {notifications.map(n => (
              <div key={n.id} className="bg-slate-900 p-4 rounded-lg border border-slate-800 mb-2">
                <h3 className="font-bold">{n.title}</h3>
                <p className="text-slate-400">{n.body}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">Server 1</div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">Server 2</div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">Server 3</div>
          </div>
        </main>
      </div>
    </div>
  );
}
