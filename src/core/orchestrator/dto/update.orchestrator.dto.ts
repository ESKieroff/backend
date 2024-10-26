import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrchestratorDto {
  @ApiProperty({
    description: 'Category description',
    minLength: 3,
    example: 'Category'
  })
  readonly description: string;

  @ApiProperty({
    description: 'Category status',
    example: true
  })
  readonly active: boolean;
}
