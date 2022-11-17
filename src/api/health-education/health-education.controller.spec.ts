import { Test, TestingModule } from '@nestjs/testing';
import { HealthEducationController } from './health-education.controller';
import { HealthEducationService } from './health-education.service';

describe('HealthEducationController', () => {
  let controller: HealthEducationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthEducationController],
      providers: [HealthEducationService],
    }).compile();

    controller = module.get<HealthEducationController>(HealthEducationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
