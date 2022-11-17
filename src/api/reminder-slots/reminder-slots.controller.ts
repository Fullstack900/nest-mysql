import { Controller, Get, Post, Body, Patch, Param, Delete, Request } from '@nestjs/common';
import { ReminderSlotsService } from './reminder-slots.service';
import { CreateReminderSlotDto } from './dto/create-reminder-slot.dto';
import { UpdateReminderSlotDto } from './dto/update-reminder-slot.dto';

@Controller('reminder-slots')
export class ReminderSlotsController {
  constructor(private readonly reminderSlotsService: ReminderSlotsService) { }

  @Post()
  create(@Body() createReminderSlotDto: CreateReminderSlotDto) {
    return this.reminderSlotsService.create(createReminderSlotDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.reminderSlotsService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reminderSlotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReminderSlotDto: UpdateReminderSlotDto) {
    return this.reminderSlotsService.update(+id, updateReminderSlotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reminderSlotsService.remove(+id);
  }
}
