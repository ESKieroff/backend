import { PartialType } from '@nestjs/swagger';
import { CreateStokDto } from './create-stock.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateStokDto extends PartialType(CreateStokDto) {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly price: number;

  @ApiProperty()
  readonly stock: number;
}
