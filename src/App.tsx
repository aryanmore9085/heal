import React, { useState } from 'react';
import { Header } from './components/Header';
import { Sidebar, TabType } from './components/Sidebar';
import { DashboardView } from './components/DashboardView';
import { CreateRequestView } from './components/CreateRequestView';
import { MatchingEngineView } from './components/MatchingEngineView';
import { RequestTrackingView } from './components/RequestTrackingView';
import { BloodInventoryView } from './components/BloodInventoryView';
import { DonorNetworkView } from './components/DonorNetworkView';
import { EscalationProtocolsView } from './components/EscalationProtocolsView';
import { MobileFieldView } from './components/MobileFieldView';
import { INITIAL_REQUESTS } from './data/mockData';
import { EmergencyRequest, BloodGroup, BloodComponent, MatchedEntity } from './types';
import { CheckCircle2, ShieldAlert, X } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [currentTab, setCurrentTab] = useState<TabType>('dashboard');
  const [requests, setRequests] = useState<EmergencyRequest[]>(INITIAL_REQUESTS);
  const [activeRequestId, setActiveRequestId] = useState<string>('#BL1024');
  const [createPreset, setCreatePreset] = useState<{ group?: BloodGroup; comp?: BloodComponent; units?: number } | undefined>();
  const [toastMessage, setToastMessage] = useState<{ title: string; desc: string; type?: 'alert' | 'success' } | null>(null);

  const activeRequest = requests.find((r) => r.id === activeRequestId) || requests[0];
  const activeRequestsCount = requests.filter((r) => r.status !== 'Fulfilled' && r.status !== 'Cancelled').length;

  const showToast = (title: string, desc: string, type: 'alert' | 'success' = 'success') => {
    setToastMessage({ title, desc, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleSelectRequest = (req: EmergencyRequest) => {
    setActiveRequestId(req.id);
    if (req.status === 'In-Transit' || req.status === 'Fulfilled') {
      setCurrentTab('tracking');
    } else {
      setCurrentTab('matching');
    }
  };

  const handleOpenCreate = (preset?: { group: BloodGroup; comp: BloodComponent; units: number }) => {
    setCreatePreset(preset);
    setCurrentTab('create');
  };

  const handleCreateNewRequest = (newReq: EmergencyRequest) => {
    setRequests([newReq, ...requests]);
    setActiveRequestId(newReq.id);
    setCurrentTab('matching');
    showToast(
      `STAT Order ${newReq.id} Broadcasted`,
      `Instant AI mesh search active for ${newReq.units}U ${newReq.bloodGroup} ${newReq.component}`,
      'alert'
    );
  };

  const handleDispatchCandidate = (reqId: string, candidate: MatchedEntity) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === reqId) {
          return {
            ...r,
            status: 'In-Transit',
            matchedEntity: candidate,
            transit: {
              courierId: 'RMT-88',
              courierName: 'Alex Mercer (Rapid Medical Transit)',
              vehicle: 'High-Speed Medical Carrier #88',
              phone: '+1 (555) 438-9921',
              speedKmH: 48,
              temperatureC: r.component === 'Platelets' ? 22.1 : 4.2,
              etaMinutes: candidate.etaMinutes,
              remainingSeconds: candidate.etaMinutes * 60,
              routeProgressPct: 20,
              receivingOtp: '7294',
              originNode: candidate.name,
              destinationNode: r.destination
            },
            custodySteps: r.custodySteps.map((s) => {
              if (s.step === 5) return { ...s, status: 'completed', timestamp: '14:24:00' };
              if (s.step === 6) return { ...s, status: 'active', timestamp: '14:25:30' };
              return s;
            })
          };
        }
        return r;
      })
    );
    setActiveRequestId(reqId);
    setCurrentTab('tracking');
    showToast(
      `STAT Courier Dispatched for ${reqId}`,
      `${candidate.name} units secured in cold-chain container. En route to Trauma Bay 2.`,
      'success'
    );
  };

  const handleCompleteHandover = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => {
        if (r.id === reqId) {
          return {
            ...r,
            status: 'Fulfilled',
            custodySteps: r.custodySteps.map((s) => ({
              ...s,
              status: 'completed',
              timestamp: s.timestamp === 'Pending' || s.timestamp.includes('Pending') ? '14:29:45' : s.timestamp
            }))
          };
        }
        return r;
      })
    );
    showToast(
      `Chain of Custody Completed for ${reqId}`,
      `Receiving OTP 7294 verified. Cold-chain seal inspected. Transfusion authorized.`,
      'success'
    );
  };

  const handleNavigateHome = () => {
    setCurrentTab('dashboard');
    setCreatePreset(undefined);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col text-slate-900 selection:bg-red-500 selection:text-white">
      {/* Universal Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        onOpenCreate={() => handleOpenCreate()}
        activeRequestsCount={activeRequestsCount}
        onNavigateHome={handleNavigateHome}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm w-full bg-slate-900 text-white p-4 rounded-2xl shadow-2xl border border-slate-700 flex items-start justify-between gap-3 animate-slide-up">
          <div className="flex items-start gap-3">
            {toastMessage.type === 'alert' ? (
              <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5 animate-bounce" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="text-xs font-bold font-display uppercase tracking-wide">
                {toastMessage.title}
              </div>
              <div className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                {toastMessage.desc}
              </div>
            </div>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Body */}
      {viewMode === 'mobile' ? (
        /* Mobile Simulator / Field Responder View */
        <main className="flex-1 py-8 px-4">
          <MobileFieldView
            requests={requests}
            onSelectRequest={handleSelectRequest}
            onOpenCreate={() => handleOpenCreate()}
            onCreateNewRequest={handleCreateNewRequest}
            onDispatchCandidate={handleDispatchCandidate}
            onCompleteHandover={handleCompleteHandover}
          />
        </main>
      ) : (
        /* Desktop Trauma Command Console View */
        <div className="flex-1 flex max-w-7xl w-full mx-auto">
          {/* Left Sidebar */}
          <Sidebar
            currentTab={currentTab}
            setTab={(tab) => {
              if (tab === 'create') setCreatePreset(undefined);
              setCurrentTab(tab);
            }}
            activeCount={activeRequestsCount}
          />

          {/* Main Content Area */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-w-0 overflow-x-hidden">
            {currentTab === 'dashboard' && (
              <DashboardView
                requests={requests}
                onSelectRequest={handleSelectRequest}
                onOpenCreate={handleOpenCreate}
                onNavigateTab={setCurrentTab}
              />
            )}

            {currentTab === 'requests' && (
              <DashboardView
                requests={requests}
                onSelectRequest={handleSelectRequest}
                onOpenCreate={handleOpenCreate}
                onNavigateTab={setCurrentTab}
              />
            )}

            {currentTab === 'create' && (
              <CreateRequestView
                initialValues={createPreset}
                onSubmit={handleCreateNewRequest}
                onCancel={() => setCurrentTab('dashboard')}
              />
            )}

            {currentTab === 'matching' && (
              <MatchingEngineView
                currentRequest={activeRequest}
                allRequests={requests}
                onSelectRequest={(r) => setActiveRequestId(r.id)}
                onDispatchCandidate={handleDispatchCandidate}
              />
            )}

            {currentTab === 'tracking' && (
              <RequestTrackingView
                request={activeRequest}
                onCompleteHandover={handleCompleteHandover}
                onSelectAnotherRequest={(id) => setActiveRequestId(id)}
                allRequests={requests}
              />
            )}

            {currentTab === 'inventory' && <BloodInventoryView />}

            {currentTab === 'donors' && <DonorNetworkView />}

            {currentTab === 'escalation' && <EscalationProtocolsView />}
          </main>
        </div>
      )}
    </div>
  );
}
