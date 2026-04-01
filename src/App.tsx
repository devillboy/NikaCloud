/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import UserDashboard from './pages/UserDashboard';
import Login from './pages/Login';
import ClaimFreeServer from './pages/ClaimFreeServer';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Billing from './pages/Billing';
import PaymentResult from './pages/PaymentResult';
import About from './pages/About';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import ServerDetails from './pages/ServerDetails';
import UserPlans from './pages/UserPlans';
import BackupReminder from './components/BackupReminder';
import { useFCM } from './hooks/useFCM';

export default function App() {
  useFCM();

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col bg-brand-darker selection:bg-brand-accent/30 relative">
        <Navbar />
        <BackupReminder />
        <main className="flex-grow flex flex-col">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<UserDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/claim-free-server" element={<ClaimFreeServer />} />
            <Route path="/billing" element={<Billing />} />
            <Route path="/payment-result" element={<PaymentResult />} />
            <Route path="/about" element={<About />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/server/:id" element={<ServerDetails />} />
            <Route path="/plans" element={<UserPlans />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
