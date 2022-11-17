import { Module } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { MailerController } from './mailer.controller';

@Module({
  controllers: [MailerController],
  exports: [MailerService],
  providers: [MailerService]
})
export class MailerModule { }
