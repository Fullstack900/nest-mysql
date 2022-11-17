import { Injectable } from '@nestjs/common';
import { InjectRepository, TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Not, Repository } from 'typeorm';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';
import { Timeslot } from './entities/timeslot.entity';
import { AppointmentsService } from '../appointments/appointments.service';


@Injectable()
export class TimeslotsService {

  constructor(
    @InjectRepository(Timeslot)
    private timeslotRepository: Repository<Timeslot>,
    private appointmentService: AppointmentsService
  ) { }

  create(createTimeslotDto: CreateTimeslotDto) {
    return 'This action adds a new timeslot';
  }

  @TypeOrmQueryParser()
  async findAll(query, dated) {

    let timeslots = await this.timeslotRepository.find(query);
    let moment = require('moment');
    let isToday = moment().format("YYYY-MM-DD") === dated;
    let now = moment(new Date());

    for (let index in timeslots) {
      let slot = timeslots[index];
      let slots = [];
      let counter = slot.start_time;
      while (counter < slot.end_time) {
        let next = this.addMinutes(counter, slot.slot_duration);

        let appointment: any = await this.appointmentService.findBy(
          {
            doctor_id: query.where.doctor_id.toString(),
            booked_date: dated,
            start_time: counter.toString(),
            status: Not("cancelled")
          });

        let time_diff = parseInt(moment.duration(moment(counter, "HH:mm:ss").diff(now)).asMinutes());

        let is_booked = isToday ? (appointment.length || time_diff < 30 ? true : false) : (appointment.length ? true : false);

        slots.push(
          {
            'start_time': counter,
            'end_time': next,
            'is_booked': is_booked
          }
        )

        timeslots[index]['all_slots'] = slots;
        counter = next;

      }


    }

    return timeslots;

  }

  addMinutes(time, minsToAdd) {
    function D(J) { return (J < 10 ? '0' : '') + J };

    var piece = time.split(':');

    var mins = piece[0] * 60 + +piece[1] + +minsToAdd;

    return D(mins % (24 * 60) / 60 | 0) + ':' + D(mins % 60) + ':00';
  }

  async findOne(data) {
    return await this.timeslotRepository.findOne(data);
  }

  async findOneBy(data) {
    return await this.timeslotRepository.findOneBy(data);
  }

  update(id: number, updateTimeslotDto: UpdateTimeslotDto) {
    return `This action updates a #${id} timeslot`;
  }

  remove(id: number) {
    return `This action removes a #${id} timeslot`;
  }
}
