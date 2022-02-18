import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({length: 10})
  username: string;

  @Column({type: 'varchar', length: 32})
  email: string;

  @Column()
  password: string;

  @Column()
  avatarUrl: string;
}
