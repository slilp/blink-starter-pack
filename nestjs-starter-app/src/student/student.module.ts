import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { Card } from 'src/models/card.entity';
import { Student } from 'src/models/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Card, Student])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
