import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { isArray, isObject } from 'class-validator';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: {
    items: T
  };
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {

    return next.handle().pipe(map(data => {
      // //console.log('response: ', new Date(), JSON.stringify(data));
      // //console.log(isArray(data));

      if (data && typeof data.user !== 'undefined' && typeof data.access_token === 'undefined') {
        delete data.user;
      }

      if (isArray(data))
        data = { items: data };

      if (data && typeof data.status === 'boolean') {

        let response = {
          status: data.status ?? true,
          message: data.message ?? '',
          data: data.data ?? {},
        };
        if (data.otp_code)
          response.data.otp_code = data.otp_code;

        return response;

      }

      return {
        status: true,
        data
      };
    }));
  }
}