import { PartialType } from '@nestjs/swagger';
import { CreateProductionDto } from './create-production.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductionDto extends PartialType(CreateProductionDto) {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly stock: number;
}
