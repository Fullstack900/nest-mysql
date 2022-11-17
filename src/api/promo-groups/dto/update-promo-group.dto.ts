import { PartialType } from '@nestjs/mapped-types';
import { CreatePromoGroupDto } from './create-promo-group.dto';

export class UpdatePromoGroupDto extends PartialType(CreatePromoGroupDto) {}
