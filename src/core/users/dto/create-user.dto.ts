import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/core/common/enums';

export class CreateUserDto {
  @ApiProperty({
    example: 'johndoe@email.com',
    description: 'Email of the user',
    required: true
  })
  readonly email: string;

  @ApiProperty({
    example: 'abracadabra',
    description: 'Password of the user',
    required: true
  })
  readonly password: string;

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    examples: ['DEFAULT', 'ADMIN', 'ROOT', 'DEMO', 'ERP', 'API', 'SYSTEM'],
    default: 'DEFAULT',
    required: true
  })
  readonly role: Role;
}
