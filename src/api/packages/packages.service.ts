import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Repository } from 'typeorm';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';

@Injectable()
export class PackagesService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) { }

  async create(data) {
    return await this.packageRepository
      .save(data).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );

  }

  @TypeOrmQueryParser()
  async find(query) {
    return await this.packageRepository.find({ ...query, relations: ['thumbnail'] });
  }

  findAll() {
    return `This action returns all Packages`;
  }

  findOne(id: number) {
    return `This action returns a #${id} Package`;
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    return await this.packageRepository.update({ id }, { ...updatePackageDto })
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }

  async remove(id: number) {
    return await this.packageRepository.softDelete(id)
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }
}
