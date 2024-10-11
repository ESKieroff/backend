import {
  BadRequestException,
  Injectable,
  NotFoundException
} from '@nestjs/common';
import { CreatePersonsDto } from './dto/create-persons.dto';
import { UpdatePersonsDto } from './dto/update-persons.dto';
import { PersonsRepository } from './persons.repository';
import { persons } from '@prisma/client';
import { format } from 'date-fns';

@Injectable()
export class PersonsService {
  constructor(private readonly personsRepository: PersonsRepository) {}

  async create(createPersonsDto: CreatePersonsDto) {
    const existingPerson = await this.matchPersonByData(createPersonsDto.name);

    if (existingPerson.length > 0) {
      throw new Error(
        `Person already exists: ${JSON.stringify(existingPerson[0])}`
      );
    }

    const createdPerson = await this.personsRepository.create(createPersonsDto);

    return this.formatPersonDate(createdPerson);
  }

  async findAll(orderBy: string): Promise<
    (Omit<persons, 'created_at' | 'updated_at'> & {
      created_at: string;
      updated_at: string;
    })[]
  > {
    const findedPersons = await this.personsRepository.findAll(orderBy);
    return findedPersons.map(person => this.formatPersonDate(person));
  }

  async findById(id: number) {
    const person = await this.isValid(id);
    return this.formatPersonDate(person);
  }

  private formatPersonDate(person: persons): Omit<
    persons,
    'created_at' | 'updated_at'
  > & {
    created_at: string;
    updated_at: string;
  } {
    return {
      ...person,
      created_at: format(new Date(person.created_at), 'dd/MM/yyyy HH:mm:ss'),
      updated_at: format(new Date(person.updated_at), 'dd/MM/yyyy HH:mm:ss')
    };
  }

  async isValid(id: number) {
    const person = await this.personsRepository.findById(id);

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    } else if (!person.active) {
      throw new BadRequestException(`Person with ID ${id} is not active`);
    }
    return person;
  }

  async reactivatePerson(id: number) {
    const person = await this.personsRepository.findById(id);

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }

    if (person.active) {
      throw new BadRequestException(`Person with ID ${id} is already active`);
    }
    return this.personsRepository.reactivate(id);
  }

  async matchPersonByData(name: string) {
    const matchedPerson = await this.personsRepository.matchPersonByData(name);

    return matchedPerson.map(person => this.formatPersonDate(person));
  }

  async update(id: number, updatePersonDto: UpdatePersonsDto) {
    const person = await this.isValid(id);

    if (!person) {
      throw new NotFoundException(`Person with ID ${id} not found`);
    }
    const updatedPersonsDto = {
      ...updatePersonDto,
      updated_at: new Date(),
      active: person.active
    };

    const updatedPerson = await this.personsRepository.update(
      id,
      updatedPersonsDto
    );

    return this.formatPersonDate(updatedPerson);
  }

  remove(id: number) {
    return this.personsRepository.delete(id);
  }
}