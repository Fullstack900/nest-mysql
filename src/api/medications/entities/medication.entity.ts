import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Appointment } from '../../appointments/entities/appointment.entity';
import { MedicationRefill } from '../../medication-refills/entities/medication-refill.entity';

@Entity('medications')
export class Medication {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;
  @Column()
  variation: string;
  @Column()
  description: string;
  @Column()
  appointment_id: number;
  @Column()
  start_date: Date;
  @Column()
  end_date: Date;
  @Column()
  instructions: string;
  @Column()
  morning_reminder: string;
  @Column()
  afternoon_reminder: string;
  @Column()
  evening_reminder: string;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment

  @OneToMany(() => MedicationRefill, (medicationRefill) => medicationRefill.medication)
  medication_refills: MedicationRefill[]

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: true })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}


