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

export interface FormalitiesStatus {
  modules: FormalityModulesStatus;
  cpr: FormalityCPRStatus;
  consent: FormalityConsentStatus;
  tcn: FormalityTCNStatus;
}


export interface CPRDocumentUpload {
  file: File,
  expiresAt: string;
}

export interface ConsentPrefillValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  province: string;
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
