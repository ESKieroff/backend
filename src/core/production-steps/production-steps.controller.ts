import { Controller } from '@nestjs/common';
import { ProductionStepsService } from './production-steps.service';

@Controller('production-steps')
export class ProductionStepsController {
  constructor(private readonly categoriesService: ProductionStepsService) {}
}
