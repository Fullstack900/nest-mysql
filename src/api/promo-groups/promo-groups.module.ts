import { Module } from '@nestjs/common';
import { PromoGroupsService } from './promo-groups.service';
import { PromoGroupsController } from './promo-groups.controller';
import { PromoGroup } from './entities/promo-group.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([PromoGroup]), UsersModule],
  controllers: [PromoGroupsController],
  providers: [PromoGroupsService]
})
export class PromoGroupsModule { }
