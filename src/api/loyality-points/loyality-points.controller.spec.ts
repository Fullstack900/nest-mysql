import { Test, TestingModule } from '@nestjs/testing';
import { LoyalityPointsController } from './loyality-points.controller';
import { LoyalityPointsService } from './loyality-points.service';

describe('LoyalityPointsController', () => {
  let controller: LoyalityPointsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LoyalityPointsController],
      providers: [LoyalityPointsService],
    }).compile();

    controller = module.get<LoyalityPointsController>(LoyalityPointsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
