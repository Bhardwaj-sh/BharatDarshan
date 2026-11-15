import Package from '../models/Package.js';
import State from '../models/State.js';

// @desc    Get all packages
// @route   GET /api/packages
// @access  Public
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find({ isActive: true })
      .populate('stateId', 'name slug type capital heroImage')
      .sort({ pricePerPerson: 1 });

    res.status(200).json({
      success: true,
      count: packages.length,
      data: packages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get package by ID
// @route   GET /api/packages/:id
// @access  Public
export const getPackageById = async (req, res) => {
  try {
    const tourPackage = await Package.findById(req.params.id).populate('stateId');
    if (!tourPackage) {
      return res.status(404).json({
        success: false,
        message: 'Package not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tourPackage
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create package (Admin only) — Enforces ONE package per region
// @route   POST /api/packages
// @access  Admin
export const createPackage = async (req, res) => {
  try {
    const { stateId } = req.body;

    // Check if this region already has a package
    const existing = await Package.findOne({ stateId });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Violation of Bharat Darshan Core Rule: This state already has an active flagship package. Only one package per region is permitted.'
      });
    }

    const newPackage = await Package.create(req.body);

    res.status(201).json({
      success: true,
      data: newPackage
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};
