import { Module } from '@nestjs/common';
import { CompositionsService } from './compositions.service';
import { CompositionsController } from './compositions.controller';

@Module({
  providers: [CompositionsService],
  controllers: [CompositionsController]
})
export class CompositionsModule {}
