import { Test, TestingModule } from '@nestjs/testing';
import { ReminderSlotsService } from './reminder-slots.service';

describe('ReminderSlotsService', () => {
  let service: ReminderSlotsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReminderSlotsService],
    }).compile();

    service = module.get<ReminderSlotsService>(ReminderSlotsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
