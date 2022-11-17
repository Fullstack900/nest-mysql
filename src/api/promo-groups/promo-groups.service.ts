import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePromoGroupDto } from './dto/create-promo-group.dto';
import { UpdatePromoGroupDto } from './dto/update-promo-group.dto';
import { PromoGroup } from './entities/promo-group.entity';
import { UsersService } from '../users/users.service';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';

@Injectable()
export class PromoGroupsService {

  constructor(
    @InjectRepository(PromoGroup)
    private promoGroupRepository: Repository<PromoGroup>,
    private usersService: UsersService

  ) { }

  async create(createPromoGroupDto) {
    let res = await this.promoGroupRepository
      .save(createPromoGroupDto).then(res => {
        let { id, title } = res
        return { id, title }
      })
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
    createPromoGroupDto.promo_group_id = res.id;

    if (createPromoGroupDto.users) {
      let response = await this.usersService.promoGroups(createPromoGroupDto);
      // console.log(response);

    }

    return res;
  }

  @TypeOrmQueryParser()
  async find(query) {
    return await this.promoGroupRepository.find({ ...query, relations: ['users'] });
  }

  findAll() {
    return `This action returns all promoGroups`;
  }

  findOne(id: number) {
    return `This action returns a #${id} promoGroup`;
  }

  async update(id: number, updatePromoGroupDto: UpdatePromoGroupDto) {
    return await this.promoGroupRepository.update({ id }, { ...updatePromoGroupDto })
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }

  async remove(id: number) {
    return await this.promoGroupRepository.softDelete(id)
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }
}
