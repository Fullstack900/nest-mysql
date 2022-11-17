import { Controller, Request, Post, Get, Patch, Param, Body, Delete, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { TimeslotsService } from '../timeslots/timeslots.service';
import { UsersService as UserService } from "./users.service";

@Controller()
export class UsersController {

  constructor(
    private userService: UserService,
    private timeslotService: TimeslotsService
  ) { }

  @UseGuards(JwtAuthGuard)
  @Post('family-members/add')
  async addFamilyMember(@Request() req) {
    return await this.userService.addFamilyMember(req.body);
  }

  @Post('otp/send')
  async sentOTP(@Request() req) {
    return await this.userService.sendOTP(req.body);
  }

  @Patch('doctor/rating/:id')
  async doctorRating(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return await this.userService.doctorRating(+id, data);
  }

  @Post('otp/verify')
  async verifyOTP(@Request() req) {
    return await this.userService.verifyOTP(req.body);
  }

  @Post('user/verify')
  async verifyUser(@Request() req) {
    const res = await this.userService.findBy(req.body);

    if (res) {
      return {
        status: true,
        message: 'Given ' + Object.keys(req.body)[0] + ' exists.'
      }
    } else {
      return {
        status: false,
        message: 'Given ' + Object.keys(req.body)[0] + ' does not exist.'
      }
    }
  }

  @Post('password/reset')
  async resetPassword(@Request() req) {
    return await this.userService.resetPassword(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Post('users/promo-group')
  async promoGroups(@Request() req) {
    return await this.userService.promoGroups(req.body);
  }

  @Get('users')
  async find(@Request() req) {
    return await this.userService.find(req.query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('family-members')
  async getFamilyMembers(@Request() req, @Body() body) {
    return await this.userService.getFamilyMembers(req.query, body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('all-family-members')
  async getAllFamilyMembers(@Request() req, @Body() body) {
    return await this.userService.getAllFamilyMembers(req.query, body);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('users/:id')
  async updateUser(@Param('id') id: string, @Body() body) {
    const { user: { }, ...data } = body;
    return await this.userService.updateUser(+id, data);
  }

  @Get('users/doctors')
  async findMyDoctor(@Request() req) {
    return await this.userService.findMyDoctor(req.query);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('users/:id')
  async remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

}
