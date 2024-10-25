import { ApiProperty } from '@nestjs/swagger';

export class CreateImagesDto {
  @ApiProperty({
    description: 'Image description',
    minLength: 3,
    example: 'Image'
  })
  readonly description: string;
}
