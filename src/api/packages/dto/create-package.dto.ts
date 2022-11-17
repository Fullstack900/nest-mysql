
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { Mediafile } from "../../mediafiles/entities/mediafile.entity";

@Entity('packages')
export class CreatePackageDto {

}


