import React, { useState, useEffect } from 'react';
import {
  Truck,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Thermometer,
  MapPin,
  Phone,
  Radio,
  AlertTriangle,
  ChevronRight,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  KeyRound
} from 'lucide-react';
import { EmergencyRequest } from '../types';

interface RequestTrackingViewProps {
  request: EmergencyRequest;
  onCompleteHandover: (reqId: string) => void;
  onSelectAnotherRequest: (reqId: string) => void;
  allRequests: EmergencyRequest[];
}

export const RequestTrackingView: React.FC<RequestTrackingViewProps> = ({
  request,
  onCompleteHandover,
  onSelectAnotherRequest,
  allRequests
}) => {
  const [countdown, setCountdown] = useState<number>(request.transit?.remainingSeconds || 241);
  const [enteredOtp, setEnteredOtp] = useState<string>('');
  const [handoverSuccess, setHandoverSuccess] = useState<boolean>(request.status === 'Fulfilled');
  const [otpError, setOtpError] = useState<string | null>(null);

  // Live timer tick for realistic demo
  useEffect(() => {
    if (handoverSuccess || request.status === 'Fulfilled') return;
    const interval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [handoverSuccess, request.status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const expectedOtp = request.transit?.receivingOtp || '7294';

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (enteredOtp.trim() === expectedOtp) {
      setHandoverSuccess(true);
      setOtpError(null);
      onCompleteHandover(request.id);
    } else {
      setOtpError('Invalid transfer code. Please enter the 4-digit receiving token.');
    }
  };

  const handleAutoFill = () => {
    setEnteredOtp(expectedOtp);
    setOtpError(null);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Request Selector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-red-600 text-white flex flex-col items-center justify-center font-display font-black text-lg shadow-md shadow-red-600/20">
            <span>{request.bloodGroup}</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm font-bold text-slate-900">{request.id}</span>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  handoverSuccess || request.status === 'Fulfilled'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-blue-100 text-blue-800'
                }`}
              >
                {handoverSuccess || request.status === 'Fulfilled' ? 'FULFILLED & VERIFIED' : 'ACTIVE TRANSIT'}
              </span>
              <span className="text-xs text-slate-400 font-mono">CODE RED STAT</span>
            </div>
            <div className="text-base font-bold text-slate-900 font-display">
              {request.component} • {request.units} Units
            </div>
            <div className="text-xs text-slate-500">
              {request.destination} • Attending: {request.patient.physician}
            </div>
          </div>
        </div>

        {allRequests.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-slate-500">Track Another:</span>
            <select
              id="tracking-switch-select"
              value={request.id}
              onChange={(e) => onSelectAnotherRequest(e.target.value)}
              className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-800 bg-slate-50"
            >
              {allRequests.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.id} ({r.bloodGroup} {r.component} - {r.status})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Real-time Telemetry Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Countdown */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>ESTIMATED ARRIVAL</span>
          </div>
          <div className="text-3xl font-display font-black text-slate-900 mt-1 font-mono">
            {handoverSuccess ? '00:00' : formatTime(countdown)}
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            {handoverSuccess ? 'Handover completed at Trauma Bay' : 'ETA: ~4 minutes door-to-needle'}
          </div>
        </div>

        {/* Speed */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5 text-indigo-600" />
            <span>COURIER SPEED</span>
          </div>
          <div className="text-3xl font-display font-black text-slate-900 mt-1 font-mono">
            {handoverSuccess ? '0' : '48'}{' '}
            <span className="text-sm font-sans font-normal text-slate-500">km/h</span>
          </div>
          <div className="text-[11px] text-slate-500 mt-0.5">
            Emergency Transit Escort Unit #RMT-88
          </div>
        </div>

        {/* Cold-Chain IoT Temp */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-emerald-600" />
            <span>COLD-CHAIN IOT</span>
          </div>
          <div className="text-3xl font-display font-black text-emerald-600 mt-1 font-mono">
            22.1°C
          </div>
          <div className="text-[11px] text-emerald-700 font-semibold mt-0.5 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" />
            <span>Optimum Platelet Agitation</span>
          </div>
        </div>

        {/* Secure OTP Pill */}
        <div className="bg-slate-900 text-white p-4 rounded-2xl border border-slate-800 shadow-xs">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5 font-mono">
            <KeyRound className="w-3.5 h-3.5 text-amber-400" />
            <span>RECEIVING OTP CODE</span>
          </div>
          <div className="text-2xl font-mono font-black text-amber-400 mt-1 tracking-widest">
            {expectedOtp.split('').join(' ')}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">
            Present code to courier upon docking
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Route Map & Chain of Custody */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Live Route Vector Map */}
        <div className="lg:col-span-7 bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl relative overflow-hidden flex flex-col justify-between min-h-[460px]">
          {/* Map Header */}
          <div className="relative z-10 flex items-center justify-between text-white">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-ping"></span>
              <span className="text-xs font-mono font-bold tracking-widest text-blue-400 uppercase">
                EN ROUTE • LIVE GPS TELEMETRY
              </span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              CORRIDOR: GRAND AVE EXPRESSWAY
            </span>
          </div>

          {/* Graphical Street Grid & Route Line */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            {/* Grid Lines */}
            <div className="w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '28px 28px'
            }}></div>
          </div>

          {/* Stylized Transit Route Path */}
          <div className="absolute inset-x-12 inset-y-20 flex items-center justify-between pointer-events-none">
            <svg className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
              {/* Route line background */}
              <path
                d="M 40,80 Q 180,40 280,140 T 520,180"
                fill="none"
                stroke="#334155"
                strokeWidth="6"
                strokeLinecap="round"
              />
              {/* Active illuminated path */}
              <path
                d="M 40,80 Q 180,40 280,140 T 520,180"
                fill="none"
                stroke="url(#routeGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeDasharray="8 6"
                className="animate-pulse"
              />
            </svg>

            {/* Origin Pin (City Blood Bank) */}
            <div className="absolute top-[60px] left-[20px] flex flex-col items-center">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs shadow-lg shadow-blue-500/50">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="mt-1 px-2 py-0.5 rounded-sm bg-slate-900/90 text-white text-[10px] font-mono border border-slate-700">
                City Blood Bank
              </span>
            </div>

            {/* Moving Courier Icon on Path */}
            <div
              className={`absolute top-[125px] left-[55%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center transition-all ${
                handoverSuccess ? 'left-[88%] top-[165px]' : ''
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-blue-500/30 animate-ping absolute"></span>
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-xl">
                  <Truck className="w-4 h-4" />
                </div>
              </div>
              <span className="mt-1 px-2 py-0.5 rounded-sm bg-blue-600 text-white text-[10px] font-mono font-bold whitespace-nowrap">
                RMT-88 (48 km/h)
              </span>
            </div>

            {/* Destination Pin (Trauma Bay 2) */}
            <div className="absolute bottom-[40px] right-[20px] flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-black text-sm shadow-xl shadow-red-600/50 ring-4 ring-red-600/20">
                +
              </div>
              <span className="mt-1 px-2 py-0.5 rounded-sm bg-red-600 text-white text-[10px] font-mono font-bold">
                TRAUMA BAY 2 (HOSPITAL)
              </span>
            </div>
          </div>

          {/* Bottom Courier Details Card inside Map */}
          <div className="relative z-10 pt-8 mt-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-slate-900/80 backdrop-blur-md p-3.5 rounded-2xl border border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center font-bold text-xs">
                AM
              </div>
              <div>
                <div className="font-bold text-white">Alex Mercer • Rapid Medical Transit</div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Vehicle: High-Speed Moto Pod #88 • DIN: W0456 26 098421
                </div>
              </div>
            </div>

            <a
              href="tel:5554389921"
              className="px-3 py-1.5 rounded-xl bg-blue-600/30 border border-blue-500/40 text-blue-300 hover:bg-blue-600/40 text-xs font-semibold flex items-center gap-1.5"
            >
              <Phone className="w-3 h-3" />
              <span>Contact Courier</span>
            </a>
          </div>
        </div>

        {/* Right 5 Cols: Chain of Custody & OTP Verification */}
        <div className="lg:col-span-5 space-y-5">
          {/* OTP Handover Verification Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <KeyRound className="w-4 h-4 text-red-600" />
                <h2 className="text-sm font-bold text-slate-900 font-display">
                  Custody Transfer & Receipt Handover
                </h2>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                STAGE 6 OF 8
              </span>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed">
              When courier arrives at Trauma Bay 2 Dock, input the secure token to verify cold-chain seal integrity and complete handover.
            </p>

            {handoverSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="font-bold text-emerald-900 text-sm font-display">
                  Receipt Verified & Transfusion Authorized!
                </div>
                <div className="text-xs text-emerald-700">
                  Container DIN: W0456 26 098421 00 unsealed at 22.1°C. Handed to {request.patient.physician}.
                </div>
              </div>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <label className="font-semibold text-slate-700">Enter Receiving Code (OTP):</label>
                  <button
                    type="button"
                    onClick={handleAutoFill}
                    className="text-red-600 hover:text-red-700 font-semibold cursor-pointer underline text-[11px]"
                  >
                    Auto-fill (7294)
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    id="input-otp"
                    maxLength={6}
                    value={enteredOtp}
                    onChange={(e) => {
                      setEnteredOtp(e.target.value);
                      setOtpError(null);
                    }}
                    placeholder="Enter 4-digit code"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-mono font-bold text-center tracking-widest focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  />
                  <button
                    type="submit"
                    id="verify-otp-btn"
                    className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/20 whitespace-nowrap cursor-pointer"
                  >
                    Confirm Receipt
                  </button>
                </div>

                {otpError && (
                  <div className="text-xs text-red-600 font-medium flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>{otpError}</span>
                  </div>
                )}
              </form>
            )}
          </div>

          {/* Chain of Custody Timeline (8 Steps) */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Chain of Custody Protocol (Audit Log)
            </h3>

            <div className="space-y-3">
              {request.custodySteps.map((step, idx) => {
                const isStepCompleted = handoverSuccess ? true : step.status === 'completed';
                const isStepActive = handoverSuccess ? false : step.status === 'active';

                return (
                  <div key={step.step} className="flex items-start gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 ${
                          isStepCompleted
                            ? 'bg-emerald-600 text-white'
                            : isStepActive
                            ? 'bg-blue-600 text-white ring-4 ring-blue-600/20 animate-pulse'
                            : 'bg-slate-100 text-slate-400'
                        }`}
                      >
                        {isStepCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.step}
                      </div>
                      {idx < request.custodySteps.length - 1 && (
                        <div
                          className={`w-0.5 h-6 my-0.5 ${
                            isStepCompleted ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                        ></div>
                      )}
                    </div>

                    <div className="flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <span
                          className={`font-semibold ${
                            isStepCompleted
                              ? 'text-slate-900'
                              : isStepActive
                              ? 'text-blue-600 font-bold'
                              : 'text-slate-400'
                          }`}
                        >
                          {step.title}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          {isStepCompleted && handoverSuccess && step.status === 'pending'
                            ? '14:29:45'
                            : step.timestamp}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-1.5">
                        <span>{step.location}</span>
                        {step.temp && (
                          <span className="text-emerald-600 font-mono font-semibold">
                            • {step.temp}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
