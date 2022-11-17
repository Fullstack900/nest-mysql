import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Repository } from 'typeorm';
import { CreateDoctorClinicDto } from './dto/create-doctor-clinic.dto';
import { UpdateDoctorClinicDto } from './dto/update-doctor-clinic.dto';
import { DoctorClinic } from './entities/doctor-clinic.entity';

@Injectable()
export class DoctorClinicsService {

  constructor(
    @InjectRepository(DoctorClinic)
    private doctorclinicRepository: Repository<DoctorClinic>,
  ) { }

  create(createDoctorClinicDto: CreateDoctorClinicDto) {
    return 'This action adds a new doctorClinic';
  }

  @TypeOrmQueryParser()
  async findAll(query) {
    query.relations = ['doctor', 'clinic'];
    return await this.doctorclinicRepository.find(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} doctorClinic`;
  }

  update(id: number, updateDoctorClinicDto: UpdateDoctorClinicDto) {
    return `This action updates a #${id} doctorClinic`;
  }

  remove(id: number) {
    return `This action removes a #${id} doctorClinic`;
  }
}
