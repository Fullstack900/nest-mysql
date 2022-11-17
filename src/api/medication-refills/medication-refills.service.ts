import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Repository } from 'typeorm';
import { CreateMedicationRefillDto } from './dto/create-medication-refill.dto';
import { UpdateMedicationRefillDto } from './dto/update-medication-refill.dto';
import { MedicationRefill } from './entities/medication-refill.entity';

@Injectable()
export class MedicationRefillsService {

  constructor(
    @InjectRepository(MedicationRefill)
    private medicationRefillRepository: Repository<MedicationRefill>,
  ) { }

  async create(data: CreateMedicationRefillDto) {
    return await this.medicationRefillRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

  @TypeOrmQueryParser()
  async find(query) {
    return await this.medicationRefillRepository.find({ ...query, relations: ['medication'] });
  }

  findAll() {
    return `This action returns all medicationRefills`;
  }

  findOne(id: number) {
    return `This action returns a #${id} medicationRefill`;
  }

  async update(id: number, updateMedicationRefillDto: UpdateMedicationRefillDto) {
    return await this.medicationRefillRepository.update({ id }, { ...updateMedicationRefillDto })
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }

  async remove(id: number) {
    return await this.medicationRefillRepository.softDelete(id)
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }
}
