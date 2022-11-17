import { DoctorClinic } from '../../doctor-clinics/entities/doctor-clinic.entity';
import { Role } from '../../roles/entities/role.entity';
import { Speciality } from '../../specialities/entities/speciality.entity';
import { Timeslot } from '../../timeslots/entities/timeslot.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable
} from 'typeorm';
import { Mediafile } from '../../mediafiles/entities/mediafile.entity';
import { Nationality } from '../../nationalities/entities/nationality.entity';
import { PromoGroup } from '../../promo-groups/entities/promo-group.entity';
import { Clinic } from '../../clinics/entities/clinic.entity';
import { Department } from '../../departments/entities/department.entity';


@Entity("users")
@Unique(["email_address", "phone_number"])
export class Users {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ select: false })
  password?: string;

  @Column()
  email_address: string;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Role

  @Column()
  role_id: number;

  @Column()
  speciality_id: number;

  @ManyToOne(() => Speciality)
  @JoinColumn({ name: 'speciality_id' })
  speciality: Speciality

  @OneToMany(() => Timeslot, (timeslot) => timeslot.user)
  timeslots: Timeslot[]

  @OneToMany(() => DoctorClinic, (doctor_clinics) => doctor_clinics.doctor)
  doctor_clinics: DoctorClinic[]

  @ManyToMany(() => Clinic, (clinic) => clinic.doctors, {
    cascade: ["insert", "update"],
  })
  @JoinTable({
    name: "doctor_clinics",
    joinColumn: {
      name: "doctor_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "clinic_id",
      referencedColumnName: "id"
    }
  })
  clinics: Clinic[]

  @Column()
  saudi_id?: string;

  @Column()
  iqama?: string;

  @Column()
  mrn_number?: string;

  @Column()
  first_name?: string;

  @Column()
  middle_name?: string;

  @Column()
  family_name?: string;

  @Column()
  first_name_ar?: string;

  @Column()
  middle_name_ar?: string;

  @Column()
  family_name_ar?: string;

  @Column()
  phone_number?: string;

  @Column()
  gender: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column()
  location: string;

  @Column()
  card_id: number;

  @Column()
  photo_id: number;

  @Column()
  guardian_id: number;

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'card_id' })
  card: Mediafile

  @OneToOne(() => Users)
  @JoinColumn({ name: 'guardian_id' })
  guardian: Users

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'photo_id' })
  photo: Mediafile

  @OneToOne(() => Nationality)
  @JoinColumn({ name: 'nationality_id' })
  nationality: Mediafile

  @Column()
  status: string;

  @Column()
  nationality_id: number;

  @Column()
  promo_group_id: number;

  @OneToOne(() => PromoGroup)
  @JoinColumn({ name: 'promo_group_id' })
  promo_group: PromoGroup

  @Column()
  otp_code: number;

  @Column()
  rating: number;

  @Column()
  loyality_points: number;

  @Column()
  promo_code: string;

  @Column()
  udid: string;

  @Column()
  fcm_token: string;

  @Column()
  degree: string;

  @Column()
  expertise: string;

  @Column()
  languages: string;

  @Column()
  consulting_age_group: string;

  @Column()
  is_privacy_agreed: boolean

  @Column()
  department_id: number

  @OneToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: PromoGroup

  @Column()
  is_inpatient: boolean

  @Column()
  bed_number: number

  @Column()
  physician_id: number

  @Column()
  is_critical_care: boolean

  @DeleteDateColumn({ default: null, type: "datetime" })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime" })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime" })
  updated_at?: Date;

}