import { PartialType } from '@nestjs/mapped-types';
import { CreateLoyalityPointDto } from './create-loyality-point.dto';

export class UpdateLoyalityPointDto extends PartialType(CreateLoyalityPointDto) {}
