import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Timeslot } from './entities/timeslot.entity';
import { TimeslotsController } from './timeslots.controller';
import { TimeslotsService } from './timeslots.service';
import { AppointmentsModule } from '../appointments/appointments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timeslot]),
    AppointmentsModule
  ],
  controllers: [TimeslotsController],
  exports: [TypeOrmModule, TimeslotsService],
  providers: [TimeslotsService]
})
export class TimeslotsModule { }
