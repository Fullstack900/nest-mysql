import { Module } from '@nestjs/common';
import { SystemSettingsService } from './system_settings.service';
import { SystemSettingsController } from './system_settings.controller';
import { SystemSetting } from './entities/system_setting.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SystemSetting])],
  controllers: [SystemSettingsController],
  providers: [SystemSettingsService]
})
export class SystemSettingsModule { }
