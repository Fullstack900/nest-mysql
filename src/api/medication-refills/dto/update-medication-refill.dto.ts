import { PartialType } from '@nestjs/mapped-types';
import { CreateMedicationRefillDto } from './create-medication-refill.dto';

export class UpdateMedicationRefillDto extends PartialType(CreateMedicationRefillDto) {}
