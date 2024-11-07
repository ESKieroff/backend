export class ProductionStep {
  id: number;
  description: string;
}
export class ResponseCompositionsDto {
  id: number;
  final_product: number;
  description: string;
  production_steps: { steps: ProductionStep[] };
  created_at?: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
  composition_items: ResponseCompositionsItem[];
}

export class ResponseCompositionsItem {
  id: number;
  compositions_id: number;
  sequence: number;
  raw_product: number;
  quantity: number;
  created_at: string;
  updated_at?: string;
  created_by?: string;
  updated_by?: string;
}
