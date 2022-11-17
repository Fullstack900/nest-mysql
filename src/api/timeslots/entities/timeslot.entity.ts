import { time } from 'console';
import { Users } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("timeslots")
export class Timeslot {
  @PrimaryGeneratedColumn()
  id: number;

  all_slots: [][];

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'doctor_id' })
  user: Users

  @Column()
  doctor_id: number;

  @Column()
  week_day: number;

  @Column({ type: "time" })
  start_time: string;

  @Column({ type: "time" })
  end_time: string;

  @Column()
  slot_duration: number;

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}
