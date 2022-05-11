import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../models/teacher.entity';
// import { Subject } from '../database/subject.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { SubjectService } from 'src/subject/subject.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>, // @InjectRepository(Subject)
    private readonly subjectService: SubjectService, // private subjectRepository: Repository<Subject>,
  ) {}

  public async findAll(): Promise<Teacher[]> {
    return await this.teacherRepository.find();
  }

  public async findOne(id: string): Promise<Teacher> {
    const teacherInfo = await this.teacherRepository.findOne({
      where: { id: +id },
      relations: ['subject'],
    });
    if (!teacherInfo) {
      throw new NotFoundException(`Teacher ${id} not found`);
    }
    return teacherInfo;
  }

  public async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    // const subjectInfo = await this.subjectService.findOne(
    //   createTeacherDto.subjectId + '',
    // );
    // if (!subjectInfo) {
    //   throw new NotFoundException(
    //     `Subject ${createTeacherDto.subjectId} is exist`,
    //   );
    // }

    return await this.teacherRepository.save(createTeacherDto);
  }

  public async update(
    id: string,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher | any> {
    const updateResult = await this.teacherRepository.update(
      id,
      updateTeacherDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Teacher ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async updateSubject(
    id: string,
    subjectId: string,
  ): Promise<Teacher | any> {
    const teacherInfo = await this.teacherRepository.findOne({
      where: { id: +id },
      relations: ['subject'],
    });
    if (!teacherInfo) {
      throw new NotFoundException(`Teacher ${id} not found`);
    }
    const subjectInfo = await this.subjectService.findOne(subjectId);
    if (!subjectInfo) {
      throw new NotFoundException(`Subject ${subjectId} is exist`);
    }

    teacherInfo.subject = subjectInfo;
    const updateResult = await this.teacherRepository.save(teacherInfo);
    return updateResult;
  }

  public async remove(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }
}
