import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Tag} from './Tag';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 10})
  username: string;

  @Column({type: 'varchar', length: 32})
  email: string;

  @Column({select: false})
  password: string;

  @Column()
  avatarUrl: string;

  @CreateDateColumn()
  createdAt: string;

  @OneToMany(() => Tag, tag => tag.user)
  tags: Tag[];
}
