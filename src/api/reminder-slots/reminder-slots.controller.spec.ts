import { Test, TestingModule } from '@nestjs/testing';
import { ReminderSlotsController } from './reminder-slots.controller';
import { ReminderSlotsService } from './reminder-slots.service';

describe('ReminderSlotsController', () => {
  let controller: ReminderSlotsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReminderSlotsController],
      providers: [ReminderSlotsService],
    }).compile();

    controller = module.get<ReminderSlotsController>(ReminderSlotsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
