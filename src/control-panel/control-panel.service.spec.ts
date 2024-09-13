import { Test, TestingModule } from '@nestjs/testing';
import { ControlPanelService } from './control-panel.service';

describe('ControlPanelService', () => {
  let service: ControlPanelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControlPanelService]
    }).compile();

    service = module.get<ControlPanelService>(ControlPanelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
