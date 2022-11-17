import { Controller, Get, Request } from '@nestjs/common';
import { MailerService } from './mailer.service';
import * as request from 'supertest';

@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerService) { }

  @Get('send')
  async sendMail(@Request() request) {
    return await this.mailerService.sendMail(request);
  }

  @Get('test')
  async testMail() {
    return await this.mailerService.testMail();
  }


}
