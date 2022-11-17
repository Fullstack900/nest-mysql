import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { TimeslotsService } from './timeslots.service';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('timeslots')
export class TimeslotsController {
  constructor(private readonly timeslotsService: TimeslotsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTimeslotDto: CreateTimeslotDto) {
    return this.timeslotsService.create(createTimeslotDto);
  }

  @Get()
  findAll(@Request() req) {

    let dated = req.query.date;
    let weekday = 0;

    if (dated) {
      weekday = (new Date(dated)).getDay();
      if (weekday === 0) {
        weekday = 7;
      }
      req.query.week_day = weekday
      delete req.query.date;
    }

    return this.timeslotsService.findAll(req.query, dated);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeslotsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeslotDto: UpdateTimeslotDto) {
    return this.timeslotsService.update(+id, updateTimeslotDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeslotsService.remove(+id);
  }
}
