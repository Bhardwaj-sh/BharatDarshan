import React, { useState } from 'react';
import HeroSection from '../components/home/HeroSection';
import EditorialQuoteSection from '../components/home/EditorialQuoteSection';
import TrustedGuideSection from '../components/home/TrustedGuideSection';
import CherishedMemoryBanner from '../components/home/CherishedMemoryBanner';
import DestinationCarouselSection from '../components/home/DestinationCarouselSection';
import ExploreGrid from '../components/home/ExploreGrid';
import NaturalWondersSection from '../components/home/NaturalWondersSection';
import ExplorerStoriesSection from '../components/home/ExplorerStoriesSection';
import FaqSection from '../components/home/FaqSection';

export default function HomePage() {
  const [activeFilter, setActiveFilter] = useState(null);

  const handleSearchSelect = (searchQuery, category) => {
    setActiveFilter({ search: searchQuery, category: category });
    const target = document.getElementById('explore-regions');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full overflow-hidden bg-forest-900">
      {/* 1. Dark Forest Misty Hero with Tourism Watermark & Search Island */}
      <HeroSection onSearchSelect={handleSearchSelect} />

      {/* 2. Editorial Quote with Inline Image Pills & Brush Dividers */}
      <EditorialQuoteSection />

      {/* 3. White Section: "Explore Nature with a Trusted Guide" */}
      <TrustedGuideSection />

      {/* 4. Dark Panoramic Banner: "Every moment becomes a Cherished Memory" */}
      <CherishedMemoryBanner />

      {/* 5. White Section: 3D-Perspective Carousel ("Top Nature Destinations You Can Explore") */}
      <DestinationCarouselSection />

      {/* 6. Dark Section: Master Registry Grid (36 States & UTs with Filter Tabs) */}
      <ExploreGrid initialFilter={activeFilter} />

      {/* 7. White Section: "Beautiful Natural Wonders to Explore" */}
      <NaturalWondersSection />

      {/* 8. Dark Section: "Stories & Experiences from Explorers" */}
      <ExplorerStoriesSection />

      {/* 9. White Section: "Answers to Your Questions" (FAQ Accordions) */}
      <FaqSection />
    </div>
  );
}
