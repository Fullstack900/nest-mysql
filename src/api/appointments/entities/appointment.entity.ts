import { Clinic } from '../../clinics/entities/clinic.entity';
import { Users } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Report } from '../../reports/entities/report.entity';
import { Medication } from '../../medications/entities/medication.entity';


@Entity("appointments")
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'patient_id' })
  patient: Users

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Users

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: 'clinic_id' })
  clinic: Users

  @OneToMany(() => Report, (report) => report.appointment)
  reports: Report[]

  @OneToMany(() => Medication, (medication) => medication.appointment)
  medication: Medication[]

  @Column()
  patient_id: number

  @Column()
  doctor_id: number

  @Column()
  clinic_id: number

  @Column()
  type: string

  @Column({ name: "booked_date" })
  booked_date: Date

  @Column({ name: "start_time" })
  start_time: string

  @Column({ name: "end_time" })
  end_time: string

  @Column()
  amount: number

  @Column()
  status: string

  @Column()
  use_loyality: boolean

  @Column()
  loyality_discount: number

  @Column()
  promo_code: string

  @Column()
  promo_discount: number

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at: Date;
}
