import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { json } from 'stream/consumers';
import { Repository } from 'typeorm';
import { CreateSystemSettingDto } from './dto/create-system_setting.dto';
import { UpdateSystemSettingDto } from './dto/update-system_setting.dto';
import { SystemSetting } from './entities/system_setting.entity';

@Injectable()
export class SystemSettingsService {

  constructor(
    @InjectRepository(SystemSetting)
    private systemSettingsRepository: Repository<SystemSetting>,
  ) { }

  async create(data: CreateSystemSettingDto) {
    return await this.systemSettingsRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

  @TypeOrmQueryParser()
  async findAll(query) {
    return await this.systemSettingsRepository.find(query);
  }

  async findOne(id: number) {
    return await this.systemSettingsRepository.findOne({
      where: { id }
    });
  }

  async update(id, data) {

    let response = await this.systemSettingsRepository.update({ id }, { ...data })
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });

    return response;
  }

  remove(id: number) {
    return `This action removes a #${id} systemSetting`;
  }
}
