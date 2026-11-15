import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Sparkles, Play, Compass } from 'lucide-react';

// New Cinematic Component Suite
import CinematicIntro from '../components/home/CinematicIntro';
import IndiaSelectionMoment from '../components/home/IndiaSelectionMoment';
import GrandShowcaseHero from '../components/home/GrandShowcaseHero';
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
      const seen = sessionStorage.getItem('bharat_seen_cinematic_v2');
      return seen ? 'main' : 'intro';
    } catch (e) {
      return 'intro';
    }
  });

  const handleIntroComplete = () => {
    setCinematicStage('selection');
  };

  const handleSelectionComplete = () => {
    try {
      sessionStorage.setItem('bharat_seen_cinematic_v2', 'true');
    } catch (e) {}
    setCinematicStage('main');
  };

  const handleSkipToMain = () => {
    try {
      sessionStorage.setItem('bharat_seen_cinematic_v2', 'true');
    } catch (e) {}
    setCinematicStage('main');
  };

  const handleReplayIntro = () => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setCinematicStage('intro');
  };

  return (
    <div className="w-full overflow-hidden bg-midnight-950 text-slate-100 min-h-screen">
      
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
        
        {/* Floating Replay Intro Pill (Subtle top right control) */}
        {cinematicStage === 'main' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed top-24 right-6 z-40 hidden sm:block"
          >
            <button
              onClick={handleReplayIntro}
              title="Replay Cinematic Intro"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 hover:bg-cyan-500 hover:text-midnight-950 text-slate-300 border border-white/15 hover:border-cyan-400 backdrop-blur-md text-[11px] font-mono tracking-wider transition-all duration-300 shadow-2xl group cursor-pointer"
            >
              <Play className="w-3 h-3 text-cyan-400 group-hover:text-midnight-950 fill-current" />
              <span>Replay Intro</span>
            </button>
          </motion.div>
        )}

        {/* 1. THE GRAND DESTINATION SHOWCASE HERO
               Features full-screen photographs of all 36 regions &
               the signature 3-panel floating photographic mosaic matching the user's reference screenshot */}
        <GrandShowcaseHero />

        {/* 2. INTERACTIVE INDIA MAP EXPLORER
               Illuminated SVG map with all 28 States & 8 Union Territories */}
        <InteractiveIndiaMap />

        {/* 3. EXPLORE INDIA BY EXPERIENCE
               6 Panoramic photographic slabs (Mountains, Citadels, Lagoons, Sacred Corridors, Living Bridges, Traditions) */}
        <CinematicExperienceSection />

        {/* 4. FEATURED MASTER JOURNEYS
               36 Flagships adhering strictly to 1-Tour-Per-Region with verified server pricing */}
        <FeaturedMasterJourneys />

        {/* 5. DISCOVER INDIAN CULTURE
               Editorial magazine layout: Five Millennia Stonecraft, Living Festivals, Gastronomy, Master Looms */}
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
