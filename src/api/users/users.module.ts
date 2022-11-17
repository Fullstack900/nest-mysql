import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users as User } from './entities/user.entity';
import { UsersController } from './users.controller';
import { TimeslotsModule } from '../timeslots/timeslots.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from '../auth/constants';
import { MailerModule } from 'src/mailer/mailer.module';

@Module({
  controllers: [UsersController],
  imports: [
    TypeOrmModule.forFeature([User]),
    TimeslotsModule,
    PassportModule,
    MailerModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),],
  exports: [TypeOrmModule, UsersService],
  providers: [UsersService]
})
export class UsersModule { }