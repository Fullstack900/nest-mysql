import { Appointment } from '../../appointments/entities/appointment.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';
import { Mediafile } from '../../mediafiles/entities/mediafile.entity';


@Entity("reports")
export class Report {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  appointment_id: number;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment

  @Column({ type: 'timestamp' })
  dated: Date;

  @Column()
  type: string;

  @Column()
  title: string;

  @Column()
  result: string;

  @Column()
  report_id: number;

  @ManyToOne(() => Mediafile)
  @JoinColumn({ name: 'report_id' })
  report_file: Mediafile


  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}