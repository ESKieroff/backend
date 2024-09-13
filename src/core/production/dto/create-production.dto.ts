import { ApiProperty } from '@nestjs/swagger';

export class CreateProductionDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly stock: number;
}
