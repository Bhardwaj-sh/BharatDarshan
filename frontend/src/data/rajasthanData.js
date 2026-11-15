// Comprehensive Rajasthan Reference Data — Verified Geography, Coordinates, Monuments, and Itinerary

export const RAJASTHAN_DATA = {
  id: 'rajasthan',
  slug: 'rajasthan',
  name: 'Rajasthan',
  type: 'state',
  capital: 'Jaipur',
  tagline: 'The Land of Maharajas, Forts & Golden Dunes',
  category: 'heritage',
  heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=2000&q=85',
  gallery: [
    'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1600100397608-f010f443b793?auto=format&fit=crop&w=1000&q=80'
  ],
  startingPrice: 34500,
  durationDays: 9,
  durationNights: 8,
  bestSeason: 'October to March',
  totalDistanceKm: 1150,
  routePath: ['Jaipur', 'Jodhpur', 'Jaisalmer', 'Udaipur'],

  introduction: {
    history: 'Inhabited by proud Rajput warrior dynasties for over a millennium, Rajasthan was historically divided into princely states including Mewar, Marwar, and Dhundhar. Each royal court patronized grand fortified citadels, intricate frescoed havelis, and exquisite miniaturist painting traditions that remain standing today.',
    geography: 'Spanning 342,239 sq km as India’s largest state, Rajasthan transitions dramatically from the ancient Aravalli mountain range—one of the world’s oldest geological formations—to the sweeping arid sands of the Great Indian Thar Desert in the west and fertile plains in the east.',
    culture: 'A kaleidoscope of folk expressions: the haunting melodies of the Manganiyar and Langa desert bards, the twirling Ghoomar and Kalbelia snake dances, hand-block printing in Bagru, and world-renowned blue pottery.',
    distinctive: 'Nowhere else does living royal heritage merge so seamlessly with everyday rural life: turbans dyed in vivid bandhani yellow and saffron, desert camel caravans, and opulent palaces floating upon pristine freshwater lakes.'
  },

  quickFacts: [
    { label: 'Tour Duration', value: '9 Days / 8 Nights' },
    { label: 'Cities Covered', value: 'Jaipur, Jodhpur, Jaisalmer, Udaipur' },
    { label: 'Attractions Included', value: '14 Royal Citadels & Palaces' },
    { label: 'Approximate Route Distance', value: '~1,150 km by AC Vehicle' },
    { label: 'Recommended Season', value: 'October to March (18°C – 28°C)' },
    { label: 'Starting Price', value: '₹34,500 per person' }
  ],

  majorAttractions: [
    {
      id: 'amber-fort',
      name: 'Amber Fort & Palace',
      city: 'Jaipur',
      image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
      description: 'UNESCO World Heritage hill fortress built from pale yellow and pink sandstone, celebrated for the dazzling Sheesh Mahal (Mirror Palace) where a single candle illuminates the entire hall.',
      visitorNotes: 'Open 8:00 AM – 5:30 PM. Elephant rides or Jeep transfers available to the Sun Gate.'
    },
    {
      id: 'mehrangarh-fort',
      name: 'Mehrangarh Fort',
      city: 'Jodhpur',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
      description: 'One of India’s most colossal fortresses rising 400 feet above the blue city of Jodhpur, containing museum galleries of royal palanquins, turbans, and cannon-mounted ramparts.',
      visitorNotes: 'Audio guides available. Breathtaking sunset views overlooking the indigo Brahmin rooftops.'
    },
    {
      id: 'sam-sand-dunes',
      name: 'Sam Sand Dunes & Thar Desert',
      city: 'Jaisalmer',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
      description: 'Rippling 30-meter high golden sand dunes in the Thar Desert. An evening safari on camelback followed by a fireside folk performance under star-studded desert skies.',
      visitorNotes: 'Best visited during late afternoon golden hour. Warm woolen layers recommended for desert nights.'
    },
    {
      id: 'city-palace-udaipur',
      name: 'City Palace & Lake Pichola',
      city: 'Udaipur',
      image: 'https://images.unsplash.com/photo-1600100397608-f010f443b793?auto=format&fit=crop&w=800&q=80',
      description: 'Mewar dynasty’s monumental granite and marble palace complex overlooking serene Lake Pichola, featuring mirror-inlaid courtyards and sunset boat cruises to Jag Mandir.',
      visitorNotes: 'Boat departures operate hourly until 5:00 PM from the Bansi Ghat jetty.'
    }
  ],

  // Verified Geographic Coordinates for Leaflet OpenStreetMap
  mapCoordinates: [
    { city: 'Jaipur (Start)', lat: 26.9124, lng: 75.7873, day: 'Day 1–3', label: 'Pink City: Amber Fort & Hawa Mahal' },
    { city: 'Jodhpur', lat: 26.2918, lng: 73.0169, day: 'Day 4–5', label: 'Blue City: Mehrangarh & Jaswant Thada' },
    { city: 'Jaisalmer', lat: 26.9157, lng: 70.9083, day: 'Day 6–7', label: 'Golden City: Sonar Qila & Sam Desert Dunes' },
    { city: 'Udaipur (Conclusion)', lat: 24.5854, lng: 73.7125, day: 'Day 8–9', label: 'City of Lakes: City Palace & Pichola' }
  ],

  cultureAndFood: {
    dishes: [
      { name: 'Dal Baati Churma', desc: 'Hard wheat balls baked over coal, dipped in pure ghee, served with spicy lentil curry and sweetened powdered wheat.' },
      { name: 'Ker Sangri', desc: 'Tangy, spicy desert bean and dried berry delicacy indigenous to the arid Thar landscape.' },
      { name: 'Laal Maas', desc: 'Fiery Rajput mutton curry simmered with Mathania red chillies, cloves, and smoked garlic.' },
      { name: 'Ghevar', desc: 'Disc-shaped honeycomb sweet pastry soaked in cardamom sugar syrup, traditionally savored during Teej.' }
    ],
    festivals: [
      { name: 'Pushkar Camel Fair (Nov)', desc: 'World’s most celebrated livestock gathering with decorated camels, folk bards, and holy lake baths.' },
      { name: 'Desert Festival Jaisalmer (Feb)', desc: 'Turban tying contests, folk puppet theater, and dune camel races against Thar sunsets.' }
    ],
    handicrafts: ['Jaipur Blue Pottery', 'Bagru Block Prints', 'Mojari Leather Footwear', 'Kundan & Meenakari Jewelry']
  },

  seasonalGuidance: [
    { season: 'Winter (Oct – Mar)', status: 'Peak / Ideal', temp: '10°C – 27°C', notes: 'Pleasant daytime sunshine and crisp evenings. Perfect for outdoor fort exploration and desert safaris.' },
    { season: 'Monsoon (Jul – Sep)', status: 'Moderate', temp: '25°C – 34°C', notes: 'Udaipur lakes replenish with water and the Aravalli hills turn verdant green. Lower tourist crowds.' },
    { season: 'Summer (Apr – Jun)', status: 'Off-Peak', temp: '32°C – 44°C', notes: 'Extremely hot desert temperatures. Early morning palace tours recommended; substantial off-season rates.' }
  ],

  // The Exactly ONE Tour Package
  package: {
    name: 'The Royal Rajasthan Grandeur: Palaces, Forts & Desert Sands',
    code: 'BD-RAJ-FLAGSHIP',
    duration: '9 Days / 8 Nights',
    pricePerPerson: 34500,
    destinations: 'Jaipur (2N) → Jodhpur (2N) → Jaisalmer (2N) → Udaipur (2N)',
    accommodation: 'Carefully curated 4-star heritage havelis & luxury Swiss desert camps with private en-suite facilities.',
    transportation: 'Chauffeur-driven private air-conditioned sedan/SUV with highway toll, parking, and interstate permits included.',
    inclusions: [
      '8 nights stay in verified heritage havelis & luxury desert camp',
      'Daily royal buffet breakfast & selected traditional dinners',
      'Private air-conditioned dedicated vehicle for all intercity transfers and sightseeing',
      'Sunset camel safari on Sam Sand Dunes with campfire folk performance',
      'Private Lake Pichola boat cruise ticket to Jag Mandir in Udaipur',
      'Government-licensed English/Hindi speaking monument guides',
      'All driver allowances, fuel, state road taxes, and toll permits'
    ],
    exclusions: [
      'Personal airfare or train tickets to Jaipur / from Udaipur',
      'Camera and video equipment fees at historical monuments',
      'Personal laundry, telephone calls, and personal gratuities/tips',
      'Any meals not specifically mentioned in the itinerary'
    ]
  },

  // Detailed Day-by-Day Itinerary (Key Editorial Feature)
  itinerary: [
    {
      day: 1,
      title: 'Arrival in Jaipur & The Pink City Bazaars',
      overview: 'Welcome to the royal capital of Rajasthan. Upon arrival at Jaipur International Airport or Railway Station, meet our courteous chauffeur and transfer to your heritage hotel. Spend a relaxed afternoon immersing yourself in the historic heart of the Pink City.',
      morning: 'Airport/Station reception and private transfer to your heritage hotel. Traditional welcome drink and check-in assistance.',
      afternoon: 'Wander through the bustling lanes of Johari Bazaar and Bapu Bazaar. Admire the honeycomb facade of the 5-story Hawa Mahal (Palace of Winds).',
      evening: 'Enjoy a curated welcome dinner featuring authentic Rajasthani vegetarian delicacies at a rooftop heritage restaurant.',
      distance: '25 km / 45 mins local transfer',
      stay: 'Heritage Haveli, Jaipur (e.g., Alsisar Haveli / Mandawa Haveli)',
      meal: 'Welcome Dinner included'
    },
    {
      day: 2,
      title: 'Jaipur Citadel Heritage: Amber Fort & Jantar Mantar',
      overview: 'Dedicate a full day exploring Jaipur’s greatest architectural marvels, beginning with the imposing Amber Fort nestled atop the rugged Cheel ka Teela hill.',
      morning: 'Ascend to Amber Fort. Marvel at the Diwan-e-Aam, the manicured Maota Lake gardens, and the dazzling mirror work of the Sheesh Mahal.',
      afternoon: 'Photo stop at Jal Mahal (Water Palace) floating in Man Sagar Lake. Visit the Maharaja’s City Palace and the UNESCO-listed astronomical observatory of Jantar Mantar.',
      evening: 'Visit a traditional artisan workshop to witness live block-printing and genuine gemstone cutting.',
      distance: '35 km city tour',
      stay: 'Heritage Haveli, Jaipur',
      meal: 'Buffet Breakfast included'
    },
    {
      day: 3,
      title: 'Jaipur to Jodhpur via Sacred Pushkar',
      overview: 'Depart the capital and journey west across the central Rajasthani plains, stopping at the sacred lakeside town of Pushkar.',
      morning: 'Scenic highway drive towards Pushkar. Visit the rare 14th-century Lord Brahma Temple and stroll along the sacred 52 bathing ghats.',
      afternoon: 'Continue through the pastoral Marwar countryside towards Jodhpur, the Blue City founded by Rao Jodha in 1459.',
      evening: 'Arrive in Jodhpur and check into your boutique haveli. Relax on the terrace with views of illuminated Mehrangarh Fort towering above the horizon.',
      distance: '335 km / ~6.5 hours drive',
      stay: 'Boutique Heritage Hotel, Jodhpur',
      meal: 'Buffet Breakfast included'
    },
    {
      day: 4,
      title: 'The Blue City: Mehrangarh Fort & Jaswant Thada',
      overview: 'An unforgettable morning exploring the ramparts of Mehrangarh Fort, followed by a stroll through the narrow indigo-washed alleys of old Jodhpur.',
      morning: 'Extensive guided exploration of Mehrangarh Fort. View the royal palanquins, the Phool Mahal (Flower Palace), and panoramic views of the blue skyline.',
      afternoon: 'Visit Jaswant Thada, a serene 19th-century white marble cenotaph set beside a quiet lake. Savor local Mirchi Vada and Makhaniya Lassi at the Clock Tower market.',
      evening: 'Leisurely walk through the vibrant Sardar Market. Watch local spice merchants and lacquer bangle craftsmen at work.',
      distance: '20 km local sightseeing',
      stay: 'Boutique Heritage Hotel, Jodhpur',
      meal: 'Buffet Breakfast included'
    },
    {
      day: 5,
      title: 'Jodhpur to Jaisalmer: Into the Heart of the Thar',
      overview: 'Travel deep into western Rajasthan towards the living desert fortress city of Jaisalmer, where yellow sandstone buildings give the city its golden glow.',
      morning: 'Depart Jodhpur on the scenic desert highway. Pass roadside gazelles, khejri trees, and colorful desert shepherd communities.',
      afternoon: 'Arrive in Jaisalmer. Check into your hotel. Catch your first glimpse of the Golden Fort (Sonar Qila) rising like a mirage above Trikuta Hill.',
      evening: 'Visit the scenic Gadisar Lake at sunset, surrounded by carved chhatris and sandstone temples.',
      distance: '285 km / ~5 hours drive',
      stay: 'Golden Sandstone Heritage Hotel, Jaisalmer',
      meal: 'Buffet Breakfast included'
    },
    {
      day: 6,
      title: 'Jaisalmer Fort & Sam Desert Dunes Camping',
      overview: 'Discover the world’s only fully inhabited medieval desert fort, then journey into the Thar Desert for an authentic dune camp experience.',
      morning: 'Guided walking tour inside Jaisalmer Fort. Explore the ornate Jain temples and the 7-story Patwon ki Haveli with its lace-like jharokhas.',
      afternoon: 'Drive towards Sam Sand Dunes (45 km). Check into your deluxe Swiss desert tent. Mount your camel for a sunset safari across the golden ripples.',
      evening: 'Traditional fireside Kalbelia dance performance, Manganiyar folk music, and a hearty desert dinner under the open Milky Way.',
      distance: '50 km / 1 hour drive to dunes',
      stay: 'Deluxe Swiss Desert Camp, Sam Dunes',
      meal: 'Buffet Breakfast & Desert Dinner included'
    },
    {
      day: 7,
      title: 'Jaisalmer to Udaipur via Ranakpur Jain Temples',
      overview: 'Traverse the picturesque Aravalli range south towards Udaipur, stopping at one of India’s most breathtaking architectural wonders.',
      morning: 'Early morning sunrise over the Thar dunes. Depart towards the verdant valleys of Mewar.',
      afternoon: 'Halt at Ranakpur to tour the magnificent 15th-century Chaumukha Jain Temple, supported by 1,444 uniquely carved white marble pillars.',
      evening: 'Descend into the romantic lakeside city of Udaipur. Check into your lakeside haveli overlooking Lake Pichola.',
      distance: '390 km / ~7.5 hours drive',
      stay: 'Lakeside Heritage Palace, Udaipur',
      meal: 'Buffet Breakfast included'
    },
    {
      day: 8,
      title: 'Udaipur: City Palace & Lake Pichola Sunset Cruise',
      overview: 'Immerse yourself in the poetry of Udaipur—known as the Venice of the East—with its marble palaces, courtyards, and tranquil waters.',
      morning: 'Visit the majestic City Palace complex. Tour the peacock courtyards, miniature art galleries, and the Queen’s private suites.',
      afternoon: 'Stroll through the lush Saheliyon ki Bari (Courtyard of the Maidens) with its lotus pools, marble elephants, and fountains.',
      evening: 'Private sunset boat cruise on Lake Pichola, gliding past the Taj Lake Palace and disembarking at Jag Mandir island palace for tea.',
      distance: '25 km local sightseeing',
      stay: 'Lakeside Heritage Palace, Udaipur',
      meal: 'Buffet Breakfast included'
    },
    {
      day: 9,
      title: 'Udaipur Departure — Cherished Memories of Rajasthan',
      overview: 'Conclude your journey through the royal realm of Rajasthan with a leisurely morning breakfast overlooking the morning mist upon Lake Pichola.',
      morning: 'Leisurely breakfast. Last-minute souvenir shopping for Mewari miniature paintings or silver handicrafts in the Old City.',
      afternoon: 'Check out and private transfer to Udaipur Maharana Pratap Airport (UDR) or Udaipur Railway Station for your onward journey home.',
      distance: '25 km / 45 mins airport transfer',
      stay: 'Journey Completed',
      meal: 'Buffet Breakfast included'
    }
  ]
};
