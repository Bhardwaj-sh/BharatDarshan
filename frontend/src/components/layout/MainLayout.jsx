import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col bg-midnight-950 text-slate-100 font-sans selection:bg-cyan-500 selection:text-midnight-950">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
