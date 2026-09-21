import React, { useState } from 'react';
import {
  ShieldAlert,
  Flame,
  Check,
  AlertCircle,
  Clock,
  ArrowRight,
  Zap,
  MapPin,
  Heart,
  User,
  Activity,
  ChevronLeft
} from 'lucide-react';
import { BloodGroup, BloodComponent, UrgencyLevel, EmergencyRequest } from '../types';

interface CreateRequestViewProps {
  initialValues?: { group?: BloodGroup; comp?: BloodComponent; units?: number };
  onSubmit: (newRequest: EmergencyRequest) => void;
  onCancel: () => void;
}

export const CreateRequestView: React.FC<CreateRequestViewProps> = ({
  initialValues,
  onSubmit,
  onCancel
}) => {
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(initialValues?.group || 'O-');
  const [component, setComponent] = useState<BloodComponent>(initialValues?.comp || 'Packed RBC');
  const [units, setUnits] = useState<number>(initialValues?.units || 2);
  const [urgency, setUrgency] = useState<UrgencyLevel>('STAT');
  const [traumaBay, setTraumaBay] = useState<string>('Trauma Bay 2 (Node #TH-902)');
  const [patientAge, setPatientAge] = useState<string>('34');
  const [patientGender, setPatientGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [diagnosis, setDiagnosis] = useState<string>('Massive Hemorrhage / Blunt Polytrauma');
  const [physician, setPhysician] = useState<string>('Dr. E. Vance, Trauma Chief');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const bloodGroups: Array<{ group: BloodGroup; label: string; badge?: string }> = [
    { group: 'O-', label: 'O Negative', badge: 'Universal Donor' },
    { group: 'O+', label: 'O Positive', badge: 'High Demand' },
    { group: 'A-', label: 'A Negative' },
    { group: 'A+', label: 'A Positive' },
    { group: 'B-', label: 'B Negative' },
    { group: 'B+', label: 'B Positive' },
    { group: 'AB-', label: 'AB Negative' },
    { group: 'AB+', label: 'AB Positive', badge: 'Universal Plasma' }
  ];

  const components: Array<{ name: BloodComponent; desc: string; temp: string }> = [
    { name: 'Packed RBC', desc: 'Leukoreduced, 1 unit = ~250mL', temp: '1°C - 6°C' },
    { name: 'Whole Blood', desc: 'Unseparated, acute massive bleed', temp: '1°C - 6°C' },
    { name: 'Platelets', desc: 'Apheresis single-donor, room temp', temp: '20°C - 24°C' },
    { name: 'Fresh Frozen Plasma', desc: 'Coagulopathy & factor replacement', temp: 'Thawed 1°C - 6°C' },
    { name: 'Cryoprecipitate', desc: 'Fibrinogen & Factor VIII', temp: 'Thawed 20°C - 24°C' }
  ];

  const urgencyOptions: Array<{ level: UrgencyLevel; title: string; subtitle: string; color: string }> = [
    {
      level: 'STAT',
      title: 'Code Red • Immediate STAT',
      subtitle: 'Life-threatening bleed (<15m arrival, autonomous tier-1 dispatch)',
      color: 'border-red-600 bg-red-50/50 text-red-900'
    },
    {
      level: 'Critical',
      title: 'Code Amber • Critical Priority',
      subtitle: 'Transfusion required within 30 min, pre-crossmatch reserve',
      color: 'border-amber-500 bg-amber-50/50 text-amber-900'
    },
    {
      level: 'Urgent',
      title: 'Code Yellow • Urgent Clinical',
      subtitle: 'Prepare delivery within 60 min, standard courier pickup',
      color: 'border-blue-500 bg-blue-50/50 text-blue-900'
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newId = `#BL${Math.floor(1025 + Math.random() * 100)}`;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;

    const newReq: EmergencyRequest = {
      id: newId,
      bloodGroup,
      component,
      units,
      urgency,
      destination: `City Hospital • ${traumaBay}`,
      createdAt: timeStr,
      status: 'Matching',
      tier: urgency === 'STAT' ? 1 : 2,
      patient: {
        id: `PT-${Math.floor(88300 + Math.random() * 999)}`,
        age: parseInt(patientAge) || 30,
        gender: patientGender,
        diagnosis,
        traumaBay,
        physician,
        hemoglobin: '6.2 g/dL'
      },
      custodySteps: [
        {
          step: 1,
          title: `${urgency} Order Broadcast Initiated`,
          location: `City Hospital ${traumaBay}`,
          timestamp: timeStr,
          status: 'completed',
          officer: physician
        },
        {
          step: 2,
          title: 'Autonomous Mesh Matching Active',
          location: 'Network Cluster TH-902',
          timestamp: timeStr,
          status: 'active'
        },
        {
          step: 3,
          title: 'Depository STAT Allocation',
          location: 'Pending Match Lock',
          timestamp: 'Pending (~1m)',
          status: 'pending'
        },
        {
          step: 4,
          title: 'Cold-Chain Container Sealing',
          location: 'Pending',
          timestamp: 'Pending',
          status: 'pending'
        }
      ]
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit(newReq);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto pb-12">
      {/* Header Back & Title */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onCancel}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>
        <span className="text-xs font-mono font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-1 rounded-full">
          EMERGENCY PROTOCOL ENGAGED
        </span>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
        <div className="flex items-start gap-4 pb-6 border-b border-slate-100">
          <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-red-600/20">
            <Flame className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold font-display text-slate-900">
              Create Emergency STAT Blood Order
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Broadcasts immediate high-priority allocation signals to all 42 mesh blood banks and on-call volunteer donors within 15 km.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-8">
          {/* Step 1: Blood Group Required */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">1</span>
                <span>Select Target Blood Group</span>
              </label>
              <span className="text-xs text-slate-400">ABO / Rh Compatibility Matrix</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {bloodGroups.map((bg) => {
                const isSelected = bloodGroup === bg.group;
                return (
                  <button
                    key={bg.group}
                    type="button"
                    id={`select-group-${bg.group}`}
                    onClick={() => setBloodGroup(bg.group)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer relative ${
                      isSelected
                        ? 'border-red-600 bg-red-50/60 ring-2 ring-red-600/20 text-slate-900 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-display font-black text-xl">{bg.group}</span>
                      {isSelected && <Check className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="text-xs font-medium text-slate-500 mt-0.5">{bg.label}</div>
                    {bg.badge && (
                      <span className="inline-block mt-1 text-[9px] font-bold uppercase px-1.5 py-0.5 rounded-sm bg-red-100 text-red-700">
                        {bg.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 2: Target Component */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">2</span>
                <span>Blood Component Specification</span>
              </label>
              <span className="text-xs text-slate-400">Cold-Chain Protocol Verified</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {components.map((c) => {
                const isSelected = component === c.name;
                return (
                  <button
                    key={c.name}
                    type="button"
                    id={`select-comp-${c.name.replace(/\s+/g, '-')}`}
                    onClick={() => setComponent(c.name)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'border-red-600 bg-red-50/60 ring-2 ring-red-600/20 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm text-slate-900">{c.name}</span>
                      {isSelected && <Check className="w-4 h-4 text-red-600" />}
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{c.desc}</div>
                    <div className="text-[10px] font-mono text-slate-400 mt-1.5 flex items-center gap-1">
                      <span>Temp: {c.temp}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step 3: Units & Urgency */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">3</span>
                <span>Requested Units (Volume)</span>
              </label>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-700">Units Required</div>
                  <div className="text-[11px] text-slate-500">~{units * 250} mL estimated volume</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    id="decrease-units-btn"
                    onClick={() => setUnits(Math.max(1, units - 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    -
                  </button>
                  <span className="font-display font-black text-2xl w-8 text-center text-slate-900">
                    {units}
                  </span>
                  <button
                    type="button"
                    id="increase-units-btn"
                    onClick={() => setUnits(Math.min(10, units + 1))}
                    className="w-9 h-9 rounded-lg bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer shadow-xs"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2 mb-3">
                <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">4</span>
                <span>Triage Urgency Level</span>
              </label>
              <div className="space-y-2">
                {urgencyOptions.map((opt) => {
                  const isSelected = urgency === opt.level;
                  return (
                    <button
                      key={opt.level}
                      type="button"
                      id={`urgency-opt-${opt.level}`}
                      onClick={() => setUrgency(opt.level)}
                      className={`w-full p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                        isSelected ? opt.color + ' ring-2 ring-red-600/20 font-semibold' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="text-xs font-bold">{opt.title}</div>
                        <div className="text-[10px] text-slate-500">{opt.subtitle}</div>
                      </div>
                      {isSelected && <Check className="w-4 h-4 text-red-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Step 5: Clinical Context & Location */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">5</span>
              <span>Delivery Bay & Patient Context</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Destination Trauma Bay / OR
                </label>
                <input
                  type="text"
                  id="input-trauma-bay"
                  value={traumaBay}
                  onChange={(e) => setTraumaBay(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Attending Physician / Trauma Lead
                </label>
                <input
                  type="text"
                  id="input-physician"
                  value={physician}
                  onChange={(e) => setPhysician(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1">
                  Primary Clinical Indication
                </label>
                <input
                  type="text"
                  id="input-diagnosis"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  required
                />
              </div>

              <div className="flex gap-3">
                <div className="w-1/2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Patient Age
                  </label>
                  <input
                    type="number"
                    id="input-age"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-xs font-semibold text-slate-600 mb-1">
                    Gender
                  </label>
                  <select
                    id="select-gender"
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-slate-300 text-xs font-medium text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action Bar */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
            <div className="text-xs text-slate-500 flex items-center gap-2">
              <Zap className="w-4 h-4 text-red-600" />
              <span>Instant AI Mesh Query • Average allocation lock: &lt; 45 seconds</span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                id="cancel-create-btn"
                onClick={onCancel}
                className="w-1/2 sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                id="broadcast-stat-submit-btn"
                disabled={isSubmitting}
                className="w-1/2 sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-xs font-bold shadow-lg shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <ShieldAlert className="w-4 h-4" />
                <span>{isSubmitting ? 'BROADCASTING...' : 'BROADCAST STAT ORDER'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
