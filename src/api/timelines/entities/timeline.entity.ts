import { Exclude } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("timeline")
export class Timeline {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  appointment_id: number;

  @Column()
  sections: string;

  @Exclude()
  @DeleteDateColumn({ default: null, select: false, type: "datetime" })
  deleted_at?: Date;

  @Exclude()
  @CreateDateColumn({ default: null, select: false, type: "datetime" })
  created_at?: Date;

  @Exclude()
  @UpdateDateColumn({ default: null, select: false, type: "datetime" })
  updated_at?: Date;


}