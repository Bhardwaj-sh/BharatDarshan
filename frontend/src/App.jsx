import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import RegionDetailPage from './pages/RegionDetailPage';
import AboutPage from './pages/AboutPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/region/:slug" element={<RegionDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          
          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 text-center bg-forest-900 text-white">
                <h2 className="font-display text-7xl font-black text-lime-400 mb-2">404</h2>
                <h3 className="font-display text-2xl font-bold text-white mb-4">Destination Not Found</h3>
                <p className="text-xs text-slate-300 max-w-sm mb-6">
                  The pathway you seek does not exist on our India travel map. Let us guide you back home.
                </p>
                <a href="/" className="btn-lime text-xs uppercase tracking-wider py-3 px-6">
                  Return to Home
                </a>
              </div>
            }
          />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}
