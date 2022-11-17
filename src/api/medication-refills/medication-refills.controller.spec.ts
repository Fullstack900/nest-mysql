import { Test, TestingModule } from '@nestjs/testing';
import { MedicationRefillsController } from './medication-refills.controller';
import { MedicationRefillsService } from './medication-refills.service';

describe('MedicationRefillsController', () => {
  let controller: MedicationRefillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MedicationRefillsController],
      providers: [MedicationRefillsService],
    }).compile();

    controller = module.get<MedicationRefillsController>(MedicationRefillsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
