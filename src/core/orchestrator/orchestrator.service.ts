import { Injectable } from '@nestjs/common';
import { OrchestratorRepository } from './orchestrator.repository';

@Injectable()
export class OrchestratorService {
  constructor(
    private readonly orchestratorRepository: OrchestratorRepository
  ) {}
}
