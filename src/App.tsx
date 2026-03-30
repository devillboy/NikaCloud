/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import ClaimFreeServer from './pages/ClaimFreeServer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { useFCM } from './hooks/useFCM';

export default function App() {
  useFCM();
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brand-darker selection:bg-brand-blue/30">
        <Navbar />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/claim-free-server" element={<ClaimFreeServer />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
