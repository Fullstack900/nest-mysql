import { Controller, Request, Post, UseGuards, Get, Body, Version } from '@nestjs/common';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(LocalAuthGuard)
  @Post('patient/login')
  async patientLogin(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(LocalAuthGuard)
  @Post('doctor/login')
  async doctorLogin(@Request() req) {
    return this.authService.login(req);
  }

  @UseGuards(LocalAuthGuard)
  @Post('admin/login')
  async adminLogin(@Request() req) {
    return this.authService.login(req);
  }

  @Post('patient/register')
  async registerPatient(@Request() req, @Body() createUserDto: CreateUserDto) {
    return this.authService.register(req.body);
  }

  @Post('doctor/register')
  async registerDoctor(@Request() req, @Body() createUserDto: CreateUserDto) {
    return this.authService.register(req.body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('patient/profile')
  async getPatientProfileV1(@Request() req) {
    let { password, ...response } = req.user;
    response = await this.authService.findBy({ id: response.id });
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('patient/profile')
  @Version('2')
  async getPatientProfileV2(@Request() req) {
    let { password, ...response } = req.user;
    console.log('called getPatientProfileV2');

    return await this.authService.findByV2({ id: response.id });
  }

  @UseGuards(JwtAuthGuard)
  @Get('doctor/profile')
  async getDoctorProfile(@Request() req) {
    let { password, ...response } = req.user;
    response = await this.authService.findBy({ id: response.id });
    return response;
  }

}