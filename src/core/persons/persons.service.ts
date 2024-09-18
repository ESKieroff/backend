import { Injectable } from '@nestjs/common';
import { CreatePersonsDto } from './dto/create-persons.dto';
import { UpdatePersonsDto } from './dto/update-persons.dto';
import { PersonsRepository } from './persons.repository';

@Injectable()
export class PersonsService {
  constructor(private readonly personsRepository: PersonsRepository) {}

  async create(createPersonsDto: CreatePersonsDto) {
    return this.personsRepository.create(createPersonsDto);
  }

  findAll() {
    return this.personsRepository.findAll();
  }

  findOne(id: number) {
    return this.personsRepository.findOne(id);
  }

  update(id: number, _updatePersonsDto: UpdatePersonsDto) {
    return this.personsRepository.update(id, _updatePersonsDto);
  }

  remove(id: number) {
    return this.personsRepository.delete(id);
  }
}
