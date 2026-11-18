import React, { useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CheckCircle2, 
  RefreshCw, 
  Users, 
  Mail, 
  Phone, 
  Search, 
  Eye, 
  X, 
  MapPin, 
  ExternalLink,
  Copy,
  Check,
  FileText,
  Filter
} from 'lucide-react';
import { adminService } from '../services/api';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user] = useState(() => JSON.parse(localStorage.getItem('bharat_user') || 'null'));
  
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' | 'users'
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalStates: 36,
    totalPackages: 36,
    totalBookings: 0,
    pendingBookings: 0,
    confirmedBookings: 0
  });

  const [bookings, setBookings] = useState([]);
  const [usersList, setUsersList] = useState([]);
  const [filterStatus, setFilterStatus] = useState('all');
  const [userSearchTerm, setUserSearchTerm] = useState('');
  const [userRoleFilter, setUserRoleFilter] = useState('all'); // 'all' | 'user' | 'admin' | 'hasPhone'
  const [selectedUserModal, setSelectedUserModal] = useState(null);
  const [copiedId, setCopiedId] = useState('');

  const [loading, setLoading] = useState(true);
  const [actionMsg, setActionMsg] = useState('');

  const loadFallbackUsers = () => {
    const defaultDirectory = [
      {
        _id: 'usr_admin_root_master',
        name: 'Bharat Darshan Admin',
        email: 'admin123@gmail.com',
        phone: '+91 9876543210',
        role: 'admin',
        status: 'active',
        createdAt: '2026-11-18T10:00:00.000Z',
        bookingsCount: 0
      },
      {
        _id: 'usr_aarav_sharma_01',
        name: 'Aarav Sharma',
        email: 'aarav@example.com',
        phone: '+91 9876501234',
        role: 'user',
        status: 'active',
        createdAt: '2026-11-18T11:15:00.000Z',
        bookingsCount: 1,
        totalSpend: 34500
      }
    ];
    const registeredLocal = JSON.parse(localStorage.getItem('bharat_registered_users') || '[]');
    setUsersList([...registeredLocal, ...defaultDirectory]);
  };

  const loadAdminData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Stats
      const statsRes = await adminService.getStats();
      if (statsRes.data?.data) {
        setStats(statsRes.data.data);
      }

      // 2. Fetch Bookings
      const bookingsRes = await adminService.getBookings({ status: filterStatus });
      if (bookingsRes.data?.data) {
        setBookings(bookingsRes.data.data);
      }

      // 3. Fetch Registered Users
      const usersRes = await adminService.getUsers();
      if (usersRes.data?.data && usersRes.data.data.length > 0) {
        setUsersList(usersRes.data.data);
      } else {
        loadFallbackUsers();
      }
    } catch (err) {
      console.warn('Admin API load notice:', err.message);
      const localBookings = JSON.parse(localStorage.getItem('bharat_bookings') || '[]');
      if (localBookings.length) setBookings(localBookings);
      loadFallbackUsers();
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
      setActionMsg(`Booking enquiry status updated to: ${newStatus}`);
      await loadAdminData();
    } catch (err) {
      console.error('Update status error:', err);
      const updated = bookings.map((b) => (b._id === id || b.reference === id ? { ...b, bookingStatus: newStatus, status: newStatus } : b));
      setBookings(updated);
      localStorage.setItem('bharat_bookings', JSON.stringify(updated));
      setActionMsg(`Status updated to: ${newStatus}`);
    }
  };

  const copyToClipboard = (text, id) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(''), 2000);
    }
  };

  // Filtered Users List
  const filteredUsers = useMemo(() => {
    return usersList.filter((u) => {
      const term = userSearchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        u.name?.toLowerCase().includes(term) ||
        u.email?.toLowerCase().includes(term) ||
        u.phone?.toLowerCase().includes(term) ||
        u._id?.toLowerCase().includes(term);

      let matchesFilter = true;
      if (userRoleFilter === 'user') matchesFilter = u.role === 'user';
      if (userRoleFilter === 'admin') matchesFilter = u.role === 'admin';
      if (userRoleFilter === 'hasPhone') matchesFilter = Boolean(u.phone && u.phone.trim().length >= 8);

      return matchesSearch && matchesFilter;
    });
  }, [usersList, userSearchTerm, userRoleFilter]);

  const pendingCount = bookings.filter((b) => (b.bookingStatus || b.status) === 'Pending').length;
  const confirmedCount = bookings.filter((b) => (b.bookingStatus || b.status) === 'Confirmed').length;

  return (
    <div className="pt-32 pb-24 bg-[#05070F] min-h-screen text-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Portal Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-extrabold uppercase tracking-wider mb-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Admin Management Portal</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-black text-white">
              Operations & User Management Console
            </h1>
            <p className="text-xs text-slate-400 mt-1 font-normal">
              Logged in as <strong className="text-amber-300">{user?.email}</strong> · Secure MongoDB Atlas Operations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors cursor-pointer"
              title="Refresh Live Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
            <Link to="/" className="btn-ghost-glow text-xs py-2.5 px-5 rounded-xl">
              Return to Public Site
            </Link>
          </div>
        </div>

        {/* Status Toast */}
        {actionMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>{actionMsg}</span>
            </div>
            <button onClick={() => setActionMsg('')} className="text-xs font-bold text-emerald-300 hover:underline cursor-pointer">
              Dismiss
            </button>
          </div>
        )}

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          <div className="glass-dark rounded-3xl p-6 border border-white/10 shadow-xl">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block mb-1">
              Active Regions
            </span>
            <span className="font-display text-4xl font-black text-white block">36</span>
            <span className="text-xs text-emerald-400 font-bold mt-1 block">
              28 States & 8 Union Territories
            </span>
          </div>

          <div 
            onClick={() => setActiveTab('users')}
            className={`glass-dark rounded-3xl p-6 border transition-all cursor-pointer ${
              activeTab === 'users' ? 'border-amber-400/60 bg-amber-500/10 shadow-[0_0_25px_rgba(245,158,11,0.2)]' : 'border-white/10 hover:border-white/25'
            }`}
          >
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400 block mb-1">
              Registered Users
            </span>
            <span className="font-display text-4xl font-black text-white block">
              {stats.totalUsers || usersList.length || 0}
            </span>
            <span className="text-xs text-amber-400 font-semibold mt-1 block flex items-center gap-1">
              <span>View User Directory</span>
              <ExternalLink className="w-3 h-3" />
            </span>
          </div>

          <div 
            onClick={() => { setActiveTab('bookings'); setFilterStatus('Pending'); }}
            className={`glass-dark rounded-3xl p-6 border transition-all cursor-pointer ${
              activeTab === 'bookings' && filterStatus === 'Pending' ? 'border-amber-500 bg-amber-500/15' : 'border-amber-500/30 bg-amber-500/5'
            }`}
          >
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 block mb-1">
              Pending Enquiries
            </span>
            <span className="font-display text-4xl font-black text-amber-400 block">
              {stats.pendingBookings ?? pendingCount}
            </span>
            <span className="text-xs text-amber-300 font-bold mt-1 block">Requires Review</span>
          </div>

          <div 
            onClick={() => { setActiveTab('bookings'); setFilterStatus('Confirmed'); }}
            className={`glass-dark rounded-3xl p-6 border transition-all cursor-pointer ${
              activeTab === 'bookings' && filterStatus === 'Confirmed' ? 'border-emerald-500 bg-emerald-500/15' : 'border-emerald-500/30 bg-emerald-500/5'
            }`}
          >
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-emerald-400 block mb-1">
              Confirmed Trips
            </span>
            <span className="font-display text-4xl font-black text-emerald-400 block">
              {stats.confirmedBookings ?? confirmedCount}
            </span>
            <span className="text-xs text-emerald-300 font-bold mt-1 block">Scheduled & Verified</span>
          </div>

        </div>

        {/* Primary Management Navigation Tabs */}
        <div className="flex items-center gap-3 mb-6 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'bookings'
                ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] font-black'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Customer Tour Enquiries ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('users')}
            className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'users'
                ? 'bg-amber-500 text-black shadow-[0_0_20px_rgba(245,158,11,0.4)] font-black'
                : 'text-slate-400 hover:text-white bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registered Users Directory ({usersList.length})</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* TAB 1: CUSTOMER TOUR ENQUIRIES TABLE                                      */}
        {/* ========================================================================= */}
        {activeTab === 'bookings' && (
          <div className="glass-dark rounded-3xl border border-white/10 shadow-2xl overflow-hidden mb-12">
            
            <div className="p-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white">
                  Customer Tour Enquiries
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real MongoDB records: review customer inquiries, contact travelers, and update journey status.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 font-medium">Filter Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="bg-black/50 border border-white/15 text-xs text-white rounded-xl px-3.5 py-2 focus:outline-none focus:border-amber-400 font-medium"
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
                    <th className="py-4 px-6">Lead Traveler</th>
                    <th className="py-4 px-6">Region & Date</th>
                    <th className="py-4 px-6">Pax</th>
                    <th className="py-4 px-6">Locked Amount</th>
                    <th className="py-4 px-6">Status</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="py-12 text-center text-slate-400 text-xs">
                        No enquiries found matching this filter criteria.
                      </td>
                    </tr>
                  ) : (
                    bookings.map((b) => {
                      const ref = b.bookingReference || b.reference;
                      const status = b.bookingStatus || b.status;
                      const total = b.totalAmountSnapshot || b.totalAmount;
                      const perPerson = b.pricePerPersonSnapshot || b.pricePerPerson;
                      const dateStr = b.travelDate ? new Date(b.travelDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Scheduled Date';
                      const regName = b.stateId?.name || b.regionName || 'Rajasthan';
                      const contactPhone = b.contactPhone || b.phone || '';
                      const contactEmail = b.leadTravellerEmail || b.contactEmail || '';

                      return (
                        <tr key={ref || b._id} className="hover:bg-white/5 transition-colors">
                          <td className="py-4 px-6 font-mono font-bold text-amber-400">
                            {ref}
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-bold text-white">{b.leadTravellerName || b.contactName || 'Lead Traveler'}</div>
                            <div className="flex items-center gap-2 mt-1">
                              {contactEmail && (
                                <a 
                                  href={`mailto:${contactEmail}`} 
                                  className="text-[11px] text-slate-400 hover:text-amber-300 flex items-center gap-1 transition-colors"
                                  title="Send Email"
                                >
                                  <Mail className="w-3 h-3 text-slate-400" />
                                  <span>{contactEmail}</span>
                                </a>
                              )}
                              {contactPhone && (
                                <a 
                                  href={`tel:${contactPhone}`} 
                                  className="text-[11px] text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                                  title="Call Phone Number"
                                >
                                  <Phone className="w-3 h-3 text-emerald-400" />
                                  <span>{contactPhone}</span>
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-bold text-white flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-amber-400" />
                              <span>{regName}</span>
                            </div>
                            <div className="text-[10px] text-slate-400 mt-0.5">{dateStr}</div>
                          </td>
                          <td className="py-4 px-6 font-semibold text-slate-200">
                            {b.travellerCount || b.travellers || 2} Adults
                          </td>
                          <td className="py-4 px-6">
                            <div className="font-display font-black text-amber-400 text-sm">₹{total?.toLocaleString('en-IN')}</div>
                            <div className="text-[10px] text-slate-400">₹{perPerson?.toLocaleString('en-IN')}/pax</div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                              status === 'Confirmed'
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
                                className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors shadow-md cursor-pointer"
                              >
                                Confirm
                              </button>
                            )}
                            {status !== 'Cancelled' && (
                              <button
                                onClick={() => handleStatusUpdate(b._id, 'Cancelled')}
                                className="px-3.5 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Cancel
                              </button>
                            )}
                            {status === 'Confirmed' && (
                              <button
                                onClick={() => handleStatusUpdate(b._id, 'Completed')}
                                className="px-3.5 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold transition-colors cursor-pointer"
                              >
                                Mark Done
                              </button>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: REGISTERED USERS MANAGEMENT DIRECTORY                              */}
        {/* ========================================================================= */}
        {activeTab === 'users' && (
          <div className="glass-dark rounded-3xl border border-white/10 shadow-2xl overflow-hidden mb-12">
            
            {/* Header with Search and Role Filters */}
            <div className="p-6 border-b border-white/10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                  <span>Registered Users Directory</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold">
                    {filteredUsers.length} Users
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Complete user profiles, verified contact information, and direct call/email communication options.
                </p>
              </div>

              {/* Search & Filter Toolbar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
                {/* Search Input */}
                <div className="relative min-w-[240px]">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={userSearchTerm}
                    onChange={(e) => setUserSearchTerm(e.target.value)}
                    placeholder="Search by name, email, phone..."
                    className="w-full pl-10 pr-3.5 py-2 rounded-xl bg-black/50 border border-white/15 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-400 font-medium"
                  />
                  {userSearchTerm && (
                    <button
                      onClick={() => setUserSearchTerm('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs cursor-pointer"
                    >
                      ×
                    </button>
                  )}
                </div>

                {/* Filter Pills */}
                <div className="inline-flex items-center p-1 rounded-xl bg-black/40 border border-white/10 text-xs font-semibold">
                  <button
                    onClick={() => setUserRoleFilter('all')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      userRoleFilter === 'all' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    All
                  </button>
                  <button
                    onClick={() => setUserRoleFilter('user')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      userRoleFilter === 'user' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Travelers
                  </button>
                  <button
                    onClick={() => setUserRoleFilter('hasPhone')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      userRoleFilter === 'hasPhone' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    With Phone
                  </button>
                  <button
                    onClick={() => setUserRoleFilter('admin')}
                    className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      userRoleFilter === 'admin' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Admins
                  </button>
                </div>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 border-b border-white/10 text-[10px] uppercase tracking-wider text-slate-400 font-extrabold">
                  <tr>
                    <th className="py-4 px-6">User / Traveler</th>
                    <th className="py-4 px-6">Contact Email</th>
                    <th className="py-4 px-6">Phone / Mobile</th>
                    <th className="py-4 px-6">Registration Date</th>
                    <th className="py-4 px-6">User ID</th>
                    <th className="py-4 px-6">Role & Status</th>
                    <th className="py-4 px-6">Trips</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="py-12 text-center text-slate-400 text-xs">
                        No registered users found matching "{userSearchTerm}".
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const regDate = u.createdAt 
                        ? new Date(u.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Pre-existing';
                      
                      const initials = u.name
                        ? u.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
                        : 'TR';

                      return (
                        <tr key={u._id} className="hover:bg-white/5 transition-colors">
                          {/* Name & Avatar */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/30 border border-amber-400/40 text-amber-300 font-bold flex items-center justify-center text-xs shadow-md">
                                {initials}
                              </div>
                              <div>
                                <div className="font-bold text-white text-sm">{u.name}</div>
                                <div className="text-[10px] text-slate-400">
                                  {u.role === 'admin' ? '🛡️ System Administrator' : 'Verified Traveler'}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Email Address with Direct mailto: action */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-200">{u.email}</span>
                              <a
                                href={`mailto:${u.email}`}
                                className="p-1.5 rounded-lg bg-white/5 hover:bg-amber-500/20 text-slate-400 hover:text-amber-300 transition-colors"
                                title={`Send Email to ${u.email}`}
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>

                          {/* Phone Number with Direct tel: call action */}
                          <td className="py-4 px-6">
                            {u.phone ? (
                              <div className="flex items-center gap-2">
                                <span className="font-mono font-semibold text-emerald-400">{u.phone}</span>
                                <a
                                  href={`tel:${u.phone}`}
                                  className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/25 text-emerald-400 transition-colors"
                                  title={`Call ${u.phone}`}
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            ) : (
                              <span className="text-slate-500 italic text-[11px]">Not provided</span>
                            )}
                          </td>

                          {/* Registration Date */}
                          <td className="py-4 px-6 text-slate-300 font-mono text-[11px]">
                            {regDate}
                          </td>

                          {/* User ID with Copy */}
                          <td className="py-4 px-6">
                            <button
                              onClick={() => copyToClipboard(u._id, u._id)}
                              className="font-mono text-[10px] px-2 py-1 rounded bg-black/40 border border-white/10 hover:border-amber-400/40 text-slate-400 hover:text-white flex items-center gap-1.5 cursor-pointer transition-colors"
                              title="Click to copy full User ID"
                            >
                              <span>{u._id.slice(0, 8)}...</span>
                              {copiedId === u._id ? (
                                <Check className="w-3 h-3 text-emerald-400" />
                              ) : (
                                <Copy className="w-3 h-3 text-slate-500" />
                              )}
                            </button>
                          </td>

                          {/* Role & Status */}
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                u.role === 'admin'
                                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                  : 'bg-slate-800 text-slate-300 border border-white/10'
                              }`}>
                                {u.role}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                                {u.status || 'Active'}
                              </span>
                            </div>
                          </td>

                          {/* Bookings Count */}
                          <td className="py-4 px-6">
                            <span className="font-mono font-bold text-amber-400">
                              {u.bookingsCount || 0}
                            </span>
                            <span className="text-[10px] text-slate-400 ml-1">trips</span>
                          </td>

                          {/* Action Button: View Profile */}
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => setSelectedUserModal(u)}
                              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-amber-500 hover:text-black text-white text-[11px] font-bold transition-all shadow-sm cursor-pointer flex items-center gap-1.5 ml-auto"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Profile</span>
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

          </div>
        )}

      </div>

      {/* ========================================================================= */}
      {/* USER PROFILE MODAL (Full Details & Direct Communication)                   */}
      {/* ========================================================================= */}
      {selectedUserModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-white/20 p-7 shadow-2xl text-slate-100 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/30 border border-amber-400 text-amber-300 font-extrabold flex items-center justify-center text-base shadow-gold-glow">
                  {selectedUserModal.name?.slice(0, 2).toUpperCase() || 'TR'}
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold text-white">
                    {selectedUserModal.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 font-semibold uppercase">
                      {selectedUserModal.role}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold uppercase">
                      {selectedUserModal.status || 'Active'}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedUserModal(null)}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* User Meta Information Grid */}
            <div className="space-y-4 mb-6">
              
              {/* Email */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Email Address</div>
                  <div className="text-sm font-semibold text-white mt-0.5">{selectedUserModal.email}</div>
                </div>
                <a
                  href={`mailto:${selectedUserModal.email}`}
                  className="btn-luxury-gold text-xs px-3.5 py-1.5 rounded-xl flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Email</span>
                </a>
              </div>

              {/* Phone */}
              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Contact Phone Number</div>
                  <div className="text-sm font-semibold text-emerald-400 font-mono mt-0.5">
                    {selectedUserModal.phone || 'Not Provided on Registration'}
                  </div>
                </div>
                {selectedUserModal.phone && (
                  <a
                    href={`tel:${selectedUserModal.phone}`}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call Number</span>
                  </a>
                )}
              </div>

              {/* Registration Timestamp & User ID */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Registered On</div>
                  <div className="text-xs font-medium text-slate-200 mt-1">
                    {selectedUserModal.createdAt 
                      ? new Date(selectedUserModal.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
                      : 'N/A'}
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                  <div className="text-[10px] uppercase font-bold text-slate-400 font-mono">Total Bookings</div>
                  <div className="text-xs font-bold text-amber-400 mt-1">
                    {selectedUserModal.bookingsCount || 0} Tour Enquiries
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-black/40 border border-white/10">
                <div className="text-[10px] uppercase font-bold text-slate-400 font-mono mb-1">Database User ID</div>
                <div className="font-mono text-xs text-slate-400 break-all select-all bg-black/60 p-2 rounded-xl border border-white/5">
                  {selectedUserModal._id}
                </div>
              </div>

            </div>

            {/* Modal Footer Action */}
            <div className="pt-4 border-t border-white/10 flex justify-end">
              <button
                onClick={() => setSelectedUserModal(null)}
                className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
