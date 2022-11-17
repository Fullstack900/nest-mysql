import { Controller } from '@nestjs/common';
import { HisIntegrationService } from './his-integration.service';

@Controller('his-integration')
export class HisIntegrationController {
  constructor(private readonly hisIntegrationService: HisIntegrationService) {}
}
