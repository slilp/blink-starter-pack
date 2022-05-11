import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { Teacher } from './teacher.entity';
import { Student } from './student.entity';

@Entity({ name: 'subject' })
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 50,
  })
  name: string;

  @Column({
    default: 0,
  })
  credit: number;

  @OneToMany(() => Teacher, (teacher) => teacher.subject, { cascade: true })
  teachers: Teacher[];

  @ManyToMany(() => Student, (student) => student.subjects)
  students: Student[];
}
