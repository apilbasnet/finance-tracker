export interface LedgerEntries {
  account: string;
  userId: number;
  totalDebits: number;
  totalCredits: number;
  closingBalance: number;
  transactionCount: number;
}
