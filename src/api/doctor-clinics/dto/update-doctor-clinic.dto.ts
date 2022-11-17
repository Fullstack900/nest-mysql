import { PartialType } from '@nestjs/mapped-types';
import { CreateDoctorClinicDto } from './create-doctor-clinic.dto';

export class UpdateDoctorClinicDto extends PartialType(CreateDoctorClinicDto) {}
