import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { dataSource } from 'src/data-source/DataSource';
import { Repository } from 'typeorm';
import { Payment } from './entities/payment.entity';
import { Appointment } from '../appointments/entities/appointment.entity';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectRepository(Payment)
    private paymentRepository: Repository<Payment>,
  ) { }

  async getApplePayForm(query) {

    const https = require('https');
    const querystring = require('querystring');

    const request = async () => {
      const path = '/v1/checkouts';
      const data = querystring.stringify({
        'entityId': `${process.env.HYPER_ENTITY}`,
        'amount': query.amount,
        'currency': query.currency,
        'paymentType': `${process.env.PAYMENT_TYPE}`,
      });

      // //console.log('data: ', data);


      const options = {
        port: 443,
        host: `${process.env.HYPERPAY_HOST}`,
        path: path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': data.length,
          'Authorization': 'Bearer ' + `${process.env.HYPERPAY_TOKEN}`
        }
      };
      // //console.log('options: ', options);

      return new Promise((resolve, reject) => {
        const postRequest = https.request(options, function (res) {
          const buf = [];
          res.on('data', chunk => {
            buf.push(Buffer.from(chunk));
          });
          res.on('end', () => {
            const jsonString = Buffer.concat(buf).toString('utf8');
            try {
              resolve(JSON.parse(jsonString));
            } catch (error) {
              reject(error);
            }
          });
        });
        postRequest.on('error', reject);
        postRequest.write(data);
        postRequest.end();
      });
    };

    let res = await request().then(res => res).catch(error => error);
    return res;

  }

  async appleRedirect(query) {

    //console.log(query);

    const https = require('https');
    const querystring = require('querystring');

    const request = async () => {
      var path = query.resourcePath;
      path += '?entityId=' + `${process.env.HYPER_ENTITY}`;

      const options = {
        port: 443,
        host: `${process.env.HYPERPAY_HOST}`,
        path: path,
        method: 'GET',
        headers: {
          'Authorization': 'Bearer ' + `${process.env.HYPERPAY_TOKEN}`
        }
      };
      return new Promise((resolve, reject) => {
        const postRequest = https.request(options, function (res) {
          const buf = [];
          res.on('data', chunk => {
            buf.push(Buffer.from(chunk));
          });
          res.on('end', () => {
            const jsonString = Buffer.concat(buf).toString('utf8');
            try {
              resolve(JSON.parse(jsonString));
            } catch (error) {
              reject(error);
            }
          });
        });
        postRequest.on('error', reject);
        postRequest.end();
      });
    };

    let res = await request().then(res => res).catch(error => error);
    //console.log(res);
    return res;

  }

  async create(payment_data) {
    let res = await this.paymentRepository.save(payment_data);
    //console.log(res);
    return res;
  }

  async update(query, response) {

    let is_success = /^(000\.000\.|000\.100\.1|000\.[36])/.test(response.result.code);

    let payment = await this.paymentRepository.findOneBy({
      gateway_id: query.id
    });

    // console.log('payment', payment);

    await dataSource
      .createQueryBuilder()
      .update('appointments')
      .set({ status: is_success ? 'confirmed' : 'pending' })
      .where("id = :id", { id: payment.appointment_id })
      .execute()


    let res = await this.paymentRepository
      .createQueryBuilder()
      .update(Payment)
      .set({ response: JSON.stringify(response), status: is_success ? 'success' : 'failure' })
      .where({ gateway_id: query.id })
      .execute();

    //console.log(res);
    return res;
  }

}
