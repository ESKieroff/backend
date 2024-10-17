/* eslint-disable @typescript-eslint/no-explicit-any */
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

// export function formatStockResponse(stock: any):{
//   return {
//     id: stock.id,
//     stockItems: stock.stock_items.map((item: any) => ({
//       id: item.id,
//       sequence: item.sequence,
//       product: {
//         id: item.products.id,
//         description: item.products.description,
//         code: item.products.code,
//         sku: item.products.sku
//       },
//       lote: item.lote,
//       expiration: item.expiration,
//       quantity: item.quantity,
//       unitPrice: item.unit_price,
//       totalPrice: item.total_price,
//       imageLink: item.image_link,
//       supplier: {
//         id: item.suppliers_stock_items_suppliersTosuppliers?.id,
//         name: item.suppliers_stock_items_suppliersTosuppliers?.name
//       },
//       stockLocation: {
//         id: item.stock_location?.id,
//         description: item.stock_location?.description
//       },
//       createdAt: item.created_at,
//       updatedAt: item.updated_at
//     }))
//     : [],
//   };
// }
