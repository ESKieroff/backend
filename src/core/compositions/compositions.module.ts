import { Module } from '@nestjs/common';
import { CompositionsService } from './compositions.service';
import { CompositionsController } from './compositions.controller';
import { CompositionsRepository } from './compositions.repository';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { SettingsModule } from 'src/settings/settings.module';
import { LoteService } from '../common/lote.utils';
import { SessionService } from '../common/sessionService';

@Module({
  imports: [PrismaModule, SettingsModule],
  controllers: [CompositionsController],
  providers: [
    CompositionsService,
    CompositionsRepository,
    LoteService,
    SessionService
  ]
})
export class CompositionsModule {}
