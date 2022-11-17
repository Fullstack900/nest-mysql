import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('reminder_slots')
export class ReminderSlot {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  day_part: string;

  @Column()
  reminder_time: string;

  @DeleteDateColumn({ default: null, type: "datetime", select: false })
  deleted_at?: Date;

  @CreateDateColumn({ default: null, type: "datetime", select: false })
  created_at?: Date;

  @UpdateDateColumn({ default: null, type: "datetime", select: false })
  updated_at?: Date;

}


