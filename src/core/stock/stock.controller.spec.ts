import { Test, TestingModule } from '@nestjs/testing';
import { StokController } from './stock.controller';
import { StokService } from './stock.service';

describe('StokController', () => {
  let controller: StokController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StokController],
      providers: [StokService]
    }).compile();

    controller = module.get<StokController>(StokController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
