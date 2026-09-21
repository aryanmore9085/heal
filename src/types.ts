export type BloodGroup = 'O-' | 'O+' | 'A-' | 'A+' | 'B-' | 'B+' | 'AB-' | 'AB+';

export type BloodComponent = 'Platelets' | 'Packed RBC' | 'Whole Blood' | 'Fresh Frozen Plasma' | 'Cryoprecipitate';

export type UrgencyLevel = 'STAT' | 'Critical' | 'Urgent' | 'Routine';

export type RequestStatus = 'Matching' | 'Allocated' | 'In-Transit' | 'Fulfilled' | 'Cancelled';

export interface PatientInfo {
  id: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  diagnosis: string;
  traumaBay: string;
  physician: string;
  hemoglobin?: string;
  bloodLossEstimate?: string;
}

export interface MatchedEntity {
  id: string;
  name: string;
  type: 'Blood Bank' | 'Voluntary Donor' | 'Hospital Depository';
  distanceKm: number;
  etaMinutes: number;
  matchScore: number;
  unitsAvailable: number;
  status: string;
  address: string;
  phone?: string;
  temperature?: string;
  coordinates?: { x: number; y: number };
}

export interface CustodyStep {
  step: number;
  title: string;
  location: string;
  timestamp: string;
  status: 'completed' | 'active' | 'pending';
  officer?: string;
  temp?: string;
}

export interface TransitTelemetry {
  courierId: string;
  courierName: string;
  vehicle: string;
  phone: string;
  speedKmH: number;
  temperatureC: number;
  etaMinutes: number;
  remainingSeconds: number;
  routeProgressPct: number;
  receivingOtp: string;
  originNode: string;
  destinationNode: string;
}

export interface EmergencyRequest {
  id: string; // e.g. #BL1024
  bloodGroup: BloodGroup;
  component: BloodComponent;
  units: number;
  urgency: UrgencyLevel;
  patient: PatientInfo;
  createdAt: string;
  status: RequestStatus;
  destination: string;
  matchedEntity?: MatchedEntity;
  custodySteps: CustodyStep[];
  transit?: TransitTelemetry;
  tier: 1 | 2 | 3;
}

export interface InventoryItem {
  id: string;
  bloodGroup: BloodGroup;
  component: BloodComponent;
  availableUnits: number;
  reservedUnits: number;
  minThreshold: number;
  facility: string;
  expiryDays: number;
}

export interface DonorProfile {
  id: string; // e.g. #D-489
  name: string;
  bloodGroup: BloodGroup;
  distanceKm: number;
  etaMinutes: number;
  phone: string;
  lastDonationDate: string;
  isReadyForStat: boolean;
  type: 'Apheresis' | 'Whole Blood';
  status: 'Ready' | 'On Call' | 'In Transit' | 'Resting';
  matchScore: number;
  rapidScreenPassed: boolean;
}
