import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNationalityDto } from './dto/create-nationality.dto';
import { UpdateNationalityDto } from './dto/update-nationality.dto';
import { Nationality } from './entities/nationality.entity';

@Injectable()
export class NationalitiesService {

  constructor(
    @InjectRepository(Nationality)
    private nationalityRepository: Repository<Nationality>,
  ) { }

  create(createNationalityDto: CreateNationalityDto) {
    return 'This action adds a new nationality';
  }

  findAll() {
    return this.nationalityRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} nationality`;
  }

  update(id: number, updateNationalityDto: UpdateNationalityDto) {
    return `This action updates a #${id} nationality`;
  }

  remove(id: number) {
    return `This action removes a #${id} nationality`;
  }
}
