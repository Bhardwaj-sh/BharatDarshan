import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Play, Sparkles } from 'lucide-react';

// Cinematic & Editorial Suites
import CinematicIntro from '../components/home/CinematicIntro';
import IndiaSelectionMoment from '../components/home/IndiaSelectionMoment';
import ClassyWhiteHero from '../components/home/ClassyWhiteHero';
import InteractiveIndiaMap from '../components/home/InteractiveIndiaMap';
import CinematicExperienceSection from '../components/home/CinematicExperienceSection';
import FeaturedMasterJourneys from '../components/home/FeaturedMasterJourneys';
import LivingCultureSection from '../components/home/LivingCultureSection';
import PlanYourJourney from '../components/home/PlanYourJourney';
import CinematicFinale from '../components/home/CinematicFinale';

export default function HomePage() {
  // Check if visitor has already experienced the intro in this session
  const [cinematicStage, setCinematicStage] = useState(() => {
    try {
      const seen = sessionStorage.getItem('bharat_seen_cinematic_v3');
      return seen ? 'main' : 'main'; // Default to main for immediate classy experience, user can replay anytime
    } catch (e) {
      return 'main';
    }
  });

  const handleIntroComplete = () => {
    setCinematicStage('selection');
  };

  const handleSelectionComplete = () => {
    try {
      sessionStorage.setItem('bharat_seen_cinematic_v3', 'true');
    } catch (e) {}
    setCinematicStage('main');
  };

  const handleSkipToMain = () => {
    try {
      sessionStorage.setItem('bharat_seen_cinematic_v3', 'true');
    } catch (e) {}
    setCinematicStage('main');
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCinematicStage('intro');
  };

  return (
    <div className="w-full overflow-hidden bg-[#FAF6F0] text-slate-900 min-h-screen">
      
      {/* 1. Cinematic Opening Overlays (Unlocks on complete or skip) */}
      <AnimatePresence mode="wait">
        {cinematicStage === 'intro' && (
          <CinematicIntro
            key="cinematic-intro"
            onComplete={handleIntroComplete}
            onSkip={handleSkipToMain}
          />
        )}

        {cinematicStage === 'selection' && (
          <IndiaSelectionMoment
            key="india-selection"
            onComplete={handleSelectionComplete}
            onSkip={handleSkipToMain}
          />
        )}
      </AnimatePresence>

      {/* 2. Main Luxury Experience */}
      <main className="relative">
        
        {/* 1. CINEMATIC LUXURY HERO (EGYPT STYLE)
               Matching user reference layout:
               - Full-bleed panoramic Indian landscape with clear azure sky
               - Massive bold sans-serif display letters "INDIA"
               - 3 Column metric stats (50k+ Happy Travelers, 500+ Curated Journeys, 36 States & UTs)
               - White pill button [ Book Now (↗) ] with adjacent narrative quote
               - Seamless flow into 22-destination edge-to-edge carousel */}
        <ClassyWhiteHero onReplayIntro={handleReplayIntro} />

        {/* 2. AUTHENTIC INTERACTIVE INDIA MAP EXPLORER
               Multi-coloured geographical state map on crisp white/alabaster canvas with 
               clearly defined state borders, state name pills, and 1-package itinerary inspection */}
        <InteractiveIndiaMap />

        {/* 3. EXPLORE INDIA BY EXPERIENCE
               6 Panoramic photographic slabs (Himalayan Sanctuaries, Royal Desert Citadels, Coastal Lagoons, etc.) */}
        <CinematicExperienceSection />

        {/* 4. FEATURED MASTER JOURNEYS
               36 Flagships adhering strictly to 1-Tour-Per-Region with verified server pricing */}
        <FeaturedMasterJourneys />

        {/* 5. DISCOVER INDIAN CULTURE
               Editorial magazine layout: Monolithic Architecture, Living Festivals, Gastronomy, Master Looms */}
        <LivingCultureSection />

        {/* 6. PLAN YOUR JOURNEY
               Day-wise itineraries, accommodation, transportation, zero-trust server pricing snapshot */}
        <PlanYourJourney />

        {/* 7. FINAL CINEMATIC SCENE
               "INDIA IS WAITING. YOUR JOURNEY STARTS HERE." */}
        <CinematicFinale onExploreClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />

      </main>
    </div>
  );
}
