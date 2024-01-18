export interface AdminFormalityCPRStatus {
  id: number;
  expiresAt: string;
}

export interface AdminFormalityConsentStatus {
  id: number;
}

export interface AdminFormalitiesStatus {
  cpr?: AdminFormalityCPRStatus;
  consent?: AdminFormalityConsentStatus;
  // tcn: boolean;
}
