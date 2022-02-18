import {Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';

@Entity()
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({length: 6})
  code: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
