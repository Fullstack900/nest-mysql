import { PartialType } from '@nestjs/mapped-types';
import { CreateReminderSlotDto } from './create-reminder-slot.dto';

export class UpdateReminderSlotDto extends PartialType(CreateReminderSlotDto) {}
