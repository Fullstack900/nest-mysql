import { Mediafile } from "../../mediafiles/entities/mediafile.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('health_education')
export class HealthEducation {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'thumbnail_id' })
  thumbnail: Mediafile

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'banner_id' })
  banner: Mediafile

  @Column()
  thumbnail_id: number;

  @Column()
  banner_id: number;

  @Column()
  short_title: string;

  @Column()
  short_text: string;

  @Column()
  long_title: string;

  @Column()
  long_text: string;

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: true })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}

