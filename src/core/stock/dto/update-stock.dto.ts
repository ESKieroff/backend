import { PartialType } from '@nestjs/swagger';
import { CreateStockDto } from './create-stock.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStockDto extends PartialType(CreateStockDto) {
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
