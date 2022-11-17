import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Medication } from '../../medications/entities/medication.entity';

@Entity('medication_refills')
export class CreateMedicationRefillDto {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  medication_id: number;

  @Column()
  status: string;

  @ManyToOne(() => Medication)
  @JoinColumn({ name: 'medication_id' })
  medication: Medication


}



