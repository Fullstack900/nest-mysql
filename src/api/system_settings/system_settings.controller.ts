import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { SystemSettingsService } from './system_settings.service';
import { CreateSystemSettingDto } from './dto/create-system_setting.dto';
import { JwtAuthGuard } from 'src/api/auth/guard/jwt-auth.guard';

@Controller('system-settings')
export class SystemSettingsController {
  constructor(private readonly systemSettingsService: SystemSettingsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSystemSettingDto: CreateSystemSettingDto) {
    return this.systemSettingsService.create(createSystemSettingDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.systemSettingsService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.systemSettingsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return await this.systemSettingsService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.systemSettingsService.remove(+id);
  }
}
