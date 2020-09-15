import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import User from './User';

// eslint-disable-next-line no-shadow
export enum ShiftOptions {
  MORNING = 'morning',
  AFTERNOON = 'afternoon',
  NIGHT = 'night',
}

@Entity('events')
class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  partier_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'partier_id' })
  partier: User;

  @Column()
  owner_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'owner_id' })
  owner: User;

  @Column()
  name: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column({
    type: 'enum',
    enum: ShiftOptions,
  })
  shift: ShiftOptions;

  @Column()
  address: string;

  @Column('boolean')
  blocker: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Event;
