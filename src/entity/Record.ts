import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Tag} from './Tag';
import {User} from './User';

@Entity()
export class Record {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 10})
  amount: string;

  /** 类型（收入 1/支持 0） */
  @Column()
  type: number;

  @Column({length: 100})
  remark: string;

  @ManyToOne(() => Tag, tag => tag.records)
  tag: Tag;

  @ManyToOne(() => User, user => user.records)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
