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
          
          {/* Fallback 404 Route */}
          <Route
            path="*"
            element={
              <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 text-center">
                <h2 className="font-serif text-6xl font-bold text-forest-950 mb-2">404</h2>
                <h3 className="font-serif text-2xl font-bold text-charcoal-800 mb-4">Destination Not Found</h3>
                <p className="text-xs text-charcoal-600 max-w-sm mb-6">
                  The pathway you seek does not exist on our India travel map. Let us guide you back home.
                </p>
                <a href="/" className="btn-gold text-xs uppercase tracking-wider py-3 px-6">
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
