import React, { useState } from 'react';
import { Users, Phone, ShieldCheck, Heart, UserCheck, CheckCircle2, Clock } from 'lucide-react';
import { DonorProfile } from '../types';
import { MOCK_DONORS } from '../data/mockData';

export const DonorNetworkView: React.FC = () => {
  const [donors, setDonors] = useState<DonorProfile[]>(MOCK_DONORS);

  const toggleStatReady = (id: string) => {
    setDonors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isReadyForStat: !d.isReadyForStat } : d))
    );
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold font-mono text-slate-400 uppercase">
            COMMUNITY FIRST RESPONDERS
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">
            Verified Voluntary Donor Network
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pre-screened, HLA-typed volunteer donors on standby for emergency apheresis and whole blood mobilization.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>3 Donors Ready on Standby</span>
          </span>
        </div>
      </div>

      {/* Donors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {donors.map((donor) => (
          <div
            key={donor.id}
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex flex-col items-center justify-center font-black font-display text-base">
                  <span>{donor.bloodGroup}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 text-base font-display">
                      {donor.name}
                    </h3>
                    <span className="font-mono text-xs text-slate-400">{donor.id}</span>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                    <span>{donor.type} Donor</span>
                    <span>•</span>
                    <span className="text-slate-700 font-semibold">{donor.distanceKm} km away (~{donor.etaMinutes}m)</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    donor.status === 'Ready'
                      ? 'bg-emerald-100 text-emerald-800'
                      : donor.status === 'On Call'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {donor.status.toUpperCase()}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Last: {donor.lastDonationDate}
                </span>
              </div>
            </div>

            {/* Rapid Pre-Screen Checklist */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>Pre-Donation Rapid Screen: PASSED</span>
              </div>
              <span className="font-mono text-[11px] text-slate-400">Match: {donor.matchScore}%</span>
            </div>

            {/* Actions Bar */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={donor.isReadyForStat}
                  onChange={() => toggleStatReady(donor.id)}
                  className="rounded-md border-slate-300 text-red-600 focus:ring-red-500 w-4 h-4"
                />
                <span className="font-semibold text-slate-700">Ready for STAT Dispatch</span>
              </label>

              <a
                href={`tel:${donor.phone}`}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold flex items-center gap-1.5 transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Contact Donor</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
