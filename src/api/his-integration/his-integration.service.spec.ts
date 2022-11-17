import { Test, TestingModule } from '@nestjs/testing';
import { HisIntegrationService } from './his-integration.service';

describe('HisIntegrationService', () => {
  let service: HisIntegrationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HisIntegrationService],
    }).compile();

    service = module.get<HisIntegrationService>(HisIntegrationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
