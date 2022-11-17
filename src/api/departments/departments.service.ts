import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentsService {

  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {

  }

  @TypeOrmQueryParser()
  async findAll(query) {
    return await this.departmentRepository.find(query);
  }

  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
