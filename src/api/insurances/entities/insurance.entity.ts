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
import { Users } from '../../users/entities/user.entity';


@Entity("insurances")
export class Insurance {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  patient_id: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'patient_id' })
  patient: Users

  @Column()
  company_name: string;

  @Column()
  insurance_card_id: number;

  @ManyToOne(() => Mediafile)
  @JoinColumn({ name: 'insurance_card_id' })
  insurance_card: Mediafile

  @Column()
  medical_support: string;

  @Column()
  policy_number: string;

  @Column()
  plan_details: string;

  @Column()
  expiry: Date;

  @Column()
  status: string;

  @DeleteDateColumn({ default: null, type: "datetime" })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime" })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime" })
  updated_at?: Date;

}