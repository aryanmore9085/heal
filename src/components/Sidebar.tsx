import React from 'react';
import {
  LayoutDashboard,
  AlertCircle,
  PlusCircle,
  Radar,
  Truck,
  Package,
  Users,
  ShieldAlert,
  Sliders,
  CheckCircle2
} from 'lucide-react';

export type TabType =
  | 'dashboard'
  | 'requests'
  | 'create'
  | 'matching'
  | 'tracking'
  | 'inventory'
  | 'donors'
  | 'escalation';

interface SidebarProps {
  currentTab: TabType;
  setTab: (tab: TabType) => void;
  activeCount: number;
}

interface NavItem {
  id: TabType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: number;
  isHighlight?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setTab, activeCount }) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'requests', label: 'Emergency Requests', icon: AlertCircle, badge: activeCount },
    { id: 'create', label: '+ Create Request', icon: PlusCircle, isHighlight: true },
    { id: 'matching', label: 'Matching Engine', icon: Radar },
    { id: 'tracking', label: 'Request Tracking', icon: Truck },
    { id: 'inventory', label: 'Blood Inventory', icon: Package },
    { id: 'donors', label: 'Donor Network', icon: Users },
    { id: 'escalation', label: 'Escalation Protocols', icon: ShieldAlert }
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 shrink-0 flex flex-col justify-between hidden lg:flex min-h-[calc(100vh-80px)]">
      <div className="p-4 space-y-6">
        <div>
          <div className="text-[11px] font-bold tracking-wider text-slate-400 uppercase px-3 mb-2">
            Clinical Operations
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              const isHighlight = 'isHighlight' in item && item.isHighlight;

              return (
                <button
                  key={item.id}
                  id={`nav-${item.id}`}
                  onClick={() => setTab(item.id as TabType)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isHighlight
                      ? 'bg-red-50 text-red-700 hover:bg-red-100 font-bold border border-red-200'
                      : isActive
                      ? 'bg-slate-900 text-white shadow-xs font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isHighlight ? 'text-red-600' : isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive
                          ? 'bg-red-600 text-white'
                          : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mesh Status Widget in Sidebar */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
          <div className="flex items-center justify-between font-semibold text-slate-700">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Autonomous Mesh
            </span>
            <span className="font-mono text-slate-500">T-1.0.4</span>
          </div>
          <div className="text-[11px] text-slate-500 leading-relaxed">
            Connected to 42 Regional Depository Nodes with sub-second AI allocation locks.
          </div>
          <div className="pt-1 flex items-center justify-between text-[11px] text-slate-400 font-mono">
            <span>UPTIME: 99.98%</span>
            <span className="text-emerald-600 font-semibold">ALL CLEAR</span>
          </div>
        </div>
      </div>

      {/* Hospital Node Identity */}
      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-100 border border-blue-200 text-blue-700 flex items-center justify-center font-bold text-xs">
            TH
          </div>
          <div className="overflow-hidden">
            <div className="text-xs font-bold text-slate-800 truncate">
              City Trauma Center
            </div>
            <div className="text-[11px] text-slate-500 truncate font-mono">
              Terminal: Bay-02 / Resus
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
