import { ApiProperty } from '@nestjs/swagger';
import { Stock_Moviment } from 'src/core/common/enums';

// export class CreateStockDto {
//   readonly document_date: Date;
//   readonly document_number: string;
//   readonly stock_moviment: Stock_Moviment;
//   readonly is_balance: boolean;
//   readonly items: CreateStockItemsDto[];
// }

// export class CreateStockItemsDto {
//   readonly stock_id: number;
//   readonly sequence: number;
//   readonly product_id: number;
//   readonly quantity: number;
//   readonly unit_price: number;
//   readonly total_price: number;
//   readonly lote: string;
//   readonly expiration: Date;
//   readonly supplier: number;
//   readonly costumer: number;
//   readonly stock_location_id: number;
//   readonly observation: string;
//   readonly image_link: string;
// }

export class CreateStockDto {
  @ApiProperty({
    description: 'Document date',
    example: '2021-05-01'
  })
  readonly document_date: Date;

  @ApiProperty({
    description: 'Document number',
    example: '1'
  })
  readonly document_number: string;

  @ApiProperty({
    description: 'Stock moviment',
    example: ['INPUT', 'OUTPUT', 'TRANSIT']
  })
  readonly stock_moviment: Stock_Moviment;

  @ApiProperty({
    description: 'Flag for create balance and consolidate counts',
    default: 'false'
  })
  readonly is_balance: boolean;

  readonly items: CreateStockItemsDto[];
}

export class CreateStockItemsDto {
  @ApiProperty({
    description: 'Stock id',
    example: '1'
  })
  readonly stock_id: number;

  @ApiProperty({
    description: 'Sequence',
    example: '1'
  })
  readonly sequence: number;

  @ApiProperty({
    description: 'Product id',
    example: '1'
  })
  readonly product_id: number;

  @ApiProperty({
    description: 'Quantity',
    example: '1'
  })
  readonly quantity: number;

  @ApiProperty({
    description: 'Unit price',
    example: '1.00'
  })
  readonly unit_price: number;

  @ApiProperty({
    description: 'Total price',
    example: '1.00'
  })
  readonly total_price: number;

  @ApiProperty({
    description: 'Lote',
    example: '1'
  })
  readonly lote: string;

  @ApiProperty({
    description: 'Expiration',
    example: '2021-05-01'
  })
  readonly expiration: Date;

  @ApiProperty({
    description: 'Supplier',
    example: '1'
  })
  readonly supplier: number;

  @ApiProperty({
    description: 'Costumer',
    example: '1'
  })
  readonly costumer: number;

  @ApiProperty({
    description: 'Stock location id',
    example: '1'
  })
  readonly stock_location_id: number;

  @ApiProperty({
    description: 'Observation',
    example: '1'
  })
  readonly observation: string;

  @ApiProperty({
    description: 'Image link',
    example: 'http://example.com/image.jpg'
  })
  readonly image_link: string;

  // @ApiProperty({
  //   description: 'Photo',
  //   example: 'Buffer[]'
  // })
  // readonly photo: Buffer[];
}
