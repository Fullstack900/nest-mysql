import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Repository } from 'typeorm';
import { CreateHealthEducationDto } from './dto/create-health-education.dto';
import { UpdateHealthEducationDto } from './dto/update-health-education.dto';
import { HealthEducation } from './entities/health-education.entity';

@Injectable()
export class HealthEducationService {

  constructor(
    @InjectRepository(HealthEducation)
    private healthEducationRepository: Repository<HealthEducation>,
  ) {

  }

  async create(data) {
    return await this.healthEducationRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );

  }

  @TypeOrmQueryParser()
  async findAll(query) {
    query.select = ['id', 'thumbnail', 'short_title', 'short_text'];
    query.relations = ['thumbnail'];
    return await this.healthEducationRepository.find(query);
  }

  async findOne(id: number) {
    return await this.healthEducationRepository.findOne({
      where: { id },
      relations: ['banner']
    });
  }

  update(id: number, updateHealthEducationDto: UpdateHealthEducationDto) {
    return `This action updates a #${id} healthEducation`;
  }

  remove(id: number) {
    return `This action removes a #${id} healthEducation`;
  }
}
