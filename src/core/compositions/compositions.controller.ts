// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Query,
//   BadRequestException,
//   Delete
// } from '@nestjs/common';
// import { CompositionsService } from './compositions.service';
// import { CreateCompositionsDto } from './dto/create.compositions.dto';
// import { UpdateCompositionsDto } from './dto/update.compositions.dto';
// import { ApiQuery } from '@nestjs/swagger';
// import { Compositions_Moviment } from '../common/enums';
// import { ResponseBatchDto } from './dto/response.compositions.dto';

// @Controller('compositions')
// export class CompositionsController {
//   constructor(private readonly compositionsService: CompositionsService) {}

//   @Post()
//   create(@Body() createCompositionsDto: CreateCompositionsDto) {
//     return this.compositionsService.create(createCompositionsDto);
//   }

//   @Get()
//   @ApiQuery({
//     name: 'orderBy',
//     required: false,
//     description:
//       'Field to order by. Valid fields: id, product_id, lote, quantity, compositions_id, sequence, created_at, updated_at',
//     enum: [
//       'id',
//       'product_id',
//       'lote',
//       'quantity',
//       'compositions_id',
//       'sequence',
//       'created_at',
//       'updated_at'
//     ]
//   })
//   async findAll(@Query('orderBy') orderBy: string = 'id') {
//     const validOrderFields = [
//       'id',
//       'product_id',
//       'lote',
//       'quantity',
//       'compositions_id',
//       'sequence',
//       'created_at',
//       'updated_at'
//     ];

//     if (!validOrderFields.includes(orderBy)) {
//       throw new BadRequestException(`Invalid order field: ${orderBy}`);
//     }

//     const compositions = await this.compositionsService.findAll(orderBy);
//     return compositions;
//   }

//   @Get('batchs')
//   async getAllProductLots(
//     @Query('orderBy') orderBy: 'asc' | 'desc' = 'asc',
//     @Query('origin') origin?: 'RAW_MATERIAL' | 'MADE'
//   ) {
//     const result = await this.compositionsService.getAllProductLots(orderBy, origin);
//     return result;
//   }

//   @Get('gen-batchs')
//   async generateBatchs(
//     @Query('moviment') moviment: string
//   ): Promise<ResponseBatchDto> {
//     const compositionsMoviment = moviment.toUpperCase() as Compositions_Moviment;

//     if (
//       ![Compositions_Moviment.INPUT, Compositions_Moviment.OUTPUT].includes(compositionsMoviment)
//     ) {
//       throw new BadRequestException(
//         'Movimentação inválida. Use INPUT ou OUTPUT.'
//       );
//     }

//     const batch = await this.compositionsService.getLote(compositionsMoviment);

//     return {
//       lote: batch[0],
//       expiration: batch[1]
//     } as ResponseBatchDto;
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     const idNumber = +id;
//     if (isNaN(idNumber)) {
//       throw new BadRequestException('Invalid ID format');
//     }
//     return this.compositionsService.findOne(idNumber);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateCompositionsDto: UpdateCompositionsDto) {
//     const idNumber = +id;
//     if (isNaN(idNumber)) {
//       throw new BadRequestException('Invalid ID format');
//     }
//     return this.compositionsService.update(idNumber, updateCompositionsDto);
//   }

//   @Delete(':id')
//   async remove(@Param('id') id: string) {
//     const idNumber = +id;
//     if (isNaN(idNumber)) {
//       throw new BadRequestException('Invalid ID format');
//     }

//     await this.compositionsService.remove(idNumber);
//     return { message: `Compositions ID ${idNumber} permanently removed successfully` };
//   }
// }
