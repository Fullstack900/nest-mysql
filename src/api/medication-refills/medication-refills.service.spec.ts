import { Test, TestingModule } from '@nestjs/testing';
import { MedicationRefillsService } from './medication-refills.service';

describe('MedicationRefillsService', () => {
  let service: MedicationRefillsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MedicationRefillsService],
    }).compile();

    service = module.get<MedicationRefillsService>(MedicationRefillsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
