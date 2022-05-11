import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Subject } from './subject.entity';

@Entity({ name: 'teacher' })
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

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
    length: 150,
    nullable: true,
  })
  profileImage: string;

  @ManyToOne(() => Subject, (subject) => subject.teachers, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'teacherId' })
  subject: Subject;
}
