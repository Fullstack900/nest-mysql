import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThanOrEqual, MoreThan, MoreThanOrEqual, Repository } from 'typeorm';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { Promotion } from './entities/promotion.entity';
import { dataSource } from "../../data-source/DataSource";
import { Users } from '../users/entities/user.entity';
import { loadavg } from 'os';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';

@Injectable()
export class PromotionsService {

  constructor(
    @InjectRepository(Promotion)
    private promotionRepository: Repository<Promotion>,

  ) { }

  async create(createPromotionDto: CreatePromotionDto) {
    return await this.promotionRepository
      .save(createPromotionDto).then(res => res)
      .catch(e => {
        throw new BadRequestException(e.sqlMessage);
      }
      );
  }

  async applyPromoCode(data) {
    let promotion = await this.promotionRepository
      .createQueryBuilder('promotions')
      .where(
        'promo_code = "' + data.promo_code +
        '" AND overall_usage < overall_limit' +
        ' AND start_date <= CURRENT_DATE()' +
        ' AND end_date >= CURRENT_DATE()'
      )
      .getOne()

    // console.log('promotion', promotion);

    data.user = await dataSource
      .createQueryBuilder()
      .from(Users, 'users')
      .where('id = ' + data.user.id)
      .getRawOne()

    if (promotion && promotion.promo_group_id == data.user.promo_group_id) {
      let response = await dataSource
        .createQueryBuilder()
        .update('users')
        .set({ promo_code: data.promo_code })
        .where("id = :id", { id: data.user.id })
        .execute()

      return {
        status: true,
        message: 'Promo Code has been applied.',
        data: promotion
      }

    }

    return {
      status: false,
      message: 'Promo Code is not valid'
    }
  }

  @TypeOrmQueryParser()
  async find(query) {
    return await this.promotionRepository.find(
      {
        ...query,
        relations: ['promo_group', 'image']
      }
    );
  }

  @TypeOrmQueryParser()
  async assigned(query, body) {

    let user: any = await dataSource
      .createQueryBuilder()
      .select('promo_group_id')
      .from(Users, 'users')
      .where({
        id: body.user.id
      }).getRawOne();

    return await this.promotionRepository.find({
      ...query,
      where: {
        promo_group_id: user.promo_group_id
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} promotion`;
  }

  async update(id: number, updatePromotionDto: UpdatePromotionDto) {
    return await this.promotionRepository.update({ id }, { ...updatePromotionDto })
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }

  async remove(id: number) {
    return await this.promotionRepository.softDelete(id)
      .then(res => res)
      .catch(e => {
        console.log(e);
        throw new BadRequestException(e.sqlMessage);
      });
  }
}
