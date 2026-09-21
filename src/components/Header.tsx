import React from 'react';
import { ShieldAlert, Radio, Activity, Smartphone, Monitor, Bell, AlertTriangle } from 'lucide-react';

interface HeaderProps {
  viewMode: 'desktop' | 'mobile';
  setViewMode: (mode: 'desktop' | 'mobile') => void;
  onOpenCreate: () => void;
  activeRequestsCount: number;
  onNavigateHome: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  onOpenCreate,
  activeRequestsCount,
  onNavigateHome
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top Banner Notice */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-1.5 flex items-center justify-between text-xs text-amber-800 font-medium">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>
            <strong className="font-semibold">PROTOTYPE FOR HACKATHON DEMO</strong> • REALISTIC CLINICAL DEMO DATA & SIMULATED MESH NETWORK
          </span>
          <span className="hidden md:inline-block ml-auto text-amber-700/80 font-mono text-[11px]">
            NODE: TH-902 (Bay 2 Resuscitation) • LATENCY: 28ms
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand & Logo (Clickable to Main Page) */}
        <button
          type="button"
          id="header-logo-home-btn"
          onClick={onNavigateHome}
          className="flex items-center gap-3 text-left cursor-pointer group focus:outline-hidden focus-visible:ring-2 focus-visible:ring-red-500 rounded-xl p-1 -m-1 transition-all"
          title="Return to main dashboard"
          aria-label="BloodLink Emergency Network - Return to main dashboard"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-red-600 text-white shadow-md shadow-red-600/20 group-hover:scale-105 group-hover:bg-red-700 transition-all">
            {/* Custom Droplet + Plus Symbol from Logo Mockup */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
            </svg>
            <span className="absolute text-red-600 group-hover:text-red-700 font-black text-xs leading-none select-none pointer-events-none mt-1 transition-colors">
              +
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-black text-xl tracking-tight text-slate-900 group-hover:text-red-600 transition-colors">
                Blood<span className="text-red-600 group-hover:text-slate-900 transition-colors">Link</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></span>
                EMERGENCY NETWORK
              </span>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                42 Banks Active
              </span>
              <span>•</span>
              <span className="text-slate-600">City Hospital Trauma Bay 2</span>
            </div>
          </div>
        </button>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Switcher Toggle: Desktop vs Mobile View */}
          <div className="flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button
              id="view-desktop-btn"
              onClick={() => setViewMode('desktop')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'desktop'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Desktop Trauma Command</span>
              <span className="sm:hidden">Command</span>
            </button>
            <button
              id="view-mobile-btn"
              onClick={() => setViewMode('mobile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                viewMode === 'mobile'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Mobile Field App</span>
              <span className="sm:hidden">Field App</span>
            </button>
          </div>

          {/* Quick 1-Tap Create STAT Button */}
          <button
            id="header-create-stat-btn"
            onClick={onOpenCreate}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-md shadow-red-600/20 transition-all cursor-pointer"
          >
            <ShieldAlert className="w-4 h-4 text-white animate-bounce" />
            <span className="hidden md:inline">+ CREATE STAT REQUEST</span>
            <span className="md:hidden">+ STAT</span>
          </button>
        </div>
      </div>
    </header>
  );
};
