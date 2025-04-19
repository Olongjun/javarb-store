export interface Transaction {
  id: string;
  productId: string;
  productTitle: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  timestamp: string;
  createdAt: string;
  updatedAt: string;
}
