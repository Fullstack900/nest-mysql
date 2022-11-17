import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TimelinesService } from './timelines.service';
import { CreateTimelineDto } from './dto/create-timeline.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('timelines')
export class TimelinesController {
  constructor(private readonly timelinesService: TimelinesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTimelineDto: CreateTimelineDto) {
    return this.timelinesService.create(createTimelineDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req) {
    return this.timelinesService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timelinesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return await this.timelinesService.update(+id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timelinesService.remove(+id);
  }

}
