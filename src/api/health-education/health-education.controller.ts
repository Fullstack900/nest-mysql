import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { HealthEducationService } from './health-education.service';
import { CreateHealthEducationDto } from './dto/create-health-education.dto';
import { UpdateHealthEducationDto } from './dto/update-health-education.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('health-education')
export class HealthEducationController {
  constructor(private readonly healthEducationService: HealthEducationService) { }


  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body) {
    const { user: { }, ...data } = body;
    return await this.healthEducationService.create(data);
  }

  @Get()
  findAll(@Request() req) {
    return this.healthEducationService.findAll(req.query);
  }


  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.healthEducationService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHealthEducationDto: UpdateHealthEducationDto) {
    return this.healthEducationService.update(+id, updateHealthEducationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.healthEducationService.remove(+id);
  }

}
