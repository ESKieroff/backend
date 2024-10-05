import { ApiProperty } from '@nestjs/swagger';

export class CreatePersonsDto {
  @ApiProperty({
    name: 'Person name',
    minLength: 3,
    example: 'Empresa do fulano ltda'
  })
  readonly name: string;
}
