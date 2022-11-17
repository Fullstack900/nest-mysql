import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { getTreeRepository, LessThan, MoreThan, Repository } from 'typeorm';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { UpdateMedicationDto } from './dto/update-medication.dto';
import { Medication } from './entities/medication.entity';

@Injectable()
export class MedicationsService {

  constructor(
    @InjectRepository(Medication)
    private medicationRepository: Repository<Medication>,
  ) {

  }

  create(createMedicationDto: CreateMedicationDto) {
    return 'This action adds a new medication';
  }

  @TypeOrmQueryParser()
  async findAll(query) {
    return await this.medicationRepository.find(query);
  }

  @TypeOrmQueryParser()
  async findCurrentMedications(query) {
    return await this.medicationRepository.find({
      ...query,
      where: {
        end_date: MoreThan(new Date().toISOString())
      },
      relations: ["medication_refills"]
    });
  }

  @TypeOrmQueryParser()
  async findPastMedications(query) {
    return await this.medicationRepository.find({
      ...query,
      where: {
        end_date: LessThan(new Date().toISOString())
      },
      relations: ["medication_refills"]
    });
  }



  findOne(id: number) {
    return `This action returns a #${id} medication`;
  }

  async update(id, data) {
    return await this.medicationRepository.update({ id }, { ...data })
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }


  remove(id: number) {
    return `This action removes a #${id} medication`;
  }
}
