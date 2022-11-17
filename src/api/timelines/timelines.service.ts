import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Repository } from 'typeorm';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { Timeline } from './entities/timeline.entity';

@Injectable()
export class TimelinesService {
  constructor(
    @InjectRepository(Timeline)
    private timelineRepository: Repository<Timeline>,
  ) { }

  async create(data: CreateTimelineDto) {
    return await this.timelineRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

  @TypeOrmQueryParser()
  async findAll(query) {
    return await this.timelineRepository.find(query);
  }

  async findOne(id: number) {
    return await this.timelineRepository.findOne({
      where: { id }
    });
  }

  async update(id, data) {

    let response = await this.timelineRepository.update({ id }, { ...data })
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });

    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} timeline`;
  }
}
