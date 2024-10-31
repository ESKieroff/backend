import { Controller } from '@nestjs/common';
import { CompositionsService } from './compositions.service';

@Controller('compositions')
export class CompositionsController {
  constructor(private readonly compositionsService: CompositionsService) {}
}
