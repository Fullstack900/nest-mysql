import { Module } from '@nestjs/common';
import { DoctorClinicsService } from './doctor-clinics.service';
import { DoctorClinicsController } from './doctor-clinics.controller';
import { DoctorClinic } from './entities/doctor-clinic.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DoctorClinic])],
  controllers: [DoctorClinicsController],
  providers: [DoctorClinicsService]
})
export class DoctorClinicsModule { }
