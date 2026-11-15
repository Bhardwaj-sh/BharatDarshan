import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      index: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
      required: [true, 'Booking must be linked to a tour package']
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'State',
      required: true
    },
    travelDate: {
      type: Date,
      required: [true, 'Please specify your planned travel date']
    },
    travellerCount: {
      type: Number,
      required: [true, 'Please specify the number of travellers'],
      min: [1, 'At least 1 traveller is required'],
      max: [20, 'For groups larger than 20, please submit an institutional enquiry']
    },
    // Historical Price Snapshots: Server calculated and locked
    pricePerPersonSnapshot: {
      type: Number,
      required: true,
      min: 0
    },
    totalAmountSnapshot: {
      type: Number,
      required: true,
      min: 0
    },
    leadTravellerName: {
      type: String,
      required: [true, 'Lead traveller name is required'],
      trim: true
    },
    leadTravellerEmail: {
      type: String,
      required: [true, 'Contact email address is required'],
      trim: true,
      lowercase: true
    },
    leadTravellerPhone: {
      type: String,
      required: [true, 'Contact phone number is required'],
      trim: true
    },
    specialRequests: {
      type: String,
      default: ''
    },
    bookingStatus: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending'
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Booking', BookingSchema);
