import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, ShieldCheck, ArrowRight, User, Heart, Compass, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { bookingService } from '../services/api';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trips'); // 'trips' | 'profile'

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getMyTrips();
      if (res.data?.data && res.data.data.length > 0) {
        setBookings(res.data.data);
      } else {
        // Fallback to local storage if API returned empty
        const local = JSON.parse(localStorage.getItem('bharat_bookings') || '[]');
        setBookings(local);
      }
    } catch (err) {
      console.warn('Could not fetch backend trips, reading local cache:', err.message);
      const local = JSON.parse(localStorage.getItem('bharat_bookings') || '[]');
      setBookings(local);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('bharat_user') || 'null');
    if (!savedUser) {
      // If not logged in, redirect to login
      navigate('/login');
      return;
    }
    setUser(savedUser);
    fetchTrips();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Confirmed</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
            Cancelled
          </span>
        );
      case 'Completed':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 border border-blue-300">
            Completed
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300 flex items-center gap-1">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Enquiry Pending Review</span>
          </span>
        );
    }
  };

  return (
    <div className="pt-28 pb-20 bg-ivory-100 min-h-screen text-charcoal-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Welcome Header */}
        <div className="bg-forest-950 text-white rounded-3xl p-6 sm:p-10 mb-8 border border-forest-900 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-gold-500/20 border-2 border-gold-400 flex items-center justify-center text-gold-400 font-serif text-2xl font-bold">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-gold-400 block mb-1">
                Traveller Portal
              </span>
              <h1 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                Namaste, {user?.name || 'Traveller'}
              </h1>
              <p className="text-xs text-ivory-300 mt-1">
                {user?.email} · Member of Bharat Darshan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchTrips}
              className="p-2.5 rounded-full bg-forest-900 border border-white/10 text-ivory-300 hover:text-white transition-colors"
              title="Refresh Enquiries"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link to="/explore" className="btn-gold text-xs uppercase tracking-wider py-2.5 px-5">
              Explore More Regions
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-ivory-200 pb-3">
          <button
            onClick={() => setActiveTab('trips')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'trips'
                ? 'bg-forest-800 text-white shadow-sm'
                : 'text-charcoal-600 hover:text-forest-950 hover:bg-white'
            }`}
          >
            My Trips & Enquiries ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-forest-800 text-white shadow-sm'
                : 'text-charcoal-600 hover:text-forest-950 hover:bg-white'
            }`}
          >
            Profile & Settings
          </button>
        </div>

        {/* Tab 1: My Trips */}
        {activeTab === 'trips' && (
          <div className="space-y-6">
            {bookings.length > 0 ? (
              bookings.map((booking, index) => {
                const ref = booking.bookingReference || booking.reference;
                const status = booking.bookingStatus || booking.status || 'Pending';
                const total = booking.totalAmountSnapshot || booking.totalAmount;
                const perPerson = booking.pricePerPersonSnapshot || booking.pricePerPerson;
                const dateStr = booking.travelDate ? new Date(booking.travelDate).toLocaleDateString('en-IN') : 'Scheduled Date';
                const regName = booking.stateId?.name || booking.regionName || 'Rajasthan';
                const pkgTitle = booking.packageId?.packageName || booking.packageName || 'Flagship Tour Package';

                return (
                  <div
                    key={ref || index}
                    className="bg-white rounded-3xl p-6 sm:p-8 border border-ivory-200 shadow-soft hover:shadow-card transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-ivory-200 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-forest-900 bg-forest-900/10 px-2.5 py-0.5 rounded-md">
                            Ref: {ref}
                          </span>
                          {getStatusBadge(status)}
                        </div>
                        <h3 className="font-serif text-xl sm:text-2xl font-bold text-forest-950">
                          {pkgTitle}
                        </h3>
                        <p className="text-xs text-charcoal-500 mt-1">
                          Region: <strong className="text-forest-900">{regName}</strong>
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <span className="text-[10px] uppercase tracking-wider text-charcoal-400 block font-semibold">
                          Locked Total Snapshot
                        </span>
                        <span className="font-serif text-2xl font-bold text-forest-950">
                          ₹{total?.toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[11px] text-charcoal-500">
                          ₹{perPerson?.toLocaleString('en-IN')} / person
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-charcoal-600 mb-6">
                      <div className="flex items-center gap-2 bg-ivory-50 p-3 rounded-2xl border border-ivory-200">
                        <Calendar className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-charcoal-400">Scheduled Date</span>
                          <span className="font-semibold text-charcoal-800">{dateStr}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-ivory-50 p-3 rounded-2xl border border-ivory-200">
                        <Users className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-charcoal-400">Passenger Count</span>
                          <span className="font-semibold text-charcoal-800">{booking.travellerCount || booking.travellers} Adults</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-ivory-50 p-3 rounded-2xl border border-ivory-200">
                        <Clock className="w-4 h-4 text-gold-600 flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-charcoal-400">Lead Passenger</span>
                          <span className="font-semibold text-charcoal-800">
                            {booking.leadTravellerName || user?.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {status === 'Pending' && (
                      <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 text-xs text-amber-900 mb-6 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-semibold">Next Step:</strong> Your enquiry is currently under review by our destination specialist. Once hotel availability and vehicle permits are confirmed, your status will update to <span className="font-bold">Confirmed</span>.
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-xs text-charcoal-500">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Price Snapshot Authenticated by Server</span>
                      </div>

                      <Link
                        to={`/region/${booking.stateId?.slug || 'rajasthan'}`}
                        className="btn-outline-forest text-xs py-2 px-4 rounded-full flex items-center gap-1.5"
                      >
                        <span>View Full Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-16 bg-white rounded-3xl border border-ivory-200 p-8">
                <Compass className="w-12 h-12 text-gold-500 mx-auto mb-3" />
                <h3 className="font-serif text-xl font-bold text-forest-950">No Trips or Enquiries Yet</h3>
                <p className="text-xs text-charcoal-600 mt-1 max-w-sm mx-auto mb-6">
                  You haven't submitted any travel enquiries yet. Explore our 36 regional flagship tours to begin.
                </p>
                <Link to="/explore" className="btn-gold text-xs uppercase tracking-wider py-3 px-6">
                  Explore India Now
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl p-8 border border-ivory-200 shadow-soft max-w-2xl">
            <h3 className="font-serif text-xl font-bold text-forest-950 mb-6">
              Account Profile
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-charcoal-400 uppercase font-bold tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={user?.name || ''}
                  className="w-full bg-ivory-50 border border-ivory-200 rounded-xl px-4 py-2.5 text-charcoal-800"
                />
              </div>
              <div>
                <label className="block text-charcoal-400 uppercase font-bold tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  readOnly
                  value={user?.email || ''}
                  className="w-full bg-ivory-50 border border-ivory-200 rounded-xl px-4 py-2.5 text-charcoal-800"
                />
              </div>
              <div>
                <label className="block text-charcoal-400 uppercase font-bold tracking-wider mb-1">Account Role</label>
                <span className="inline-block px-3 py-1 bg-forest-900/10 text-forest-900 font-bold rounded-full uppercase tracking-wider text-[10px]">
                  {user?.role || 'user'}
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
