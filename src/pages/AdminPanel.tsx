import React, { useState } from 'react';
import { LayoutDashboard, Users, Server, Settings, Bell, ShieldCheck } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export default function AdminPanel() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const sendNotification = async () => {
    if (!title || !body) return;
    try {
      await addDoc(collection(db, 'notifications'), {
        title,
        body,
        createdAt: serverTimestamp(),
      });
      setTitle('');
      setBody('');
      alert('Notification sent!');
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white pt-20">
      <div className="flex">
        <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
          <nav className="space-y-4">
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><LayoutDashboard size={20} /> Dashboard</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><Users size={20} /> Users</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><Server size={20} /> Servers</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><Bell size={20} /> Notifications</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><ShieldCheck size={20} /> Security</a>
            <a href="#" className="flex items-center gap-3 text-slate-300 hover:text-white"><Settings size={20} /> Settings</a>
          </nav>
        </aside>
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
          
          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
            <h2 className="text-xl font-bold mb-4">Send Push Notification</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 mb-4 bg-slate-800 rounded text-white" />
            <textarea placeholder="Body" value={body} onChange={(e) => setBody(e.target.value)} className="w-full p-2 mb-4 bg-slate-800 rounded text-white" />
            <button onClick={sendNotification} className="bg-brand-accent text-white px-4 py-2 rounded hover:bg-brand-accent-bright transition-colors">Send</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">Feature 1</div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">Feature 2</div>
            <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">Feature 3</div>
          </div>
        </main>
      </div>
    </div>
  );
}
