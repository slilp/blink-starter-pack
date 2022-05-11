import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Subject } from './subject.entity';
import { Card } from './card.entity';

@Entity('student')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 150,
  })
  username: string;

  @Column({
    length: 200,
  })
  password: string;

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

  @OneToOne(() => Card, (card) => card.student, {
    cascade: true,
  })
  card: Card;

  @ManyToMany(() => Subject, (subject) => subject.students, {
    cascade: true,
  })
  @JoinTable({
    name: 'student_subject',
    joinColumn: {
      name: 'student_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'subject_id',
      referencedColumnName: 'id',
    },
  })
  subjects: Subject[];
}
