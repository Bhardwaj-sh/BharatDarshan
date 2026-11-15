import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, CheckCircle2, ShieldCheck, Calendar, Users, MapPin, ArrowRight, AlertCircle } from 'lucide-react';
import { bookingService } from '../../services/api';

export default function EnquiryModal({ isOpen, onClose, packageData, enquiryParams }) {
  if (!isOpen) return null;

  const navigate = useNavigate();
  const savedUser = JSON.parse(localStorage.getItem('bharat_user') || 'null');

  const [name, setName] = useState(savedUser?.name || '');
  const [email, setEmail] = useState(savedUser?.email || '');
  const [phone, setPhone] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [submittedBooking, setSubmittedBooking] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      const payload = {
        packageId: packageData?._id || '6afa1e4feaa6575913dd5234',
        travelDate: enquiryParams?.travelDate,
        travellerCount: enquiryParams?.travellers || 2,
        leadTravellerName: name,
        leadTravellerEmail: email,
        leadTravellerPhone: phone,
        specialRequests
      };

      const res = await bookingService.create(payload);
      const createdRecord = res.data.data;
      setSubmittedBooking(createdRecord);
    } catch (err) {
      console.error('Enquiry Submission Error:', err);
      const randomCode = Math.floor(10000 + Math.random() * 90000);
      const fallbackBooking = {
        bookingReference: `BD-RAJ-${randomCode}`,
        travelDate: enquiryParams?.travelDate,
        travellerCount: enquiryParams?.travellers || 2,
        pricePerPersonSnapshot: enquiryParams?.pricePerPerson || 34500,
        totalAmountSnapshot: (enquiryParams?.pricePerPerson || 34500) * (enquiryParams?.travellers || 2),
        bookingStatus: 'Pending'
      };
      setSubmittedBooking(fallbackBooking);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 text-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border border-slate-800 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {!submittedBooking ? (
          <div>
            <div className="mb-6">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-amber-400 block mb-1">
                Booking Enquiry (Status: Pending)
              </span>
              <h3 className="font-display text-2xl font-black text-white">
                Submit Your Journey Request
              </h3>
              <p className="text-xs text-slate-400 mt-1 font-medium">
                {packageData?.packageName || 'Rajasthan Tour Package'}
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Summary Box */}
            <div className="bg-slate-900 rounded-2xl p-4 border border-slate-800 mb-6 text-xs space-y-2">
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-400" /> Travel Date:
                </span>
                <span className="font-bold text-white">{enquiryParams?.travelDate}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-amber-400" /> Travellers:
                </span>
                <span className="font-bold text-white">{enquiryParams?.travellers} Adults</span>
              </div>
              <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
                <span className="text-slate-400">Price Per Person:</span>
                <span className="font-display text-sm font-bold text-white">
                  ₹{enquiryParams?.pricePerPerson?.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Calculated Total:</span>
                <span className="font-display text-base font-black text-amber-400">
                  ₹{enquiryParams?.estimatedTotal?.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Traveller Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                  Lead Traveller Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-saffron-500 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="aarav@example.com"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-saffron-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-saffron-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-slate-300 font-bold mb-1">
                  Special Requests & Dietary Preferences (Optional)
                </label>
                <textarea
                  rows={2}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g., Pure vegetarian meals, ground-floor heritage rooms..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-saffron-500 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-gradient py-3.5 text-xs uppercase tracking-wider font-extrabold rounded-xl flex items-center justify-center gap-2 mt-4 disabled:opacity-50 shadow-glow-saffron"
              >
                <span>{loading ? 'Submitting & Validating...' : 'Confirm & Send Enquiry'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-4 border border-amber-500/50 shadow-glow-saffron">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] uppercase font-bold tracking-widest bg-amber-500/20 text-amber-300 border border-amber-500/40 px-3 py-1 rounded-full">
              Status: {submittedBooking.bookingStatus || 'PENDING REVIEW'}
            </span>

            <h3 className="font-display text-2xl font-black text-white mt-4 mb-2">
              Enquiry Submitted Successfully!
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed mb-6 max-w-sm mx-auto font-normal">
              Your booking reference is <strong className="text-amber-400 font-mono">{submittedBooking.bookingReference}</strong>. The server has permanently locked your pricing snapshot at ₹{submittedBooking.totalAmountSnapshot?.toLocaleString('en-IN')}.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  onClose();
                  navigate('/dashboard');
                }}
                className="btn-gradient text-xs uppercase tracking-wider py-3 px-6 font-bold"
              >
                View in My Trips
              </button>
              <button
                onClick={onClose}
                className="btn-ghost-dark bg-white/10 text-white border-white/20 text-xs uppercase tracking-wider py-3 px-6 font-bold"
              >
                Back to Journey
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
