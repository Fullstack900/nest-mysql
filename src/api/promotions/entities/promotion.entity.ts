import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne
} from 'typeorm';
import { Mediafile } from '../../mediafiles/entities/mediafile.entity';
import { PromoGroup } from '../../promo-groups/entities/promo-group.entity';


@Entity("promotions")
export class Promotion {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  promo_group_id: number;

  @OneToOne(() => PromoGroup)
  @JoinColumn({ name: 'promo_group_id' })
  promo_group: PromoGroup

  @Column()
  discount_percent: number;

  @Column()
  promo_code: string;

  @Column()
  overall_limit: number;

  @Column()
  overall_usage: number;

  @Column()
  details: string;

  @Column()
  image_id: number;

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'image_id' })
  image: Mediafile

  @Column()
  survey_link: string;

  @Exclude()
  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @Exclude()
  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @Exclude()
  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;


}