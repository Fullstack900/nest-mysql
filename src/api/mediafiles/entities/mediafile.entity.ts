import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn
} from 'typeorm';


@Entity("media")
export class Mediafile {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ select: false })
  fieldname: string;

  @Column()
  mimetype: string;

  @Column({ select: false })
  destination: string;

  @Column()
  filename: string;

  @Column()
  path: string;

  @Column()
  size: number;

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}