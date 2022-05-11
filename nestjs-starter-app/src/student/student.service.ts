import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../models/student.entity';
import { Card } from '../models/card.entity';
import { RegisterStudentDto } from './dto/register-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { SubjectService } from 'src/subject/subject.service';
import { UpdateCardDto } from './dto/update-card.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private cardRepository: Repository<Card>,
    private subjectService: SubjectService,
  ) {}

  public async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  public async findOne(id: string): Promise<Student> {
    const studentInfo = await this.studentRepository.findOne({
      where: { id: +id },
      relations: ['card', 'subjects'],
    });
    if (!studentInfo) {
      throw new NotFoundException(`Student ${id} not found`);
    }
    return studentInfo;
  }

  public async create(createStudentDto: RegisterStudentDto): Promise<Student> {
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

    return await this.studentRepository.save({
      ...createStudentDto,
      card: {
        firstName: createStudentDto.firstName,
        lastName: createStudentDto.lastName,
      },
    });
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

  public async updateSubject(id, updateStudentDto: UpdateStudentDto) {
    // const subjects = await this.subjectService.findBySubjects(
    //   updateStudentDto.subjects,
    // );

    // if (subjects.length !== updateStudentDto.subjects.length) {
    //   throw new NotFoundException(`Subjects not found`);
    // }
    // const studentInfo = await this.studentRepository.findOne({
    //   where: { id: +id },
    // });
    // if (!studentInfo) {
    //   throw new NotFoundException(`Student ${id} not found`);
    // }
    // studentInfo.subjects = subjects;
    // const updateResult = await this.studentRepository.save(studentInfo);
    // delete updateResult.password;
    // return updateResult;
    return 'true';
  }
}
