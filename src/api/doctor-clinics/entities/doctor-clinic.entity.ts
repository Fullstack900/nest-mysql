import { Clinic } from '../../clinics/entities/clinic.entity';
import { Users } from '../../users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

@Entity("doctor_clinics")
export class DoctorClinic {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  doctor_id: number;

  @Column()
  clinic_id: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Users

  @ManyToOne(() => Clinic)
  @JoinColumn({ name: 'clinic_id' })
  clinic: Clinic

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}
