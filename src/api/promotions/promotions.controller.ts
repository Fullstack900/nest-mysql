import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { PromotionsService } from './promotions.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';
import { UpdatePromotionDto } from './dto/update-promotion.dto';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { TypeOrmQueryParser } from 'nest-typeorm-query-parser';
import { Users } from '../users/entities/user.entity';

@Controller('promotions')
export class PromotionsController {
  constructor(private readonly promotionsService: PromotionsService) { }

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPromotionDto: CreatePromotionDto) {
    return await this.promotionsService.create(createPromotionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('apply')
  async applyPromoCode(@Body() body) {
    return await this.promotionsService.applyPromoCode(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query) {
    return await this.promotionsService.find(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('assigned')
  async assigned(@Query() query, @Body() body) {
    return await this.promotionsService.assigned(query, body);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.promotionsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return await this.promotionsService.update(+id, data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.promotionsService.remove(+id);
  }
}
