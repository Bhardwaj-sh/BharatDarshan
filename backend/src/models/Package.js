import mongoose from 'mongoose';

const PackageSchema = new mongoose.Schema(
  {
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: [true, 'Every tour package must be linked to a State or Union Territory'],
      unique: true // Database-level constraint: exactly ONE active package per region!
    },
    packageName: {
      type: String,
      required: [true, 'Package title is required'],
      trim: true
    },
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true
    },
    description: {
      type: String,
      required: true
    },
    durationDays: {
      type: Number,
      required: true,
      min: [1, 'Duration must be at least 1 day']
    },
    durationNights: {
      type: Number,
      required: true,
      min: [0, 'Nights cannot be negative']
    },
    pricePerPerson: {
      type: Number,
      required: [true, 'Price per person is required'],
      min: [0, 'Price per person cannot be negative']
    },
    destinationsCovered: [{ type: String }],
    totalDistanceKm: {
      type: Number,
      default: 0
    },
    inclusions: [{ type: String }],
    exclusions: [{ type: String }],
    accommodationSummary: {
      type: String,
      default: ''
    },
    transportationSummary: {
      type: String,
      default: ''
    },
    coverImage: {
      type: String,
      default: ''
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Package', PackageSchema);
