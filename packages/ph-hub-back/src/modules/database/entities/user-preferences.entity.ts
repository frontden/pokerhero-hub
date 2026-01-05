import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('user_preferences')
export class UserPreferencesEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', unique: true })
  userId: number;

  @OneToOne(() => UserEntity, (user) => user.preferences, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column({ name: 'game_type', nullable: true })
  gameType: string;

  @Column({ name: 'spin_type', nullable: true })
  spinType: string;

  @Column({ type: 'text', array: true, nullable: true })
  limits: string[];

  @Column({ name: 'poker_rooms', type: 'text', array: true, nullable: true })
  pokerRooms: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
