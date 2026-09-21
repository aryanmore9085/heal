import { EmergencyRequest, InventoryItem, DonorProfile, MatchedEntity } from '../types';

export const INITIAL_REQUESTS: EmergencyRequest[] = [
  {
    id: '#BL1024',
    bloodGroup: 'O+',
    component: 'Platelets',
    units: 2,
    urgency: 'STAT',
    destination: 'City Hospital • Trauma Bay 2',
    createdAt: '14:18:22',
    status: 'In-Transit',
    tier: 1,
    patient: {
      id: 'PT-88319',
      age: 34,
      gender: 'Male',
      diagnosis: 'Massive Hemorrhage / Blunt Polytrauma',
      traumaBay: 'Trauma Bay 2 (Node #TH-902)',
      physician: 'Dr. E. Vance, Trauma Chief',
      hemoglobin: '6.4 g/dL',
      bloodLossEstimate: '1,800 mL'
    },
    matchedEntity: {
      id: 'BB-01',
      name: 'City Blood Bank - Main Depository',
      type: 'Blood Bank',
      distanceKm: 3.2,
      etaMinutes: 5,
      matchScore: 94,
      unitsAvailable: 6,
      status: 'STAT Release Confirmed',
      address: '450 Health Sciences Parkway',
      phone: '+1 (555) 019-4820',
      temperature: '22.0°C (Agitated)',
      coordinates: { x: 58, y: 35 }
    },
    custodySteps: [
      { step: 1, title: 'STAT Broadcast Initiated', location: 'City Hospital Trauma Bay 2', timestamp: '14:18:22', status: 'completed', officer: 'Dr. Vance' },
      { step: 2, title: 'AI Mesh Match Lock (94%)', location: 'Autonomous Engine Node-3', timestamp: '14:18:47', status: 'completed' },
      { step: 3, title: 'Depository STAT Release', location: 'City Blood Bank Depository', timestamp: '14:20:10', status: 'completed', officer: 'Lead Tech Jenkins' },
      { step: 4, title: 'Cold-Chain Container Sealed', location: 'DIN: W0456 26 098421 00', timestamp: '14:21:40', status: 'completed', temp: '22.0°C' },
      { step: 5, title: 'Rapid Courier Dispatched', location: 'Courier Unit #RMT-88', timestamp: '14:23:05', status: 'completed' },
      { step: 6, title: 'Courier In-Transit (Active GPS)', location: 'Grand Ave Corridor • En Route', timestamp: '14:25:30', status: 'active', temp: '22.1°C' },
      { step: 7, title: 'Trauma Bay Receipt Scan', location: 'City Hospital Dock B / Bay 2', timestamp: 'Pending (~4m)', status: 'pending' },
      { step: 8, title: 'Verification & Infusion', location: 'Patient Bedside #PT-88319', timestamp: 'Pending', status: 'pending' }
    ],
    transit: {
      courierId: 'RMT-88',
      courierName: 'Alex Mercer (Rapid Medical Transit)',
      vehicle: 'Emergency Medical Moto-Carrier #88',
      phone: '+1 (555) 438-9921',
      speedKmH: 48,
      temperatureC: 22.1,
      etaMinutes: 4,
      remainingSeconds: 241,
      routeProgressPct: 68,
      receivingOtp: '7294',
      originNode: 'City Blood Bank - Main Depository',
      destinationNode: 'City Hospital • Trauma Bay 2'
    }
  },
  {
    id: '#BL1023',
    bloodGroup: 'O-',
    component: 'Packed RBC',
    units: 4,
    urgency: 'STAT',
    destination: 'City Hospital • OR Suite 3',
    createdAt: '14:22:05',
    status: 'Matching',
    tier: 2,
    patient: {
      id: 'PT-88320',
      age: 48,
      gender: 'Female',
      diagnosis: 'Ruptured Abdominal Aortic Aneurysm',
      traumaBay: 'OR Suite 3 (Surgical Node #OR-3)',
      physician: 'Dr. C. Rhodes, Vascular Surg',
      hemoglobin: '5.1 g/dL',
      bloodLossEstimate: '2,400 mL'
    },
    matchedEntity: {
      id: 'BB-04',
      name: 'Metro Regional Blood Center',
      type: 'Blood Bank',
      distanceKm: 8.4,
      etaMinutes: 14,
      matchScore: 89,
      unitsAvailable: 8,
      status: 'Escalation Tier 2 Broadcast',
      address: '1200 University Ave',
      coordinates: { x: 80, y: 70 }
    },
    custodySteps: [
      { step: 1, title: 'STAT Broadcast Initiated', location: 'City Hospital OR 3', timestamp: '14:22:05', status: 'completed', officer: 'Dr. Rhodes' },
      { step: 2, title: 'Autonomous Tier 2 Escalation', location: 'Regional Mesh Query Active', timestamp: '14:23:10', status: 'active' },
      { step: 3, title: 'Depository STAT Release', location: 'Metro Regional Center', timestamp: 'Pending (~2m)', status: 'pending' },
      { step: 4, title: 'Cold-Chain Container Sealed', location: 'Iso-Chamber Spec 4°C', timestamp: 'Pending', status: 'pending' },
      { step: 5, title: 'Emergency Dispatch', location: 'Tier-2 Priority Vehicle', timestamp: 'Pending', status: 'pending' },
      { step: 6, title: 'In-Transit Relay', location: 'Transit Node', timestamp: 'Pending', status: 'pending' },
      { step: 7, title: 'Hospital Dock Receipt', location: 'Dock A Surgical Drop', timestamp: 'Pending', status: 'pending' },
      { step: 8, title: 'Crossmatch Verification', location: 'OR Suite 3', timestamp: 'Pending', status: 'pending' }
    ]
  },
  {
    id: '#BL1022',
    bloodGroup: 'AB-',
    component: 'Fresh Frozen Plasma',
    units: 3,
    urgency: 'Critical',
    destination: 'City Hospital • ICU Pod B',
    createdAt: '14:05:12',
    status: 'Allocated',
    tier: 1,
    patient: {
      id: 'PT-88315',
      age: 29,
      gender: 'Female',
      diagnosis: 'Severe Disseminated Intravascular Coagulation (DIC)',
      traumaBay: 'ICU Pod B, Bed 12',
      physician: 'Dr. N. Thorne, Intensivist',
      hemoglobin: '8.2 g/dL'
    },
    matchedEntity: {
      id: 'BB-02',
      name: 'Central Blood Bank - East Wing',
      type: 'Blood Bank',
      distanceKm: 6.8,
      etaMinutes: 11,
      matchScore: 91,
      unitsAvailable: 5,
      status: 'Thawing Protocol Initiated',
      address: '890 Metro Boulevard',
      coordinates: { x: 30, y: 65 }
    },
    custodySteps: [
      { step: 1, title: 'Critical Order Broadcast', location: 'ICU Pod B', timestamp: '14:05:12', status: 'completed' },
      { step: 2, title: 'Plasma Thawing Protocol', location: 'East Wing Lab Waterbath', timestamp: '14:08:00', status: 'completed' },
      { step: 3, title: 'Allocation Locked', location: 'Central Blood Bank', timestamp: '14:12:00', status: 'active' },
      { step: 4, title: 'Packaging in Temp Box', location: 'Temp: 4.0°C', timestamp: 'Pending', status: 'pending' },
      { step: 5, title: 'Courier Pickup', location: 'East Wing Gate 2', timestamp: 'Pending', status: 'pending' },
      { step: 6, title: 'Transit to Hospital', location: 'City Hospital', timestamp: 'Pending', status: 'pending' },
      { step: 7, title: 'ICU Handover', location: 'ICU Pod B', timestamp: 'Pending', status: 'pending' },
      { step: 8, title: 'Infusion Confirmed', location: 'ICU Bed 12', timestamp: 'Pending', status: 'pending' }
    ]
  },
  {
    id: '#BL1020',
    bloodGroup: 'A+',
    component: 'Whole Blood',
    units: 2,
    urgency: 'Routine',
    destination: 'City Hospital • Trauma Bay 1',
    createdAt: '13:30:00',
    status: 'Fulfilled',
    tier: 1,
    patient: {
      id: 'PT-88301',
      age: 52,
      gender: 'Male',
      diagnosis: 'Post-Op Hemorrhage Control',
      traumaBay: 'Trauma Bay 1',
      physician: 'Dr. L. Miller'
    },
    custodySteps: [
      { step: 1, title: 'Routine Request Issued', location: 'Bay 1', timestamp: '13:30:00', status: 'completed' },
      { step: 2, title: 'Bank Match Allocated', location: 'City Depository', timestamp: '13:34:00', status: 'completed' },
      { step: 3, title: 'Verification Scan', location: 'Lab Bay 1', timestamp: '13:42:00', status: 'completed' },
      { step: 4, title: 'Delivered & Infused', location: 'Bay 1 Bedside', timestamp: '13:58:00', status: 'completed' }
    ]
  }
];

export const MATCH_CANDIDATES: MatchedEntity[] = [
  {
    id: 'BB-01',
    name: 'City Blood Bank - Main Depository',
    type: 'Blood Bank',
    distanceKm: 3.2,
    etaMinutes: 8,
    matchScore: 94,
    unitsAvailable: 6,
    status: 'Cold Stock Verified • Ready for Immediate Dispatch',
    address: '450 Health Sciences Parkway, Sector 4',
    phone: '+1 (555) 019-4820',
    temperature: '22.0°C (Agitated Incubator)',
    coordinates: { x: 58, y: 35 }
  },
  {
    id: 'DONOR-489',
    name: 'Marcus Reed (#D-489)',
    type: 'Voluntary Donor',
    distanceKm: 1.8,
    etaMinutes: 12,
    matchScore: 87,
    unitsAvailable: 1,
    status: 'Verified Voluntary Donor • Ready for STAT Dispatch',
    address: 'Grand Central Plaza (1.8 km from Trauma Center)',
    phone: '+1 (555) 902-3118',
    temperature: 'Pre-Screen Complete',
    coordinates: { x: 42, y: 48 }
  },
  {
    id: 'BB-02',
    name: 'Central Blood Bank - East Wing',
    type: 'Blood Bank',
    distanceKm: 7.5,
    etaMinutes: 16,
    matchScore: 72,
    unitsAvailable: 4,
    status: 'Cold Stock Available • Logistics Handover Ready',
    address: '890 Metro Boulevard, Sector 9',
    phone: '+1 (555) 438-1200',
    temperature: '22.2°C',
    coordinates: { x: 75, y: 65 }
  }
];

export const MOCK_DONORS: DonorProfile[] = [
  {
    id: '#D-489',
    name: 'Marcus Reed',
    bloodGroup: 'O+',
    distanceKm: 1.8,
    etaMinutes: 12,
    phone: '+1 (555) 902-3118',
    lastDonationDate: '84 days ago',
    isReadyForStat: true,
    type: 'Apheresis',
    status: 'Ready',
    matchScore: 87,
    rapidScreenPassed: true
  },
  {
    id: '#D-312',
    name: 'Sarah Lin',
    bloodGroup: 'O-',
    distanceKm: 2.6,
    etaMinutes: 15,
    phone: '+1 (555) 774-2091',
    lastDonationDate: '112 days ago',
    isReadyForStat: true,
    type: 'Whole Blood',
    status: 'On Call',
    matchScore: 92,
    rapidScreenPassed: true
  },
  {
    id: '#D-505',
    name: 'Carlos Mendez',
    bloodGroup: 'AB-',
    distanceKm: 4.1,
    etaMinutes: 19,
    phone: '+1 (555) 321-8840',
    lastDonationDate: '90 days ago',
    isReadyForStat: false,
    type: 'Apheresis',
    status: 'Resting',
    matchScore: 78,
    rapidScreenPassed: true
  },
  {
    id: '#D-220',
    name: 'Priya Patel',
    bloodGroup: 'A+',
    distanceKm: 3.4,
    etaMinutes: 16,
    phone: '+1 (555) 890-5511',
    lastDonationDate: '62 days ago',
    isReadyForStat: true,
    type: 'Whole Blood',
    status: 'Ready',
    matchScore: 85,
    rapidScreenPassed: true
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  { id: 'INV-1', bloodGroup: 'O-', component: 'Packed RBC', availableUnits: 4, reservedUnits: 4, minThreshold: 8, facility: 'City Hospital Depository', expiryDays: 24 },
  { id: 'INV-2', bloodGroup: 'O-', component: 'Whole Blood', availableUnits: 2, reservedUnits: 1, minThreshold: 6, facility: 'City Hospital Depository', expiryDays: 18 },
  { id: 'INV-3', bloodGroup: 'O+', component: 'Platelets', availableUnits: 3, reservedUnits: 2, minThreshold: 5, facility: 'City Blood Bank (Mesh)', expiryDays: 3 },
  { id: 'INV-4', bloodGroup: 'O+', component: 'Packed RBC', availableUnits: 18, reservedUnits: 4, minThreshold: 12, facility: 'City Hospital Depository', expiryDays: 31 },
  { id: 'INV-5', bloodGroup: 'A+', component: 'Whole Blood', availableUnits: 14, reservedUnits: 2, minThreshold: 10, facility: 'Central Blood Bank', expiryDays: 28 },
  { id: 'INV-6', bloodGroup: 'A-', component: 'Packed RBC', availableUnits: 5, reservedUnits: 1, minThreshold: 6, facility: 'City Hospital Depository', expiryDays: 21 },
  { id: 'INV-7', bloodGroup: 'B+', component: 'Platelets', availableUnits: 6, reservedUnits: 1, minThreshold: 4, facility: 'Metro Blood Center', expiryDays: 4 },
  { id: 'INV-8', bloodGroup: 'B-', component: 'Packed RBC', availableUnits: 3, reservedUnits: 0, minThreshold: 5, facility: 'St. Jude Depository', expiryDays: 19 },
  { id: 'INV-9', bloodGroup: 'AB-', component: 'Fresh Frozen Plasma', availableUnits: 4, reservedUnits: 3, minThreshold: 6, facility: 'Central Blood Bank', expiryDays: 180 },
  { id: 'INV-10', bloodGroup: 'AB+', component: 'Fresh Frozen Plasma', availableUnits: 12, reservedUnits: 0, minThreshold: 8, facility: 'City Hospital Depository', expiryDays: 210 }
];

export const NETWORK_LOGS = [
  { id: 'L-1', time: '14:25:30', text: 'Courier RMT-88 entered Grand Ave Corridor with Request #BL1024. Cold-chain continuous telemetry: 22.1°C.', type: 'transit' },
  { id: 'L-2', time: '14:23:10', text: 'Autonomous Escalation Tier 2 engaged for #BL1023 (O- Packed RBC, 4U). Metro regional mesh queried.', type: 'escalation' },
  { id: 'L-3', time: '14:20:10', text: 'City Blood Bank depository tech confirmed release for #BL1024. DIN: W0456 26 098421 00 assigned.', type: 'release' },
  { id: 'L-4', time: '14:18:47', text: 'Matching algorithm achieved 94% compatibility confidence score in 42ms.', type: 'match' },
  { id: 'L-5', time: '14:12:00', text: 'Central Blood Bank allocated 3 Units AB- FFP for #BL1022. Thawing cycle complete.', type: 'allocation' }
];
