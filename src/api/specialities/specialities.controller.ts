import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { SpecialitiesService } from './specialities.service';
import { CreateSpecialityDto } from './dto/create-speciality.dto';
import { UpdateSpecialityDto } from './dto/update-speciality.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('specialities')
export class SpecialitiesController {

  constructor(
    private readonly specialitiesService: SpecialitiesService,
  ) {
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSpecialityDto: CreateSpecialityDto) {
    return this.specialitiesService.create(createSpecialityDto);
  }

  @Get()
  findAll(@Request() req) {
    return this.specialitiesService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialitiesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecialityDto: UpdateSpecialityDto) {
    return this.specialitiesService.update(+id, updateSpecialityDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialitiesService.remove(+id);
  }
}
