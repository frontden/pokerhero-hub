import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { HotkeyActionType } from '@ph-hub/common/lib/models/user/action-settings';

@Entity('hotkey_settings')
export class HotkeySettingsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  type: HotkeyActionType;

  @Column()
  color: string;

  @Column()
  key: string;

  @Column()
  keyCode: string;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.hotkeySettings, {
    nullable: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
