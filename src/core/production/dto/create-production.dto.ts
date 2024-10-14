import { ApiProperty } from '@nestjs/swagger';

export class CreateProductionDto {
  @ApiProperty()
  readonly number: number;
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly stock: number;
  readonly items: CreateProductionItemsDto[];
}

export class CreateProductionItemsDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly stock: number;
}
