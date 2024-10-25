export class UpdateCompositionsDto {
  description?: string;
  updated_at?: Date;
  updated_by?: string;
  production_steps?: object;
  readonly compositions_items: UpdateCompositionsItemsDto[];
}

export class UpdateCompositionsItemsDto {
  readonly quantity?: number;
  readonly updated_at?: Date;
  readonly updated_by?: string;
}
