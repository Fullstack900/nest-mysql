import { Controller, Get, Query, Render, Res } from '@nestjs/common';
import { Response } from 'express';
import { PaymentsService } from './payments.service';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) { }

  @Get()
  async getApplePayForm(@Query() query, @Res() res: Response) {
    let response: any = await this.paymentsService.getApplePayForm(query);
    let payment_method = query.method ?? `${process.env.HYPERPAY_METHODS}`

    let payment_data = {
      gateway_id: response.id,
      appointment_id: query.appointment_id,
      amount: query.amount,
      currency: query.currency
    }

    await this.paymentsService.create(payment_data);
    let append = '';

    if (typeof query.platform != 'undefined' && query.platform == 'web') {
      append = '?platform=web'
    }

    return res.render('hyperpay/form', {
      ...response,
      HYPERPAY_HOST: `${process.env.HYPERPAY_HOST}`,
      BASE_URL: `${process.env.BASE_URL}`,
      APPLE_REDIRECT_URL: `${process.env.APPLE_REDIRECT_URL}` + append,
      payment_method
    });
  }


  @Get('callback')
  async appleRedirect(@Query() query, @Res() res: Response) {

    let response: any = await this.paymentsService.appleRedirect(query);

    await this.paymentsService.update(query, response);

    response.is_success = /^(000\.000\.|000\.100\.1|000\.[36])/.test(response.result.code);

    response.text = response.is_success ? "Success" : "Failure";

    let api_prefix = `${process.env.API_PREFIX}`

    if (typeof query.platform != 'undefined' && query.platform == 'web') {
      if (response.is_success) {
        return res.redirect(`${process.env.WEB_SUCCESS_URL}`)
      }

      return res.redirect(`${process.env.WEB_FAILURE_URL}`)

    }

    if (response.is_success) {
      return res.redirect(api_prefix + '/payments/success')
    }

    return res.redirect(api_prefix + '/payments/failure')

  }

  @Get('success')
  async success(@Query() query, @Res() res: Response) {
    return res.render('hyperpay/success');
  }

  @Get('failure')
  async failure(@Query() query, @Res() res: Response) {
    return res.render('hyperpay/failure');
  }



}
