import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateStockItemsDto } from './create.stock.dto';

export class UpdateStockItemsDto extends PartialType(CreateStockItemsDto) {
  @ApiProperty({
    description: 'Quantity',
    example: '1'
  })
  readonly quantity: number;

  @ApiProperty({
    description: 'Unit price',
    example: '1.00',
    required: false
  })
  readonly unit_price: number;

  @ApiProperty({
    description: 'Total price',
    example: '1.00',
    required: false
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
    example: '1',
    required: false
  })
  readonly supplier: number;

  @ApiProperty({
    description: 'Costumer',
    example: '1',
    required: false
  })
  readonly costumer: number;

  @ApiProperty({
    description: 'Stock location id',
    example: '1',
    required: false
  })
  readonly stock_location_id: number;

  @ApiProperty({
    description: 'Observation',
    example: '1',
    required: false
  })
  readonly observation: string;
}
