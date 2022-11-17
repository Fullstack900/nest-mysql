import { Test, TestingModule } from '@nestjs/testing';
import { LoyalityPointsService } from './loyality-points.service';

describe('LoyalityPointsService', () => {
  let service: LoyalityPointsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoyalityPointsService],
    }).compile();

    service = module.get<LoyalityPointsService>(LoyalityPointsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
