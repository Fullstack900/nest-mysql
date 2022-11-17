import { Module } from '@nestjs/common';
import { ReminderSlotsService } from './reminder-slots.service';
import { ReminderSlotsController } from './reminder-slots.controller';
import { ReminderSlot } from './entities/reminder-slot.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([ReminderSlot])],
  controllers: [ReminderSlotsController],
  providers: [ReminderSlotsService]
})
export class ReminderSlotsModule { }
