import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { BadRequestException, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UsersService } from '../../users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthService,
    private userService: UsersService
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    }, async function (req, username, password, done) {
      try {

        if (typeof req.body.is_admin == 'undefined' || !req.body.is_admin) {
          if (

            password &&
            req.body.field_name != "saudi_id" &&
            req.body.field_name != "iqama" &&
            req.body.field_name != "mrn_number" &&
            req.body.field_name != "phone_number"
          ) {
            throw new BadRequestException("Required parameter is missing.");
          }
        }

        let user = await this.userService.findBy({
          [req.body.field_name]: req.body.username
        });

        //if not handle it
        if (!user) {
          throw new UnauthorizedException("User does not exist.");
        }

        if (user.deleted_at) {
          throw new UnauthorizedException("User has been removed or blocked.");
        }


        //check if user status is verified
        if (user.status != "verified") {
          throw new UnauthorizedException("This account is blocked or unverified.");
        }

        if (user) {
          user = await this.authService.validateUser(user.email_address, password);
        }

        //if not handle it
        if (!user) {
          throw new UnauthorizedException("Provided credentials are not correct.");
        }

        let { udid, fcm_token } = req.body;
        if (udid || fcm_token) {
          await this.userService.update({ id: user.id, udid, fcm_token })
        }

        //otherwise return user
        done(null, user);
      } catch (error) {

        //console.log('exception: ', error);

        error.response = { status: false, message: error.message, data: {} }

        done(error, {
          status: false,
          message: error
        });
      }

    });
  }

}