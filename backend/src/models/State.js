import mongoose from 'mongoose';

const AttractionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  city: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, default: '' },
  visitorNotes: { type: String, default: '' }
});

const StateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'State or UT name is required'],
      unique: true,
      trim: true
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      index: true
    },
    type: {
      type: String,
      enum: ['state', 'UT'],
      required: [true, 'Region type must be either state or UT']
    },
    capital: {
      type: String,
      required: true
    },
    tagline: {
      type: String,
      required: true
    },
    category: {
      type: String,
      enum: ['heritage', 'mountains', 'beaches', 'wildlife', 'spiritual', 'culture'],
      default: 'heritage'
    },
    description: {
      type: String,
      required: true
    },
    heroImage: {
      type: String,
      required: true
    },
    gallery: [{ type: String }],
    highlights: [{ type: String }],
    bestTimeToVisit: {
      type: String,
      default: 'October to March'
    },
    geography: { type: String, default: '' },
    history: { type: String, default: '' },
    culture: { type: String, default: '' },
    distinctive: { type: String, default: '' },
    majorAttractions: [AttractionSchema],
    mapCoordinates: [
      {
        city: String,
        lat: Number,
        lng: Number,
        day: String,
        label: String
      }
    ]
  },
  {
    timestamps: true
  }
);

export default mongoose.model('State', StateSchema);
