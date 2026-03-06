export interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  current_price: number;
  store: string;
  url: string;
  last_update: string; // ISO Date string vinda do backend
  description?: string | null;
}
