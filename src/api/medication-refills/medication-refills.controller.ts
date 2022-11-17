import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { MedicationRefillsService } from './medication-refills.service';
import { CreateMedicationRefillDto } from './dto/create-medication-refill.dto';
import { UpdateMedicationRefillDto } from './dto/update-medication-refill.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('medication-refills')
export class MedicationRefillsController {
  constructor(private readonly medicationRefillsService: MedicationRefillsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createMedicationRefillDto: CreateMedicationRefillDto) {
    return await this.medicationRefillsService.create(createMedicationRefillDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query) {
    return await this.medicationRefillsService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicationRefillsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return this.medicationRefillsService.update(+id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicationRefillsService.remove(+id);
  }

}
