import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { UsersService } from '../users/users.service';
import { LoyalityPointsService } from '../loyality-points/loyality-points.service';
import { dataSource } from 'src/data-source/DataSource';
import { SystemSetting } from '../system_settings/entities/system_setting.entity';
import { PromotionsService } from '../promotions/promotions.service';
import { Not, Repository } from 'typeorm';
import { Users } from '../users/entities/user.entity';
import { Appointment } from './entities/appointment.entity';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class AppointmentsService {

  constructor(
    @InjectRepository(Appointment)
    private appointmentRepository: Repository<Appointment>,
    private loyalityService: LoyalityPointsService,
    private promotionService: PromotionsService,
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private notificationService: NotificationsService
  ) { }

  async create(data) {

    const user: any = await (await this.usersService.find({ id: data.user.id })).pop();

    // check if slot is free
    const appointment: any = await this.appointmentRepository
      .findBy({
        doctor_id: data.doctor_id.toString(),
        booked_date: data.booked_date,
        start_time: data.start_time,
        status: Not("cancelled")
      });

    // console.log('appointment', appointment);

    if (appointment.length) {
      return {
        status: false,
        message: 'This slot is already booked, with given date and doctor.'
      }
    }


    // check if use loyality points.
    if (data.use_loyality === true && user.loyality_points > 0) {
      const loyality_points_factor = await dataSource
        .createQueryBuilder()
        .from(SystemSetting, 'system_settings')
        .where('title="LOYALITY_POINTS_FACTOR"')
        .getRawOne()
      // console.log('user.loyality_points', user.loyality_points);

      if (loyality_points_factor) {

        const layality_factor = parseFloat(JSON.parse(loyality_points_factor.value.factor));
        let user_loyality = user.loyality_points * layality_factor;

        // console.log('user_loyality111', user_loyality);

        if (data.amount >= user_loyality) {
          data.loyality_discount = data.amount - user_loyality;
          user_loyality -= data.loyality_discount;
          data.amount -= data.loyality_discount;
        } else {
          user_loyality -= data.amount;
          user_loyality / layality_factor;
          data.loyality_discount = data.amount;
          data.amount = 0;
        }

        // console.log('user_loyality222', user_loyality);


        // update user layality points
        await dataSource
          .createQueryBuilder()
          .update('users')
          .set({ loyality_points: user_loyality })
          .where("id = :id", { id: data.user.id })
          .execute()

      }


    } else if (data.promo_code && data.promo_code != "") {

      const applyPromo = await this.promotionService.applyPromoCode({ "promo_code": data.promo_code, user })
      // console.log('applyPromo', applyPromo);

      if (applyPromo.status) {
        data.promo_discount = Math.floor(applyPromo.data.discount_percent * data.amount / 100);
        data.amount -= data.promo_discount;

        await dataSource
          .createQueryBuilder()
          .update('promotions')
          .set({ "overall_usage": () => "overall_usage + 1" })
          .where("id = :id", { id: applyPromo.data.id })
          .execute()

        // console.log('applyPromo.data.id', applyPromo.data.id);

      }

    }

    const res = await this.appointmentRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      });

    // add looyality points to the patinet
    if (res) {
      let points = await this.loyalityService.findBy({ action: "create_appointment" });
      points = points ? points[0].points : 0
      await this.usersService.updateUser(data.patient_id, { loyality_points: () => "loyality_points + " + points });
    }

    res.patient = await dataSource
      .createQueryBuilder()
      .select('loyality_points, promo_code')
      .from(Users, 'users')
      .where('id = ' + data.user.id)
      .getRawOne()

    // send notification to doctor
    const doc_fcm_data: any = await dataSource
      .createQueryBuilder()
      .select('fcm_token')
      .from(Users, 'users')
      .where({ 'id': data.doctor_id })
      .getRawOne()

    // console.log('doc_fcm_data', doc_fcm_data);

    if (doc_fcm_data.fcm_token)
      await this.notificationService
        .sendNotification(
          {
            title: 'New Appointment',
            body: 'Hey Doc! An appointment has been booked for you.',
          },
          {
            sendToSpecificDeviceToken: doc_fcm_data.fcm_token
          }
        );

    // send notification to patient
    const pat_fcm_data: any = await dataSource
      .createQueryBuilder()
      .select('fcm_token')
      .from(Users, 'users')
      .where({ 'id': data.patient_id })
      .getRawOne()

    // console.log('pat_fcm_data', pat_fcm_data);

    if (pat_fcm_data.fcm_token)
      await this.notificationService
        .sendNotification(
          {
            title: 'New Appointment',
            body: 'Hey Pat! your appointment has been booked.',
          },
          {
            sendToSpecificDeviceToken: pat_fcm_data.fcm_token
          }
        );

    return res;
  }

  async getNext(data) {
    const patient_id = data.patient_id;
    const appointment = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .addSelect('speciality.title')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('doctor.speciality', 'speciality')
      .leftJoinAndSelect('doctor.photo', 'photo')
      .leftJoinAndSelect('appointment.clinic', 'clinic')
      .where('patient_id = :patient_id', { patient_id })
      .andWhere('(booked_date > CURRENT_DATE() OR booked_date = CURRENT_DATE() AND start_time >= CURRENT_TIME())')
      .andWhere('(appointment.status != "cancelled")')
      .orderBy('booked_date', 'ASC')
      .getOne();

    return appointment ?? [];
  }

  async getAppointmentWithReports(data) {

    let appointment: any = await this.appointmentRepository
      .createQueryBuilder('appointments')
      .leftJoinAndSelect('appointments.doctor', 'doctor')
      .leftJoinAndSelect('doctor.photo', 'photo')
      .leftJoinAndSelect('appointments.reports', 'reports')
      .leftJoinAndSelect('reports.report_file', 'report_file')

    if (data.patient_id)
      appointment = appointment.andWhere('patient_id = :patient_id', { patient_id: data.patient_id })

    if (data.type)
      appointment = appointment.andWhere('reports.type = :type', { type: data.type })

    appointment = appointment.andWhere('appointments.status != "cancelled"')
      .andWhere('reports.id IS NOT NULL')
      .orderBy({ 'booked_date': 'ASC', 'start_time': 'ASC' })

      .getMany();

    return appointment ?? [];
  }

  async upcomingAppointments(data) {
    let appointments: any = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .addSelect('speciality.title')

      .leftJoinAndSelect('appointment.clinic', 'clinic')

      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('doctor.photo', 'd_photo')
      .leftJoinAndSelect('doctor.speciality', 'speciality')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('patient.photo', 'p_photo')


    if (data.patient_id) {
      appointments = appointments
        .where('patient_id = :patient_id', { 'patient_id': data.patient_id })
    }

    if (data.doctor_id) {
      appointments = appointments
        .where('doctor_id = :doctor_id', { 'doctor_id': data.doctor_id })
    }

    if (data.type) {
      appointments = appointments.where('type = :type', { 'type': data.type })
    }

    appointments = appointments.andWhere('(booked_date > CURRENT_DATE() OR booked_date = CURRENT_DATE() AND start_time >= CURRENT_TIME())')

    appointments = appointments.andWhere('(appointment.status != "cancelled")')


      .orderBy({ 'booked_date': 'ASC', 'start_time': 'ASC' })

      .getMany();

    return appointments ?? [];
  }

  async todayAppointments(data) {
    let appointments: any = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.clinic', 'clinic')

    if (data.patient_id) {
      appointments = appointments
        .addSelect('speciality.title')
        .leftJoinAndSelect('appointment.doctor', 'doctor')
        .leftJoinAndSelect('doctor.speciality', 'speciality')
        .where('patient_id = :patient_id', { 'patient_id': data.patient_id })
    } else {
      appointments = appointments
        .leftJoinAndSelect('appointment.patient', 'patient')
        .where('doctor_id = :doctor_id', { 'doctor_id': data.doctor_id })
    }

    appointments = appointments.andWhere('(appointment.status != "cancelled")')


    appointments = appointments.andWhere('(booked_date = CURRENT_DATE() AND end_time >= CURRENT_TIME())')
      .orderBy({ 'booked_date': 'ASC', 'start_time': 'ASC' })


      .getMany();

    return appointments ?? [];
  }

  async historyAppointments(data) {
    let appointments: any = await this.appointmentRepository
      .createQueryBuilder('appointment')
      .leftJoinAndSelect('appointment.clinic', 'clinic')
      .addSelect('speciality.title')
      .leftJoinAndSelect('appointment.doctor', 'doctor')
      .leftJoinAndSelect('doctor.speciality', 'speciality')
      .leftJoinAndSelect('appointment.patient', 'patient')
      .leftJoinAndSelect('patient.photo', 'p_photo')
      .leftJoinAndSelect('doctor.photo', 'd_photo')

    if (data.patient_id) {
      appointments = appointments
        .andWhere('patient_id = :patient_id', { 'patient_id': data.patient_id })
    }

    if (data.doctor_id) {
      appointments = appointments
        .andWhere('doctor_id = :doctor_id', { 'doctor_id': data.doctor_id })
    }

    appointments = appointments.andWhere('(booked_date < CURRENT_DATE() OR booked_date = CURRENT_DATE() AND start_time <= CURRENT_TIME())')

    appointments = appointments.andWhere('(appointment.status != "cancelled")')

      .orderBy({ 'booked_date': 'DESC', 'start_time': 'DESC' })

      .getMany();

    return appointments ?? [];
  }

  @TypeOrmQueryParser()
  async findAll(data) {
    return await this.appointmentRepository.find({
      ...data,
      relations: ['patient', 'doctor', 'patient.photo', 'doctor.photo']
    });
  }

  async findBy(data) {
    return await this.appointmentRepository.findBy(data);
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }

  async remove(id) {
    return this.appointmentRepository.softDelete(id)
  }

  async update(id, data) {

    const response = await this.appointmentRepository.update({ id }, { ...data })
      .then(res => res)
      .catch(e => {
        //console.log(e);

        throw new BadRequestException(e.sqlMessage);
      });
    return response;
  }

}
