import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Student } from './student.entity';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
  OTHER = 'other',
}

@Entity('card')
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 20,
    nullable: true,
  })
  cardNo: string;

  @Column({
    length: 150,
    nullable: true,
  })
  firstName: string;

  @Column({
    length: 150,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender: string;

  @Column({
    length: 500,
    nullable: true,
  })
  profileImage: string;

  @Column({
    nullable: true,
  })
  level: number;

  @OneToOne(() => Student, (student) => student.card, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'studentId' })
  student: Student;
}
