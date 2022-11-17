import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { InsurancesService } from './insurances.service';
import { CreateInsuranceDto } from './dto/create-insurance.dto';
import { UpdateInsuranceDto } from './dto/update-insurance.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('insurances')
export class InsurancesController {
  constructor(private readonly insurancesService: InsurancesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createInsuranceDto: CreateInsuranceDto) {
    return await this.insurancesService.create(createInsuranceDto);
  }

  @Get()
  async findAll(@Request() req) {
    return await this.insurancesService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.insurancesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateInsuranceDto: UpdateInsuranceDto) {
    return this.insurancesService.update(+id, updateInsuranceDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.insurancesService.remove(+id);
  }
}
