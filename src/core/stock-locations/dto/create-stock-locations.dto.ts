import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateStockLocationDto {
  @ApiProperty({
    description: 'ID do local de estoque',
    example: 1
  })
  @IsOptional()
  id?: number;

  @ApiProperty({
    description: 'Descrição do local de estoque',
    example: 'Depósito Central'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Status de atividade do local de estoque',
    example: true
  })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
