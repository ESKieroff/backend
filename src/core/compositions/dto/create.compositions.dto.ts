export class CreateCompositionsDto {
  product_id: number;
  description: string;
  created_at: Date;
  updated_at: Date;
  created_by: string;
  updated_by: string;
  production_steps: object;
  readonly compositions_items: CreateCompositionsItemsDto[];
}

export class CreateCompositionsItemsDto {
  readonly composition_id: number;
  readonly sequence: number;
  readonly product_id: number;
  readonly quantity: number;
  readonly created_at: Date;
  readonly updated_at: Date;
  readonly created_by?: string;
  readonly updated_by?: string;
}
