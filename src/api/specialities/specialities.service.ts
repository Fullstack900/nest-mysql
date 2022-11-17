import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser, TypeOrmQueryModel } from 'nest-typeorm-query-parser';
import { LessThan, Repository } from 'typeorm';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { Speciality } from './entities/speciality.entity';

@Injectable()
export class SpecialitiesService {

  constructor(
    @InjectRepository(Speciality)
    private specialityRepository: Repository<Speciality>,
  ) {

  }

  create(createSpecialityDto: CreateSpecialityDto) {
    return 'This action adds a new speciality';
  }

  @TypeOrmQueryParser()
  async findAll(query) {
    query.relations = ['icon'];
    return await this.specialityRepository.find(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} speciality`;
  }

  update(id: number, updateSpecialityDto: UpdateSpecialityDto) {
    return `This action updates a #${id} speciality`;
  }

  remove(id: number) {
    return `This action removes a #${id} speciality`;
  }
}