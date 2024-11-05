import { Module } from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { OccurrenceController } from './occurrence.controller';
import { OccurrenceRepository } from './occurrence.repository';
import { PrismaService } from 'src/database/prisma/prisma.service';
import { SessionService } from '../common/sessionService';

@Module({
  controllers: [OccurrenceController],
  providers: [
    OccurrenceService,
    OccurrenceRepository,
    PrismaService,
    SessionService
  ]
})
export class OccurrenceModule {}
