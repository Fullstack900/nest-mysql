import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { Insurance } from './entities/insurance.entity';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';

@Injectable()
export class InsurancesService {

  constructor(
    @InjectRepository(Insurance)
    private InsuranceRepository: Repository<Insurance>

  ) { }

  async create(createInsuranceDto) {
    let res = await this.InsuranceRepository
      .save(createInsuranceDto).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      });

    return res;
  }

  @TypeOrmQueryParser()
  async findAll(query) {
    return await this.InsuranceRepository.find(query);
  }

  findOne(id: number) {
    return `This action returns a #${id} insurance`;
  }

  update(id: number, updateInsuranceDto: UpdateInsuranceDto) {
    return `This action updates a #${id} insurance`;
  }

  remove(id: number) {
    return `This action removes a #${id} insurance`;
  }
}