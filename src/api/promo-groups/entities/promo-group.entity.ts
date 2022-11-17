import { Exclude } from 'class-transformer';
import { Users } from '../../users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';


@Entity("promo_groups")
export class PromoGroup {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Users, (users) => users.promo_group)
  users: Users[]

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