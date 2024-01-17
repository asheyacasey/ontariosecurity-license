export interface AdminFormalityCPRStatus {
  id: number;
  expiresAt: string;
}

export interface AdminFormalitiesStatus {
  cpr?: AdminFormalityCPRStatus;
  // consent: boolean;
  // tcn: boolean;
}
