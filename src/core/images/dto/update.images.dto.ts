import { ApiProperty } from '@nestjs/swagger';

export class UpdateImagesDto {
  @ApiProperty({
    description: 'Image description',
    minLength: 3,
    example: 'Image'
  })
  readonly description: string;

  @ApiProperty({
    description: 'Image status',
    example: true
  })
  readonly active: boolean;
}
