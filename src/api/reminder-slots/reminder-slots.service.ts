import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Repository } from 'typeorm';
import { CreateReminderSlotDto } from './dto/create-reminder-slot.dto';
import { UpdateReminderSlotDto } from './dto/update-reminder-slot.dto';
import { ReminderSlot } from './entities/reminder-slot.entity';

@Injectable()
export class ReminderSlotsService {

  constructor(
    @InjectRepository(ReminderSlot)
    private ReminderSlotsRepository: Repository<ReminderSlot>,
  ) {

  }

  create(createReminderSlotDto: CreateReminderSlotDto) {
    return 'This action adds a new reminderSlot';
  }

  @TypeOrmQueryParser()
  async findAll(query) {
    return await this.ReminderSlotsRepository.find(query);
  }


  findOne(id: number) {
    return `This action returns a #${id} reminderSlot`;
  }

  update(id: number, updateReminderSlotDto: UpdateReminderSlotDto) {
    return `This action updates a #${id} reminderSlot`;
  }

  remove(id: number) {
    return `This action removes a #${id} reminderSlot`;
  }
}
