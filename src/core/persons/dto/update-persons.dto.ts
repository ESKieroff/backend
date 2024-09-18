import { ApiProperty } from '@nestjs/swagger';
import { Person_Type } from '../../common/enums';

export class UpdatePersonsDto {
  @ApiProperty({
    description: 'Person name',
    minLength: 3,
    example: 'John Doe'
  })
  readonly name: string;

  @ApiProperty({
    description: 'Person type',
    default: 'SUPPLIER',
    examples: ['SUPPLIER', 'CUSTOMER']
  })
  readonly type: Person_Type;

  @ApiProperty({
    description: 'Person active',
    default: true
  })
  readonly active: boolean;
}
