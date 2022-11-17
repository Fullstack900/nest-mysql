import { IsEmail, IsPhoneNumber, IsOptional, IsNumber } from 'class-validator';

export class CreateUserDto {

  @IsNumber()
  @IsOptional()
  saudi_id?: number;

  @IsNumber()
  @IsOptional()
  iqama?: number;

  @IsNumber()
  @IsOptional()
  mrn_number?: number;

  nationality_id: number;
  photo_id: number;

  @IsEmail({ "message": "Enter a valid email adress" })
  email_address?: string;
  password: string;

  // @Matches(/^\+[1-9]\d{1,14}$/)
  @IsPhoneNumber('SA', { message: 'Incorrect Phone Number Format.' })
  phone_number?: string;

}