export interface AdminFormalityCPRStatus {
  id: number;
  expiresAt: string;
  cprProvider: string;
}

export interface AdminFormalityConsentStatus {
  id: number;
}

export interface AdminFormalityTCNStatus {
  id: number;
  state: string;
  tcn?: string;
}

export interface AdminFormalitiesStatus {
  cpr?: AdminFormalityCPRStatus;
  consent?: AdminFormalityConsentStatus;
  tcn?: AdminFormalityTCNStatus;
}
