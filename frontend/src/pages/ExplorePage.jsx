import React from 'react';
import { useLocation } from 'react-router-dom';
import ExploreGrid from '../components/home/ExploreGrid';

export default function ExplorePage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') || 'all';
  const initialSearch = searchParams.get('search') || '';

  return (
    <div className="pt-24 pb-16 bg-midnight-950 min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <ExploreGrid initialFilter={{ category: initialCategory, search: initialSearch, type: 'all' }} />
      </div>
    </div>
  );
}
