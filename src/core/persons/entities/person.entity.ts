import { Person_Type } from '../../common/enums';
export class Product {
  id: number;
  name: string;
  type: Person_Type;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}
