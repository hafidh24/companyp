
import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Activities from './pages/Activities';
import Contact from './pages/Contact';
import Dashboard from './pages/admin/Dashboard';
import AdminActivities from './pages/admin/AdminActivities';
import AdminServices from './pages/admin/AdminServices';
import AdminProfile from './pages/admin/AdminProfile';
import AdminMessages from './pages/admin/AdminMessages';
import { trackVisit } from './services/analyticsService';

const App: React.FC = () => {
  useEffect(() => {
    // Track visitor on mount
    trackVisit();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/services" element={<Layout><Services /></Layout>} />
        <Route path="/activities" element={<Layout><Activities /></Layout>} />
        <Route path="/contact" element={<Layout><Contact /></Layout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout><Dashboard /></AdminLayout>} />
        <Route path="/admin/activities" element={<AdminLayout><AdminActivities /></AdminLayout>} />
        <Route path="/admin/services" element={<AdminLayout><AdminServices /></AdminLayout>} />
        <Route path="/admin/profile" element={<AdminLayout><AdminProfile /></AdminLayout>} />
        <Route path="/admin/messages" element={<AdminLayout><AdminMessages /></AdminLayout>} />
        <Route path="/admin/settings" element={<AdminLayout><div className="p-8 text-2xl font-bold animate-fade-up">Pengaturan Dashboard</div></AdminLayout>} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
