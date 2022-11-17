import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PromotionsService } from '../promotions/promotions.service';
import { HisIntegrationService } from '../his-integration/his-integration.service';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private promotionService: PromotionsService,
    private jwtService: JwtService,
    private hisIntegrationService: HisIntegrationService
  ) { }

  async findBy(data) {
    return await this.usersService.findBy(data);
  }

  async findByV2(data) {
    const sp_params = {
      'sp_name': 'SP_PATIENT_PROFILE',
      'input_params': ['3610999']
    }
    const sp_response = await this.hisIntegrationService.callSP(sp_params);
    console.log("🚀 ~ file: auth.service.ts ~ line 28 ~ AuthService ~ findByV2 ~ sp_response", sp_response)
    const db_data = await this.usersService.findBy(data);
    console.log("🚀 ~ file: auth.service.ts ~ line 30 ~ AuthService ~ findByV2 ~ db_data", db_data)

    return await this.hisIntegrationService.mergeData(db_data, sp_response[0]);

  }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.authUser(email);

    if (user && await await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: any) {

    const payload = {
      user: user.user
    };

    if (payload.user.promo_code) {
      const applyPromo = await this.promotionService.applyPromoCode({ "promo_code": payload.user.promo_code, user: payload.user })

      if (applyPromo.status == false) {
        payload.user.promo_code = null;
        this.usersService.update({ id: payload.user.id, promo_code: null });
      }
    }

    return {
      access_token: this.jwtService.sign(payload),
      user: payload.user
    };

  }

  async register(data) {
    if (data.password)
      data.password = await bcrypt.hash(data.password, 10)

    let response = await this.usersService.create(data);
    if (response) {
      const { password, ...result } = response;
      return result;
    }
  }

  decodeToken(token): any {
    return this.jwtService.decode(token)
  }
}