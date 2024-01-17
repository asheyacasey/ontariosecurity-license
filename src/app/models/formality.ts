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
  state: 'WAITING' | 'PROCESSING' | 'COMPLETED';
  stepCompleted: boolean;
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
