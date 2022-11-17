import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Appointment } from '../../appointments/entities/appointment.entity';

@Entity("payments")
export class Payment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  gateway_id: string

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment

  @Column()
  amount: number

  @Column()
  appointment_id: number

  @Column()
  currency: string

  @Column()
  method: string

  @Column()
  status: string

  @Column()
  response: string

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;
}
