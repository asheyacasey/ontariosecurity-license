export interface FormalityModulesStatus {
  total: number;
  completed: number;
  stepCompleted: boolean;
}

export interface FormalityCPRStatus {
  cprTrainingIncluded: boolean;
  stepCompleted: boolean;
}

export interface FormalityConsentStatus {
  stepCompleted: boolean;
}

export interface FormalityTCNStatus {
  state: 'WAITING_START' | 'PROCESSING' | 'WAITING_TCN' | 'COMPLETED' | 'ERROR' | null;
  stepCompleted: boolean;
  tcn?: number;
}

export interface FormalityResumeStatus {
  stepCompleted: boolean;
}

export interface FormalitiesStatus {
  modules: FormalityModulesStatus;
  cpr: FormalityCPRStatus;
  consent: FormalityConsentStatus;
  tcn: FormalityTCNStatus;
  resume: FormalityResumeStatus;
}


export interface CPRDocumentUpload {
  file: File,
  expiresAt: string;
  cprProvider: string;
}

export interface ConsentPrefillValues {
  firstName: string | null;
  lastName: string | null
  email: string;
  phone: string | null;
  country: string | null;
  province: string | null;
}

export interface ConsentAddress {
  unitNo: string;
  streetNo: string;
  streetName: string;
  poBox: string;
  city: string;
  province: string;
  postalCode: string;
}

export interface ConsentUpload {
  lastName: string;
  firstName: string;
  middleNames: string;
  otherNames: string;
  dateOfBirth: string;
  gender: 'MALE' | 'FEMALE';
  phone: string;
  email: string;
  address: ConsentAddress;
  differentMailingAddress: boolean;
  mailingAddress?: ConsentAddress;
  signature: string;
}

export interface ResumeDaySchedule {
  day: string;
  time: string[];
}

export interface ResumeLanguageProficiency {
  language: string;
  proficiency: string;
}

export interface ResumeLicenseUpload {
  licenseFile: File;
}

export interface ResumeDataUpload {
  startWhen: string;
  ownsCar: string;
  transportMethod: string | null;
  where: string[];
  howManyHours: string;
  weekdays: ResumeDaySchedule[];
  securityType: string[];
  hourlyRate: string;
  hourlyRateNegotiate: string;
  languages: ResumeLanguageProficiency[];
  actions: string[];
  personDescriptions: string[];
  jobDescriptions: string[];
  companyDescriptions: string[];
  whyYou: string;
}

export interface ResumeUpload extends ResumeLicenseUpload, ResumeDataUpload {
}
