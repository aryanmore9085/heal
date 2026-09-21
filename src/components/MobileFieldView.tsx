import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Radar,
  Truck,
  UserCheck,
  ShieldAlert,
  Flame,
  Zap,
  MapPin,
  Clock,
  Thermometer,
  KeyRound,
  CheckCircle2,
  Check,
  ChevronRight,
  Phone,
  Radio,
  ArrowRight,
  Building2,
  AlertTriangle,
  Smartphone
} from 'lucide-react';
import { EmergencyRequest, BloodGroup, BloodComponent, MatchedEntity } from '../types';
import { MATCH_CANDIDATES } from '../data/mockData';

interface MobileFieldViewProps {
  requests: EmergencyRequest[];
  onSelectRequest: (req: EmergencyRequest) => void;
  onOpenCreate: () => void;
  onCreateNewRequest: (req: EmergencyRequest) => void;
  onDispatchCandidate: (reqId: string, cand: MatchedEntity) => void;
  onCompleteHandover: (reqId: string) => void;
}

export const MobileFieldView: React.FC<MobileFieldViewProps> = ({
  requests,
  onSelectRequest,
  onOpenCreate,
  onCreateNewRequest,
  onDispatchCandidate,
  onCompleteHandover
}) => {
  const [mobileTab, setMobileTab] = useState<'dash' | 'create' | 'radar' | 'donor' | 'transit'>('dash');
  const [activeReq, setActiveReq] = useState<EmergencyRequest>(requests[0]);

  // Mobile Create State
  const [mobGroup, setMobGroup] = useState<BloodGroup>('O-');
  const [mobComp, setMobComp] = useState<BloodComponent>('Packed RBC');
  const [mobUnits, setMobUnits] = useState<number>(2);

  // Mobile Transit State
  const [mobCountdown, setMobCountdown] = useState<number>(241);
  const [mobOtp, setMobOtp] = useState<string>('');
  const [mobHandoverDone, setMobHandoverDone] = useState<boolean>(false);

  // Mobile Donor Acceptance State
  const [donorAccepted, setDonorAccepted] = useState<boolean>(false);
  const [donorReadyToggle, setDonorReadyToggle] = useState<boolean>(true);

  useEffect(() => {
    if (mobHandoverDone) return;
    const interval = setInterval(() => {
      setMobCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [mobHandoverDone]);

  const formatSecs = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMobileCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `#BL${Math.floor(1030 + Math.random() * 50)}`;
    const newReq: EmergencyRequest = {
      id: newId,
      bloodGroup: mobGroup,
      component: mobComp,
      units: mobUnits,
      urgency: 'STAT',
      destination: 'City Hospital • Trauma Bay 2',
      createdAt: 'Just now',
      status: 'Matching',
      tier: 1,
      patient: {
        id: 'PT-99120',
        age: 28,
        gender: 'Male',
        diagnosis: 'Severe Hemorrhagic Shock',
        traumaBay: 'Trauma Bay 2',
        physician: 'Dr. Vance'
      },
      custodySteps: [
        { step: 1, title: 'STAT Broadcast Initiated', location: 'Trauma Bay 2', timestamp: '14:28', status: 'completed' },
        { step: 2, title: 'AI Mesh Matching Active', location: 'Autonomous Node', timestamp: '14:28', status: 'active' },
        { step: 3, title: 'Depository STAT Allocation', location: 'Mesh', timestamp: 'Pending', status: 'pending' },
        { step: 4, title: 'Cold Container Sealed', location: 'Pending', timestamp: 'Pending', status: 'pending' }
      ]
    };
    onCreateNewRequest(newReq);
    setActiveReq(newReq);
    setMobileTab('radar');
  };

  return (
    <div className="max-w-md mx-auto pb-16">
      {/* Smartphone Device Frame Header */}
      <div className="bg-slate-900 text-white rounded-t-3xl p-3 flex items-center justify-between text-xs font-mono border-x border-t border-slate-700">
        <button
          type="button"
          onClick={() => setMobileTab('dash')}
          className="flex items-center gap-2 hover:text-red-400 transition-colors cursor-pointer text-left"
          title="Return to Mobile Field Dashboard"
        >
          <Smartphone className="w-3.5 h-3.5 text-red-500" />
          <span className="font-bold">BLOODLINK MOBILE FIELD RESPONDER</span>
        </button>
        <div className="flex items-center gap-1 text-[11px] text-emerald-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span>5G MESH LIVE</span>
        </div>
      </div>

      {/* Screen Container */}
      <div className="bg-white border-x border-b border-slate-200 shadow-2xl rounded-b-3xl overflow-hidden min-h-[620px] flex flex-col justify-between">
        {/* Mobile View Tabs Header */}
        <div className="bg-slate-50 border-b border-slate-200 p-2 flex items-center justify-between text-[11px] font-semibold text-slate-600 overflow-x-auto gap-1">
          <button
            onClick={() => setMobileTab('dash')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              mobileTab === 'dash' ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-200'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setMobileTab('create')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              mobileTab === 'create' ? 'bg-red-600 text-white shadow-xs' : 'hover:bg-slate-200'
            }`}
          >
            + Create STAT
          </button>
          <button
            onClick={() => setMobileTab('radar')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              mobileTab === 'radar' ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-200'
            }`}
          >
            Mesh Radar
          </button>
          <button
            onClick={() => setMobileTab('donor')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              mobileTab === 'donor' ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-200'
            }`}
          >
            Donor App
          </button>
          <button
            onClick={() => setMobileTab('transit')}
            className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
              mobileTab === 'transit' ? 'bg-slate-900 text-white shadow-xs' : 'hover:bg-slate-200'
            }`}
          >
            Transit GPS
          </button>
        </div>

        {/* Dynamic Mobile Screen Content */}
        <div className="p-4 flex-1 overflow-y-auto">
          {/* TAB 1: Mobile Dashboard (Image 1.png) */}
          {mobileTab === 'dash' && (
            <div className="space-y-4">
              {/* Top Mobile Brand */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setMobileTab('dash')}
                  className="flex items-center gap-2 text-left cursor-pointer group"
                  title="Return to Dashboard"
                >
                  <div className="w-8 h-8 rounded-lg bg-red-600 text-white flex items-center justify-center font-black text-sm group-hover:scale-105 transition-transform shadow-xs">
                    +
                  </div>
                  <div>
                    <div className="font-display font-black text-base leading-tight group-hover:text-red-600 transition-colors">
                      Blood<span className="text-red-600 group-hover:text-slate-900 transition-colors">Link</span>
                    </div>
                    <div className="text-[9px] font-mono uppercase tracking-widest text-slate-500">
                      EMERGENCY NETWORK
                    </div>
                  </div>
                </button>

                <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  <span>42 Banks Active</span>
                </div>
              </div>

              {/* 1-Tap STAT Rapid Presets */}
              <div className="bg-red-50/70 p-3 rounded-xl border border-red-200 space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-red-900">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 text-red-600 fill-red-600" />
                    <span>1-TAP STAT PRESETS</span>
                  </span>
                  <span className="text-[10px] text-red-600 font-mono">CODE RED</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      setMobGroup('O-');
                      setMobComp('Whole Blood');
                      setMobUnits(2);
                      setMobileTab('create');
                    }}
                    className="p-2 bg-white rounded-lg border border-red-200 text-left text-xs font-bold text-slate-900 shadow-xs cursor-pointer hover:border-red-400"
                  >
                    <div>O- Whole (2U)</div>
                    <div className="text-[10px] font-normal text-slate-500">Massive Bleed</div>
                  </button>
                  <button
                    onClick={() => {
                      setMobGroup('O+');
                      setMobComp('Platelets');
                      setMobUnits(2);
                      setMobileTab('create');
                    }}
                    className="p-2 bg-white rounded-lg border border-red-200 text-left text-xs font-bold text-slate-900 shadow-xs cursor-pointer hover:border-red-400"
                  >
                    <div>O+ Plt (2U)</div>
                    <div className="text-[10px] font-normal text-slate-500">Apheresis</div>
                  </button>
                </div>
              </div>

              {/* Mobile KPIs */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px] font-bold uppercase">ACTIVE PIPELINE</div>
                  <div className="text-xl font-black font-display text-slate-900 mt-0.5">5 Requests</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-slate-400 text-[10px] font-bold uppercase">STAT RELEASE</div>
                  <div className="text-xl font-black font-display text-red-600 mt-0.5">3 Cases</div>
                </div>
              </div>

              {/* Active Cases Cards */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                  Active Operations (5)
                </div>
                {requests.map((req) => (
                  <div
                    key={req.id}
                    onClick={() => {
                      setActiveReq(req);
                      if (req.status === 'In-Transit') setMobileTab('transit');
                      else setMobileTab('radar');
                    }}
                    className="p-3 rounded-xl border border-slate-200 hover:border-slate-400 transition-all bg-white shadow-xs cursor-pointer flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-lg bg-slate-900 text-white flex flex-col items-center justify-center font-bold text-xs">
                        <span>{req.bloodGroup}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-xs font-bold text-slate-900">{req.id}</span>
                          <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-sm bg-red-100 text-red-700">
                            {req.urgency}
                          </span>
                        </div>
                        <div className="text-xs font-semibold text-slate-800">
                          {req.component} • {req.units}U
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-[11px] font-bold text-blue-600 block">
                        {req.status}
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-400 inline" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: Mobile Create STAT Request (Image 5.png) */}
          {mobileTab === 'create' && (
            <form onSubmit={handleMobileCreateSubmit} className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h3 className="font-bold text-slate-900 text-sm font-display flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-red-600" />
                  <span>Create Emergency STAT</span>
                </h3>
                <span className="text-[10px] font-mono bg-red-50 text-red-700 px-2 py-0.5 rounded-full font-bold">
                  STEP 1-5
                </span>
              </div>

              {/* Step 1: Blood Group */}
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1.5">
                  1. Blood Group Required
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'] as BloodGroup[]).map((bg) => (
                    <button
                      key={bg}
                      type="button"
                      onClick={() => setMobGroup(bg)}
                      className={`py-2 rounded-lg text-xs font-bold border transition-all ${
                        mobGroup === bg
                          ? 'bg-red-600 text-white border-red-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-800'
                      }`}
                    >
                      {bg}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Target Component */}
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1.5">
                  2. Target Component
                </label>
                <div className="space-y-1.5">
                  {(['Packed RBC', 'Whole Blood', 'Platelets', 'Fresh Frozen Plasma'] as BloodComponent[]).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setMobComp(c)}
                      className={`w-full p-2 rounded-lg text-xs font-semibold border text-left flex items-center justify-between ${
                        mobComp === c
                          ? 'bg-red-50 border-red-600 text-red-900 font-bold'
                          : 'bg-white border-slate-200 text-slate-700'
                      }`}
                    >
                      <span>{c}</span>
                      {mobComp === c && <Check className="w-3.5 h-3.5 text-red-600" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 3: Units Stepper */}
              <div>
                <label className="text-[11px] font-bold uppercase text-slate-500 block mb-1.5">
                  3. Volume & Units
                </label>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span className="text-xs font-semibold text-slate-700">Units Requested:</span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setMobUnits(Math.max(1, mobUnits - 1))}
                      className="w-7 h-7 rounded-md bg-white border border-slate-300 font-bold text-sm"
                    >
                      -
                    </button>
                    <span className="font-black text-lg font-display w-6 text-center">{mobUnits}</span>
                    <button
                      type="button"
                      onClick={() => setMobUnits(mobUnits + 1)}
                      className="w-7 h-7 rounded-md bg-white border border-slate-300 font-bold text-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>BROADCAST EMERGENCY STAT REQUEST</span>
              </button>
            </form>
          )}

          {/* TAB 3: Mobile Matching Radar (Image 17.png) */}
          {mobileTab === 'radar' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-display">
                    Matching Radar • {activeReq.id}
                  </h3>
                  <div className="text-[11px] text-slate-500">
                    {activeReq.bloodGroup} {activeReq.component} • {activeReq.units} Units
                  </div>
                </div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  94% MAX MATCH
                </span>
              </div>

              {/* Circular Radar Graphic */}
              <div className="w-full h-56 bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center p-4 border border-slate-800">
                <div className="w-48 h-48 rounded-full border border-emerald-500/30 absolute"></div>
                <div className="w-32 h-32 rounded-full border border-emerald-500/40 absolute"></div>
                <div className="w-16 h-16 rounded-full border border-emerald-500/50 absolute"></div>
                {/* Sweep */}
                <div className="w-48 h-48 rounded-full absolute overflow-hidden pointer-events-none">
                  <div className="w-full h-full animate-sweep origin-center">
                    <div
                      className="w-1/2 h-1/2 origin-bottom-right"
                      style={{
                        background: 'conic-gradient(from 0deg, rgba(16, 185, 129, 0.35) 0deg, transparent 60deg)'
                      }}
                    ></div>
                  </div>
                </div>
                {/* Hospital Node */}
                <div className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-xs z-10 shadow-lg shadow-red-600/50">
                  +
                </div>
                {/* Candidate Dots */}
                <div className="absolute top-10 right-14 flex items-center gap-1 z-10">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="text-[9px] font-mono text-emerald-400 bg-slate-900/80 px-1 rounded">
                    Main Depot 94%
                  </span>
                </div>
                <div className="absolute bottom-12 left-10 flex items-center gap-1 z-10">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="text-[9px] font-mono text-emerald-400 bg-slate-900/80 px-1 rounded">
                    #D-489 87%
                  </span>
                </div>
              </div>

              {/* Allocations list */}
              <div className="space-y-2">
                {MATCH_CANDIDATES.map((cand) => (
                  <div
                    key={cand.id}
                    className="p-3 rounded-xl border border-slate-200 bg-white flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900">{cand.name}</div>
                      <div className="text-[11px] text-slate-500">
                        {cand.distanceKm} km • ~{cand.etaMinutes}m ETA • {cand.unitsAvailable} Units
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-bold font-mono text-emerald-600">
                        {cand.matchScore}% Match
                      </div>
                      <button
                        onClick={() => {
                          onDispatchCandidate(activeReq.id, cand);
                          setMobileTab('transit');
                        }}
                        className="mt-1 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-[10px] font-bold"
                      >
                        Dispatch
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setMobileTab('transit')}
                className="w-full py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-2"
              >
                <span>PROCEED TO LIVE TRACKING & TRANSIT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* TAB 4: Mobile Donor Dispatch Screen (Image 15.png - Marcus Reed #D-489) */}
          {mobileTab === 'donor' && (
            <div className="space-y-4">
              {/* Donor Identity Card */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-red-600 text-white flex items-center justify-center font-black text-lg">
                      O+
                    </div>
                    <div>
                      <h3 className="font-bold text-base font-display">Marcus Reed</h3>
                      <div className="text-[11px] text-slate-400 font-mono">
                        VERIFIED DONOR #D-489 • APHERESIS
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    87% MATCH
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">STAT Readiness Status:</span>
                  <button
                    onClick={() => setDonorReadyToggle(!donorReadyToggle)}
                    className={`px-3 py-1 rounded-full font-bold text-[11px] transition-all ${
                      donorReadyToggle ? 'bg-emerald-500 text-slate-950' : 'bg-slate-700 text-slate-300'
                    }`}
                  >
                    {donorReadyToggle ? 'READY FOR STAT DISPATCH' : 'RESTING'}
                  </button>
                </div>
              </div>

              {/* Active Trauma Callout Banner */}
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-red-900">
                  <Flame className="w-4 h-4 text-red-600 animate-bounce" />
                  <span>CODE RED STAT: IMMEDIATE MOBILIZATION</span>
                </div>
                <div className="text-xs text-slate-700 font-medium">
                  City Hospital Trauma Bay 2 requests Apheresis Platelets (2 Units) for blunt polytrauma resuscitation.
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Distance to Bay 2: 1.8 km • Priority Corridor Transit
                </div>

                {donorAccepted ? (
                  <div className="p-2.5 rounded-lg bg-emerald-600 text-white text-xs font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>MOBILIZATION ACCEPTED • PROCEEDING TO TRANSIT</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setDonorAccepted(true)}
                    className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShieldAlert className="w-4 h-4" />
                    <span>ACCEPT & DISPATCH TO HOSPITAL</span>
                  </button>
                )}
              </div>

              {/* Rapid Pre-Donation Screening */}
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                <div className="font-bold text-slate-800 uppercase text-[10px] tracking-wider">
                  Rapid Pre-Donation Screening Checklist
                </div>
                <div className="space-y-1.5 text-slate-600">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Weight &gt; 50 kg &amp; Good Health Today</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>No Aspirin or NSAIDs within past 48 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Last apheresis &gt; 14 days ago (84 days passed)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Photo ID &amp; Biometric Token Verified</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: Mobile Transit Tracker (Image 19.png) */}
          {mobileTab === 'transit' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 font-display">
                    Transit Tracking • #BL1024
                  </h3>
                  <div className="text-[11px] text-slate-500">
                    Platelets 2 Units • Courier RMT-88
                  </div>
                </div>
                <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                  CHAIN 6/8 LIVE
                </span>
              </div>

              {/* Telemetry Mini Cards */}
              <div className="grid grid-cols-3 gap-1.5 text-center">
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[9px] font-bold text-slate-400">COUNTDOWN</div>
                  <div className="text-sm font-black font-mono text-slate-900">
                    {mobHandoverDone ? '00:00' : formatSecs(mobCountdown)}
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[9px] font-bold text-slate-400">SPEED</div>
                  <div className="text-sm font-black font-mono text-slate-900">
                    {mobHandoverDone ? '0' : '48 km/h'}
                  </div>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="text-[9px] font-bold text-slate-400">COLD-CHAIN</div>
                  <div className="text-sm font-black font-mono text-emerald-600">22.0°C</div>
                </div>
              </div>

              {/* Mini Vector Map */}
              <div className="h-44 bg-slate-950 rounded-2xl relative overflow-hidden flex items-center justify-center p-3 border border-slate-800">
                <div className="absolute inset-0 opacity-30" style={{
                  backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
                }}></div>
                <div className="w-full flex items-center justify-between z-10 px-4">
                  <div className="text-center">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs font-bold mx-auto">
                      <MapPin className="w-3.5 h-3.5" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-300 block mt-1">Main Depot</span>
                  </div>
                  <div className="flex-1 mx-3 border-t-2 border-dashed border-blue-500 relative flex items-center justify-center">
                    <div className="w-7 h-7 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg animate-pulse">
                      <Truck className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-black mx-auto">
                      +
                    </div>
                    <span className="text-[9px] font-mono text-red-400 block mt-1 font-bold">Bay 2</span>
                  </div>
                </div>
              </div>

              {/* Receiving Transfer Code (OTP) */}
              <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold font-mono text-amber-400">
                    <KeyRound className="w-4 h-4" />
                    <span>RECEIVING TRANSFER CODE</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setMobOtp('7294')}
                    className="text-[10px] text-slate-400 underline"
                  >
                    Auto-fill (7294)
                  </button>
                </div>

                <div className="flex items-center justify-center gap-3">
                  {['7', '2', '9', '4'].map((digit, idx) => (
                    <div
                      key={idx}
                      className="w-11 h-12 rounded-xl bg-slate-800 border-2 border-amber-400/60 text-amber-400 font-mono font-black text-2xl flex items-center justify-center"
                    >
                      {digit}
                    </div>
                  ))}
                </div>

                {mobHandoverDone ? (
                  <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>HANDOVER VERIFIED & COMPLETE</span>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setMobHandoverDone(true);
                      onCompleteHandover('#BL1024');
                    }}
                    className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>CONFIRM RECEIPT & COMPLETE HANDOVER</span>
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Smartphone Bar */}
        <div className="p-3 bg-slate-100 border-t border-slate-200 text-center text-[10px] text-slate-500 font-mono">
          <span>CITY HOSPITAL NODE #TH-902 • ENCRYPTED BIO-LINK</span>
        </div>
      </div>
    </div>
  );
};
