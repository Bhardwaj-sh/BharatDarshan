import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { RAJASTHAN_DATA } from '../data/rajasthanData';
import { REGIONS_DATA } from '../data/regionsData';
import { STATE_ATTRACTIONS_MAP } from '../data/attractionsData';
import { STATE_TOURISM_DETAILS } from '../data/stateTourismDetails';
import { REGION_GEO_COORDINATES } from '../data/mapCoordinates';
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

// Synchronous local region dataset builder for 0ms instantaneous navigation
const getLocalRegionData = (slug) => {
  const targetSlug = slug || 'rajasthan';

  if (!slug || slug === 'rajasthan') {
    return RAJASTHAN_DATA;
  }

  const found = REGIONS_DATA.find((r) => r.slug === targetSlug || r.id === targetSlug) || REGIONS_DATA[0];
  const tourism = STATE_TOURISM_DETAILS[targetSlug] || {};
  const attractions = STATE_ATTRACTIONS_MAP[targetSlug] || RAJASTHAN_DATA.majorAttractions;
  const geo = REGION_GEO_COORDINATES[targetSlug] || { lat: 26.9124, lng: 75.7873 };

  const pkgTitle = tourism.packages?.[0]?.title || `${found.name} Flagship Heritage & Culture Circuit`;
  const pkgPrice = tourism.packages?.[0]?.indicativePrice || found.startingPrice || 24999;
  const durationD = found.durationDays || 7;
  const durationN = found.durationNights || 6;

  // Custom route coordinates for Leaflet
  const mapCoordinates = [
    { day: 1, name: `${found.capital} Reception & Arrival`, lat: geo.lat, lng: geo.lng, description: `Arrival in the capital of ${found.name}. Orientation tour and boutique hotel check-in.` },
    { day: 2, name: `${attractions[0]?.name || found.name} Circuit`, lat: geo.lat + 0.12, lng: geo.lng + 0.14, description: attractions[0]?.description || 'Guided historical site visit and architectural photography.' },
    { day: 3, name: `${attractions[1]?.name || found.name} Cultural Route`, lat: geo.lat - 0.15, lng: geo.lng + 0.18, description: attractions[1]?.description || 'Immersive craft ateliers and scenic panoramic vistas.' },
    { day: 4, name: `${attractions[2]?.name || found.name} Scenic Excursion`, lat: geo.lat + 0.08, lng: geo.lng - 0.15, description: attractions[2]?.description || 'Natural wildlife sanctuary or heritage viewpoint tour.' },
    { day: 5, name: `${found.capital} Local Bazaars & Departure`, lat: geo.lat, lng: geo.lng, description: 'Authentic local shopping, farewell authentic high-tea, and airport transfer.' }
  ];

  // Tailored day-by-day itinerary
  const customItinerary = [
    {
      day: 1,
      title: `Arrival in ${found.capital} & Welcome Reception`,
      overview: `Welcome to ${found.name}. Meet our verified chauffeur upon arrival and transfer to your luxury heritage accommodation. Settle in and enjoy an introductory cultural evening.`,
      morning: 'Airport/Station reception, private SUV transfer, and welcome drink with traditional hospitality.',
      afternoon: `Orientation stroll through ${found.capital}'s signature avenues and heritage squares.`,
      evening: `Curated welcome dinner showcasing authentic ${found.name} cuisine and regional culinary traditions.`,
      stay: `Heritage Resort / 5-Star Boutique Haven, ${found.capital}`,
      meal: 'Welcome Dinner Included',
      distance: '20-30 km local transfer'
    },
    {
      day: 2,
      title: `Iconic Highlights: ${attractions[0]?.name || 'Historic Citadels'}`,
      overview: `Deep dive into the prime architectural wonder of the region: ${attractions[0]?.name || 'Prime Landmark'}. Guided walking exploration with our master historian.`,
      morning: `Visit ${attractions[0]?.name || 'the primary palace complex'} during crisp morning light for optimal photography.`,
      afternoon: 'Exclusive luncheon at a royal courtyard cafe followed by museum archive inspection.',
      evening: 'Sunset view from the premier scenic vantage point with artisan tea service.',
      stay: `Luxury Heritage Stay, ${found.name}`,
      meal: 'Breakfast & High-Tea Included',
      distance: '45 km guided circuit'
    },
    {
      day: 3,
      title: `Cultural Heritage: ${attractions[1]?.name || 'Artisan Hamlets'}`,
      overview: `Explore ${attractions[1]?.name || 'artisan hamlets and living heritage centers'}. Meet traditional craftspeople keeping centuries-old legacies alive.`,
      morning: `Hands-on masterclass with award-winning local artisans.`,
      afternoon: `Scenic transfer along historic trade routes and river basins.`,
      evening: 'Folk music recital and regional performing arts recital under starry skies.',
      stay: `Luxury Heritage Stay, ${found.name}`,
      meal: 'Breakfast Included',
      distance: '65 km scenic route'
    },
    {
      day: 4,
      title: `Scenic Splendor: ${attractions[2]?.name || 'Nature & Sacred Sanctuaries'}`,
      overview: `Immerse in the breathtaking landscapes of ${found.name}. Discover scenic river valleys, verdant plantations, or historic shrines.`,
      morning: `Early nature walk or architectural trail at ${attractions[2]?.name || 'nature reserve'}.`,
      afternoon: 'Leisurely picnic lunch featuring organic regional farm delicacies.',
      evening: 'Relaxing spa ritual or quiet leisure by the resort reflecting pools.',
      stay: `Luxury Heritage Stay, ${found.name}`,
      meal: 'Breakfast Included',
      distance: '50 km countryside route'
    },
    {
      day: 5,
      title: `Artisan Bazaars & Departure`,
      overview: `Final morning in ${found.name}. Visit verified fair-trade handloom centers for authentic souvenirs, followed by private chauffeur transfer to the departure hub.`,
      morning: `Shopping excursion with our local concierge for certified silk, spices, handicrafts, or jewelry.`,
      afternoon: 'Checkout assistance and private chauffeur transfer to airport or railway station.',
      evening: 'Board onward flight with unforgettable memories of Bharat Darshan.',
      stay: 'Onward Journey',
      meal: 'Gourmet Breakfast Included',
      distance: 'Private airport transfer'
    }
  ];

  return {
    ...found,
    id: found.slug,
    slug: found.slug,
    name: found.name,
    bestSeason: found.bestTime || 'October to March',
    gallery: tourism.gallery || [found.heroImage],
    startingPrice: pkgPrice,
    durationDays: durationD,
    durationNights: durationN,
    quickFacts: [
      { label: 'Tour Duration', value: `${durationD} Days / ${durationN} Nights` },
      { label: 'Capital', value: found.capital },
      { label: 'Category', value: found.category },
      { label: 'Major Hubs', value: found.capital },
      { label: 'Attractions Included', value: `${attractions.length} Curated Highlights` },
      { label: 'Recommended Season', value: found.bestTime || 'Oct – Mar' },
      { label: 'Starting Price', value: `₹${pkgPrice.toLocaleString('en-IN')}` }
    ],
    introduction: {
      history: `${found.name} possesses a vibrant civilizational history rooted in ancient Indian traditions, princely kingdoms, and timeless heritage.`,
      geography: tourism.geoIdentity || `Characterized by its unique regional landscape in ${found.category} India, featuring diverse topographies and breathtaking natural wonders.`,
      culture: tourism.culture || `Rich in regional language, folk performing arts, authentic craft traditions, and vibrant seasonal festivities.`,
      distinctive: found.description || `Experience the quintessential spirit of ${found.name} through bespoke private travel experiences.`
    },
    majorAttractions: attractions,
    mapCoordinates: mapCoordinates,
    cultureAndFood: {
      ...RAJASTHAN_DATA.cultureAndFood,
      cuisine: tourism.famousFood ? [
        { name: 'Regional Delicacies', desc: tourism.famousFood },
        { name: 'Heritage Sweets & Savories', desc: `Celebrated authentic dishes prepared with cold-pressed oils and regional spices.` }
      ] : RAJASTHAN_DATA.cultureAndFood.cuisine
    },
    seasonalGuidance: RAJASTHAN_DATA.seasonalGuidance,
    package: {
      ...RAJASTHAN_DATA.package,
      name: pkgTitle,
      packageName: pkgTitle,
      code: `BD-${found.slug.toUpperCase().slice(0, 3)}-01`,
      pricePerPerson: pkgPrice,
      durationDays: durationD,
      durationNights: durationN,
      destinationsCovered: [found.capital, attractions[0]?.name || found.name, attractions[1]?.name || 'Historic Circuit']
    },
    itinerary: customItinerary
  };
};

export default function RegionDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [regionData, setRegionData] = useState(() => getLocalRegionData(slug));
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedEnquiryParams, setSelectedEnquiryParams] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    // Instant zero-delay update when navigating between states
    const localData = getLocalRegionData(slug);
    setRegionData(localData);

    // Asynchronous background update from backend API if available
    let isSubscribed = true;
    const loadRegion = async () => {
      try {
        const targetSlug = slug || 'rajasthan';
        const res = await stateService.getBySlug(targetSlug);

        if (isSubscribed && res?.data?.data) {
          const { state, package: tourPkg, itinerary } = res.data.data;

          setRegionData((prev) => ({
            ...prev,
            id: state.slug,
            slug: state.slug,
            name: state.name || prev.name,
            type: state.type || prev.type,
            capital: state.capital || prev.capital,
            tagline: state.tagline || prev.tagline,
            category: state.category || prev.category,
            heroImage: state.heroImage || prev.heroImage,
            gallery: state.gallery?.length ? state.gallery : prev.gallery,
            startingPrice: tourPkg?.pricePerPerson || prev.startingPrice,
            durationDays: tourPkg?.durationDays || prev.durationDays,
            durationNights: tourPkg?.durationNights || prev.durationNights,
            bestSeason: state.bestTimeToVisit || prev.bestSeason,
            quickFacts: [
              { label: 'Tour Duration', value: `${tourPkg?.durationDays || prev.durationDays} Days / ${tourPkg?.durationNights || prev.durationNights} Nights` },
              { label: 'Major Hubs', value: tourPkg?.destinationsCovered?.join(', ') || prev.capital },
              { label: 'Attractions Included', value: `${state.highlights?.length || prev.majorAttractions.length} Highlights` },
              { label: 'Route Distance', value: `~${tourPkg?.totalDistanceKm || 1150} km Total` },
              { label: 'Recommended Season', value: state.bestTimeToVisit || prev.bestSeason },
              { label: 'Starting Price', value: `₹${(tourPkg?.pricePerPerson || prev.startingPrice).toLocaleString('en-IN')}` }
            ],
            introduction: {
              history: state.history || prev.introduction.history,
              geography: state.geography || prev.introduction.geography,
              culture: state.culture || prev.introduction.culture,
              distinctive: state.distinctive || prev.introduction.distinctive
            },
            majorAttractions: (state.majorAttractions && state.majorAttractions.length > 0 && state.majorAttractions.some(a => a.image))
              ? state.majorAttractions
              : prev.majorAttractions,
            mapCoordinates: (state.mapCoordinates && state.mapCoordinates.length > 0)
              ? state.mapCoordinates
              : prev.mapCoordinates,
            package: tourPkg || prev.package,
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
              : prev.itinerary
          }));
        }
      } catch (err) {
        // Silently use rich local dataset - no blocking loading screens or interruptions
      }
    };

    loadRegion();

    return () => {
      isSubscribed = false;
    };
  }, [slug]);

  const activeRegion = regionData || getLocalRegionData(slug);

  const handleOpenEnquiryModal = (params) => {
    const active = regionData || getLocalRegionData(slug);
    const currentUser = JSON.parse(localStorage.getItem('bharat_user') || 'null');

    const pendingBooking = {
      packageId: active.package?._id || '6afb8e893b848e1c801f1574',
      packageName: active.package?.packageName || active.package?.name || `${active.name} Tour Package`,
      regionSlug: active.slug,
      regionName: active.name,
      durationDays: active.durationDays || 7,
      durationNights: active.durationNights || 6,
      travelDate: params.travelDate,
      travellers: params.travellers,
      pricePerPerson: params.pricePerPerson,
      estimatedTotal: params.estimatedTotal,
      stateId: active.package?.stateId?._id || '6afb8e883b848e1c801f14bc'
    };

    localStorage.setItem('bharat_pending_booking', JSON.stringify(pendingBooking));

    if (!currentUser) {
      navigate('/login?redirect=/booking/confirm');
      return;
    }

    navigate('/booking/confirm');
  };

  return (
    <div className="w-full bg-[#05070F] text-slate-100">

      {/* 1. Cinematic Hero */}
      <RegionHero region={activeRegion} />

      {/* 2. Quick Facts Bar */}
      <QuickFactsBar facts={activeRegion.quickFacts} />

      {/* 3. Region Introduction */}
      <RegionIntro intro={activeRegion.introduction} name={activeRegion.name} />

      {/* 4. Major Attractions */}
      <AttractionGallery attractions={activeRegion.majorAttractions} />

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
              Verified geographic markers powered by Leaflet and OpenStreetMap. Track the logical circular route across {activeRegion.name}.
            </p>
          </div>

          <LeafletMap coordinates={activeRegion.mapCoordinates} />
        </div>
      </section>

      {/* 6. Main Itinerary & Price Calculator Dual Layout */}
      <section id="itinerary-section" className="py-24 bg-[#05070F] border-y border-white/10 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Left 8 Columns: Day-by-Day Timeline */}
            <div className="lg:col-span-8">
              <ItineraryTimeline days={activeRegion.itinerary} />
            </div>

            {/* Right 4 Columns: Sticky Price Calculator */}
            <div id="calculator-section" className="lg:col-span-4 scroll-mt-28">
              <PriceCalculator
                packageData={activeRegion.package}
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
                {activeRegion.package?.packageName || activeRegion.package?.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-semibold">
                Code: {activeRegion.package?.code} · Duration: {activeRegion.durationDays}D / {activeRegion.durationNights}N
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
                  {activeRegion.package?.inclusions?.map((inc, i) => (
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
                  {activeRegion.package?.exclusions?.map((exc, i) => (
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
        cultureData={activeRegion.cultureAndFood}
        seasons={activeRegion.seasonalGuidance}
      />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        packageData={activeRegion.package}
        enquiryParams={selectedEnquiryParams}
      />

    </div>
  );
}
