import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, RefreshCw } from 'lucide-react';
import { adminService } from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem('bharat_user') || 'null'));
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
  const [_loading, setLoading] = useState(true);
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
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    loadAdminData();
  }, [user, filterStatus, navigate]);

  const handleStatusUpdate = async (id, newStatus) => {
    setActionMsg('');
    try {
      await adminService.updateStatus(id, newStatus);
      setActionMsg(`Booking status successfully updated to: ${newStatus}`);
      await loadAdminData();
    } catch (err) {
      console.error('Update status error:', err);
      const updated = bookings.map((b) => (b._id === id || b.reference === id ? { ...b, bookingStatus: newStatus, status: newStatus } : b));
      setBookings(updated);
      localStorage.setItem('bharat_bookings', JSON.stringify(updated));
      setActionMsg(`Status updated to: ${newStatus}`);
    }
  };

  const pendingCount = bookings.filter((b) => (b.bookingStatus || b.status) === 'Pending').length;
  const confirmedCount = bookings.filter((b) => (b.bookingStatus || b.status) === 'Confirmed').length;

  return (
    <div className="pt-32 pb-24 bg-[#05070F] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
              Operations & Enquiries Console
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-normal">
              Live server connection: Review customer enquiries, update booking statuses, and enforce 1-to-1 region mapping.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
              title="Refresh Data"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <Link to="/" className="btn-ghost-glow text-xs py-2.5 px-5 rounded-xl">
              Return to Public Site
            </Link>
          </div>
        </div>

        {actionMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionMsg}</span>
            </div>
            <button onClick={() => setActionMsg('')} className="text-xs font-bold text-emerald-300 hover:underline">
              Dismiss
            </button>
          </div>
        )}

        {/* Analytics Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="glass-dark rounded-3xl p-6 border border-white/10 shadow-xl">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block mb-1">
              Active Regions
            </span>
            <span className="font-display text-4xl font-black text-white block">{stats.totalStates || 36}</span>
            <span className="text-xs text-emerald-400 font-bold mt-1 block">
              1 Flagship Tour / Region Enforced
            </span>
          </div>

          <div className="glass-dark rounded-3xl p-6 border border-white/10 shadow-xl">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block mb-1">
              Registered Users
            </span>
            <span className="font-display text-4xl font-black text-white block">{stats.totalUsers || 2}</span>
            <span className="text-xs text-slate-400 mt-1 block font-medium">Active platform travellers</span>
          </div>

          <div className="glass-dark rounded-3xl p-6 border border-amber-500/30 shadow-xl bg-amber-500/5">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 block mb-1">
              Action Required
            </span>
            <span className="font-display text-4xl font-black text-amber-400 block">{stats.pendingBookings ?? pendingCount}</span>
            <span className="text-xs text-amber-300 font-bold mt-1 block">Pending Review</span>
          </div>

          <div className="glass-dark rounded-3xl p-6 border border-emerald-500/30 shadow-xl bg-emerald-500/5">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400 block mb-1">
              Confirmed Trips
            </span>
            <span className="font-display text-4xl font-black text-emerald-400 block">{stats.confirmedBookings ?? confirmedCount}</span>
            <span className="text-xs text-emerald-300 font-bold mt-1 block">Verified & Scheduled</span>
          </div>

        </div>

        {/* Enquiries Table Section */}
        <div className="glass-dark rounded-3xl border border-white/10 shadow-2xl overflow-hidden mb-12">

          <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                Customer Tour Enquiries (Real MongoDB Records)
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update status to 'Confirmed' to update the customer's dashboard in real-time.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Filter Status:</span>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="bg-black/40 border border-white/10 text-xs text-white rounded-xl px-3 py-1.5 focus:outline-none"
              >
                <option value="all" className="bg-slate-900 text-white">All Enquiries ({bookings.length})</option>
                <option value="Pending" className="bg-slate-900 text-white">Pending ({pendingCount})</option>
                <option value="Confirmed" className="bg-slate-900 text-white">Confirmed ({confirmedCount})</option>
                <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
                <option value="Completed" className="bg-slate-900 text-white">Completed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">
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
              <tbody className="divide-y divide-white/5">
                {bookings.map((b) => {
                  const ref = b.bookingReference || b.reference;
                  const status = b.bookingStatus || b.status;
                  const total = b.totalAmountSnapshot || b.totalAmount;
                  const perPerson = b.pricePerPersonSnapshot || b.pricePerPerson;
                  const dateStr = b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-IN') : 'Scheduled Date';
                  const regName = b.stateId?.name || b.regionName || 'Rajasthan';

                  return (
                    <tr key={ref || b._id} className="hover:bg-white/5 transition-colors">
                      <td className="py-4 px-6 font-mono font-bold text-amber-400">
                        {ref}
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-white">{b.leadTravellerName || b.contactName || 'Lead Traveller'}</div>
                        <div className="text-[10px] text-slate-400">{b.leadTravellerEmail || b.contactEmail}</div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-bold text-white">{regName}</div>
                        <div className="text-[10px] text-slate-400">{dateStr}</div>
                      </td>
                      <td className="py-4 px-6 font-semibold text-slate-200">
                        {b.travellerCount || b.travellers} Adults
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-display font-black text-amber-400 text-sm">₹{total?.toLocaleString('en-IN')}</div>
                        <div className="text-[10px] text-slate-400">₹{perPerson?.toLocaleString('en-IN')}/pax</div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status === 'Confirmed'
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : status === 'Cancelled'
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            : status === 'Completed'
                              ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                          }`}>
                          {status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right space-x-1.5 whitespace-nowrap">
                        {status !== 'Confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(b._id, 'Confirmed')}
                            className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors shadow-md"
                          >
                            Confirm
                          </button>
                        )}
                        {status !== 'Cancelled' && (
                          <button
                            onClick={() => handleStatusUpdate(b._id, 'Cancelled')}
                            className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-bold transition-colors"
                          >
                            Cancel
                          </button>
                        )}
                        {status === 'Confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(b._id, 'Completed')}
                            className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold transition-colors"
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
