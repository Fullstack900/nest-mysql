import { Controller, Get } from '@nestjs/common';
import { AuthService } from './api/auth/auth.service';
import { I18n, I18nContext } from 'nestjs-i18n';


@Controller()
export class AppController {
  constructor(private authService: AuthService) { }

  @Get()
  async getHello(@I18n() i18n: I18nContext) {
    return await i18n.t('test.HELLO');
  }

}