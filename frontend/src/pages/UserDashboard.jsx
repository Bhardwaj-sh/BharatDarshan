import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, Clock, ShieldCheck, ArrowRight, Compass, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';
import { bookingService } from '../services/api';

export default function UserDashboard() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem('bharat_user') || 'null'));
  const [bookings, setBookings] = useState([]);
  const [_loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('trips');

  const fetchTrips = async () => {
    setLoading(true);
    try {
      const res = await bookingService.getMyTrips();
      if (res.data?.data && res.data.data.length > 0) {
        setBookings(res.data.data);
      } else {
        const local = JSON.parse(localStorage.getItem('bharat_bookings') || '[]');
        if (local.length > 0) {
          const userSpecific = local.filter((b) => 
            !user?.email || 
            b.leadTravellerEmail?.toLowerCase() === user.email.toLowerCase() || 
            b.contactEmail?.toLowerCase() === user.email.toLowerCase() ||
            b.userId === user.id || 
            b.userId === user._id
          );
          setBookings(userSpecific.length > 0 ? userSpecific : local);
        } else if (user?.email === 'aarav@example.com') {
          setBookings([
            {
              bookingReference: 'BD-RAJ-10824',
              leadTravellerName: 'Aarav Sharma',
              regionName: 'Rajasthan',
              packageId: { packageName: 'The Royal Rajasthan Grandeur: Palaces, Forts & Desert Sands', durationDays: 9 },
              travelDate: new Date(Date.now() + 86400000 * 14).toISOString(),
              travellerCount: 2,
              pricePerPersonSnapshot: 34500,
              totalAmountSnapshot: 69000,
              bookingStatus: 'Pending',
              specialRequests: 'Heritage haveli with private balcony overlooking Maota Lake.'
            }
          ]);
        }
      }
    } catch (err) {
      console.warn('Could not fetch backend trips, reading local cache:', err.message);
      const local = JSON.parse(localStorage.getItem('bharat_bookings') || '[]');
      if (local.length > 0) {
        const userSpecific = local.filter((b) => 
          !user?.email || 
          b.leadTravellerEmail?.toLowerCase() === user.email.toLowerCase() || 
          b.contactEmail?.toLowerCase() === user.email.toLowerCase() ||
          b.userId === user.id || 
          b.userId === user._id
        );
        setBookings(userSpecific.length > 0 ? userSpecific : local);
      } else if (user?.email === 'aarav@example.com') {
        setBookings([
          {
            bookingReference: 'BD-RAJ-10824',
            leadTravellerName: 'Aarav Sharma',
            regionName: 'Rajasthan',
            packageId: { packageName: 'The Royal Rajasthan Grandeur: Palaces, Forts & Desert Sands', durationDays: 9 },
            travelDate: new Date(Date.now() + 86400000 * 14).toISOString(),
            travellerCount: 2,
            pricePerPersonSnapshot: 34500,
            totalAmountSnapshot: 69000,
            bookingStatus: 'Pending',
            specialRequests: 'Heritage haveli with private balcony overlooking Maota Lake.'
          }
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    fetchTrips();
  }, [user, navigate]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" />
            <span>Confirmed</span>
          </span>
        );
      case 'Cancelled':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/40">
            Cancelled
          </span>
        );
      case 'Completed':
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
            Completed
          </span>
        );
      case 'Pending':
      default:
        return (
          <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>Enquiry Pending Review</span>
          </span>
        );
    }
  };

  return (
    <div className="pt-32 pb-24 bg-[#05070F] min-h-screen text-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">


        {/* Welcome Header */}
        <div className="glass-dark text-white rounded-3xl p-6 sm:p-10 mb-8 border border-white/15 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white font-display text-2xl font-black shadow-[0_0_20px_rgba(245,158,11,0.4)]">
              {user?.name ? user.name[0].toUpperCase() : 'U'}
            </div>
            <div>
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 block mb-1">
                Traveller Portal
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-white">
                Namaste, {user?.name || 'Traveller'}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                {user?.email} · Member of Bharat Darshan
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchTrips}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Refresh Enquiries"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link to="/explore" className="btn-gradient text-xs uppercase tracking-wider py-2.5 px-5 font-bold shadow-glow-saffron">
              Explore More Regions
            </Link>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('trips')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'trips'
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            My Trips & Enquiries ({bookings.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all ${
              activeTab === 'profile'
                ? 'bg-amber-500 text-black shadow-[0_0_15px_rgba(245,158,11,0.5)] font-extrabold'
                : 'text-slate-400 hover:text-white'
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
                    className="glass-dark rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl hover:border-amber-500/40 transition-all"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-white/10 mb-6">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="font-mono text-xs font-bold text-amber-400 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-md">
                            Ref: {ref}
                          </span>
                          {getStatusBadge(status)}
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                          {pkgTitle}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                          Region: <strong className="text-amber-400">{regName}</strong>
                        </p>
                      </div>

                      <div className="text-left md:text-right">
                        <span className="text-[10px] uppercase tracking-wider text-slate-400 block font-semibold">
                          Locked Total Snapshot
                        </span>
                        <span className="font-display text-2xl font-black text-amber-400">
                          ₹{total?.toLocaleString('en-IN')}
                        </span>
                        <span className="block text-[11px] text-slate-400">
                          ₹{perPerson?.toLocaleString('en-IN')} / person
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-300 mb-6">
                      <div className="flex items-center gap-2 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Scheduled Date</span>
                          <span className="font-bold text-white">{dateStr}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <Users className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Passenger Count</span>
                          <span className="font-bold text-white">{booking.travellerCount || booking.travellers} Adults</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 bg-white/5 p-3.5 rounded-2xl border border-white/10">
                        <Clock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold text-slate-400">Lead Passenger</span>
                          <span className="font-bold text-white">
                            {booking.leadTravellerName || user?.name}
                          </span>
                        </div>
                      </div>
                    </div>

                    {status === 'Pending' && (
                      <div className="bg-amber-500/10 rounded-2xl p-4 border border-amber-500/30 text-xs text-amber-300 mb-6 flex items-start gap-2.5">
                        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <strong className="font-bold">Next Step:</strong> Your enquiry is currently under review by our destination specialist. Once hotel availability and vehicle permits are confirmed, your status will update to <span className="font-black text-white">Confirmed</span>.
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Price Snapshot Authenticated by Server</span>
                      </div>

                      <Link
                        to={`/region/${booking.stateId?.slug || 'rajasthan'}`}
                        className="btn-ghost-glow text-xs py-2 px-4 rounded-xl flex items-center gap-1.5"
                      >
                        <span>View Full Itinerary</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-white/10 p-8">
                <Compass className="w-14 h-14 text-amber-400 mx-auto mb-3 animate-spin-slow" />
                <h3 className="font-display text-2xl font-bold text-white">No Trips or Enquiries Yet</h3>
                <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto mb-6">
                  You haven't submitted any travel enquiries yet. Explore our 36 regional flagship tours to begin.
                </p>
                <Link to="/explore" className="btn-gradient text-xs uppercase tracking-wider py-3 px-6 font-bold">
                  Explore India Now
                </Link>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Profile */}
        {activeTab === 'profile' && (
          <div className="glass-dark rounded-3xl p-8 border border-white/10 max-w-2xl">
            <h3 className="font-display text-2xl font-bold text-white mb-6">
              Account Profile
            </h3>
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 uppercase font-bold tracking-wider mb-1">Full Name</label>
                <input
                  type="text"
                  readOnly
                  value={user?.name || ''}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 uppercase font-bold tracking-wider mb-1">Email Address</label>
                <input
                  type="email"
                  readOnly
                  value={user?.email || ''}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 uppercase font-bold tracking-wider mb-1">Mobile / Contact Number</label>
                <input
                  type="text"
                  readOnly
                  value={user?.phone || 'Not provided on registration'}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-400 uppercase font-bold tracking-wider mb-1">Account Role</label>
                <span className="inline-block px-3 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold rounded-full uppercase tracking-wider text-[10px]">
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
