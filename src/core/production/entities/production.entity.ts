import { Production_Status } from '../../common/enums';

export class Production {
  id: number;
  description: string;
  prodution_quantity_estimated: number;
  production_quantity_real: number;
  lote: string;
  expiration: Date;
  Production_Status: Production_Status;
  final_product: number;
}
