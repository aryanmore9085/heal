import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  TrendingUp,
  Activity,
  ArrowRight,
  ShieldAlert,
  Radio,
  Truck,
  Filter,
  Flame,
  Zap,
  ChevronRight,
  ShieldCheck,
  Thermometer
} from 'lucide-react';
import { EmergencyRequest, BloodGroup, BloodComponent } from '../types';
import { NETWORK_LOGS } from '../data/mockData';

interface DashboardViewProps {
  requests: EmergencyRequest[];
  onSelectRequest: (req: EmergencyRequest) => void;
  onOpenCreate: (preset?: { group: BloodGroup; comp: BloodComponent; units: number }) => void;
  onNavigateTab: (tab: any) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  requests,
  onSelectRequest,
  onOpenCreate,
  onNavigateTab
}) => {
  const [filter, setFilter] = useState<'all' | 'critical' | 'transit' | 'matching'>('all');

  const filteredRequests = requests.filter((r) => {
    if (filter === 'critical') return r.urgency === 'STAT' || r.urgency === 'Critical';
    if (filter === 'transit') return r.status === 'In-Transit';
    if (filter === 'matching') return r.status === 'Matching';
    return true;
  });

  const statPresets: Array<{ label: string; group: BloodGroup; comp: BloodComponent; units: number; color: string }> = [
    { label: 'O- Whole (2U)', group: 'O-', comp: 'Whole Blood', units: 2, color: 'bg-red-50 text-red-700 border-red-200' },
    { label: 'O+ Plt (2U)', group: 'O+', comp: 'Platelets', units: 2, color: 'bg-amber-50 text-amber-700 border-amber-200' },
    { label: 'AB- FFP (3U)', group: 'AB-', comp: 'Fresh Frozen Plasma', units: 3, color: 'bg-blue-50 text-blue-700 border-blue-200' },
    { label: 'A+ PRBC (2U)', group: 'A+', comp: 'Packed RBC', units: 2, color: 'bg-emerald-50 text-emerald-700 border-emerald-200' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Welcome Banner / Header */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-slate-500 tracking-wide uppercase font-mono">
              TRAUMA BAY COMMAND CONSOLE
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 font-display">
            Emergency Dispatch & Mesh Pipeline
          </h1>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Real-time multi-depository inventory synchronization, autonomous matching engine, and encrypted cold-chain custody tracking.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="dash-open-matching-btn"
            onClick={() => onNavigateTab('matching')}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors flex items-center gap-2"
          >
            <Radio className="w-4 h-4 text-slate-600" />
            <span>Launch Matching Radar</span>
          </button>
          <button
            id="dash-create-stat-btn"
            onClick={() => onOpenCreate()}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 transition-all flex items-center gap-2"
          >
            <Flame className="w-4 h-4" />
            <span>New Emergency STAT</span>
          </button>
        </div>
      </div>

      {/* 1-Tap STAT Rapid Presets */}
      <div className="bg-gradient-to-r from-red-500/10 via-amber-500/10 to-transparent p-4 rounded-2xl border border-red-500/20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-red-600 fill-red-600 animate-bounce" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wide">
              1-Tap Rapid STAT Orders (Code Red Protocols)
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-medium">
            Instantly pre-authorizes autonomous matching and courier mobilization
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {statPresets.map((preset, idx) => (
            <button
              key={idx}
              id={`preset-btn-${idx}`}
              onClick={() => onOpenCreate(preset)}
              className={`p-3 rounded-xl border font-semibold text-xs transition-all text-left flex items-center justify-between hover:shadow-md hover:scale-[1.02] cursor-pointer ${preset.color} bg-white`}
            >
              <div>
                <div className="font-bold text-slate-900 text-sm font-display">{preset.label}</div>
                <div className="text-[11px] text-slate-500 mt-0.5">{preset.comp}</div>
              </div>
              <ChevronRight className="w-4 h-4 opacity-60" />
            </button>
          ))}
        </div>
      </div>

      {/* KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>ACTIVE PIPELINE</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            {requests.length}{' '}
            <span className="text-xs font-normal text-slate-500 font-sans">Requests</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span>3 in active transit</span>
            <span>•</span>
            <span className="text-slate-400">1 matching</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>STAT RELEASE</span>
            <Flame className="w-4 h-4 text-red-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-red-600">
            3{' '}
            <span className="text-xs font-normal text-slate-500 font-sans">Critical Cases</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1 font-mono">
            <span>Avg Response: 4.2 min</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>FULFILLMENT RATE</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-emerald-600">
            94%{' '}
            <span className="text-xs font-normal text-slate-500 font-sans">TAT Goal</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 flex items-center gap-1 font-mono">
            <span>Cold-chain integrity 99.8%</span>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
            <span>MESH STATUS</span>
            <Radio className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold font-display text-slate-900">
            42{' '}
            <span className="text-xs font-normal text-slate-500 font-sans">Banks Live</span>
          </div>
          <div className="mt-2 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>Zero stockouts detected</span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Active Emergency Requests Table */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 font-display">
                Active Emergency Pipeline
              </h2>
              <p className="text-xs text-slate-500">
                Live status of trauma center transfusion orders and courier manifests
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-semibold text-slate-600">
              <button
                id="filter-all-btn"
                onClick={() => setFilter('all')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                All ({requests.length})
              </button>
              <button
                id="filter-critical-btn"
                onClick={() => setFilter('critical')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filter === 'critical' ? 'bg-white text-red-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                Critical / STAT
              </button>
              <button
                id="filter-transit-btn"
                onClick={() => setFilter('transit')}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  filter === 'transit' ? 'bg-white text-blue-600 shadow-xs' : 'hover:text-slate-900'
                }`}
              >
                In-Transit
              </button>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {filteredRequests.map((req) => (
              <div
                key={req.id}
                id={`request-row-${req.id.replace('#', '')}`}
                onClick={() => onSelectRequest(req)}
                className="p-4 sm:p-5 hover:bg-slate-50/80 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex items-start gap-3.5">
                  {/* Blood Group Badge */}
                  <div
                    className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold font-display shrink-0 border ${
                      req.bloodGroup === 'O-'
                        ? 'bg-red-600 text-white border-red-700'
                        : req.bloodGroup === 'O+'
                        ? 'bg-amber-600 text-white border-amber-700'
                        : req.bloodGroup.includes('-')
                        ? 'bg-purple-600 text-white border-purple-700'
                        : 'bg-blue-600 text-white border-blue-700'
                    }`}
                  >
                    <span className="text-base leading-none">{req.bloodGroup}</span>
                    <span className="text-[10px] font-mono tracking-tighter opacity-80 mt-0.5">
                      {req.units}U
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{req.id}</span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          req.urgency === 'STAT'
                            ? 'bg-red-100 text-red-700 border border-red-200'
                            : req.urgency === 'Critical'
                            ? 'bg-amber-100 text-amber-800 border border-amber-200'
                            : 'bg-blue-100 text-blue-700 border border-blue-200'
                        }`}
                      >
                        {req.urgency}
                      </span>
                      <span className="text-xs font-medium text-slate-500">
                        {req.createdAt}
                      </span>
                    </div>

                    <div className="text-sm font-semibold text-slate-900 mt-1">
                      {req.component} • {req.units} Units
                    </div>

                    <div className="text-xs text-slate-500 mt-0.5 flex items-center gap-2">
                      <span>{req.patient.traumaBay}</span>
                      <span>•</span>
                      <span className="truncate max-w-[240px]">{req.patient.diagnosis}</span>
                    </div>
                  </div>
                </div>

                {/* Right Status & Quick Action */}
                <div className="flex items-center justify-between sm:justify-end gap-3 sm:text-right border-t sm:border-t-0 pt-2 sm:pt-0">
                  <div>
                    <div className="flex items-center sm:justify-end gap-1.5 text-xs font-bold">
                      {req.status === 'In-Transit' && (
                        <span className="flex items-center gap-1 text-blue-600 font-semibold">
                          <Truck className="w-3.5 h-3.5 animate-pulse" />
                          In Transit (~{req.transit?.etaMinutes || 4}m)
                        </span>
                      )}
                      {req.status === 'Matching' && (
                        <span className="flex items-center gap-1 text-amber-600 font-semibold">
                          <Radio className="w-3.5 h-3.5 animate-spin" />
                          Escalation Tier {req.tier} Matching
                        </span>
                      )}
                      {req.status === 'Allocated' && (
                        <span className="flex items-center gap-1 text-purple-600 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Allocated & Thawing
                        </span>
                      )}
                      {req.status === 'Fulfilled' && (
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          Delivered & Verified
                        </span>
                      )}
                    </div>
                    {req.transit && (
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5 flex items-center sm:justify-end gap-1">
                        <Thermometer className="w-3 h-3 text-emerald-600" />
                        <span>{req.transit.temperatureC}°C</span>
                        <span>•</span>
                        <span>{req.transit.speedKmH} km/h</span>
                      </div>
                    )}
                  </div>

                  <button
                    className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                    title="View Tracking Details"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span>Showing {filteredRequests.length} emergency cases</span>
            <button
              id="view-all-requests-link"
              onClick={() => onNavigateTab('requests')}
              className="text-red-600 hover:text-red-700 font-semibold flex items-center gap-1"
            >
              <span>Open Detailed Request Ledger</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Col: Autonomous Escalation & Live Feed */}
        <div className="space-y-6">
          {/* Automated Escalation Protocol Card */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Autonomous Escalation Protocol
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                ACTIVE
              </span>
            </div>

            <p className="text-xs text-slate-500">
              Algorithm automatically expands search perimeter when local hospital reserves are depleted.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Tier 1: Local Depository</div>
                  <div className="text-[11px] text-slate-500">0 - 5 min • In-House & Primary Bank</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Active
                </span>
              </div>

              <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 flex items-center justify-between">
                <div>
                  <div className="font-bold text-slate-900">Tier 2: Metro Mesh Banks</div>
                  <div className="text-[11px] text-slate-500">5 - 15 min • 42 Regional Depots</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 animate-pulse">
                  1 Case
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between opacity-80">
                <div>
                  <div className="font-bold text-slate-900">Tier 3: Airlift & Drone Relay</div>
                  <div className="text-[11px] text-slate-500">&gt; 15 min • State Central Reserve</div>
                </div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-700">
                  Standby
                </span>
              </div>
            </div>

            <button
              id="dash-open-escalation-btn"
              onClick={() => onNavigateTab('escalation')}
              className="w-full py-2 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-colors"
            >
              Configure Protocol Thresholds
            </button>
          </div>

          {/* Live Network Activity Feed */}
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900 font-display">
                  Live Mesh Activity
                </h3>
              </div>
              <span className="text-[11px] font-mono text-slate-400">REALTIME</span>
            </div>

            <div className="space-y-3">
              {NETWORK_LOGS.map((log) => (
                <div key={log.id} className="text-xs space-y-1">
                  <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                    <span>{log.time}</span>
                    <span className="uppercase text-[9px] font-bold text-slate-500 px-1.5 py-0.2 rounded-sm bg-slate-100">
                      {log.type}
                    </span>
                  </div>
                  <div className="text-slate-700 leading-relaxed">{log.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
