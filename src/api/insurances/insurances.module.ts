import { Module } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { InsurancesController } from './insurances.controller';
import { Insurance } from './entities/insurance.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Insurance])],
  controllers: [InsurancesController],
  providers: [InsurancesService]
})
export class InsurancesModule { }
