import { PartialType } from '@nestjs/swagger';
import { CreateStockItemsDto } from './create.stock.dto';
import { Stock_Moviment } from 'src/core/common/enums';
export class UpdateStockDto {
  updated_at?: Date;
  updated_by?: number;
  readonly document_date?: Date;
  readonly document_number?: string;
  readonly stock_moviment?: Stock_Moviment;
  readonly is_balance?: boolean;
  stock_items?: CreateStockItemsDto[];
}
export class UpdateStockItemsDto extends PartialType(CreateStockItemsDto) {
  readonly id?: number;
  readonly sequence?: number;
  readonly quantity: number;
  readonly unit_price: number;
  readonly total_price: number;
  readonly lote: string;
  readonly expiration: Date;
  readonly supplier: number;
  readonly costumer: number;
  readonly stock_location_id: number;
  readonly observation: string;
}
