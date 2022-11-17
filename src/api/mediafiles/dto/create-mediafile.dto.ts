import { Entity } from "typeorm";

@Entity("media")
export class CreateMediafileDto {
  fieldname: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
}