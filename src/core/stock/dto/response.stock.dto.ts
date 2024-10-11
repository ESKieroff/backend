import { Stock_Moviment } from '../../common/enums';

export class ResponseStockDto {
  id: number;
  document_date: Date;
  document_number: string;
  stock_moviment: Stock_Moviment;
  stock_id: number;
  sequence: number;
  product_id: number;
  quantity: number;
  unit_price: number;
  total_price: number;
  lote: string;
  created_at: string;
  updated_at: string;
}