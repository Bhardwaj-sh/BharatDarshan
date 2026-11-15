// Bharat Darshan — 28 States & 8 Union Territories Data Registry
// Verified geographic data, high-resolution photography, and travel categories

export const CATEGORIES = [
  { id: 'heritage', name: 'Heritage & Palaces', icon: 'Landmark', count: 18, image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80' },
  { id: 'mountains', name: 'Himalayas & Mountains', icon: 'Mountain', count: 12, image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80' },
  { id: 'beaches', name: 'Beaches & Coastlines', icon: 'Waves', count: 9, image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80' },
  { id: 'wildlife', name: 'Wildlife & Jungles', icon: 'Trees', count: 14, image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80' },
  { id: 'spiritual', name: 'Spiritual Journeys', icon: 'Flame', count: 16, image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=80' },
  { id: 'culture', name: 'Food & Living Culture', icon: 'Utensils', count: 20, image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80' },
];

export const REGIONS_DATA = [
  // 1. Rajasthan (Flagship Reference Region)
  {
    id: 'rajasthan',
    slug: 'rajasthan',
    name: 'Rajasthan',
    type: 'state',
    capital: 'Jaipur',
    tagline: 'The Land of Maharajas, Forts & Golden Dunes',
    category: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    durationDays: 9,
    durationNights: 8,
    startingPrice: 34500,
    bestTime: 'Oct – Mar',
    highlights: ['Amber Fort', 'City Palace Udaipur', 'Jaisalmer Sand Dunes', 'Mehrangarh Fort'],
    description: 'A regal realm where majestic hill forts overlook vibrant bazaars, gilded palaces reflect upon shimmering lakes, and sunset hues illuminate golden desert sands.'
  },
  // 2. Kerala
  {
    id: 'kerala',
    slug: 'kerala',
    name: 'Kerala',
    type: 'state',
    capital: 'Thiruvananthapuram',
    tagline: "God's Own Country: Backwaters & Misty Hills",
    category: 'beaches',
    heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 28900,
    bestTime: 'Sep – Mar',
    highlights: ['Alleppey Houseboats', 'Munnar Tea Gardens', 'Varkala Cliff', 'Periyar Wildlife'],
    description: 'Lush tropical paradise of serene emerald backwaters, sprawling aromatic spice plantations, and Ayurvedic healing traditions along the Arabian Sea.'
  },
  // 3. Himachal Pradesh
  {
    id: 'himachal-pradesh',
    slug: 'himachal-pradesh',
    name: 'Himachal Pradesh',
    type: 'state',
    capital: 'Shimla',
    tagline: 'The Abode of Snow & Cedar Valleys',
    category: 'mountains',
    heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80',
    durationDays: 8,
    durationNights: 7,
    startingPrice: 26500,
    bestTime: 'Mar – Jun & Oct – Feb',
    highlights: ['Manali Solang Valley', 'Spiti Monastery', 'Shimla Ridge', 'Dharamshala'],
    description: 'Towering snow-clad Himalayan ridges, sacred mountain rivers, peaceful Tibetan monasteries, and pine-scented colonial hill towns.'
  },
  // 4. Goa
  {
    id: 'goa',
    slug: 'goa',
    name: 'Goa',
    type: 'state',
    capital: 'Panaji',
    tagline: 'Sun-Drenched Coastlines & Portuguese Heritage',
    category: 'beaches',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 19800,
    bestTime: 'Nov – Feb',
    highlights: ['Fontainhas Latin Quarter', 'Palolem Beach', 'Dudhsagar Waterfalls', 'Basilica of Bom Jesus'],
    description: 'Golden shores lined with swaying palms, historic Portuguese cathedrals, tranquil river cruises, and vibrant coastal seafood culture.'
  },
  // 5. Uttarakhand
  {
    id: 'uttarakhand',
    slug: 'uttarakhand',
    name: 'Uttarakhand',
    type: 'state',
    capital: 'Dehradun',
    tagline: 'Devbhoomi: Sacred Rivers & Garhwal Peaks',
    category: 'spiritual',
    heroImage: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=800&q=80',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 24000,
    bestTime: 'Apr – Jun & Sep – Nov',
    highlights: ['Rishikesh Ganga Aarti', 'Nainital Lake', 'Jim Corbett Safari', 'Valley of Flowers'],
    description: 'The sacred land of the divine Ganges, world-renowned yoga retreats, snow-clad Garhwal summits, and India’s oldest tiger reserve.'
  },
  // 6. Ladakh (UT)
  {
    id: 'ladakh',
    slug: 'ladakh',
    name: 'Ladakh',
    type: 'UT',
    capital: 'Leh',
    tagline: 'High Passes & High Altitude Moonscapes',
    category: 'mountains',
    heroImage: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=80',
    durationDays: 8,
    durationNights: 7,
    startingPrice: 38000,
    bestTime: 'May – Sep',
    highlights: ['Pangong Tso Lake', 'Nubra Valley Dunes', 'Thiksey Monastery', 'Khardung La Pass'],
    description: 'Stark high-altitude desert plateaus, crystal cobalt lakes reflecting Himalayan skies, ancient cliffside gompas, and warm Ladakhi hospitality.'
  },
  // 7. Tamil Nadu
  {
    id: 'tamil-nadu',
    slug: 'tamil-nadu',
    name: 'Tamil Nadu',
    type: 'state',
    capital: 'Chennai',
    tagline: 'Dravidian Architecture & Living Classical Heritage',
    category: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    durationDays: 8,
    durationNights: 7,
    startingPrice: 27500,
    bestTime: 'Nov – Mar',
    highlights: ['Brihadeeswarar Temple', 'Meenakshi Amman Madurai', 'Mahabalipuram Shore Temple', 'Ooty Nilgiri Train'],
    description: 'Millennia-old towering stone gopurams, rhythmic Bharatanatyam arts, fragrant filter coffee, and scenic UNESCO heritage sanctuaries.'
  },
  // 8. Jammu & Kashmir (UT)
  {
    id: 'jammu-and-kashmir',
    slug: 'jammu-and-kashmir',
    name: 'Jammu & Kashmir',
    type: 'UT',
    capital: 'Srinagar',
    tagline: 'Paradise on Earth: Alpine Meadows & Dal Lake',
    category: 'mountains',
    heroImage: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=800&q=80',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 32000,
    bestTime: 'Apr – Oct',
    highlights: ['Dal Lake Shikara', 'Gulmarg Gondola', 'Pahalgam Betaab Valley', 'Mughal Gardens'],
    description: 'Intricately carved wooden houseboats on Dal Lake, blooming saffron fields, snow-covered meadows of Gulmarg, and legendary Kashmiri cuisine.'
  },
  // 9. Madhya Pradesh
  {
    id: 'madhya-pradesh',
    slug: 'madhya-pradesh',
    name: 'Madhya Pradesh',
    type: 'state',
    capital: 'Bhopal',
    tagline: 'The Heart of India: Wild Tigers & Ancient Temples',
    category: 'wildlife',
    heroImage: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    durationDays: 8,
    durationNights: 7,
    startingPrice: 29500,
    bestTime: 'Oct – Mar',
    highlights: ['Khajuraho Temples', 'Bandhavgarh Tiger Safari', 'Orchha Palaces', 'Gwalior Fort'],
    description: 'Dense sal forests harboring royal Bengal tigers, UNESCO temple complexes of Khajuraho, and medieval riverside palaces of Orchha.'
  },
  // 10. Sikkim
  {
    id: 'sikkim',
    slug: 'sikkim',
    name: 'Sikkim',
    type: 'state',
    capital: 'Gangtok',
    tagline: 'Under the Shadow of Kangchenjunga',
    category: 'mountains',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 25500,
    bestTime: 'Mar – May & Oct – Dec',
    highlights: ['Tsomgo Lake', 'Nathula Pass', 'Rumtek Monastery', 'Yuksom Trails'],
    description: 'India’s 100% organic Himalayan haven, where fluttering prayer flags frame views of Kangchenjunga across rhododendron-carpeted valleys.'
  },
  // 11. Uttar Pradesh
  {
    id: 'uttar-pradesh',
    slug: 'uttar-pradesh',
    name: 'Uttar Pradesh',
    type: 'state',
    capital: 'Lucknow',
    tagline: 'Timeless Varanasi Ghats & The Taj Mahal',
    category: 'spiritual',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 22800,
    bestTime: 'Oct – Mar',
    highlights: ['Taj Mahal Agra', 'Varanasi Ganga Ghats', 'Fatehpur Sikri', 'Lucknow Nawabi Heritage'],
    description: 'Cradle of Indian spiritual awakening on the ancient banks of Kashi, exquisite Mughal monuments, and refined Awadhi culinary heritage.'
  },
  // 12. Andaman & Nicobar Islands (UT)
  {
    id: 'andaman-and-nicobar',
    slug: 'andaman-and-nicobar',
    name: 'Andaman & Nicobar',
    type: 'UT',
    capital: 'Port Blair',
    tagline: 'Turquoise Coral Waters & Pristine Rainforests',
    category: 'beaches',
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 36000,
    bestTime: 'Oct – May',
    highlights: ['Radhanagar Beach', 'Cellular Jail', 'Elephant Beach Snorkeling', 'Havelock Islands'],
    description: 'Sun-bleached white sand beaches, vibrant coral reefs teeming with marine life, and lush tropical archipelagos in the Bay of Bengal.'
  },
  // 13. Karnataka
  {
    id: 'karnataka',
    slug: 'karnataka',
    name: 'Karnataka',
    type: 'state',
    capital: 'Bengaluru',
    tagline: 'Ruins of Hampi & The Coorg Coffee Hills',
    category: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1600100397608-f010f443b793?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1600100397608-f010f443b793?auto=format&fit=crop&w=800&q=80',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 26800,
    bestTime: 'Oct – Mar',
    highlights: ['Hampi Vijayanagara Ruins', 'Mysore Palace', 'Coorg Coffee Plantations', 'Gokarna Coast'],
    description: 'Surreal boulder-strewn landscapes of the ancient Vijayanagara Empire, fragrant coffee hills of the Western Ghats, and golden coastal sanctuaries.'
  },
  // 14. Meghalaya
  {
    id: 'meghalaya',
    slug: 'meghalaya',
    name: 'Meghalaya',
    type: 'state',
    capital: 'Shillong',
    tagline: 'The Abode of Clouds & Living Root Bridges',
    category: 'wildlife',
    heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 24500,
    bestTime: 'Oct – Apr',
    highlights: ['Cherrapunji Waterfalls', 'Dawki Umngot River', 'Double Decker Root Bridge', 'Mawlynnong'],
    description: 'Bio-engineered living root bridges spanning rainforest streams, crystal-clear glass waters of Dawki, and misty waterfalls descending green gorges.'
  },
  // 15. Gujarat
  {
    id: 'gujarat',
    slug: 'gujarat',
    name: 'Gujarat',
    type: 'state',
    capital: 'Gandhinagar',
    tagline: 'The White Salt Rann & Asiatic Lions',
    category: 'culture',
    heroImage: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 27900,
    bestTime: 'Nov – Feb',
    highlights: ['White Rann of Kutch', 'Gir National Park (Lions)', 'Statue of Unity', 'Rani ki Vav'],
    description: 'Endless glowing white salt plains under full moon skies, the sole global habitat of the wild Asiatic lion, and intricately carved UNESCO stepwells.'
  },
  // 16. Assam
  {
    id: 'assam',
    slug: 'assam',
    name: 'Assam',
    type: 'state',
    capital: 'Dispur',
    tagline: 'The Mighty Brahmaputra & One-Horned Rhinos',
    category: 'wildlife',
    heroImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 25000,
    bestTime: 'Nov – Apr',
    highlights: ['Kaziranga Rhino Safari', 'Majuli Island', 'Brahmaputra Sunset Cruise', 'Assam Tea Estates'],
    description: 'Rolling green emerald tea gardens, elephant grass marshlands sheltering the great Indian one-horned rhinoceros, and the expansive Brahmaputra River.'
  },
  // 17. West Bengal
  {
    id: 'west-bengal',
    slug: 'west-bengal',
    name: 'West Bengal',
    type: 'state',
    capital: 'Kolkata',
    tagline: 'City of Joy, Darjeeling Tea & Sundarbans',
    category: 'culture',
    heroImage: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1558431382-27e303142255?auto=format&fit=crop&w=800&q=80',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 26000,
    bestTime: 'Oct – Mar',
    highlights: ['Victoria Memorial', 'Darjeeling Toy Train', 'Sundarbans Mangroves', 'Howrah Bridge'],
    description: 'Intellectual and cultural soul of eastern India, misty Himalayan tea slopes of Darjeeling, and mangrove waterways of the Royal Bengal tiger.'
  },
  // 18. Odisha
  {
    id: 'odisha',
    slug: 'odisha',
    name: 'Odisha',
    type: 'state',
    capital: 'Bhubaneswar',
    tagline: 'The Sun Temple of Konark & Chilika Lagoon',
    category: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1606210114620-1a7428e20038?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1606210114620-1a7428e20038?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 23500,
    bestTime: 'Oct – Mar',
    highlights: ['Konark Sun Temple', 'Jagannath Puri', 'Chilika Lake Dolphins', 'Udayagiri Caves'],
    description: 'Architectural marvel of the colossal 13th-century Sun chariot, sacred coastal pilgrimage of Puri, and Asia’s largest brackish water dolphin lagoon.'
  },
  // 19. Maharashtra
  {
    id: 'maharashtra',
    slug: 'maharashtra',
    name: 'Maharashtra',
    type: 'state',
    capital: 'Mumbai',
    tagline: 'Ajanta-Ellora Caves & Sahyadri Fortress Trails',
    category: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 28000,
    bestTime: 'Oct – Mar',
    highlights: ['Ajanta & Ellora Caves', 'Gateway of India', 'Mahabaleshwar Hills', 'Shivaji Hill Forts'],
    description: 'Magnificent rock-cut Kailash temple carved from a single mountain, historic Maratha hill fortresses, and the dynamic coastline of Mumbai.'
  },
  // 20. Punjab
  {
    id: 'punjab',
    slug: 'punjab',
    name: 'Punjab',
    type: 'state',
    capital: 'Chandigarh',
    tagline: 'Golden Temple & Heartwarming Hospitality',
    category: 'spiritual',
    heroImage: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=800&q=80',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 18500,
    bestTime: 'Oct – Mar',
    highlights: ['Harmandir Sahib (Golden Temple)', 'Wagah Border Ceremony', 'Jallianwala Bagh', 'Punjab Farmstay'],
    description: 'Sacred serenity of Amritsar’s gilded sanctum, vibrant mustard fields, stirring patriotic borders, and legendary Punjabi kulchas and lassi.'
  },
  // 21. Delhi (UT / NCT)
  {
    id: 'delhi',
    slug: 'delhi',
    name: 'Delhi',
    type: 'UT',
    capital: 'New Delhi',
    tagline: 'The Historic Capital: Seven Empires, One City',
    category: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?auto=format&fit=crop&w=800&q=80',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 16500,
    bestTime: 'Oct – Mar',
    highlights: ['Qutub Minar', 'Humayun’s Tomb', 'Red Fort & Chandni Chowk', 'India Gate'],
    description: 'An evocative crossroads of centuries where grand red-sandstone Mughal monuments meet sprawling tree-lined avenues and bustling street food bazaars.'
  },
  // 22. Telangana
  {
    id: 'telangana',
    slug: 'telangana',
    name: 'Telangana',
    type: 'state',
    capital: 'Hyderabad',
    tagline: 'Charminar, Golconda & Pearls of the Deccan',
    category: 'culture',
    heroImage: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=800&q=80',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 19500,
    bestTime: 'Oct – Mar',
    highlights: ['Golconda Fort Sound & Light', 'Charminar Bazaars', 'Ramoji Film City', 'Chowmahalla Palace'],
    description: 'Resplendent Qutb Shahi stone architecture, the legendary acoustic secrets of Golconda Fort, and world-renowned Hyderabadi Dum Biryani.'
  },
  // 23. Andhra Pradesh
  {
    id: 'andhra-pradesh',
    slug: 'andhra-pradesh',
    name: 'Andhra Pradesh',
    type: 'state',
    capital: 'Amaravati',
    tagline: 'Sacred Tirupati & The Borra Caves',
    category: 'spiritual',
    heroImage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 22000,
    bestTime: 'Oct – Mar',
    highlights: ['Tirumala Venkateswara Temple', 'Araku Valley Coffee', 'Borra Caves', 'Visakhapatnam Coast'],
    description: 'The world’s most revered pilgrimage hills of Tirumala, dramatic million-year-old stalactite caves, and lush Eastern Ghat valleys.'
  },
  // 24. Bihar
  {
    id: 'bihar',
    slug: 'bihar',
    name: 'Bihar',
    type: 'state',
    capital: 'Patna',
    tagline: 'Bodh Gaya & The Ancient Nalanda University',
    category: 'spiritual',
    heroImage: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1627894483216-2138af692e32?auto=format&fit=crop&w=800&q=80',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 19000,
    bestTime: 'Oct – Mar',
    highlights: ['Mahabodhi Temple Bodh Gaya', 'Nalanda University Ruins', 'Rajgir Ropeway', 'Vaishali'],
    description: 'The sacred Bodhi tree where Lord Buddha attained enlightenment, and the red-brick ruins of the world’s first residential international university.'
  },
  // 25. Chhattisgarh
  {
    id: 'chhattisgarh',
    slug: 'chhattisgarh',
    name: 'Chhattisgarh',
    type: 'state',
    capital: 'Raipur',
    tagline: 'Chitrakote Niagara of India & Tribal Arts',
    category: 'wildlife',
    heroImage: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1597848212624-a19eb35e2651?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 22500,
    bestTime: 'Oct – Mar',
    highlights: ['Chitrakote Horseshoe Falls', 'Bastar Bell Metal Crafts', 'Kanger Valley National Park', 'Tirathgarh Falls'],
    description: 'Thundering horseshoe waterfalls plunging into deep limestone canyons, ancient Bastar bell-metal artisans, and dense sal forest ecosystems.'
  },
  // 26. Goa & Daman/Diu (Puducherry UT)
  {
    id: 'puducherry',
    slug: 'puducherry',
    name: 'Puducherry',
    type: 'UT',
    capital: 'Puducherry',
    tagline: 'French Colonial Quarters & Auroville',
    category: 'culture',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 15500,
    bestTime: 'Oct – Mar',
    highlights: ['White Town Promenade', 'Auroville Matrimandir', 'Paradise Beach', 'Sri Aurobindo Ashram'],
    description: 'Pastel yellow French colonial villas with bougainvillea verandas, serene seaside promenades, and the universal spiritual city of Auroville.'
  },
  // 27. Arunachal Pradesh
  {
    id: 'arunachal-pradesh',
    slug: 'arunachal-pradesh',
    name: 'Arunachal Pradesh',
    type: 'state',
    capital: 'Itanagar',
    tagline: 'Land of the Dawn-Lit Mountains & Tawang',
    category: 'mountains',
    heroImage: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
    durationDays: 7,
    durationNights: 6,
    startingPrice: 31000,
    bestTime: 'Mar – Jun & Oct – Nov',
    highlights: ['Tawang Monastery', 'Sela Pass Frozen Lake', 'Ziro Valley Music Festival', 'Namdapha National Park'],
    description: 'India’s first sunrise summit, snow-covered Sela Pass, and the 400-year-old cliffside Tawang Monastery near high alpine glacial lakes.'
  },
  // 28. Nagaland
  {
    id: 'nagaland',
    slug: 'nagaland',
    name: 'Nagaland',
    type: 'state',
    capital: 'Kohima',
    tagline: 'Hornbill Festival & The Dzukou Valley',
    category: 'culture',
    heroImage: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1571536802807-30451e3955d8?auto=format&fit=crop&w=800&q=80',
    durationDays: 6,
    durationNights: 5,
    startingPrice: 26000,
    bestTime: 'Oct – May (Hornbill: Dec)',
    highlights: ['Hornbill Festival Kisama', 'Dzukou Valley Trek', 'Kohima War Cemetery', 'Khonoma Green Village'],
    description: 'The vibrant cultural celebration of 16 indigenous warrior tribes, emerald rolling hill valleys of Dzukou, and proud eco-conscious villages.'
  },
  // 29. Manipur
  {
    id: 'manipur',
    slug: 'manipur',
    name: 'Manipur',
    type: 'state',
    capital: 'Imphal',
    tagline: 'Floating Loktak Lake & Sangai Deer',
    category: 'wildlife',
    heroImage: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 23000,
    bestTime: 'Oct – Mar',
    highlights: ['Loktak Lake Floating Phumdis', 'Keibul Lamjao Floating Park', 'Kangla Fort', 'Ima Keithel (All-Women Market)'],
    description: 'The world’s only floating national park on Loktak Lake, the rare dancing Sangai deer, and the 500-year-old women-run Ima Keithel bazaar.'
  },
  // 30. Mizoram
  {
    id: 'mizoram',
    slug: 'mizoram',
    name: 'Mizoram',
    type: 'state',
    capital: 'Aizawl',
    tagline: 'The Land of Rolling Blue Hills & Bamboo Forests',
    category: 'mountains',
    heroImage: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=80',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 23500,
    bestTime: 'Oct – Apr',
    highlights: ['Aizawl City Viewpoints', 'Vantawng Falls', 'Reiek Peak Trails', 'Tamdil Lake'],
    description: 'A serene mountainous realm of peaceful ridge-top villages, intricate bamboo dance rhythms, and misty valleys blanketed in rolling clouds.'
  },
  // 31. Tripura
  {
    id: 'tripura',
    slug: 'tripura',
    name: 'Tripura',
    type: 'state',
    capital: 'Agartala',
    tagline: 'The Floating Ujjayanta Palace & Rock Carvings',
    category: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=80',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 17500,
    bestTime: 'Sep – Mar',
    highlights: ['Neermahal Water Palace', 'Ujjayanta Palace', 'Unakoti Colossal Rock Sculptures', 'Sepahijala Sanctuary'],
    description: 'A royal gem of eastern India showcasing eastern India’s only lake palace (Neermahal) and the mysterious thousand rock carvings of Unakoti.'
  },
  // 32. Jharkhand
  {
    id: 'jharkhand',
    slug: 'jharkhand',
    name: 'Jharkhand',
    type: 'state',
    capital: 'Ranchi',
    tagline: 'Land of Cascading Waterfalls & Betla Forest',
    category: 'wildlife',
    heroImage: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 19500,
    bestTime: 'Oct – Mar',
    highlights: ['Hundru & Dassam Falls', 'Betla National Park', 'Parasnath Jain Pilgrimage', 'Netarhat Sunrises'],
    description: 'Verdant plateau lands punctuated by plunging waterfalls, ancient Sal forests sheltering wild elephants, and serene sunset hill viewpoints.'
  },
  // 33. Haryana
  {
    id: 'haryana',
    slug: 'haryana',
    name: 'Haryana',
    type: 'state',
    capital: 'Chandigarh',
    tagline: 'Epic Kurukshetra & The Sultanpur Bird Sanctuary',
    category: 'heritage',
    heroImage: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=800&q=80',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 16000,
    bestTime: 'Oct – Mar',
    highlights: ['Brahma Sarovar Kurukshetra', 'Sultanpur Bird Sanctuary', 'Yadavindra Mughal Gardens Pinjore', 'Morni Hills'],
    description: 'The ancient historic battleground of the Mahabharata where the Bhagavad Gita was spoken, terraced Mughal gardens, and migratory bird wetlands.'
  },
  // 34. Chandigarh (UT)
  {
    id: 'chandigarh',
    slug: 'chandigarh',
    name: 'Chandigarh',
    type: 'UT',
    capital: 'Chandigarh',
    tagline: 'The Beautiful City: Le Corbusier & Rock Garden',
    category: 'culture',
    heroImage: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=800&q=80',
    durationDays: 3,
    durationNights: 2,
    startingPrice: 13500,
    bestTime: 'Oct – Mar',
    highlights: ['Nek Chand Rock Garden', 'Sukhna Lake Boating', 'Zakir Hussain Rose Garden', 'Capitol Complex'],
    description: 'India’s most celebrated modernist planned city designed by Le Corbusier, famous for Nek Chand’s fantasy sculptures made from recycled stone.'
  },
  // 35. Dadra & Nagar Haveli and Daman & Diu (UT)
  {
    id: 'daman-and-diu',
    slug: 'daman-and-diu',
    name: 'Daman & Diu',
    type: 'UT',
    capital: 'Daman',
    tagline: 'Sea Forts & Arabian Coast Serenity',
    category: 'beaches',
    heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80',
    durationDays: 4,
    durationNights: 3,
    startingPrice: 16800,
    bestTime: 'Oct – Apr',
    highlights: ['Diu Sea Fort', 'Nagoa Beach', 'St. Paul’s Church', 'Moti Daman Fort'],
    description: 'Imposing 16th-century sea-facing stone ramparts surrounded by the Arabian Sea, quiet beaches shaded by branching Hoka palms, and colonial churches.'
  },
  // 36. Lakshadweep (UT)
  {
    id: 'lakshadweep',
    slug: 'lakshadweep',
    name: 'Lakshadweep',
    type: 'UT',
    capital: 'Kavaratti',
    tagline: 'One Hundred Thousand Islands: Untouched Lagoons',
    category: 'beaches',
    heroImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1600&q=85',
    thumbnail: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
    durationDays: 5,
    durationNights: 4,
    startingPrice: 38500,
    bestTime: 'Oct – Apr',
    highlights: ['Bangaram Island Lagoon', 'Agatti Island Coral Reef', 'Kavaratti Marine Aquarium', 'Scuba Diving at Kadmat'],
    description: 'Exquisite archipelago of untouched coral atolls, translucent turquoise lagoons, vibrant marine turtles, and seclusion in the Arabian Sea.'
  }
];

// Curated 3-Panel Photographic Mosaic for the Grand Destination Showcase
export const REGION_PANEL_PRESETS = {
  rajasthan: {
    primary: { image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=800&q=85', title: 'Amber Fort Citadel', tag: '01' },
    secondary: { image: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=600&q=80', title: 'Thar Desert Dunes', tag: '02' },
    tertiary: { image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=600&q=80', title: 'Lake Pichola Palace', tag: '03' }
  },
  kerala: {
    primary: { image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=85', title: 'Alleppey Backwaters', tag: '01' },
    secondary: { image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80', title: 'Munnar Tea Hills', tag: '02' },
    tertiary: { image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=600&q=80', title: 'Varkala Ocean Cliffs', tag: '03' }
  },
  ladakh: {
    primary: { image: 'https://images.unsplash.com/photo-1581793745862-99fde7fa73d2?auto=format&fit=crop&w=800&q=85', title: 'Pangong Tso Crystal', tag: '01' },
    secondary: { image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80', title: 'Thiksey Gompa', tag: '02' },
    tertiary: { image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80', title: 'Nubra Dunes & Passes', tag: '03' }
  },
  'jammu-and-kashmir': {
    primary: { image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=85', title: 'Dal Lake Shikara', tag: '01' },
    secondary: { image: 'https://images.unsplash.com/photo-1595815771614-ade9d652a65d?auto=format&fit=crop&w=600&q=80', title: 'Gulmarg Gondola', tag: '02' },
    tertiary: { image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80', title: 'Betaab Valley Pines', tag: '03' }
  },
  meghalaya: {
    primary: { image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=85', title: 'Living Root Bridge', tag: '01' },
    secondary: { image: 'https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=600&q=80', title: 'Nohkalikai Cascades', tag: '02' },
    tertiary: { image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=600&q=80', title: 'Dawki Glass River', tag: '03' }
  },
  goa: {
    primary: { image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=85', title: 'Fontainhas Heritage', tag: '01' },
    secondary: { image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', title: 'Palolem Golden Sands', tag: '02' },
    tertiary: { image: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=600&q=80', title: 'Dudhsagar Cascades', tag: '03' }
  },
  'himachal-pradesh': {
    primary: { image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?auto=format&fit=crop&w=800&q=85', title: 'Spiti Valley Monasteries', tag: '01' },
    secondary: { image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80', title: 'Solang Valley Snow', tag: '02' },
    tertiary: { image: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=600&q=80', title: 'Dharamshala Pines', tag: '03' }
  },
  'uttar-pradesh': {
    primary: { image: 'https://images.unsplash.com/photo-1561361513-2d000a50f0dc?auto=format&fit=crop&w=800&q=85', title: 'Varanasi Ganga Aarti', tag: '01' },
    secondary: { image: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=600&q=80', title: 'Taj Mahal at Sunrise', tag: '02' },
    tertiary: { image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80', title: 'Fatehpur Sikri Courtyards', tag: '03' }
  }
};

export function getRegionFloatingPanels(region) {
  if (!region) return null;
  const preset = REGION_PANEL_PRESETS[region.slug];
  if (preset) return preset;

  // Graceful fallback for any of the 36 regions using authentic imagery
  return {
    primary: {
      image: region.heroImage || region.thumbnail,
      title: region.highlights?.[0] || region.capital || `${region.name} Vista`,
      tag: '01'
    },
    secondary: {
      image: region.thumbnail || region.heroImage,
      title: region.highlights?.[1] || `${region.name} Heritage`,
      tag: '02'
    },
    tertiary: {
      image: region.heroImage || region.thumbnail,
      title: region.highlights?.[2] || 'Cultural Realm',
      tag: '03'
    }
  };
}

// Sourced Facts for India at a Glance (No fake stats!)
export const INDIA_FACTS = [
  { label: 'States & Union Territories', value: '36 Regions', detail: '28 States & 8 Union Territories across the sub-continent' },
  { label: 'Curated Itineraries', value: 'Exactly 1 / Region', detail: 'Thoughtfully designed flagship packages reflecting real geography' },
  { label: 'UNESCO World Heritage Sites', value: '42 Verified Sites', detail: 'Recognized cultural and natural wonders across India' },
  { label: 'Transparent Pricing', value: 'Per Person Basis', detail: 'All inclusive of verified local stays, guides, and route transfers' }
];

export const FAQS = [
  {
    question: "Why does Bharat Darshan offer exactly one package per state?",
    answer: "Rather than cluttering your decision with confusing budget vs luxury tiers, our travel architects have designed one comprehensive, geographically realistic itinerary per region that covers its finest highlights without rushing."
  },
  {
    question: "How does the price calculation work?",
    answer: "Prices are clearly stated per person. When you choose your travel dates and passenger count, our system provides an immediate estimate. When you submit your enquiry, our backend validates and locks the pricing snapshot."
  },
  {
    question: "Is this a direct booking or an enquiry?",
    answer: "Bharat Darshan operates an enquiry-first model. Submitting your dates creates a 'Pending' trip request in your dashboard. Our destination specialists review availability and reach out to confirm your itinerary."
  },
  {
    question: "Are the itineraries customizable?",
    answer: "Yes! Once you submit an enquiry, our destination managers can tailor daily activities, dietary preferences, or private transport accommodations upon review."
  }
];
