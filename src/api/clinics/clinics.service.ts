import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Mediafile } from '../mediafiles/entities/mediafile.entity';
import { Repository } from 'typeorm';
import { CreateClinicDto } from './dto/create-clinic.dto';
import { UpdateClinicDto } from './dto/update-clinic.dto';
import { Clinic } from './entities/clinic.entity';

@Injectable()
export class ClinicsService {

  constructor(
    @InjectRepository(Clinic)
    private clinicsRepository: Repository<Clinic>,
  ) { }

  create(createClinicDto: CreateClinicDto) {
    return 'This action adds a new clinic';
  }

  async findAll() {
    return await this.clinicsRepository.find({
      relations: ['image', 'map_image']
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} clinic`;
  }

  update(id: number, updateClinicDto: UpdateClinicDto) {
    return `This action updates a #${id} clinic`;
  }

  remove(id: number) {
    return `This action removes a #${id} clinic`;
  }
}