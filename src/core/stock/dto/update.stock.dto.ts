import { PartialType } from '@nestjs/swagger';
import { CreateStockItemsDto } from './create.stock.dto';
import { Stock_Moviment } from 'src/core/common/enums';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class UpdateStockDto {
  @ApiHideProperty()
  updated_at?: Date;
  @ApiHideProperty()
  updated_by?: number;

  @ApiProperty({
    description: 'Document date',
    example: '2021-05-01',
    required: false
  })
  readonly document_date?: Date;
  @ApiProperty({
    description: 'Document number',
    example: '0001',
    required: false
  })
  readonly document_number?: string;

  @ApiProperty({
    description: 'Stock moviment',
    enum: ['INPUT', 'OUTPUT', 'RESERVED'],
    required: false
  })
  readonly stock_moviment?: Stock_Moviment;
  @ApiHideProperty()
  readonly is_balance?: boolean;

  @ApiProperty({
    description: 'Stock items',
    type: 'object',
    required: true
  })
  stock_items?: CreateStockItemsDto[];
}
export class UpdateStockItemsDto extends PartialType(CreateStockItemsDto) {
  @ApiProperty({
    description: 'Stock id',
    example: '1',
    required: false
  })
  readonly id?: number;
  @ApiProperty({
    description: 'Product id',
    example: '1',
    required: false
  })
  readonly sequence?: number;

  @ApiProperty({
    description: 'Product id',
    example: '1',
    required: false
  })
  readonly quantity?: number;

  @ApiProperty({
    description: 'Unit price',
    example: '1.00',
    required: false
  })
  readonly unit_price?: number;

  @ApiProperty({
    description: 'Total price',
    example: '1.00',
    required: false
  })
  readonly total_price?: number;

  @ApiProperty({
    description: 'Lote',
    example: '0001',
    required: true
  })
  readonly lote?: string;

  @ApiProperty({
    description: 'Expiration date',
    example: '2021-05-01',
    required: false
  })
  readonly expiration?: Date;

  @ApiProperty({
    description: 'Product id',
    example: '1',
    required: false
  })
  readonly supplier?: number;

  @ApiProperty({
    description: 'Costumer id',
    example: '1',
    required: false
  })
  readonly costumer?: number;

  @ApiProperty({
    description: 'Stock location id',
    example: '1',
    required: false
  })
  readonly stock_location_id?: number;

  @ApiProperty({
    description: 'Observation',
    example: 'This is a observation',
    required: false
  })
  readonly observation?: string;

  @ApiProperty({
    description: 'Image link',
    example: 'http://example.com/image.jpg',
    required: false
  })
  readonly image_link?: string;
}
