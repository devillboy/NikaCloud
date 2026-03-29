import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Cloud, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { signInWithGoogle, user, isAdmin, isNewUser, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      if (isNewUser) {
        navigate('/claim-free-server');
      } else if (isAdmin) {
        navigate('/admin');
      } else {
        // Redirect to panel for existing users
        navigate('/dashboard');
      }
    }
  }, [user, isAdmin, isNewUser, loading, navigate]);

  const handleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center px-4 relative overflow-hidden bg-brand-darker">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-6">
            <Cloud className="w-8 h-8 text-brand-blue" />
            <span className="font-bold text-2xl text-white">NikaCloud</span>
          </Link>
          <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-400">Sign in to access your hosting panel</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl shadow-xl text-center">
          <button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-brand-blue hover:bg-blue-600 text-white font-medium py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? 'Loading...' : 'Sign in with Google'}
            {!loading && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
