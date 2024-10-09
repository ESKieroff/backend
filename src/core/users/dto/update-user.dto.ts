import { PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Gender, Role } from 'src/core/common/enums';

export class UpdateUserDto extends PartialType(CreateUserDto) {
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

  @ApiProperty({
    example: 'John',
    description: 'First name of the user',
    required: true
  })
  readonly first_name: string;

  @ApiProperty({
    example: 'Doe',
    description: 'Last name of the user',
    required: true
  })
  readonly last_name: string;

  @ApiProperty({
    example: true,
    description: 'Active user',
    required: true
  })
  readonly active: boolean;

  @ApiProperty({
    description: 'Gender of the user',
    examples: ['MALE', 'FEMALE', 'OTHER'],
    required: false
  })
  readonly gender: Gender;
}
