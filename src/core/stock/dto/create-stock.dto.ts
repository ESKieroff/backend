import { IsNotEmpty } from 'class-validator';

export class CreateStokDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly stock: number;
}
