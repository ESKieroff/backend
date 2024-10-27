export class ResponseCompositionsDto {
  id: number;
  final_product: number;
  description: string;
  production_steps: string[];
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
  compositions_items: ResponseCompositionsItem[];
}

export class ResponseCompositionsItem {
  id: number;
  compositions_id: number;
  sequence: number;
  raw_product: number;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
}
