import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import Availability from './Availability';

// eslint-disable-next-line no-shadow
export enum CategoryOptions {
  CLOWN = 'clown',
  MAGICIAN = 'magician',
  JUGGLER = 'juggler',
}

@Entity('partiers')
class Partier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  availability_id: string;

  @OneToOne(() => Availability)
  @JoinColumn({ name: 'availability_id' })
  availability: Availability;

  @Column({
    type: 'enum',
    enum: CategoryOptions,
  })
  category: CategoryOptions;

  @Column('decimal', { scale: 2 })
  price: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Partier;
