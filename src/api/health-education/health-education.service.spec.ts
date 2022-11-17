import { Test, TestingModule } from '@nestjs/testing';
import { HealthEducationService } from './health-education.service';

describe('HealthEducationService', () => {
  let service: HealthEducationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthEducationService],
    }).compile();

    service = module.get<HealthEducationService>(HealthEducationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
