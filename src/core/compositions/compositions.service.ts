import { Injectable } from '@nestjs/common';
import { CompositionsRepository } from './compositions.repository';

@Injectable()
export class CompositionsService {
  constructor(
    private readonly compositionsRepository: CompositionsRepository
  ) {}
}
