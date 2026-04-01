import React, { useState } from 'react';
import { LayoutDashboard, Users, Server, Settings, Bell, ShieldCheck, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp, query, where, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function AdminPanel() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [isAssigningAdmin, setIsAssigningAdmin] = useState(false);
  const [adminAssignMessage, setAdminAssignMessage] = useState<{type: 'success' | 'error', text: string} | null>(null);

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

  const handleAssignAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminEmail.trim()) return;

    setIsAssigningAdmin(true);
    setAdminAssignMessage(null);

    try {
      // Find user by email
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('email', '==', adminEmail.trim()));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setAdminAssignMessage({ type: 'error', text: 'User not found with this email address.' });
        return;
      }

      // Update user role to admin
      const userDoc = querySnapshot.docs[0];
      await updateDoc(doc(db, 'users', userDoc.id), {
        role: 'admin'
      });

      setAdminAssignMessage({ type: 'success', text: `Successfully granted admin access to ${adminEmail}` });
      setAdminEmail('');
    } catch (error: any) {
      console.error('Error assigning admin:', error);
      setAdminAssignMessage({ type: 'error', text: error.message || 'Failed to assign admin role. Please try again.' });
    } finally {
      setIsAssigningAdmin(false);
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
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
              Assign Admin Access
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              Grant administrator privileges to an existing user via their registered email address.
            </p>
            
            <form onSubmit={handleAssignAdmin} className="flex gap-4">
              <input 
                type="email" 
                placeholder="User's Email Address" 
                value={adminEmail} 
                onChange={(e) => setAdminEmail(e.target.value)} 
                className="flex-1 p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:border-orange-500 outline-none transition-all" 
                required
              />
              <button 
                type="submit"
                disabled={isAssigningAdmin || !adminEmail.trim()}
                className="bg-orange-500 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {isAssigningAdmin ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Assigning...
                  </>
                ) : (
                  'Grant Access'
                )}
              </button>
            </form>

            {adminAssignMessage && (
              <div className={`mt-4 p-3 rounded-lg flex items-center gap-2 text-sm font-medium ${
                adminAssignMessage.type === 'success' 
                  ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                  : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
                {adminAssignMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0" />
                )}
                {adminAssignMessage.text}
              </div>
            )}
          </div>

          <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Bell className="w-5 h-5 text-orange-500" />
              Send Push Notification
            </h2>
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
