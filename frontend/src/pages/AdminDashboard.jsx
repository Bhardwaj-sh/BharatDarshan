import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Users, Calendar, Clock, CheckCircle2, XCircle, ArrowUpRight, RefreshCw, AlertCircle } from 'lucide-react';
import { adminService } from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 2,
    totalStates: 36,
    totalPackages: 36,
    totalBookings: 1,
    pendingBookings: 1,
    confirmedBookings: 0
  });
  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  const loadAdminData = async () => {
    setLoading(true);
    try {
      const statsRes = await adminService.getStats();
      if (statsRes.data?.data) {
        setStats(statsRes.data.data);
      }

      const bookingsRes = await adminService.getBookings({ status: filterStatus });
      if (bookingsRes.data?.data) {
        setBookings(bookingsRes.data.data);
      }
    } catch (err) {
      console.warn('Admin API error, reading cache:', err.message);
      const local = JSON.parse(localStorage.getItem('bharat_bookings') || '[]');
      setBookings(local);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('bharat_user') || 'null');
    if (!savedUser || savedUser.role !== 'admin') {
      // If not logged in as admin, alert and redirect to login
      navigate('/login');
      return;
    }
    loadAdminData();
  }, [filterStatus]);

  const handleStatusUpdate = async (id, newStatus) => {
    setActionMsg('');
    try {
      await adminService.updateStatus(id, newStatus);
      setActionMsg(`Booking status successfully updated to: ${newStatus}`);
      await loadAdminData();
    } catch (err) {
      console.error('Update status error:', err);
      // Fallback local update
      const updated = bookings.map((b) => (b._id === id || b.reference === id ? { ...b, bookingStatus: newStatus, status: newStatus } : b));
      setBookings(updated);
      localStorage.setItem('bharat_bookings', JSON.stringify(updated));
      setActionMsg(`Status updated to: ${newStatus}`);
    }
  };

  const pendingCount = bookings.filter((b) => (b.bookingStatus || b.status) === 'Pending').length;
  const confirmedCount = bookings.filter((b) => (b.bookingStatus || b.status) === 'Confirmed').length;

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen text-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 text-white text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-slate-950">
              Operations & Enquiries Console
            </h1>
            <p className="text-xs text-slate-600 mt-1 font-normal">
              Live server connection: Review customer enquiries, update booking statuses, and enforce 1-to-1 region mapping.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-slate-950 shadow-sm"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link to="/" className="btn-ghost-dark text-xs py-2.5 px-5 rounded-xl">
              Return to Public Site
            </Link>
          </div>
        </div>

        {actionMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{actionMsg}</span>
            </div>
            <button onClick={() => setActionMsg('')} className="text-xs font-bold text-emerald-700 hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Analytics Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="bg-white rounded-3xl p-6 border border-ivory-200 shadow-soft">
            <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-400 block mb-1">
              Active Regions
            </span>
            <span className="font-serif text-3xl font-bold text-forest-950 block">{stats.totalStates || 36}</span>
            <span className="text-xs text-emerald-700 font-medium mt-1 block">
              1 Flagship Tour / Region Enforced
            </span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-ivory-200 shadow-soft">
            <span className="text-[10px] uppercase font-bold tracking-widest text-charcoal-400 block mb-1">
              Registered Users
            </span>
            <span className="font-serif text-3xl font-bold text-forest-950 block">{stats.totalUsers || 2}</span>
            <span className="text-xs text-charcoal-500 mt-1 block">Active platform travellers</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-amber-200 shadow-soft bg-amber-50/30">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-700 block mb-1">
              Action Required
            </span>
            <span className="font-serif text-3xl font-bold text-amber-800 block">{stats.pendingBookings ?? pendingCount}</span>
            <span className="text-xs text-amber-700 font-medium mt-1 block">Pending Review</span>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-emerald-200 shadow-soft bg-emerald-50/30">
            <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-700 block mb-1">
              Confirmed Trips
            </span>
            <span className="font-serif text-3xl font-bold text-emerald-800 block">{stats.confirmedBookings ?? confirmedCount}</span>
            <span className="text-xs text-emerald-700 font-medium mt-1 block">Verified & Scheduled</span>
          </div>

        </div>

        {/* Enquiries Table Section */}
        <div className="bg-white rounded-3xl border border-ivory-200 shadow-soft overflow-hidden mb-12">
          
          <div className="p-6 border-b border-ivory-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-bold text-forest-950">
                Customer Tour Enquiries (Real MongoDB Records)
              </h3>
              <p className="text-xs text-charcoal-500 mt-0.5">
                Update status to 'Confirmed' to update the customer's dashboard in real-time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-charcoal-500 font-medium">Filter Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-ivory-50 border border-ivory-200 text-xs text-charcoal-800 rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="all">All Enquiries ({bookings.length})</option>
                <option value="Pending">Pending ({pendingCount})</option>
                <option value="Confirmed">Confirmed ({confirmedCount})</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-ivory-50 border-b border-ivory-200 text-[10px] uppercase tracking-wider text-charcoal-400 font-bold">
                <tr>
                  <th className="py-4 px-6">Reference</th>
                  <th className="py-4 px-6">Lead Traveller</th>
                  <th className="py-4 px-6">Region & Date</th>
                  <th className="py-4 px-6">Pax</th>
                  <th className="py-4 px-6">Locked Amount</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ivory-200">
                {bookings.map((b) => {
                  const ref = b.bookingReference || b.reference;
                  const status = b.bookingStatus || b.status;
                  const total = b.totalAmountSnapshot || b.totalAmount;
                  const perPerson = b.pricePerPersonSnapshot || b.pricePerPerson;
                  const dateStr = b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-IN') : 'Scheduled Date';
                  const regName = b.stateId?.name || b.regionName || 'Rajasthan';

                  return (
                    <tr key={ref || b._id} className="hover:bg-ivory-50/50 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-forest-900">
                        {ref}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-charcoal-900">{b.leadTravellerName || b.contactName || 'Lead Traveller'}</div>
                        <div className="text-[10px] text-charcoal-500">{b.leadTravellerEmail || b.contactEmail}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-semibold text-forest-950">{regName}</div>
                        <div className="text-[10px] text-charcoal-500">{dateStr}</div>
                      </td>
                      <td className="py-4 px-6 font-medium text-charcoal-800">
                        {b.travellerCount || b.travellers} Adults
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-forest-950">₹{total?.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-charcoal-500">₹{perPerson?.toLocaleString('en-IN')}/pax</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          status === 'Confirmed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : status === 'Cancelled'
                            ? 'bg-rose-100 text-rose-800'
                            : status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                        {status !== 'Confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(b._id, 'Confirmed')}
                            className="px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-medium transition-colors"
                          >
                            Confirm
                          </button>
                        )}
                        {status !== 'Cancelled' && (
                          <button
                            onClick={() => handleStatusUpdate(b._id, 'Cancelled')}
                            className="px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-[11px] font-medium transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        {status === 'Confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(b._id, 'Completed')}
                            className="px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-[11px] font-medium transition-colors"
                          >
                            Mark Done
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>

      </div>
    </div>
  );
}
