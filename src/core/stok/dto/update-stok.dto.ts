import { PartialType } from '@nestjs/swagger';
import { CreateStokDto } from './create-stok.dto';

export class UpdateStokDto extends PartialType(CreateStokDto) {}
