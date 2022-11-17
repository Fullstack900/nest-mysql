import { Module } from '@nestjs/common';
import { HealthEducationService } from './health-education.service';
import { HealthEducationController } from './health-education.controller';
import { HealthEducation } from './entities/health-education.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([HealthEducation])],
  controllers: [HealthEducationController],
  providers: [HealthEducationService]
})
export class HealthEducationModule { }
