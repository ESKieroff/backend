import { Injectable } from '@nestjs/common';
import { CreateStokDto } from './dto/create-stok.dto';
import { UpdateStokDto } from './dto/update-stok.dto';

@Injectable()
export class StokService {
  create(_createStokDto: CreateStokDto) {
    return 'This action adds a new stok';
  }

  findAll() {
    return 'This action returns all stok';
  }

  findOne(id: number) {
    return `This action returns a #${id} stok`;
  }

  update(id: number, _updateStokDto: UpdateStokDto) {
    return `This action updates a #${id} stok`;
  }

  remove(id: number) {
    return `This action removes a #${id} stok`;
  }
}
