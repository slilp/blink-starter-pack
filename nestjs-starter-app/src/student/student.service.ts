import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../models/student.entity';
import { RegisterStudentDto } from './dto/register-student.dto';
import { SubjectService } from 'src/subject/subject.service';
import { UpdateCardDto } from './dto/update-card.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private subjectService: SubjectService,
  ) {}

  public async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  public async findOne(id: string): Promise<Omit<Student, 'password'>> {
    const studentInfo = await this.studentRepository.findOne({
      where: { id: +id },
      relations: ['card', 'subjects'],
    });
    if (!studentInfo) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    delete studentInfo.password;
    return studentInfo;
  }

  public async create(
    createStudentDto: RegisterStudentDto,
  ): Promise<Omit<Student, 'password'>> {
    const studentInfo = await this.studentRepository.findOne({
      where: { username: createStudentDto.username },
    });
    if (studentInfo) {
      throw new BadRequestException(
        `Student ${createStudentDto.username} is exist`,
      );
    }
    const hash = await bcrypt.hash(createStudentDto.password, 10);
    createStudentDto.password = hash;

    const result = await this.studentRepository.save({
      ...createStudentDto,
      card: {
        firstName: createStudentDto.firstName,
        lastName: createStudentDto.lastName,
      },
    });

    delete result.password;
    return result;
  }

  public async update(
    id: string,
    updateStudentDto: UpdateCardDto,
  ): Promise<Student | any> {
    const studentInfo = await this.studentRepository.findOne({
      where: { id: +id },
      relations: ['card'],
    });
    if (!studentInfo) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    studentInfo.card = Object.assign(studentInfo.card, updateStudentDto);
    const updateResult = await this.studentRepository.save(studentInfo);
    return updateResult;
  }

  public async remove(id: string) {
    return await this.studentRepository.delete(id);
  }

  public async updateSubject(
    id,
    updateSubjectDto: UpdateSubjectDto,
    type: string,
  ) {
    if (type === 'delete') {
      const studentInfo = await this.studentRepository.findOne({
        where: { id: +id },
        relations: ['subjects'],
      });
      if (!studentInfo) {
        throw new NotFoundException(`Student ${id} not found`);
      }
      studentInfo.subjects = studentInfo.subjects.filter(
        (item) => item.id !== updateSubjectDto.subject,
      );
      const updateResult = await this.studentRepository.save(studentInfo);
      delete updateResult.password;
      return updateResult;
    } else {
      const subject = await this.subjectService.findById(
        updateSubjectDto.subject,
      );
      const studentInfo = await this.studentRepository.findOne({
        where: { id: +id },
        relations: ['subjects'],
      });
      if (!studentInfo) {
        throw new NotFoundException(`Student ${id} not found`);
      }
      studentInfo.subjects = [...studentInfo.subjects, subject];
      const updateResult = await this.studentRepository.save(studentInfo);
      delete updateResult.password;
      return updateResult;
    }
  }
}
