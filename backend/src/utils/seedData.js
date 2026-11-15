import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import State from '../models/State.js';
import Package from '../models/Package.js';
import ItineraryDay from '../models/ItineraryDay.js';
import Booking from '../models/Booking.js';

// Import our rich frontend data registries
import { REGIONS_DATA } from '../../../frontend/src/data/regionsData.js';
import { RAJASTHAN_DATA } from '../../../frontend/src/data/rajasthanData.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Seeding Bharat Darshan database...');

    // 1. Clean existing records
    await User.deleteMany({});
    await State.deleteMany({});
    await Package.deleteMany({});
    await ItineraryDay.deleteMany({});
    await Booking.deleteMany({});
    console.log('Existing collections cleared.');

    // 2. Create Users
    const adminPasswordHash = await User.hashPassword('Admin@123');
    const userPasswordHash = await User.hashPassword('Travel@123');

    const adminUser = await User.create({
      name: 'Pooja (Admin)',
      email: 'admin@bharatdarshan.com',
      passwordHash: adminPasswordHash,
      role: 'admin'
    });

    const standardUser = await User.create({
      name: 'Aarav Sharma',
      email: 'aarav@example.com',
      passwordHash: userPasswordHash,
      role: 'user'
    });
    console.log(`Created default Admin (${adminUser.email}) and Traveller (${standardUser.email}).`);

    // 3. Seed all 36 States & Union Territories
    console.log(`Seeding 36 States & Union Territories...`);
    const createdStatesMap = new Map();

    for (const region of REGIONS_DATA) {
      const stateDoc = await State.create({
        name: region.name,
        slug: region.slug,
        type: region.type,
        capital: region.capital,
        tagline: region.tagline,
        category: region.category,
        description: region.description,
        heroImage: region.heroImage,
        gallery: [region.heroImage, region.thumbnail],
        highlights: region.highlights,
        bestTimeToVisit: region.bestTime,
        history: region.slug === 'rajasthan' ? RAJASTHAN_DATA.introduction.history : `${region.name} holds centuries of deep civilizational heritage in India.`,
        geography: region.slug === 'rajasthan' ? RAJASTHAN_DATA.introduction.geography : `Remarkable terrain and biodiversity unique to ${region.name}.`,
        culture: region.slug === 'rajasthan' ? RAJASTHAN_DATA.introduction.culture : `Vibrant regional folklore, handicrafts, and classical music traditions.`,
        distinctive: region.slug === 'rajasthan' ? RAJASTHAN_DATA.introduction.distinctive : region.description,
        majorAttractions: region.slug === 'rajasthan' 
          ? RAJASTHAN_DATA.majorAttractions 
          : region.highlights.map(h => ({ name: h, city: region.capital, description: `Iconic attraction in ${region.name}.` })),
        mapCoordinates: region.slug === 'rajasthan' ? RAJASTHAN_DATA.mapCoordinates : []
      });

      createdStatesMap.set(region.slug, stateDoc);
    }
    console.log(`Successfully seeded all ${createdStatesMap.size} regions!`);

    // 4. Create Flagship Packages (Exactly ONE package per state)
    console.log('Seeding official Flagship Tour Packages (1 per region)...');
    
    // Seed Rajasthan Package
    const rajasthanState = createdStatesMap.get('rajasthan');
    const rajasthanPkg = await Package.create({
      stateId: rajasthanState._id,
      packageName: RAJASTHAN_DATA.package.name,
      code: RAJASTHAN_DATA.package.code,
      description: RAJASTHAN_DATA.tagline,
      durationDays: RAJASTHAN_DATA.durationDays,
      durationNights: RAJASTHAN_DATA.durationNights,
      pricePerPerson: RAJASTHAN_DATA.startingPrice,
      destinationsCovered: ['Jaipur', 'Jodhpur', 'Jaisalmer', 'Udaipur'],
      totalDistanceKm: RAJASTHAN_DATA.totalDistanceKm,
      inclusions: RAJASTHAN_DATA.package.inclusions,
      exclusions: RAJASTHAN_DATA.package.exclusions,
      accommodationSummary: RAJASTHAN_DATA.package.accommodation,
      transportationSummary: RAJASTHAN_DATA.package.transportation,
      coverImage: RAJASTHAN_DATA.heroImage,
      isActive: true
    });

    // 5. Seed Rajasthan 9 Itinerary Days
    console.log('Seeding 9 detailed day-by-day itinerary records for Rajasthan...');
    for (const day of RAJASTHAN_DATA.itinerary) {
      await ItineraryDay.create({
        packageId: rajasthanPkg._id,
        dayNumber: day.day,
        title: day.title,
        overview: day.overview,
        morningActivities: day.morning,
        afternoonActivities: day.afternoon,
        eveningActivities: day.evening,
        stay: day.stay,
        meal: day.meal,
        distance: day.distance
      });
    }

    // Seed Packages for the remaining 35 regions
    for (const [slug, stateDoc] of createdStatesMap.entries()) {
      if (slug === 'rajasthan') continue;
      
      const region = REGIONS_DATA.find(r => r.slug === slug);
      const codeSuffix = region.slug.toUpperCase().replace(/-/g, '').slice(0, 8);
      await Package.create({
        stateId: stateDoc._id,
        packageName: `The Essential ${region.name} Discovery`,
        code: `BD-${codeSuffix}-01`,
        description: region.tagline,
        durationDays: region.durationDays,
        durationNights: region.durationNights,
        pricePerPerson: region.startingPrice,
        destinationsCovered: [region.capital, ...region.highlights.slice(0, 2)],
        totalDistanceKm: 450,
        inclusions: [
          `${region.durationNights} nights stay in verified hotels & local heritage retreats`,
          'Daily buffet breakfast & traditional regional dinners',
          'Dedicated private AC vehicle for transfers and sightseeing',
          'All driver allowances, toll permits, and local taxes'
        ],
        exclusions: [
          'Airfare or train tickets to destination',
          'Personal tips, laundry, and telephone calls'
        ],
        accommodationSummary: 'Curated 3-4 star regional retreats with authentic local character.',
        transportationSummary: 'Private AC chauffeur-driven transport throughout the tour.',
        coverImage: region.heroImage,
        isActive: true
      });
    }
    console.log('Successfully seeded all 36 tour packages with 1-to-1 region mapping!');

    // 6. Create Initial Booking Record
    await Booking.create({
      bookingReference: 'BD-RAJ-84912',
      userId: standardUser._id,
      packageId: rajasthanPkg._id,
      stateId: rajasthanState._id,
      travelDate: new Date('2026-12-15'),
      travellerCount: 2,
      pricePerPersonSnapshot: 34500,
      totalAmountSnapshot: 69000,
      leadTravellerName: 'Aarav Sharma',
      leadTravellerEmail: 'aarav@example.com',
      leadTravellerPhone: '+91 98765 43210',
      specialRequests: 'Heritage room facing lake; pure vegetarian meals.',
      bookingStatus: 'Pending'
    });
    console.log('Sample booking enquiry created.');

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding Error:', error);
    process.exit(1);
  }
};

seedDatabase();
