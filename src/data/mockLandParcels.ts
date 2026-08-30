import { LandParcelDossier, RegistrationDeedRecord, LandRegistrationProgress } from '../types';

export const INITIAL_LAND_PARCELS: LandParcelDossier[] = [
  {
    khasraGatNumber: 'Gat No. 412/A',
    address: 'Survey Gat 412/A, Near Mumbai-Ahmedabad NH48, Dahanu Taluka',
    village: 'Kasa Khurd',
    taluka: 'Dahanu',
    district: 'Palghar',
    state: 'Maharashtra',
    pincode: '401602',
    registeredOwnerName: 'Shri Rameshwar Tukaram Patil',
    jointOwners: ['Smt. Sunita Rameshwar Patil', 'Shri Nilesh Tukaram Patil', 'Shri Anant Tukaram Patil'],
    ownershipType: 'HUF_ANCESTRAL',
    landClassification: 'AGRICULTURAL_IRRIGATED',
    totalAreaAcre: 3.85,
    totalAreaHa: 1.56,
    isUnderLitigation: true,
    litigationSeverity: 'ACTIVE_HIGH_COURT_STAY',
    litigationDetails: {
      caseNumber: 'WP-2024-8841/BOM',
      courtName: 'High Court of Judicature at Bombay (Appellate Side)',
      petitioners: 'Rameshwar Tukaram Patil & 14 Others vs State of Maharashtra & NHAI',
      disputeDescription: 'Petition challenging Section 19 notification multiplier rate; demanding 4.0x urban commercial rate instead of 2.0x rural factor.',
      stayOrderActive: true,
      nextHearingDate: '2026-09-18'
    },
    isNotifiedForAcquisition: true,
    infrastructureProjectName: 'Delhi-Mumbai Expressway (Package 14 - Palghar Spur)',
    acquisitionAct: 'RFCTLARR Act 2013 / National Highways Act 1956 Sec 3D',
    currentAcquisitionStage: 'Section 19 Final Declaration (Stalled by High Court Stay)',
    estimatedCompensationPerAcreLakhs: 48.5,
    solatiumMultiplier: '2.0x Rural Multiplier + 100% Solatium (Total ₹1.86 Cr)',
    totalRegistrationsCount: 4,
    registrationHistory: [
      {
        deedNumber: 'SRO-DHN-2021-4102',
        registrationDate: '2021-04-14',
        deedType: 'MUTATION_INHERITANCE',
        subRegistrarOffice: 'Sub-Registrar Office Dahanu',
        partiesInvolved: 'Late Tukaram Patil ➔ Rameshwar, Nilesh & Anant Patil (7/12 Extract Entry #842)',
        status: 'MUTATED'
      },
      {
        deedNumber: 'SRO-DHN-2016-1890',
        registrationDate: '2016-11-20',
        deedType: 'MORTGAGE_RELEASE',
        subRegistrarOffice: 'Sub-Registrar Office Dahanu',
        partiesInvolved: 'Thane District Central Co-op Bank ➔ Tukaram Patil (Kisan Credit Loan Cleared)',
        status: 'REGISTERED'
      },
      {
        deedNumber: 'SRO-DHN-2004-0941',
        registrationDate: '2004-06-12',
        deedType: 'SALE_DEED',
        subRegistrarOffice: 'Sub-Registrar Office Dahanu',
        partiesInvolved: 'Ganpat Rao Vaze ➔ Tukaram Patil (0.85 Acre boundary addition)',
        considerationAmountCr: 0.12,
        status: 'REGISTERED'
      },
      {
        deedNumber: 'SRO-DHN-1988-0214',
        registrationDate: '1988-01-25',
        deedType: 'MUTATION_INHERITANCE',
        subRegistrarOffice: 'Revenue Circle Dahanu',
        partiesInvolved: 'Original Ancestral Settlement Patta Mutation #112',
        status: 'REGISTERED'
      }
    ],
    registrationProgress: {
      overallCompletionPct: 60,
      completedStepsCount: 3,
      totalStepsCount: 5,
      currentActiveStep: 'Revenue Mutation & 7/12 Record Update (Stalled by High Court Stay Order)',
      estimatedDaysToFinalIssuance: 28,
      applicationToken: 'MUT-MH-PLG-2026-8812',
      subRegistrarCircle: 'Sub-Registrar Dahanu / Tehsil Revenue Office',
      stampDutyStatus: 'PAID',
      milestones: [
        { stepNumber: 1, title: 'Title Search & Encumbrance Verification', department: 'Sub-Registrar Office', status: 'COMPLETED', completedDate: '2026-06-10', description: '30-year deed chain verified clean of bank hypothecation.' },
        { stepNumber: 2, title: 'Cadastral Boundary Survey & Khasra Demarcation', department: 'Taluka Inspector of Land Records (TILR)', status: 'COMPLETED', completedDate: '2026-06-25', description: 'Differential GPS ground survey completed for 3.85 Acres.' },
        { stepNumber: 3, title: 'Stamp Duty & Deed Execution', department: 'Sub-Registrar Dahanu', status: 'COMPLETED', completedDate: '2026-07-04', description: 'Conveyance Deed registered with receipt #IGR-4102.' },
        { stepNumber: 4, title: 'Tehsil Revenue Mutation (7/12 Extract)', department: 'Tehsildar Dahanu', status: 'IN_PROGRESS', description: 'Pending High Court stay order vacating notice from Government Counsel.', daysRemaining: 18 },
        { stepNumber: 5, title: 'Digital Record of Rights (ROR) Patta Issuance', department: 'Revenue Circle Office', status: 'PENDING', description: 'Final digital signature of Circle Officer on mutated 7/12 certificate.', daysRemaining: 10 }
      ]
    },
    latitude: 19.9975,
    longitude: 72.7300
  },
  {
    khasraGatNumber: 'Plot No. 88 / Khasra 1420',
    address: 'Sector 24 Aerotropolis Corridor, Jewar Bangar Village',
    village: 'Jewar Bangar',
    taluka: 'Jewar',
    district: 'Gautam Buddha Nagar',
    state: 'Uttar Pradesh',
    pincode: '203135',
    registeredOwnerName: 'Chaudhary Mahendra Singh',
    jointOwners: ['Shri Virendra Singh', 'Shri Devendra Singh', 'Smt. Kamla Devi Singh'],
    ownershipType: 'FREEHOLD_INDIVIDUAL',
    landClassification: 'AGRICULTURAL_DRY',
    totalAreaAcre: 2.40,
    totalAreaHa: 0.97,
    isUnderLitigation: false,
    litigationSeverity: 'NONE',
    isNotifiedForAcquisition: true,
    infrastructureProjectName: 'Noida International Greenfield Airport (Phase 2 Expansion)',
    acquisitionAct: 'RFCTLARR Act 2013 Sec 23 Consent Award',
    currentAcquisitionStage: 'Section 38 Possession Handover & Model Township Allotment',
    estimatedCompensationPerAcreLakhs: 55.0,
    solatiumMultiplier: '4.0x Consent Multiplier + ₹5.5 Lakhs R&R Livelihood Grant',
    totalRegistrationsCount: 3,
    registrationHistory: [
      {
        deedNumber: 'SRO-JWR-2024-0411',
        registrationDate: '2024-02-18',
        deedType: 'SALE_DEED',
        subRegistrarOffice: 'Sub-Registrar Office Jewar',
        partiesInvolved: 'Mahendra Singh ➔ YEIDA (Direct Consent Conveyance Deed)',
        considerationAmountCr: 1.32,
        status: 'REGISTERED'
      },
      {
        deedNumber: 'SRO-JWR-2015-3210',
        registrationDate: '2015-08-04',
        deedType: 'MUTATION_INHERITANCE',
        subRegistrarOffice: 'Tehsil Jewar Revenue Court',
        partiesInvolved: 'Late Hira Singh ➔ Mahendra, Virendra & Devendra Singh (Khatauni Entry #42)',
        status: 'MUTATED'
      },
      {
        deedNumber: 'SRO-JWR-1996-1102',
        registrationDate: '1996-03-29',
        deedType: 'SALE_DEED',
        subRegistrarOffice: 'Sub-Registrar Office Sikandrabad',
        partiesInvolved: 'Balwant Sharma ➔ Hira Singh',
        considerationAmountCr: 0.08,
        status: 'REGISTERED'
      }
    ],
    registrationProgress: {
      overallCompletionPct: 100,
      completedStepsCount: 5,
      totalStepsCount: 5,
      currentActiveStep: 'Registration & Khatauni Mutation 100% Completed',
      estimatedDaysToFinalIssuance: 0,
      applicationToken: 'REG-UP-GBN-2024-0411',
      subRegistrarCircle: 'Sub-Registrar Office Jewar',
      stampDutyStatus: 'EXEMPTED',
      milestones: [
        { stepNumber: 1, title: 'Title Search & Ownership Verification', department: 'YEIDA & Sub-Registrar', status: 'COMPLETED', completedDate: '2024-01-15', description: 'Title verified 100% clean and undisputed.' },
        { stepNumber: 2, title: 'Cadastral Khasra Demarcation', department: 'Tehsil Revenue Survey', status: 'COMPLETED', completedDate: '2024-01-28', description: 'Drone RTK survey verified zero boundary overlaps.' },
        { stepNumber: 3, title: 'Direct Consent Conveyance Execution', department: 'Sub-Registrar Jewar', status: 'COMPLETED', completedDate: '2024-02-18', description: 'Sale deed executed with 4x consent multiplier.' },
        { stepNumber: 4, title: 'Khatauni Mutation Entry', department: 'Tehsildar Jewar', status: 'COMPLETED', completedDate: '2024-03-02', description: 'Khatauni record updated in Bhulekh UP portal.' },
        { stepNumber: 5, title: 'Digital ROR Patta & DBT Disbursal', department: 'YEIDA CALA Treasury', status: 'COMPLETED', completedDate: '2024-03-15', description: 'Direct Benefit Transfer completed to bank account.' }
      ]
    },
    latitude: 28.1833,
    longitude: 77.5833
  },
  {
    khasraGatNumber: 'Survey Gat 204/B',
    address: 'Kamrej-Olpad Bypass Road, Surat Peri-Urban Node',
    village: 'Kamrej',
    taluka: 'Kamrej',
    district: 'Surat',
    state: 'Gujarat',
    pincode: '394185',
    registeredOwnerName: 'Shri Pravinbhai Chhaganbhai Patel',
    jointOwners: ['Smt. Hansaben Pravinbhai Patel', 'Shri Dipak Pravinbhai Patel'],
    ownershipType: 'FREEHOLD_INDIVIDUAL',
    landClassification: 'COMMERCIAL_INDUSTRIAL',
    totalAreaAcre: 1.25,
    totalAreaHa: 0.51,
    isUnderLitigation: false,
    litigationSeverity: 'NONE',
    isNotifiedForAcquisition: true,
    infrastructureProjectName: 'Mumbai-Ahmedabad High Speed Bullet Train (Section 3)',
    acquisitionAct: 'Railways Act 1989 / Gujarat Direct Purchase Policy',
    currentAcquisitionStage: 'Compensation Fully Disbursed (93% Completed)',
    estimatedCompensationPerAcreLakhs: 145.0,
    solatiumMultiplier: '4.75x Gujarat Special Direct Purchase Multiplier (Paid via DBT)',
    totalRegistrationsCount: 5,
    registrationHistory: [
      {
        deedNumber: 'SRO-SUR-2023-8910',
        registrationDate: '2023-10-12',
        deedType: 'SALE_DEED',
        subRegistrarOffice: 'Sub-Registrar Office Kamrej',
        partiesInvolved: 'Pravinbhai Patel ➔ NHSRCL (Direct Consent Sale Deed)',
        considerationAmountCr: 1.81,
        status: 'REGISTERED'
      },
      {
        deedNumber: 'SRO-SUR-2018-4521',
        registrationDate: '2018-05-19',
        deedType: 'GIFT_DEED',
        subRegistrarOffice: 'Sub-Registrar Office Surat',
        partiesInvolved: 'Chhaganbhai N. Patel ➔ Pravinbhai Patel',
        status: 'REGISTERED'
      }
    ],
    registrationProgress: {
      overallCompletionPct: 85,
      completedStepsCount: 4,
      totalStepsCount: 5,
      currentActiveStep: 'Final Village Form 7/12 E-Sign Authentication',
      estimatedDaysToFinalIssuance: 4,
      applicationToken: 'ANYROR-GJ-SUR-2026-3391',
      subRegistrarCircle: 'Sub-Registrar Kamrej / Mamlatdar Office',
      stampDutyStatus: 'PAID',
      milestones: [
        { stepNumber: 1, title: 'Title & Encumbrance Search', department: 'Sub-Registrar Kamrej', status: 'COMPLETED', completedDate: '2026-05-12', description: 'Clean title verified on AnyRoR portal.' },
        { stepNumber: 2, title: 'Cadastral Survey Demarcation', department: 'DILR Surat', status: 'COMPLETED', completedDate: '2026-05-28', description: 'Plot boundary pegs verified on ground.' },
        { stepNumber: 3, title: 'Stamp Duty & Registration Deed Execution', department: 'Sub-Registrar Kamrej', status: 'COMPLETED', completedDate: '2026-06-14', description: 'Deed executed with e-stamping paid.' },
        { stepNumber: 4, title: 'Revenue Mutation Entry 6', department: 'Mamlatdar Office Kamrej', status: 'COMPLETED', completedDate: '2026-07-02', description: 'Public 30-day notice period elapsed without objection.' },
        { stepNumber: 5, title: 'Digital E-Signed VF 7/12 Certificate', department: 'AnyRoR Revenue Portal', status: 'IN_PROGRESS', description: 'Mamlatdar digital signature batch queued.', daysRemaining: 4 }
      ]
    },
    latitude: 21.1702,
    longitude: 72.8311
  }
];

// Regional name pools
const REGIONAL_NAMES = {
  WEST: {
    firstNames: ['Shri Suresh', 'Shri Chandrakant', 'Shri Dilip', 'Shri Eknath', 'Shri Balasaheb', 'Shri Vitthal', 'Shri Anant', 'Shri Sanjay', 'Shri Shivaji', 'Shri Tukaram', 'Shri Madhav', 'Shri Ravindra'],
    lastNames: ['Deshmukh', 'Shinde', 'Gaikwad', 'Chavan', 'Pawar', 'Jadhav', 'Kulkarni', 'Patil', 'Bhosale', 'Salunkhe', 'Mhatre', 'Tambe', 'Ghadge', 'Sawant'],
    jointFirstNames: ['Smt. Sunita', 'Smt. Shobha', 'Shri Ganesh', 'Shri Santosh', 'Shri Sachin', 'Smt. Vandana', 'Shri Prashant', 'Shri Rahul']
  },
  NORTH: {
    firstNames: ['Chaudhary Ramender', 'Shri Satpal', 'Shri Virendra', 'Shri Brijesh', 'Shri Kuldeep', 'Shri Dharampal', 'Shri Devender', 'Shri Harish', 'Shri Jagdish', 'Shri Raghubir'],
    lastNames: ['Yadav', 'Singh', 'Chaudhary', 'Mishra', 'Sharma', 'Verma', 'Shukla', 'Tiwari', 'Tripathi', 'Gupta', 'Maurya', 'Chauhan', 'Kushwaha', 'Rajput'],
    jointFirstNames: ['Smt. Kamla Devi', 'Shri Mukesh', 'Shri Manoj', 'Smt. Shanti Devi', 'Shri Amit', 'Shri Rajeev', 'Smt. Sunita Devi']
  },
  GUJARAT: {
    firstNames: ['Shri Hasmukhbhai', 'Shri Bharatbhai', 'Shri Jayantibhai', 'Shri Rameshchandra', 'Shri Arvindbhai', 'Shri Kantibhai', 'Shri Bhupendrabhai', 'Shri Dineshbhai'],
    lastNames: ['Patel', 'Desai', 'Shah', 'Solanki', 'Mehta', 'Gohil', 'Jadeja', 'Vaghela', 'Parmar', 'Chaudhari', 'Trivedi', 'Joshi'],
    jointFirstNames: ['Smt. Hansaben', 'Shri Jignesh', 'Shri Mehul', 'Smt. Geethaben', 'Shri Nilesh', 'Smt. Bhavanaben', 'Shri Alpesh']
  },
  SOUTH: {
    firstNames: ['Shri Somashekar', 'Shri Ranganath', 'Shri Narayana', 'Shri Manjunath', 'Shri Krishna', 'Shri Chennakeshav', 'Shri Venkatesha', 'Shri Anand'],
    lastNames: ['Gowda', 'Reddy', 'Rao', 'Murthy', 'Hegde', 'Shetty', 'Nayak', 'Swamy', 'Bhat', 'Prasad', 'Kumar', 'Naidu'],
    jointFirstNames: ['Smt. Lakshmi', 'Shri Raghavendra', 'Smt. Shailaja', 'Shri Girish', 'Shri Harish', 'Smt. Radhika', 'Shri Chethan']
  },
  EAST: {
    firstNames: ['Shri Debabrata', 'Shri Soumitra', 'Shri Tapas', 'Shri Subrata', 'Shri Anirban', 'Shri Kalyan', 'Shri Pronab', 'Shri Sanjib'],
    lastNames: ['Mukherjee', 'Banerjee', 'Chatterjee', 'Ghosh', 'Mondal', 'Das', 'Roy', 'Sen', 'Chakraborty', 'Sarkar', 'Majumdar', 'Dutta'],
    jointFirstNames: ['Smt. Aparna', 'Shri Pritam', 'Smt. Moushumi', 'Shri Sourav', 'Shri Sudipto', 'Smt. Sarmistha', 'Shri Kaushik']
  }
};

const VILLAGE_POOLS = [
  'Rampur Kalan', 'Shivaji Nagar', 'Kisanpur', 'Ganeshpur', 'Devaliya', 
  'Hanumantha Nagar', 'Bhimavaram', 'Govindpur', 'Khadakwadi', 'Dholera Spur',
  'Pipariya', 'Chandanpur', 'Balarampur', 'Siddhapura', 'Vidyadharpur', 'Anandpur'
];

const TALUKA_POOLS = [
  'Haveli', 'Choryasi', 'Sikandrabad', 'Burdwan Sadar', 'Yelahanka', 'Palghar', 
  'Kaimur', 'Azamgarh Sadar', 'Ongole Rural', 'Deoli', 'Viramgam', 'Phulpur'
];

export function findOrCreateParcelForLocation(
  lat: number,
  lng: number,
  searchQuery?: string
): LandParcelDossier {
  if (searchQuery && searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    const found = INITIAL_LAND_PARCELS.find(
      p => p.khasraGatNumber.toLowerCase().includes(q) ||
           p.address.toLowerCase().includes(q) ||
           p.village.toLowerCase().includes(q) ||
           p.district.toLowerCase().includes(q) ||
           p.registeredOwnerName.toLowerCase().includes(q)
    );
    if (found) return found;
  }

  const exactMatch = INITIAL_LAND_PARCELS.find(p => {
    const dLat = Math.abs(p.latitude - lat);
    const dLng = Math.abs(p.longitude - lng);
    return dLat < 0.005 && dLng < 0.005;
  });
  if (exactMatch) return exactMatch;

  const coordSeed = Math.abs(Math.round(lat * 10000) * 31 + Math.round(lng * 10000) * 17);
  
  let regionPool = REGIONAL_NAMES.NORTH;
  let stateName = 'Uttar Pradesh';
  let districtName = 'Prayagraj';

  if (lat < 16.0) {
    regionPool = REGIONAL_NAMES.SOUTH;
    stateName = lng > 78 ? 'Andhra Pradesh' : 'Karnataka';
    districtName = lng > 78 ? 'Chittoor' : 'Bengaluru Rural';
  } else if (lat < 21.0) {
    regionPool = REGIONAL_NAMES.WEST;
    stateName = 'Maharashtra';
    districtName = lng > 74 ? 'Pune' : 'Palghar';
  } else if (lng < 74.0) {
    regionPool = REGIONAL_NAMES.GUJARAT;
    stateName = 'Gujarat';
    districtName = lat > 22 ? 'Ahmedabad' : 'Surat';
  } else if (lng > 84.0) {
    regionPool = REGIONAL_NAMES.EAST;
    stateName = lat > 24 ? 'Bihar' : 'West Bengal';
    districtName = lat > 24 ? 'Rohtas' : 'Purba Bardhaman';
  }

  const fnIdx = coordSeed % regionPool.firstNames.length;
  const lnIdx = (coordSeed * 7) % regionPool.lastNames.length;
  const primaryOwner = `${regionPool.firstNames[fnIdx]} ${regionPool.lastNames[lnIdx]}`;
  const surname = regionPool.lastNames[lnIdx];

  const numCoOwners = 2 + (coordSeed % 3);
  const jointOwners: string[] = [];
  for (let i = 0; i < numCoOwners; i++) {
    const jFnIdx = (coordSeed + i * 3) % regionPool.jointFirstNames.length;
    jointOwners.push(`${regionPool.jointFirstNames[jFnIdx]} ${surname}`);
  }

  const villageName = VILLAGE_POOLS[coordSeed % VILLAGE_POOLS.length];
  const talukaName = TALUKA_POOLS[(coordSeed * 3) % TALUKA_POOLS.length];
  const surveyNumber = 100 + (coordSeed % 850);
  const subNumber = 1 + (coordSeed % 6);
  const khasraGatNumber = `Survey / Khasra No. ${surveyNumber}/${subNumber}`;

  const totalAreaAcre = Number((1.1 + ((coordSeed % 45) / 10)).toFixed(2));
  const totalAreaHa = Number((totalAreaAcre * 0.4046).toFixed(2));

  const isUnderLitigation = (coordSeed % 3 === 0);
  const isNotifiedAcquisition = (coordSeed % 4 !== 0);

  let litigationSeverity: LandParcelDossier['litigationSeverity'] = 'NONE';
  let litigationDetails: LandParcelDossier['litigationDetails'] | undefined = undefined;

  if (isUnderLitigation) {
    const isHighCourt = (coordSeed % 2 === 0);
    litigationSeverity = isHighCourt ? 'ACTIVE_HIGH_COURT_STAY' : 'TRIBUNAL_VALUATION_DISPUTE';
    
    litigationDetails = {
      caseNumber: isHighCourt ? `WP-(C)/${2024 + (coordSeed % 3)}/${1000 + (coordSeed % 8000)}` : `LARRA-REF-${2023 + (coordSeed % 3)}/${100 + (coordSeed % 900)}`,
      courtName: isHighCourt ? `High Court of ${stateName} (Civil Appellate)` : `District Land Acquisition Tribunal ${districtName}`,
      petitioners: `${primaryOwner} & Co-sharers vs State of ${stateName} & Implementing Agency`,
      disputeDescription: isHighCourt 
        ? 'Writ petition challenging Section 19 notification multiplier rate and demanding 4x market valuation.' 
        : 'Reference petition under Section 64 for tree, structure, and borehole solatium enhancement.',
      stayOrderActive: isHighCourt,
      nextHearingDate: `2026-09-${10 + (coordSeed % 18)}`
    };
  }

  const totalRegistrationsCount = 2 + (coordSeed % 4);
  const registrationHistory: RegistrationDeedRecord[] = [
    {
      deedNumber: `SRO-${districtName.slice(0,3).toUpperCase()}-${2020 + (coordSeed % 4)}-${1000 + (coordSeed % 8000)}`,
      registrationDate: `202${(coordSeed % 4)}-0${1 + (coordSeed % 8)}-${10 + (coordSeed % 18)}`,
      deedType: isUnderLitigation ? 'MUTATION_INHERITANCE' : 'SALE_DEED',
      subRegistrarOffice: `Sub-Registrar Office ${talukaName}`,
      partiesInvolved: isUnderLitigation 
        ? `Ancestral Partition Mutation Entry ➔ ${primaryOwner} & Co-sharers`
        : `Conveyance Sale Deed ➔ Registered in favour of ${primaryOwner}`,
      considerationAmountCr: isUnderLitigation ? undefined : Number((0.45 + (coordSeed % 80) / 100).toFixed(2)),
      status: isUnderLitigation ? 'MUTATED' : 'REGISTERED'
    },
    {
      deedNumber: `SRO-${districtName.slice(0,3).toUpperCase()}-${2014 + (coordSeed % 5)}-${2000 + (coordSeed % 6000)}`,
      registrationDate: `201${4 + (coordSeed % 5)}-0${1 + (coordSeed % 9)}-${12 + (coordSeed % 15)}`,
      deedType: 'MORTGAGE_RELEASE',
      subRegistrarOffice: `Sub-Registrar Office ${talukaName}`,
      partiesInvolved: `State Bank of India / District Cooperative Bank ➔ ${surname} Family (Hypothecation Cleared)`,
      status: 'REGISTERED'
    }
  ];

  // Dynamic Registration Progress (e.g. 80%, 60%, 100%)
  const completedSteps = isUnderLitigation ? 2 : ((coordSeed % 3) + 3); // 3, 4, or 5
  const overallPct = Math.min(100, Math.round((completedSteps / 5) * 100));
  const daysRemaining = overallPct === 100 ? 0 : Math.max(3, (5 - completedSteps) * 6);

  const registrationProgress: LandRegistrationProgress = {
    overallCompletionPct: overallPct,
    completedStepsCount: completedSteps,
    totalStepsCount: 5,
    currentActiveStep: overallPct === 100 
      ? 'Registration & Mutation 100% Completed' 
      : completedSteps === 4 
      ? 'Digital Signature & Final ROR / Patta Certificate Generation'
      : completedSteps === 3 
      ? 'Tehsil Revenue Mutation (7/12 & Khatauni Update)'
      : 'Cadastral Ground Demarcation & Survey Verification',
    estimatedDaysToFinalIssuance: daysRemaining,
    applicationToken: `REG-${stateName.slice(0,2).toUpperCase()}-${districtName.slice(0,3).toUpperCase()}-2026-${1000 + (coordSeed % 9000)}`,
    subRegistrarCircle: `Sub-Registrar Office ${talukaName}`,
    stampDutyStatus: 'PAID',
    milestones: [
      { stepNumber: 1, title: 'Title Search & Encumbrance Verification', department: 'Sub-Registrar Office', status: 'COMPLETED', completedDate: '2026-05-10', description: 'Verified 30-year deed chain and zero mortgage encumbrance.' },
      { stepNumber: 2, title: 'Cadastral Boundary Demarcation', department: 'Taluka Land Survey (DILR)', status: completedSteps >= 2 ? 'COMPLETED' : 'IN_PROGRESS', completedDate: completedSteps >= 2 ? '2026-05-24' : undefined, description: 'GPS coordinates pegged on physical land ground.' },
      { stepNumber: 3, title: 'Stamp Duty & Deed Registration', department: `Sub-Registrar ${talukaName}`, status: completedSteps >= 3 ? 'COMPLETED' : 'PENDING', completedDate: completedSteps >= 3 ? '2026-06-12' : undefined, description: 'Registration deed formally executed and stamped.' },
      { stepNumber: 4, title: 'Tehsil Revenue Mutation (7/12 / Khatauni)', department: `Tehsildar ${talukaName}`, status: completedSteps >= 4 ? 'COMPLETED' : completedSteps === 3 ? 'IN_PROGRESS' : 'PENDING', completedDate: completedSteps >= 4 ? '2026-06-30' : undefined, description: 'Updating landholder name in State Digital Land Records.', daysRemaining: completedSteps === 3 ? 8 : undefined },
      { stepNumber: 5, title: 'Official Digital Record of Rights (ROR) Patta', department: 'Revenue Circle Office', status: completedSteps === 5 ? 'COMPLETED' : 'PENDING', completedDate: completedSteps === 5 ? '2026-07-08' : undefined, description: 'Final e-signed Patta / 7-12 certificate ready for citizen download.', daysRemaining: completedSteps < 5 ? 5 : undefined }
    ]
  };

  return {
    khasraGatNumber,
    address: `${khasraGatNumber}, Village ${villageName}, ${talukaName} Taluka`,
    village: villageName,
    taluka: talukaName,
    district: districtName,
    state: stateName,
    pincode: `${400000 + (coordSeed % 99999)}`,
    registeredOwnerName: primaryOwner,
    jointOwners,
    ownershipType: isUnderLitigation ? 'HUF_ANCESTRAL' : 'FREEHOLD_INDIVIDUAL',
    landClassification: totalAreaAcre > 3 ? 'AGRICULTURAL_IRRIGATED' : 'AGRICULTURAL_DRY',
    totalAreaAcre,
    totalAreaHa,
    isUnderLitigation,
    litigationSeverity,
    litigationDetails,
    isNotifiedForAcquisition: isNotifiedAcquisition,
    infrastructureProjectName: isNotifiedAcquisition ? `National Infrastructure Corridor Segment (${districtName} Section)` : undefined,
    acquisitionAct: isNotifiedAcquisition ? 'RFCTLARR Act 2013 / National Highways Act' : undefined,
    currentAcquisitionStage: isNotifiedAcquisition ? (isUnderLitigation ? 'Section 19 Declaration (Hearing in Progress)' : 'Section 23 Award / Consent Valuation') : 'Freehold Clear Title (Not in Acquisition)',
    estimatedCompensationPerAcreLakhs: 35.0 + (coordSeed % 60),
    solatiumMultiplier: '2.0x Rural Multiplier + 100% Solatium (RFCTLARR 2013 Statutory Norm)',
    totalRegistrationsCount,
    registrationHistory,
    registrationProgress,
    latitude: lat,
    longitude: lng
  };
}
