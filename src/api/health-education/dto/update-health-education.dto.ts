import { PartialType } from '@nestjs/mapped-types';
import { CreateHealthEducationDto } from './create-health-education.dto';

export class UpdateHealthEducationDto extends PartialType(CreateHealthEducationDto) {}
