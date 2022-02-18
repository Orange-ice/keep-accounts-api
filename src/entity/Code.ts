import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Code {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({length: 6})
  code: string;
}
