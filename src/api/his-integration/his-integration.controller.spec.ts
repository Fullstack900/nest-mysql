import { Test, TestingModule } from '@nestjs/testing';
import { HisIntegrationController } from './his-integration.controller';
import { HisIntegrationService } from './his-integration.service';

describe('HisIntegrationController', () => {
  let controller: HisIntegrationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HisIntegrationController],
      providers: [HisIntegrationService],
    }).compile();

    controller = module.get<HisIntegrationController>(HisIntegrationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
