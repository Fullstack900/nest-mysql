import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PromoGroupsService } from './promo-groups.service';
import { CreatePromoGroupDto } from './dto/create-promo-group.dto';
import { UpdatePromoGroupDto } from './dto/update-promo-group.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('promo-groups')
export class PromoGroupsController {
  constructor(private readonly promoGroupsService: PromoGroupsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPromoGroupDto: CreatePromoGroupDto) {
    return await this.promoGroupsService.create(createPromoGroupDto);
  }


  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query) {
    return await this.promoGroupsService.find(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.promoGroupsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return this.promoGroupsService.update(+id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.promoGroupsService.remove(+id);
  }
}
