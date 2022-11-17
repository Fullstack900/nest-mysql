import { Controller, Get, Post, Body, Param, Delete, Query } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { CreateReportDto } from './dto/create-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Post()
  async create(@Body() createReportDto: CreateReportDto) {
    return await this.reportsService.create(createReportDto);
  }

  @Get()
  async findAll(@Query() query) {
    return await this.reportsService.findAll(query);
  }

  @Get('appointments')
  async findAppointments(@Query() query) {
    return await this.reportsService.findAppointments(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reportsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(+id);
  }
}
