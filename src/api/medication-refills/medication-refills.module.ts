import { Module } from '@nestjs/common';
import { MedicationRefillsService } from './medication-refills.service';
import { MedicationRefillsController } from './medication-refills.controller';
import { MedicationRefill } from './entities/medication-refill.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([MedicationRefill])],
  controllers: [MedicationRefillsController],
  providers: [MedicationRefillsService]
})
export class MedicationRefillsModule { }
