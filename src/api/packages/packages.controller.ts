import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('packages')
export class PackagesController {
  constructor(private readonly packagesService: PackagesService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() body) {
    const { user: { }, ...data } = body;
    return await this.packagesService.create(data);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query) {
    return await this.packagesService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packagesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return this.packagesService.update(+id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packagesService.remove(+id);
  }
}
