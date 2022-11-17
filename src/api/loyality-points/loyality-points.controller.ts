import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoyalityPointsService } from './loyality-points.service';
import { CreateLoyalityPointDto } from './dto/create-loyality-point.dto';
import { UpdateLoyalityPointDto } from './dto/update-loyality-point.dto';

@Controller('loyality-points')
export class LoyalityPointsController {
  constructor(private readonly loyalityPointsService: LoyalityPointsService) {}

  @Post()
  create(@Body() createLoyalityPointDto: CreateLoyalityPointDto) {
    return this.loyalityPointsService.create(createLoyalityPointDto);
  }

  @Get()
  findAll() {
    return this.loyalityPointsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.loyalityPointsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLoyalityPointDto: UpdateLoyalityPointDto) {
    return this.loyalityPointsService.update(+id, updateLoyalityPointDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.loyalityPointsService.remove(+id);
  }
}
