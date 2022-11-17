import { Module } from '@nestjs/common';
import { LoyalityPointsService } from './loyality-points.service';
import { LoyalityPointsController } from './loyality-points.controller';
import { LoyalityPoint } from './entities/loyality-point.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LoyalityPoint])],
  controllers: [LoyalityPointsController],
  providers: [LoyalityPointsService],
  exports: [LoyalityPointsService]
})
export class LoyalityPointsModule { }
