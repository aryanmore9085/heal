import React, { useState } from 'react';
import { ShieldAlert, Zap, Clock, Plane, Building, Radio, ArrowDown, CheckCircle2 } from 'lucide-react';

export const EscalationProtocolsView: React.FC = () => {
  const [tier1Mins, setTier1Mins] = useState(5);
  const [tier2Mins, setTier2Mins] = useState(15);
  const [autoAirlift, setAutoAirlift] = useState(true);

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold font-mono text-slate-400 uppercase">
            FAILSAFE ALGORITHMIC DISPATCH
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">
            Autonomous Escalation Ladder
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            When zero local compatible units are found within the response window, the system autonomously cascades out to wider mesh nodes.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Policy: Zero Transfusion Delay</span>
          </span>
        </div>
      </div>

      {/* 3-Tier Visual Flow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Tier 1 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-blue-500/40 shadow-sm relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
              STAGE 1 (0 - {tier1Mins} MIN)
            </span>
            <Building className="w-5 h-5 text-blue-600" />
          </div>

          <h2 className="text-lg font-bold font-display text-slate-900">
            Tier 1: Local Depository & On-Site Bank
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed">
            Direct allocation lock on City Hospital internal blood bank inventory and nearby central hospital reserves within 5km.
          </p>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Matching SLA:</span>
              <span className="font-mono font-bold text-slate-900">&lt; 45 seconds</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Transit Mode:</span>
              <span className="font-semibold text-slate-800">Hospital Pneumatic / Runner</span>
            </div>
          </div>
        </div>

        {/* Tier 2 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-amber-500/40 shadow-sm relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
              STAGE 2 ({tier1Mins} - {tier2Mins} MIN)
            </span>
            <Radio className="w-5 h-5 text-amber-600" />
          </div>

          <h2 className="text-lg font-bold font-display text-slate-900">
            Tier 2: Metro Mesh Banks & On-Call Donors
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed">
            Queries all 42 regional mesh blood banks and mobilizes high-compatibility verified voluntary donors via automated push dispatch.
          </p>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Search Perimeter:</span>
              <span className="font-mono font-bold text-slate-900">15.0 km radius</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Transit Mode:</span>
              <span className="font-semibold text-slate-800">Emergency Moto Escort (RMT)</span>
            </div>
          </div>
        </div>

        {/* Tier 3 */}
        <div className="bg-white p-5 rounded-2xl border-2 border-red-500/40 shadow-sm relative space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-red-100 text-red-800">
              STAGE 3 (&gt; {tier2Mins} MIN)
            </span>
            <Plane className="w-5 h-5 text-red-600" />
          </div>

          <h2 className="text-lg font-bold font-display text-slate-900">
            Tier 3: Regional Airlift & Drone Relay
          </h2>

          <p className="text-xs text-slate-500 leading-relaxed">
            Emergency helicopter airlift or autonomous cold-chain drone cargo mobilization from state central blood centers.
          </p>

          <div className="pt-2 border-t border-slate-100 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-600">
              <span>Search Perimeter:</span>
              <span className="font-mono font-bold text-slate-900">Statewide (up to 120 km)</span>
            </div>
            <div className="flex items-center justify-between text-slate-600">
              <span>Transit Mode:</span>
              <span className="font-semibold text-slate-800">Medevac Helicopter / Drone</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
