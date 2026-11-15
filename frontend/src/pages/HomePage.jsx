import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import EditorialIntro from '../components/home/EditorialIntro';
import ExploreGrid from '../components/home/ExploreGrid';
import CategoriesSection from '../components/home/CategoriesSection';
import IndiaFactsSection from '../components/home/IndiaFactsSection';
import FaqSection from '../components/home/FaqSection';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleSearchTrigger = (filterParams) => {
    setActiveFilter(filterParams);
  };

  return (
    <div className="w-full overflow-hidden">
      {/* 1. Cinematic Hero Section */}
      <HeroSection onSearch={handleSearchTrigger} />

      {/* 2. Editorial Statement with Inline Image Badges */}
      <EditorialIntro />

      {/* 3. Explore All 36 Regions */}
      <ExploreGrid initialFilter={activeFilter} />

      {/* 4. Travel Categories */}
      <CategoriesSection />

      {/* 5. India at a Glance (Verified Facts) */}
      <IndiaFactsSection />

      {/* 6. FAQ Accordion */}
      <FaqSection />
    </div>
  );
}
