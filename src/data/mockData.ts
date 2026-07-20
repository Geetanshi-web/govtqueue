// Mock data for the government queue management system

export type OfficeStatus = 'open' | 'closed' | 'lunch' | 'busy';

export interface Office {
  id: string;
  name: string;
  department: string;
  address: string;
  phone: string;
  email: string;
  status: OfficeStatus;
  queueLength: number;
  avgWaitTime: number; // in minutes
  coordinates: { lat: number; lng: number };
  openingHours: string;
  services: string[];
  requiredDocs: string[];
  downloadableForms: { name: string; url: string }[];
}

export interface Token {
  id: string;
  tokenNumber: string;
  officeId: string;
  officeName: string;
  service: string;
  queuePosition: number;
  estimatedTime: number; // in minutes
  createdAt: Date;
  status: 'waiting' | 'serving' | 'completed' | 'cancelled';
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  officeCount: number;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: 'identity',
    name: 'Identity Documents',
    icon: 'id-card',
    description: 'Passport, ID Card, Birth Certificate',
    officeCount: 12,
  },
  {
    id: 'property',
    name: 'Property & Land',
    icon: 'home',
    description: 'Land Registry, Property Tax, Deeds',
    officeCount: 8,
  },
  {
    id: 'transport',
    name: 'Transport & Vehicles',
    icon: 'car',
    description: 'Driving License, Vehicle Registration',
    officeCount: 15,
  },
  {
    id: 'tax',
    name: 'Tax Services',
    icon: 'receipt',
    description: 'Income Tax, GST, Tax Returns',
    officeCount: 10,
  },
  {
    id: 'social',
    name: 'Social Services',
    icon: 'users',
    description: 'Pension, Healthcare, Welfare',
    officeCount: 20,
  },
  {
    id: 'business',
    name: 'Business & Trade',
    icon: 'briefcase',
    description: 'Company Registration, Licenses',
    officeCount: 6,
  },
];

export const offices: Office[] = [
  {
    id: '1',
    name: 'Central District Passport Office',
    department: 'Ministry of External Affairs',
    address: '123 Government Complex, Central District, New Delhi - 110001',
    phone: '+91-11-2345-6789',
    email: 'passport.central@gov.in',
    status: 'open',
    queueLength: 45,
    avgWaitTime: 35,
    coordinates: { lat: 28.6139, lng: 77.209 },
    openingHours: 'Mon-Fri: 9:00 AM - 5:00 PM',
    services: [
      'New Passport Application',
      'Passport Renewal',
      'Tatkal Passport',
      'Minor Passport',
      'Diplomatic Passport',
    ],
    requiredDocs: [
      'Aadhaar Card',
      'PAN Card',
      'Birth Certificate',
      'Address Proof',
      'Passport Size Photos (2)',
    ],
    downloadableForms: [
      { name: 'Passport Application Form', url: '#' },
      { name: 'Address Change Form', url: '#' },
      { name: 'Declaration Form', url: '#' },
    ],
  },
  {
    id: '2',
    name: 'Regional Transport Office - South',
    department: 'Ministry of Road Transport',
    address: '456 Transport Bhawan, South District, Mumbai - 400001',
    phone: '+91-22-8765-4321',
    email: 'rto.south@gov.in',
    status: 'busy',
    queueLength: 78,
    avgWaitTime: 55,
    coordinates: { lat: 19.076, lng: 72.8777 },
    openingHours: 'Mon-Sat: 10:00 AM - 4:00 PM',
    services: [
      'Driving License - New',
      'Driving License - Renewal',
      'Vehicle Registration',
      'Transfer of Ownership',
      'Duplicate RC',
      'International Driving Permit',
    ],
    requiredDocs: [
      'Address Proof',
      'Age Proof',
      'Medical Certificate',
      'Passport Size Photos (4)',
      'Learning License (for new DL)',
    ],
    downloadableForms: [
      { name: 'Form 1 - DL Application', url: '#' },
      { name: 'Form 20 - Vehicle Registration', url: '#' },
      { name: 'Medical Certificate Form', url: '#' },
    ],
  },
  {
    id: '3',
    name: 'Income Tax Office - Central Zone',
    department: 'Ministry of Finance',
    address: '789 Tax Bhawan, Civil Lines, Bangalore - 560001',
    phone: '+91-80-1234-5678',
    email: 'incometax.central@gov.in',
    status: 'open',
    queueLength: 23,
    avgWaitTime: 20,
    coordinates: { lat: 12.9716, lng: 77.5946 },
    openingHours: 'Mon-Fri: 9:30 AM - 5:30 PM',
    services: [
      'PAN Card Application',
      'Income Tax Returns',
      'Tax Assessment',
      'Refund Status',
      'Tax Clearance Certificate',
    ],
    requiredDocs: [
      'Aadhaar Card',
      'Form 16',
      'Bank Statements',
      'Investment Proofs',
      'Previous Year Returns',
    ],
    downloadableForms: [
      { name: 'PAN Application Form 49A', url: '#' },
      { name: 'ITR-1 Sahaj Form', url: '#' },
      { name: 'Form 26AS Request', url: '#' },
    ],
  },
  {
    id: '4',
    name: 'District Collector Office',
    department: 'Revenue Department',
    address: '321 Collector Bhawan, District Center, Chennai - 600001',
    phone: '+91-44-9876-5432',
    email: 'collector.chennai@gov.in',
    status: 'lunch',
    queueLength: 34,
    avgWaitTime: 45,
    coordinates: { lat: 13.0827, lng: 80.2707 },
    openingHours: 'Mon-Fri: 10:00 AM - 5:00 PM (Lunch: 1-2 PM)',
    services: [
      'Land Records',
      'Property Registration',
      'Caste Certificate',
      'Income Certificate',
      'Domicile Certificate',
      'Birth/Death Certificate',
    ],
    requiredDocs: [
      'Aadhaar Card',
      'Ration Card',
      'Property Documents',
      'School Certificate',
      'Affidavit',
    ],
    downloadableForms: [
      { name: 'Certificate Application Form', url: '#' },
      { name: 'Affidavit Format', url: '#' },
      { name: 'Land Mutation Form', url: '#' },
    ],
  },
  {
    id: '5',
    name: 'Municipal Corporation - Ward Office',
    department: 'Urban Development',
    address: '555 Civic Center, Ward 15, Hyderabad - 500001',
    phone: '+91-40-2468-1357',
    email: 'municipal.ward15@gov.in',
    status: 'closed',
    queueLength: 0,
    avgWaitTime: 0,
    coordinates: { lat: 17.385, lng: 78.4867 },
    openingHours: 'Mon-Sat: 9:00 AM - 3:00 PM',
    services: [
      'Building Permit',
      'Trade License',
      'Water Connection',
      'Property Tax Payment',
      'NOC for Construction',
    ],
    requiredDocs: [
      'Property Papers',
      'Building Plan',
      'Owner Identity Proof',
      'NOC from Society',
      'Previous Tax Receipts',
    ],
    downloadableForms: [
      { name: 'Building Permit Application', url: '#' },
      { name: 'Trade License Form', url: '#' },
      { name: 'Water Connection Request', url: '#' },
    ],
  },
  {
    id: '6',
    name: 'Pension & Welfare Office',
    department: 'Social Welfare Department',
    address: '777 Welfare Complex, East Zone, Kolkata - 700001',
    phone: '+91-33-1357-2468',
    email: 'pension.east@gov.in',
    status: 'open',
    queueLength: 56,
    avgWaitTime: 40,
    coordinates: { lat: 22.5726, lng: 88.3639 },
    openingHours: 'Mon-Fri: 10:00 AM - 4:00 PM',
    services: [
      'Old Age Pension',
      'Widow Pension',
      'Disability Pension',
      'Pension Transfer',
      'Life Certificate Submission',
    ],
    requiredDocs: [
      'Aadhaar Card',
      'Bank Passbook',
      'Age Proof',
      'Death Certificate (for widow pension)',
      'Disability Certificate',
    ],
    downloadableForms: [
      { name: 'Pension Application Form', url: '#' },
      { name: 'Life Certificate Format', url: '#' },
      { name: 'Bank Account Change Form', url: '#' },
    ],
  },
];

// Generate a token number
export const generateTokenNumber = (officeId: string): string => {
  const prefix = officeId.toUpperCase().slice(0, 2);
  const number = Math.floor(Math.random() * 9000) + 1000;
  const date = new Date();
  const dateStr = `${date.getDate().toString().padStart(2, '0')}${(date.getMonth() + 1).toString().padStart(2, '0')}`;
  return `${prefix}${dateStr}-${number}`;
};

// Mock function to get current serving token
export const getCurrentServingToken = (officeId: string): number => {
  const office = offices.find((o) => o.id === officeId);
  if (!office) return 0;
  return Math.max(1, office.queueLength - Math.floor(Math.random() * 10));
};
