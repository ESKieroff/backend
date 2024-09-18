import { Injectable } from '@nestjs/common';
import { CreateGroupsDto } from './dto/create-groups.dto';
import { UpdateGroupsDto } from './dto/update-groups.dto';
import { GroupsRepository } from './groups.repository';

@Injectable()
export class GroupsService {
  constructor(private readonly groupsRepository: GroupsRepository) {}

  async create(createCategoryDto: CreateGroupsDto) {
    return this.groupsRepository.create(createCategoryDto);
  }

  findAll() {
    return this.groupsRepository.findAll();
  }

  findOne(id: number) {
    return this.groupsRepository.findOne(id);
  }

  update(id: number, _updateCategoryDto: UpdateGroupsDto) {
    return this.groupsRepository.update(id, _updateCategoryDto);
  }

  remove(id: number) {
    return this.groupsRepository.delete(id);
  }
}
