import { ApiProperty } from '@nestjs/swagger';

export class CreateOrchestratorDto {
  @ApiProperty({
    description: 'Category description',
    minLength: 3,
    example: 'Category'
  })
  readonly description: string;
}
