import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('opponent_types')
export class OpponentTypeEntityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  color: string;

  @Column()
  icon: string;

  @Column({ name: 'is_default', default: false })
  isDefault: boolean;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.opponentTypes, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
