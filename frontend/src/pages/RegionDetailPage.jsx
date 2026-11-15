import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RAJASTHAN_DATA } from '../data/rajasthanData';
import { REGIONS_DATA } from '../data/regionsData';
import RegionHero from '../components/region/RegionHero';
import QuickFactsBar from '../components/region/QuickFactsBar';
import RegionIntro from '../components/region/RegionIntro';
import AttractionGallery from '../components/region/AttractionGallery';
import LeafletMap from '../components/region/LeafletMap';
import ItineraryTimeline from '../components/region/ItineraryTimeline';
import PriceCalculator from '../components/region/PriceCalculator';
import CultureSection from '../components/region/CultureSection';
import EnquiryModal from '../components/region/EnquiryModal';
import { stateService } from '../services/api';
import { Check, X, ShieldCheck, ArrowRight, Compass, Sparkles } from 'lucide-react';

export default function RegionDetailPage() {
  const { slug } = useParams();
  const [regionData, setRegionData] = useState(null);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedEnquiryParams, setSelectedEnquiryParams] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    const loadRegion = async () => {
      try {
        const targetSlug = slug || 'rajasthan';
        const res = await stateService.getBySlug(targetSlug);
        
        if (res.data?.data) {
          const { state, package: tourPkg, itinerary } = res.data.data;
          
          setRegionData({
            id: state.slug,
            slug: state.slug,
            name: state.name,
            type: state.type,
            capital: state.capital,
            tagline: state.tagline,
            category: state.category,
            heroImage: state.heroImage,
            gallery: state.gallery || [state.heroImage],
            startingPrice: tourPkg?.pricePerPerson || 34500,
            durationDays: tourPkg?.durationDays || 9,
            durationNights: tourPkg?.durationNights || 8,
            bestSeason: state.bestTimeToVisit || 'October to March',
            quickFacts: [
              { label: 'Tour Duration', value: `${tourPkg?.durationDays || 9} Days / ${tourPkg?.durationNights || 8} Nights` },
              { label: 'Major Hubs', value: tourPkg?.destinationsCovered?.join(', ') || state.capital },
              { label: 'Attractions Included', value: `${state.highlights?.length || 4} Highlights` },
              { label: 'Route Distance', value: `~${tourPkg?.totalDistanceKm || 1150} km Total` },
              { label: 'Recommended Season', value: state.bestTimeToVisit || 'Oct – Mar' },
              { label: 'Starting Price', value: `₹${tourPkg?.pricePerPerson?.toLocaleString('en-IN') || '34,500'}` }
            ],
            introduction: {
              history: state.history || RAJASTHAN_DATA.introduction.history,
              geography: state.geography || RAJASTHAN_DATA.introduction.geography,
              culture: state.culture || RAJASTHAN_DATA.introduction.culture,
              distinctive: state.distinctive || RAJASTHAN_DATA.introduction.distinctive
            },
            majorAttractions: (state.majorAttractions && state.majorAttractions.length > 0)
              ? state.majorAttractions
              : RAJASTHAN_DATA.majorAttractions,
            mapCoordinates: (state.mapCoordinates && state.mapCoordinates.length > 0)
              ? state.mapCoordinates
              : RAJASTHAN_DATA.mapCoordinates,
            cultureAndFood: RAJASTHAN_DATA.cultureAndFood,
            seasonalGuidance: RAJASTHAN_DATA.seasonalGuidance,
            package: tourPkg || RAJASTHAN_DATA.package,
            itinerary: (itinerary && itinerary.length > 0) 
              ? itinerary.map(d => ({
                  day: d.dayNumber,
                  title: d.title,
                  overview: d.overview,
                  morning: d.morningActivities,
                  afternoon: d.afternoonActivities,
                  evening: d.eveningActivities,
                  stay: d.stay || 'Heritage Haveli',
                  meal: d.meal || 'Breakfast Included',
                  distance: d.distance || 'Local transfer'
                }))
              : RAJASTHAN_DATA.itinerary
          });
          return;
        }
      } catch (err) {
        console.warn('Backend region load fallback to local dataset:', err.message);
      }

      // Fallback
      if (!slug || slug === 'rajasthan') {
        setRegionData(RAJASTHAN_DATA);
      } else {
        const found = REGIONS_DATA.find((r) => r.slug === slug) || REGIONS_DATA[0];
        setRegionData({
          ...found,
          bestSeason: found.bestTime,
          quickFacts: [
            { label: 'Tour Duration', value: `${found.durationDays}D / ${found.durationNights}N` },
            { label: 'Capital', value: found.capital },
            { label: 'Category', value: found.category },
            { label: 'Best Season', value: found.bestTime },
            { label: 'Starting Price', value: `₹${found.startingPrice.toLocaleString('en-IN')}` }
          ],
          introduction: {
            history: `${found.name} possesses a vibrant civilizational history rooted in ancient Indian traditions.`,
            geography: `Characterized by its unique regional landscape in India.`,
            culture: `Rich in regional language, folk performing arts, authentic craft traditions, and vibrant local celebrations.`,
            distinctive: found.description
          },
          majorAttractions: RAJASTHAN_DATA.majorAttractions,
          mapCoordinates: RAJASTHAN_DATA.mapCoordinates,
          cultureAndFood: RAJASTHAN_DATA.cultureAndFood,
          seasonalGuidance: RAJASTHAN_DATA.seasonalGuidance,
          package: RAJASTHAN_DATA.package,
          itinerary: RAJASTHAN_DATA.itinerary
        });
      }
    };

    loadRegion();
  }, [slug]);

  if (!regionData) {
    return (
      <div className="min-h-screen pt-36 pb-20 text-center flex flex-col items-center justify-center bg-[#05070F] text-white">
        <Compass className="w-14 h-14 text-amber-400 animate-spin-slow mb-4" />
        <h2 className="font-display text-2xl font-bold text-white">Connecting to Destination...</h2>
      </div>
    );
  }

  const handleOpenEnquiryModal = (params) => {
    setSelectedEnquiryParams(params);
    setEnquiryModalOpen(true);
  };

  return (
    <div className="w-full bg-[#05070F] text-slate-100">
      
      {/* 1. Cinematic Hero */}
      <RegionHero region={regionData} />

      {/* 2. Quick Facts Bar */}
      <QuickFactsBar facts={regionData.quickFacts} />

      {/* 3. Region Introduction */}
      <RegionIntro intro={regionData.introduction} name={regionData.name} />

      {/* 4. Major Attractions */}
      <AttractionGallery attractions={regionData.majorAttractions} />

      {/* 5. Interactive Leaflet Route Map */}
      <section className="py-24 bg-[#070A14] border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-10">
            <div className="badge-glow mb-3">
              <Compass className="w-3.5 h-3.5 text-amber-400" />
              <span>Geographic Realities</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-black text-white">
              Interactive Route & Stop Map
            </h2>
            <p className="text-base text-slate-400 mt-2 font-normal">
              Verified geographic markers powered by Leaflet and OpenStreetMap. Track the logical circular route across {regionData.name}.
            </p>
          </div>

          <LeafletMap coordinates={regionData.mapCoordinates} />
        </div>
      </section>

      {/* 6. Main Itinerary & Price Calculator Dual Layout */}
      <section id="itinerary-section" className="py-24 bg-[#05070F] border-y border-white/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left 8 Columns: Day-by-Day Timeline */}
            <div className="lg:col-span-8">
              <ItineraryTimeline days={regionData.itinerary} />
            </div>

            {/* Right 4 Columns: Sticky Price Calculator */}
            <div id="calculator-section" className="lg:col-span-4 scroll-mt-28">
              <PriceCalculator
                packageData={regionData.package}
                onOpenEnquiry={handleOpenEnquiryModal}
              />
            </div>

          </div>

        </div>
      </section>

      {/* 7. Package Inclusions & Exclusions Card */}
      <section className="py-24 bg-[#070A14] border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="glass-dark rounded-3xl p-8 sm:p-10 border border-white/15 shadow-2xl">
            <div className="mb-8">
              <span className="text-xs uppercase font-extrabold tracking-widest text-amber-400 block mb-2">
                Complete Package Details
              </span>
              <h3 className="font-display text-3xl sm:text-4xl font-black text-white">
                {regionData.package?.packageName || regionData.package?.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-semibold">
                Code: {regionData.package?.code} · Duration: {regionData.durationDays}D / {regionData.durationNights}N
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8 border-t border-white/10">
              
              {/* Inclusions */}
              <div>
                <h4 className="font-display text-lg font-bold text-emerald-400 mb-5 flex items-center gap-2">
                  <Check className="w-5 h-5 text-emerald-400" />
                  <span>What is Included in Your Tour</span>
                </h4>
                <ul className="space-y-3.5">
                  {regionData.package?.inclusions?.map((inc, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-3 font-normal">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0 shadow-[0_0_8px_#34D399]" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <h4 className="font-display text-lg font-bold text-rose-400 mb-5 flex items-center gap-2">
                  <X className="w-5 h-5 text-rose-400" />
                  <span>Exclusions & Notes</span>
                </h4>
                <ul className="space-y-3.5">
                  {regionData.package?.exclusions?.map((exc, i) => (
                    <li key={i} className="text-xs sm:text-sm text-slate-300 flex items-start gap-3 font-normal">
                      <span className="w-2 h-2 rounded-full bg-rose-400 mt-1.5 flex-shrink-0 shadow-[0_0_8px_#FB7185]" />
                      <span>{exc}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 8. Culture, Cuisine & Weather Guidance */}
      <CultureSection
        cultureData={regionData.cultureAndFood}
        seasons={regionData.seasonalGuidance}
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        packageData={regionData.package}
        enquiryParams={selectedEnquiryParams}
      />

    </div>
  );
}
