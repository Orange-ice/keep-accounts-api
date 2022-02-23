import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne
} from 'typeorm';
import {User} from './User';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  /** 是否是公有标签 */
  @Column()
  communal: number;

  /** 标签名 */
  @Column()
  label: string;

  @Column()
  icon: string;

  /** 类型（收入 1/支持 0） */
  @Column()
  type: number;

  @ManyToOne(() => User, user => user.tags)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
