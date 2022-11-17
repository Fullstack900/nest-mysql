import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { AppointmentsService } from './appointments.service';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body) {
    return this.appointmentsService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('next')
  getNext(@Query() query) {
    return this.appointmentsService.getNext(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('reports')
  getAppointmentWithReports(@Query() query) {
    return this.appointmentsService.getAppointmentWithReports(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('upcoming')
  upcomingAppointments(@Query() query) {
    return this.appointmentsService.upcomingAppointments(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('today')
  todayAppointments(@Query() query) {
    return this.appointmentsService.todayAppointments(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('history')
  historyAppointments(@Query() query) {
    return this.appointmentsService.historyAppointments(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query() query) {
    return this.appointmentsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateAppointment(
    @Param('id') id: string,
    @Body() body
  ) {
    const { user: { }, ...data } = body;
    return await this.appointmentsService.update(+id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }

}
