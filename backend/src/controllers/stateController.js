import State from '../models/State.js';
import Package from '../models/Package.js';
import ItineraryDay from '../models/ItineraryDay.js';

// @desc    Get all states & UTs with optional filtering
// @route   GET /api/states
// @access  Public
export const getStates = async (req, res) => {
  try {
    const { search, type, category } = req.query;
    const query = {};

    if (type && type !== 'all') {
      query.type = type;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { capital: { $regex: search, $options: 'i' } },
        { highlights: { $regex: search, $options: 'i' } }
      ];
    }

    const states = await State.find(query).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: states.length,
      data: states
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching states'
    });
  }
};

// @desc    Get single state by slug with its official package & itinerary
// @route   GET /api/states/:slug
// @access  Public
export const getStateBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const state = await State.findOne({ slug: slug.toLowerCase() });

    if (!state) {
      return res.status(404).json({
        success: false,
        message: `Region not found with slug: ${slug}`
      });
    }

    // Retrieve the exactly ONE package for this region
    const tourPackage = await Package.findOne({ stateId: state._id, isActive: true });

    let itineraryDays = [];
    if (tourPackage) {
      itineraryDays = await ItineraryDay.find({ packageId: tourPackage._id }).sort({ dayNumber: 1 });
    }

    res.status(200).json({
      success: true,
      data: {
        state,
        package: tourPackage,
        itinerary: itineraryDays
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || 'Server error fetching region details'
    });
  }
};
