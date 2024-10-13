import { ProductionItem } from './production-item.entity';

export class Production {
  id: number;
  description: string;
  product_id: number;
  quantity: number;
  unit_measure: string;
  production_date: string;
  expiration_date: string;
  observation: string;
  created_at: string;
  updated_at: string;
  deleted_at: string;
  status: string;
  user_id: number;
  production_items: ProductionItem[];
}
