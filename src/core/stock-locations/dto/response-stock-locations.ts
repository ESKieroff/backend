import { ApiProperty } from '@nestjs/swagger';

export class ResponseStockLocation {
  @ApiProperty({
    description: 'ID do local de estoque',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'Descrição do local de estoque',
    example: 'Depósito Central'
  })
  description: string;

  @ApiProperty({
    description: 'Status de atividade do local de estoque',
    example: true
  })
  active: boolean;

  @ApiProperty({
    description: 'Data de criação do local de estoque',
    example: '2024-01-01T12:00:00.000Z'
  })
  created_at: Date;

  @ApiProperty({
    description: 'Data da última atualização do local de estoque',
    example: '2024-01-10T12:00:00.000Z'
  })
  updated_at: Date;
}
