import { BadGatewayException, BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, IsNull, Not, Repository } from 'typeorm';
import { Users as User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../../mailer/mailer.service';
import { dataSource } from 'src/data-source/DataSource';
import { DoctorClinic } from '../doctor-clinics/entities/doctor-clinic.entity';

@Injectable()
export class UsersService {


  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
    private mailService: MailerService

  ) { }

  async findBy(data: number | any): Promise<User | undefined> {
    return await this.usersRepository.findOne({
      where: data,
      withDeleted: true,
      relations: ['photo', 'promo_group', 'nationality', 'card', 'clinics', 'speciality', 'department']
    });
  }

  async authUser(email): Promise<User> {

    let user = await this.usersRepository
      .createQueryBuilder('users')
      .select('users.*').addSelect(
        [
          'password',
          'speciality.title as speciality',
          'nationality.nationality as nationality',
          'photo.path as photo'
        ])
      .leftJoin('users.speciality', 'speciality')
      .leftJoin('users.nationality', 'nationality')
      .leftJoin('users.photo', 'photo')
      .where('email_address = "' + email + '"')
      .getRawOne()

    //console.log(user);

    return user;

  }

  async addFamilyMember(data) {
    return await this.usersRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

  async create(data) {
    return await this.usersRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

  async update(data) {
    return await this.usersRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

  async sendOTP(data) {

    const MaskData = require('maskdata');

    const maskPasswordOptions = {
      unmaskedStartCharacters: 4,
      unmaskedEndCharacters: 4
    };

    let user = await this.findBy(data);

    if (!user) {
      return {
        'status': false,
        'message': 'User not found.'
      }
    }

    user.otp_code = Math.floor(1000 + Math.random() * 9000);

    this.sendSMS({ 'code': user.otp_code })
    this.sendEmail(user)


    let response = await this.usersRepository.update({ id: user.id }, { otp_code: user.otp_code })
      .then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      });

    if (response.affected === 1) {
      return {
        'status': true,
        'data': {
          'phone_number': MaskData.maskPassword(user.phone_number, maskPasswordOptions),
          'email_address': MaskData.maskEmail2(user.email_address, maskPasswordOptions),
          'otp_code': user.otp_code,
        },
        'message': 'OTP has been sent.'
      }
    }

    return {
      'status': false,
      'message': 'User not found.'
    }



  }

  async sendSMS(data) {
    const axios = require('axios').default;
    let link = `${process.env.SMS_LINK}`
    link = link + data.code + ' is OTP Code for ASH.'
    //console.log(link);
    process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
    try {
      const response = axios.get(link);
      return response
    } catch (error) {
      throw new BadGatewayException(error.message)
    }

  }

  async sendEmail(data) {

    this.mailService.sendMail({
      'to': data.email_address,
      'subject': 'OTP Code for AlMoosa Specialist Hospital',
      'text': data.otp_code + ' is the OTP Code for AlMoosa Specialist Hospital.'
    });
  }

  async verifyOTP(data) {
    let { reset_flag, udid, fcm_token, ...req_data } = data;
    let user = await this.findBy(req_data);

    if (user) {

      if (udid || fcm_token) {
        let res = await this.usersRepository.update({ id: user.id }, { udid, fcm_token })
      }

      if (reset_flag) {
        await this.usersRepository.update({ id: user.id }, { otp_code: null })
          .then(res => res)
          .catch(e => {
            throw new BadRequestException(e.sqlMessage);
          });
      }
      return {
        access_token: this.jwtService.sign({ user }),
        user
      }

    }

    return {
      'status': false,
      'message': 'OTP code is not correct.'
    }
  }

  async remove(id) {
    return this.usersRepository.softDelete(id)
  }

  async promoGroups(data) {

    await this.usersRepository.update(
      { "promo_group_id": data.promo_group_id },
      { "promo_group_id": null },
    )

    return await this.usersRepository.update(
      {
        "id": In(data.users),
      },
      { "promo_group_id": data.promo_group_id },
    )

  }

  async updateUser(id, data) {

    let response;

    if (data.clinics) {
      response = await dataSource
        .createQueryBuilder()
        .from(DoctorClinic, 'doctor_clinics')
        .delete()
        .where("doctor_id = :id", { id })
        .execute()

      response = await dataSource
        .createQueryBuilder()
        .insert()
        .into(DoctorClinic)
        .values(
          data.clinics.map(
            clinic_id => ({
              doctor_id: id,
              clinic_id
            })
          )
        )
        .execute()

      delete data.clinics;
    }

    response = await this.usersRepository.update({ id }, { ...data })
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });

    return response;
  }

  async doctorRating(id, data) {

    let user: any = await this.usersRepository.findOneBy(id);
    let rating = 0;

    if (user.rating)
      rating = (user.rating + data.rating) / 2;
    else
      rating = data.rating;

    let response = await this.usersRepository.update({ id }, { rating })
      .then(res => res)
      .catch(e => {
        console.log(e);

        throw new BadRequestException(e.sqlMessage);
      });
    return response;
  }

  async resetPassword(data) {

    const { password, ...reqData } = data;

    let user = await this.findBy(
      reqData
    );

    if (user) {
      data.password = await bcrypt.hash(data.password, 10);
      let response = await this.usersRepository.update({ id: user.id }, { otp_code: null, password: data.password })
        .then(res => res)
        .catch(e => {
          throw new BadRequestException(e.sqlMessage);
        });

      if (response.affected === 1) {
        return {
          'status': true,
          'message': 'Password has been changed.'
        }
      }

    }

    return {
      'status': false,
      'message': 'OTP Code is not correct.'
    }

  }

  @TypeOrmQueryParser()
  async find(query) {
    query.relations = ['role', 'speciality', 'timeslots', 'photo', 'clinics', 'nationality', 'department'];
    return await this.usersRepository.find(query);
  }

  async getFamilyMembers(query, body) {
    console.log('body.user', body.user);

    query.relations = ['photo'];
    return await this.usersRepository.find({
      ...query,
      where: {
        guardian_id: body.user.id
      }
    });
  }

  @TypeOrmQueryParser()
  async getAllFamilyMembers(query, body) {
    console.log('body.user', body.user);

    query.relations = ['photo'];
    return await this.usersRepository.find({
      ...query,
      where: {
        guardian_id: Not(IsNull())
      }
    });
  }

  async findMyDoctor(query) {
    let dated = query.date;
    let weekday = 0;

    if (dated) {
      weekday = (new Date(dated)).getDay();
      if (weekday === 0) {
        weekday = 7;
      }
    }
    let doctors = await this.usersRepository
      .createQueryBuilder('users')
      .leftJoinAndSelect('users.card', 'card')
      .leftJoinAndSelect('users.clinics', 'clinics')
      .leftJoinAndSelect('users.photo', 'photo')
      .leftJoinAndSelect('users.nationality', 'nationality')
      .innerJoinAndSelect('users.speciality', 'speciality')
      .where('1=1')

    if (query.speciality_id)
      doctors = doctors
        .andWhere('speciality.id = :speciality_id', { 'speciality_id': query.speciality_id })

    if (query.date)
      doctors = doctors.leftJoinAndSelect('users.timeslots', 'timeslots')
        .andWhere('timeslots.week_day = :weekday', { 'weekday': weekday })

    if (query.clinic_id)
      doctors = doctors.leftJoinAndSelect('users.clinics', 'clinics')
        .andWhere('clinic_id = :clinic_id', { 'clinic_id': query.clinic_id })

    // //console.log(doctors.getQueryAndParameters());


    let resonse = doctors.getMany();

    return resonse ?? [];
  }



}

