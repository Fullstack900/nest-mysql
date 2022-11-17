import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { DoctorClinicsService } from './doctor-clinics.service';
import { CreateDoctorClinicDto } from './dto/create-doctor-clinic.dto';
import { UpdateDoctorClinicDto } from './dto/update-doctor-clinic.dto';

@Controller('doctor-clinics')
export class DoctorClinicsController {
  constructor(private readonly doctorClinicsService: DoctorClinicsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDoctorClinicDto: CreateDoctorClinicDto) {
    return this.doctorClinicsService.create(createDoctorClinicDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.doctorClinicsService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.doctorClinicsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDoctorClinicDto: UpdateDoctorClinicDto) {
    return this.doctorClinicsService.update(+id, updateDoctorClinicDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.doctorClinicsService.remove(+id);
  }
}
