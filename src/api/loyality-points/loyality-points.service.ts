import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { timeStamp } from 'console';
import { Repository } from 'typeorm';
import { CreateLoyalityPointDto } from './dto/create-loyality-point.dto';
import { UpdateLoyalityPointDto } from './dto/update-loyality-point.dto';
import { LoyalityPoint } from './entities/loyality-point.entity';

@Injectable()
export class LoyalityPointsService {

  constructor(
    @InjectRepository(LoyalityPoint)
    private loyalityRepository: Repository<LoyalityPoint>
  ) { }

  create(createLoyalityPointDto: CreateLoyalityPointDto) {
    return 'This action adds a new loyalityPoint';
  }

  findAll() {
    return `This action returns all loyalityPoints`;
  }

  findOne(id: number) {
    return `This action returns a #${id} loyalityPoint`;
  }

  async findBy(data) {
    return await this.loyalityRepository.findBy(data)
      .then(res => res)
      .catch(error => error);
  }

  update(id: number, updateLoyalityPointDto: UpdateLoyalityPointDto) {
    return `This action updates a #${id} loyalityPoint`;
  }

  remove(id: number) {
    return `This action removes a #${id} loyalityPoint`;
  }
}
