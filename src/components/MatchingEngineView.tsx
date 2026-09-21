import React, { useState } from 'react';
import {
  Radar,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  Flame,
  UserCheck,
  Truck,
  Building2,
  Thermometer,
  Zap,
  Radio,
  Sliders
} from 'lucide-react';
import { EmergencyRequest, MatchedEntity } from '../types';
import { MATCH_CANDIDATES } from '../data/mockData';

interface MatchingEngineViewProps {
  currentRequest: EmergencyRequest;
  allRequests: EmergencyRequest[];
  onSelectRequest: (req: EmergencyRequest) => void;
  onDispatchCandidate: (reqId: string, candidate: MatchedEntity) => void;
}

export const MatchingEngineView: React.FC<MatchingEngineViewProps> = ({
  currentRequest,
  allRequests,
  onSelectRequest,
  onDispatchCandidate
}) => {
  const [selectedCandidate, setSelectedCandidate] = useState<MatchedEntity>(MATCH_CANDIDATES[0]);
  const [activeRadius, setActiveRadius] = useState<number>(5); // km

  return (
    <div className="space-y-6 pb-12">
      {/* Top Request Context & Selector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex flex-col items-center justify-center font-display font-black text-lg">
            <span>{currentRequest.bloodGroup}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-900">{currentRequest.id}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-700 border border-red-200">
                {currentRequest.urgency} ORDER
              </span>
              <span className="text-xs text-slate-400 font-mono">NODE TH-902</span>
            </div>
            <div className="text-base font-bold text-slate-900 font-display">
              {currentRequest.component} • {currentRequest.units} Units Requested
            </div>
            <div className="text-xs text-slate-500">
              {currentRequest.destination} • {currentRequest.patient.diagnosis}
            </div>
          </div>
        </div>

        {/* Change active request */}
        {allRequests.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Switch Order:</span>
            <select
              id="matching-request-select"
              value={currentRequest.id}
              onChange={(e) => {
                const found = allRequests.find((r) => r.id === e.target.value);
                if (found) onSelectRequest(found);
              }}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50"
            >
              {allRequests.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} ({r.bloodGroup} {r.component})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid: Radar Map & Allocation Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Interactive Radar Map Canvas */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          {/* Top Radar Legend & Header */}
          <div className="relative z-10 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></div>
              <span className="text-xs font-mono font-bold tracking-widest uppercase text-emerald-400">
                LIVE GEOLOCATION MESH RADAR
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
              <span>SCAN RADIUS: {activeRadius}.0 KM</span>
              <span className="hidden sm:inline text-emerald-400">STATUS: LOCK ACTIVE</span>
            </div>
          </div>

          {/* Concentric Distance Rings & Radar Canvas */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Range 5km Ring */}
            <div className="w-[85%] h-[85%] rounded-full border border-emerald-500/20 absolute flex items-center justify-center">
              <span className="absolute top-2 text-[10px] font-mono text-emerald-500/40">5.0 km</span>
            </div>
            {/* Range 3km Ring */}
            <div className="w-[58%] h-[58%] rounded-full border border-emerald-500/30 absolute flex items-center justify-center">
              <span className="absolute top-2 text-[10px] font-mono text-emerald-500/50">3.0 km</span>
            </div>
            {/* Range 1km Ring */}
            <div className="w-[30%] h-[30%] rounded-full border border-emerald-500/40 absolute flex items-center justify-center">
              <span className="absolute top-2 text-[10px] font-mono text-emerald-500/60">1.0 km</span>
            </div>
            {/* Crosshairs */}
            <div className="w-full h-px bg-emerald-500/10 absolute"></div>
            <div className="h-full w-px bg-emerald-500/10 absolute"></div>

            {/* Sweep Line Animation */}
            <div className="w-[85%] h-[85%] rounded-full absolute overflow-hidden pointer-events-none">
              <div className="w-full h-full animate-sweep origin-center">
                <div
                  className="w-1/2 h-1/2 origin-bottom-right"
                  style={{
                    background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.25) 0deg, transparent 60deg)'
                  }}
                ></div>
              </div>
            </div>
          </div>

          {/* Central Trauma Bay Target Node */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span className="w-10 h-10 rounded-full bg-red-600/30 animate-ping absolute"></span>
              <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-[10px] shadow-lg shadow-red-600/50">
                +
              </div>
            </div>
            <span className="mt-1 px-2 py-0.5 rounded-sm bg-slate-900/90 text-white text-[10px] font-mono font-bold tracking-tight border border-slate-700">
              TRAUMA BAY 2 (HOSPITAL)
            </span>
          </div>

          {/* Interactive Radar Candidate Nodes */}
          {MATCH_CANDIDATES.map((cand) => {
            const isSelected = selectedCandidate.id === cand.id;
            const x = cand.coordinates?.x || 50;
            const y = cand.coordinates?.y || 50;

            return (
              <button
                key={cand.id}
                id={`radar-node-${cand.id}`}
                onClick={() => setSelectedCandidate(cand)}
                style={{ top: `${y}%`, left: `${x}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20 group text-left cursor-pointer focus:outline-hidden"
              >
                <div className="relative flex items-center justify-center">
                  {isSelected && (
                    <span className="w-10 h-10 rounded-full bg-emerald-400/30 animate-ping absolute"></span>
                  )}
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shadow-lg transition-all ${
                      isSelected
                        ? 'bg-emerald-500 text-white scale-125 ring-4 ring-emerald-500/30'
                        : 'bg-slate-800 text-emerald-400 border border-emerald-500/50 hover:scale-110'
                    }`}
                  >
                    {cand.type === 'Voluntary Donor' ? (
                      <UserCheck className="w-3.5 h-3.5" />
                    ) : (
                      <Building2 className="w-3.5 h-3.5" />
                    )}
                  </div>
                </div>
                <div
                  className={`mt-1 px-2 py-0.5 rounded-sm text-[10px] font-mono font-bold whitespace-nowrap transition-colors border ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 border-emerald-400'
                      : 'bg-slate-900/90 text-slate-300 border-slate-700 group-hover:border-slate-500'
                  }`}
                >
                  {cand.name.split(' ')[0]} ({cand.matchScore}%)
                </div>
              </button>
            );
          })}

          {/* Bottom Overlay Controls */}
          <div className="relative z-10 pt-6 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800">
              <span className="text-slate-400 font-mono text-[11px]">RANGE:</span>
              {[3, 5, 10].map((r) => (
                <button
                  key={r}
                  onClick={() => setActiveRadius(r)}
                  className={`px-2 py-0.5 rounded-md font-mono text-[11px] font-bold transition-all ${
                    activeRadius === r
                      ? 'bg-emerald-500 text-slate-950'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {r}km
                </button>
              ))}
            </div>

            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800">
              <Zap className="w-3 h-3" />
              <span>3 ELIGIBLE ALLOCATIONS LOCKED</span>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Recommended Resource Allocations List */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 font-display">
              Recommended Allocations (Match Rank)
            </h2>
            <span className="text-xs font-semibold text-emerald-600">AI Scored</span>
          </div>

          <div className="space-y-3">
            {MATCH_CANDIDATES.map((cand, idx) => {
              const isSelected = selectedCandidate.id === cand.id;

              return (
                <div
                  key={cand.id}
                  id={`match-candidate-card-${cand.id}`}
                  onClick={() => setSelectedCandidate(cand)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-emerald-500 ring-2 ring-emerald-500/20 shadow-md'
                      : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                          cand.type === 'Voluntary Donor'
                            ? 'bg-purple-100 text-purple-700'
                            : 'bg-blue-100 text-blue-700'
                        }`}
                      >
                        {cand.type === 'Voluntary Donor' ? (
                          <UserCheck className="w-4 h-4" />
                        ) : (
                          <Building2 className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 font-display">
                          {cand.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <MapPin className="w-3 h-3 text-slate-400" />
                          <span>{cand.distanceKm} km away</span>
                          <span>•</span>
                          <Clock className="w-3 h-3 text-slate-400" />
                          <span className="font-semibold text-slate-700">~{cand.etaMinutes} min ETA</span>
                        </div>
                      </div>
                    </div>

                    {/* Match Score Badge */}
                    <div className="text-right shrink-0">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold font-mono">
                        <span className="text-xs">{cand.matchScore}%</span>
                        <span className="text-[10px] font-normal text-emerald-600">Match</span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        {cand.unitsAvailable} Units Avail
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 mt-2.5 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-100">
                    {cand.status}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-slate-500">
                      {cand.temperature || 'Verified Spec'}
                    </span>
                    <button
                      type="button"
                      id={`dispatch-candidate-btn-${cand.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onDispatchCandidate(currentRequest.id, cand);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>{cand.type === 'Voluntary Donor' ? 'Mobilize Donor' : 'Dispatch Courier'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Dispatch Manifest Active Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-lg border border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs font-mono text-emerald-400 font-bold uppercase">
              SELECTED ALLOCATION MANIFEST
            </div>
            <div className="text-sm font-bold text-white">
              {selectedCandidate.name} ({selectedCandidate.matchScore}% Match • {selectedCandidate.distanceKm} km • ~{selectedCandidate.etaMinutes} min)
            </div>
            <div className="text-xs text-slate-400 mt-0.5">
              Target Bay: {currentRequest.destination} • Chain of Custody Security Lock Active
            </div>
          </div>
        </div>

        <button
          id="authorize-stat-dispatch-btn"
          onClick={() => onDispatchCandidate(currentRequest.id, selectedCandidate)}
          className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-emerald-500/20 whitespace-nowrap"
        >
          <Zap className="w-4 h-4 fill-slate-950" />
          <span>AUTHORIZE STAT DISPATCH & TRACK TRANSIT</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
