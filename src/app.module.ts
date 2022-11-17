import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './api/auth/auth.module';
import { UsersModule } from './api/users/users.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';

import * as path from 'path';
import {
  AcceptLanguageResolver,
  I18nModule,
  QueryResolver,
} from 'nestjs-i18n';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSource } from './data-source/DataSource';
import { MediafilesModule } from './api/mediafiles/mediafiles.module';
import { join } from 'path';
import { AppointmentsModule } from './api/appointments/appointments.module';
import { DoctorClinicsModule } from './api/doctor-clinics/doctor-clinics.module';
import { RolesModule } from './api/roles/roles.module';
import { SpecialitiesModule } from './api/specialities/specialities.module';
import { TimeslotsModule } from './api/timeslots/timeslots.module';
import { ClinicsModule } from './api/clinics/clinics.module';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { PaymentsModule } from './api/payments/payments.module';
import { NationalitiesModule } from './api/nationalities/nationalities.module';
import { MailerModule } from './mailer/mailer.module';
import { PromotionsModule } from './api/promotions/promotions.module';
import { PromoGroupsModule } from './api/promo-groups/promo-groups.module';
import { LoyalityPointsModule } from './api/loyality-points/loyality-points.module';
import { SystemSettingsModule } from './api/system_settings/system_settings.module';
import { NotificationsModule } from './api/notifications/notifications.module';
import { ReportsModule } from './api/reports/reports.module';
import { DepartmentsModule } from './api/departments/departments.module';
import { InsurancesModule } from './api/insurances/insurances.module';
import { HealthEducationModule } from './api/health-education/health-education.module';
import { MedicationsModule } from './api/medications/medications.module';
import { MedicationRefillsModule } from './api/medication-refills/medication-refills.module';
import { ReminderSlotsModule } from './api/reminder-slots/reminder-slots.module';
import { TimelinesModule } from './api/timelines/timelines.module';
import { PackagesModule } from './api/packages/packages.module';
import { HisIntegrationModule } from './api/his-integration/his-integration.module';

@Module({
  exports: [TypeOrmModule],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../uploads'),
    }),
    TypeOrmModule.forRoot(dataSource.options),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    I18nModule.forRoot({
      fallbackLanguage: 'en',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: QueryResolver, options: ['lang'] },
        AcceptLanguageResolver,
      ],
    }),
    MediafilesModule,
    AppointmentsModule,
    DoctorClinicsModule,
    RolesModule,
    SpecialitiesModule,
    TimeslotsModule,
    ClinicsModule,
    PaymentsModule,
    NationalitiesModule,
    MailerModule,
    PromotionsModule,
    PromoGroupsModule,
    LoyalityPointsModule,
    SystemSettingsModule,
    NotificationsModule,
    ReportsModule,
    DepartmentsModule,
    InsurancesModule,
    HealthEducationModule,
    MedicationsModule,
    MedicationRefillsModule,
    ReminderSlotsModule,
    TimelinesModule,
    PackagesModule,
    HisIntegrationModule,


  ],
  controllers: [
    AppController],
  providers: [
    AppService, {
      provide: APP_INTERCEPTOR,
      useClass: AuthInterceptor,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    }, {
      provide: APP_INTERCEPTOR,
      useClass: ErrorsInterceptor,
    }
  ],
})
export class AppModule { }
