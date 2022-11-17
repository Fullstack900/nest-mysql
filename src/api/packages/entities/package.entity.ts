import { Entity, PrimaryGeneratedColumn, Column, DeleteDateColumn, CreateDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from "typeorm";
import { Mediafile } from "../../mediafiles/entities/mediafile.entity";

@Entity('packages')
export class Package {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @Column()
  service_details: string;

  @Column()
  thumbnail_id: number;

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: Mediafile

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: true })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}


