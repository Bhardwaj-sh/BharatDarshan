import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import HomePage from './pages/HomePage';

// Lazy-loaded route components for high performance and reduced initial bundle size
const ExplorePage = lazy(() => import('./pages/ExplorePage'));
const RegionDetailPage = lazy(() => import('./pages/RegionDetailPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const UserDashboard = lazy(() => import('./pages/UserDashboard'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

// Branded loading fallback while chunks resolve
const PageLoadingFallback = () => (
  <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4 text-center">
    <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mb-4" />
    <span className="text-xs font-mono tracking-widest text-slate-500 uppercase">Discovering Bharat...</span>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Suspense fallback={<PageLoadingFallback />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/explore/:slug" element={<RegionDetailPage />} />
            <Route path="/region/:slug" element={<RegionDetailPage />} />
            <Route path="/state/:slug" element={<RegionDetailPage />} />
            <Route path="/destination/:slug" element={<RegionDetailPage />} />
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
                <div className="min-h-[70vh] flex flex-col items-center justify-center pt-28 pb-16 px-4 text-center bg-midnight-950 text-white">
                  <h2 className="font-display text-7xl font-black text-cyan-400 mb-2">404</h2>
                  <h3 className="font-display text-2xl font-bold text-white mb-4">Destination Not Found</h3>
                  <p className="text-xs text-slate-300 max-w-sm mb-6 font-light">
                    The pathway you seek does not exist on our India travel map. Let us guide you back home.
                  </p>
                  <a href="/" className="btn-luxury-cyan text-xs uppercase tracking-wider py-3 px-6 rounded-full font-bold">
                    Return to Home
                  </a>
                </div>
              }
            />
          </Routes>
        </Suspense>
      </MainLayout>
    </BrowserRouter>
  );
}
