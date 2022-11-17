import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { MedicationsService } from './medications.service';
import { CreateMedicationDto } from './dto/create-medication.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('medications')
export class MedicationsController {
  constructor(private readonly medicationsService: MedicationsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createMedicationDto: CreateMedicationDto) {
    return this.medicationsService.create(createMedicationDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.medicationsService.findAll(req.query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('current')
  findCurrentMedications(@Request() req) {
    return this.medicationsService.findCurrentMedications(req.query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('past')
  findPastMedications(@Request() req) {
    return this.medicationsService.findPastMedications(req.query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return await this.medicationsService.update(+id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationsService.remove(+id);
  }
}
