import {
  Entity,
  Column,
  PrimaryGeneratedColumn
} from 'typeorm';


@Entity("nationalities")
export class Nationality {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column({ select: false })
  code: number;

  @Column({ select: false })
  alpha2code: string;

  @Column({ select: false })
  alpha3code: string;

  @Column({ select: false })
  shortName: string;

  @Column()
  nationality: string;

}