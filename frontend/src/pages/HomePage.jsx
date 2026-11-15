import React from 'react';

// Cinematic Component Suite
import GrandShowcaseHero from '../components/home/GrandShowcaseHero';
import InteractiveIndiaMap from '../components/home/InteractiveIndiaMap';
import CinematicExperienceSection from '../components/home/CinematicExperienceSection';
import FeaturedMasterJourneys from '../components/home/FeaturedMasterJourneys';
import LivingCultureSection from '../components/home/LivingCultureSection';
import PlanYourJourney from '../components/home/PlanYourJourney';
import CinematicFinale from '../components/home/CinematicFinale';

export default function HomePage() {
  return (
    <div className="w-full overflow-hidden bg-midnight-950 text-slate-100 min-h-screen">
      <main className="relative">
        
        {/* 1. THE GRAND DESTINATION SHOWCASE HERO
               Full-screen authentic photographs across all 36 regions &
               the signature 3-panel floating photographic mosaic matching the reference layout */}
        <GrandShowcaseHero />

        {/* 2. AUTHENTIC INTERACTIVE INDIA MAP EXPLORER
               Real geographic satellite dark matter atlas with glowing coordinate beacons across all 36 regions */}
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
