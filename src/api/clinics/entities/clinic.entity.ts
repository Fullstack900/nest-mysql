import { Profile } from "passport";
import { Mediafile } from "../../mediafiles/entities/mediafile.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Users } from '../../users/entities/user.entity';
import { DoctorClinic } from "../../doctor-clinics/entities/doctor-clinic.entity";

@Entity("clinics")
export class Clinic {

  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  address: string;

  @Column()
  timing: string;

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'image_id' })
  image: Mediafile

  @OneToOne(() => Mediafile)
  @JoinColumn({ name: 'map_image_id' })
  map_image: Mediafile

  @OneToMany(() => DoctorClinic, (doctor_clinics) => doctor_clinics.clinic)
  clinic_doctors: DoctorClinic[]

  @ManyToMany(() => Users, (user) => user.clinics)
  @JoinTable()
  doctors: Users[]

  @ManyToMany(() => Clinic, (clinic) => clinic.doctors, {
    cascade: true,
  })
  @JoinTable({
    name: "doctor_clinics",
    joinColumn: {
      name: "clinic_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "doctor_id",
      referencedColumnName: "id"
    }
  })
  clinics: Clinic[]

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}
