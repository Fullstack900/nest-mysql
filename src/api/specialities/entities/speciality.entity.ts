import { Mediafile } from "../../mediafiles/entities/mediafile.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('specialities')
export class Speciality {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'icon_id' })
  icon: Mediafile

  @Column()
  title: string;

  @Column()
  title_ar: string;

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}
