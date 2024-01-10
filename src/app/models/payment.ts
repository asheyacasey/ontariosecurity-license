export interface PaymentSession {
  id: number;
  txn: string;
  url: string;
}

export interface PaymentStatus {
  status: 'STARTED' | 'COMPLETED' | 'CANCELLED' | 'CHARGEBACK' | 'ERROR';
  paidAmount: number;
}
