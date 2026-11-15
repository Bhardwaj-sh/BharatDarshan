import mongoose from 'mongoose';

const ItineraryDaySchema = new mongoose.Schema(
  {
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Every itinerary day must belong to a package']
    },
    dayNumber: {
      type: Number,
      required: [true, 'Day number is required'],
      min: [1, 'Day number must be at least 1']
    },
    title: {
      type: String,
      required: [true, 'Day title is required'],
      trim: true
    },
    overview: {
      type: String,
      required: [true, 'Day overview description is required']
    },
    morningActivities: { type: String, default: '' },
    afternoonActivities: { type: String, default: '' },
    eveningActivities: { type: String, default: '' },
    attractionsVisited: [{ type: String }],
    foodRecommendations: [{ type: String }],
    stay: { type: String, default: '' },
    meal: { type: String, default: '' },
    distance: { type: String, default: '' },
    images: [{ type: String }]
  },
  {
    timestamps: true
  }
);

// Compound Unique Index: prevents duplicate day numbers within the same package
ItineraryDaySchema.index({ packageId: 1, dayNumber: 1 }, { unique: true });

export default mongoose.model('ItineraryDay', ItineraryDaySchema);
