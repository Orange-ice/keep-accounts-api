import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne, OneToMany
} from 'typeorm';
import {User} from './User';
import {Record} from './Record';

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

  @OneToMany(() => Record, record => record.tag)
  records: Record[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
