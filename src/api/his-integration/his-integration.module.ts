import { Module } from '@nestjs/common';
import { HisIntegrationService } from './his-integration.service';
import { HisIntegrationController } from './his-integration.controller';

@Module({
  controllers: [HisIntegrationController],
  providers: [HisIntegrationService],
  exports: [HisIntegrationService]
})
export class HisIntegrationModule { }
