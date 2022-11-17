import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { dataSource } from 'src/data-source/DataSource';
import { Repository } from 'typeorm';
import { Report } from './entities/report.entity';
import { Appointment } from '../appointments/entities/appointment.entity';

@Injectable()
export class ReportsService {

  constructor(
    @InjectRepository(Report)
    private reportRepository: Repository<Report>,
  ) { }

  async create(data) {
    return await this.reportRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

  @TypeOrmQueryParser()
  async findAll(data) {
    return await this.reportRepository.find({
      ...data,
      relations: ['report_file']
    });
  }

  async findAppointments(data) {

    return await dataSource.createQueryBuilder()
      .select('appointments.*')
      .from(Appointment, 'appointments')
      .leftJoin('appointments.reports', 'reports')
      .andWhere('patient_id = :patient_id', { patient_id: data.patient_id })
      .andWhere('appointments.status != "cancelled"')
      .andWhere('reports.id IS NOT NULL')
      .getRawMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} report`;
  }

  remove(id: number) {
    return `This action removes a #${id} report`;
  }
}
