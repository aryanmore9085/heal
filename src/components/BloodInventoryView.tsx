import React, { useState } from 'react';
import { Package, AlertTriangle, ShieldCheck, Filter, Search, RefreshCw, Layers } from 'lucide-react';
import { InventoryItem, BloodGroup } from '../types';
import { MOCK_INVENTORY } from '../data/mockData';

export const BloodInventoryView: React.FC = () => {
  const [items, setItems] = useState<InventoryItem[]>(MOCK_INVENTORY);
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [search, setSearch] = useState<string>('');

  const groups: BloodGroup[] = ['O-', 'O+', 'A-', 'A+', 'B-', 'B+', 'AB-', 'AB+'];

  const filtered = items.filter((item) => {
    if (selectedGroup !== 'all' && item.bloodGroup !== selectedGroup) return false;
    if (search && !item.component.toLowerCase().includes(search.toLowerCase()) && !item.facility.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  const totalAvailable = items.reduce((acc, i) => acc + i.availableUnits, 0);
  const totalReserved = items.reduce((acc, i) => acc + i.reservedUnits, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold font-mono text-slate-400 uppercase">
            REGIONAL MESH REPOSITORY
          </div>
          <h1 className="text-2xl font-bold font-display text-slate-900 mt-1">
            Blood & Component Inventory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Aggregated real-time cold stock across City Hospital Depository and 41 partner mesh depositories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-xs font-semibold text-slate-500">Total Mesh Units</div>
            <div className="text-xl font-bold text-slate-900 font-display">
              {totalAvailable} Available <span className="text-xs font-normal text-slate-400">({totalReserved} locked)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Blood Group Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <button
            onClick={() => setSelectedGroup('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              selectedGroup === 'all'
                ? 'bg-slate-900 text-white'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            All Types
          </button>
          {groups.map((g) => (
            <button
              key={g}
              onClick={() => setSelectedGroup(g)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedGroup === g
                  ? 'bg-red-600 text-white'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {g}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search component or depot..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Inventory Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((item) => {
          const isLow = item.availableUnits < item.minThreshold;
          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all bg-white shadow-xs ${
                isLow ? 'border-amber-300 ring-1 ring-amber-200' : 'border-slate-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold font-display text-sm">
                    {item.bloodGroup}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-slate-900 font-display">
                      {item.component}
                    </div>
                    <div className="text-[11px] text-slate-500">{item.facility}</div>
                  </div>
                </div>

                {isLow ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3" />
                    <span>LOW</span>
                  </span>
                ) : (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3" />
                    <span>NORMAL</span>
                  </span>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <span className="text-xl font-bold text-slate-900 font-display">
                    {item.availableUnits}
                  </span>
                  <span className="text-slate-500 ml-1">Units Available</span>
                </div>
                <div className="text-right text-[11px] text-slate-400 font-mono">
                  Expires in {item.expiryDays}d
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
