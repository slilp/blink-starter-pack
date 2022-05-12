import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../models/teacher.entity';
// import { Subject } from '../database/subject.entity';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { SubjectService } from 'src/subject/subject.service';
import { SearchTeacherDto } from './dto/search-teacher.dto';
import { SearchResponseDto } from 'src/common/dto/search-response.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private teacherRepository: Repository<Teacher>,
    private readonly subjectService: SubjectService,
  ) {}

  public async findAll(
    searchQuery: SearchTeacherDto,
  ): Promise<SearchResponseDto<Teacher>> {
    const { limit, offset, search } = searchQuery;
    const [list, count] = await Promise.all([
      this.teacherRepository.find({
        where: [
          search
            ? {
                firstName: Like(`%${search}%`),
              }
            : {},
          search
            ? {
                lastName: Like(`%${search}%`),
              }
            : {},
        ],
        relations: ['subject'],
        skip: offset,
        take: limit,
      }),
      this.teacherRepository.count({
        where: [
          search
            ? {
                firstName: Like(`%${search}%`),
              }
            : {},
          search
            ? {
                lastName: Like(`%${search}%`),
              }
            : {},
        ],
      }),
    ]);
    return { data: list, totalRecord: count };
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

  public async updateSubject(id: string, subjectId: number): Promise<Teacher> {
    const teacherInfo = await this.teacherRepository.findOne({
      where: { id: +id },
      relations: ['subject'],
    });
    if (!teacherInfo) {
      throw new NotFoundException(`Teacher ${id} not found`);
    }
    const subjectInfo = await this.subjectService.findById(subjectId);
    if (!subjectInfo) {
      throw new NotFoundException(`Subject ${subjectId} is exist`);
    }

    teacherInfo.subject = subjectInfo;
    const updateResult = await this.teacherRepository.save(teacherInfo);
    return updateResult;
  }

  public async deleteSubject(id: string): Promise<Teacher> {
    const teacherInfo = await this.teacherRepository.findOne({
      where: { id: +id },
    });
    if (!teacherInfo) {
      throw new NotFoundException(`Teacher ${id} not found`);
    }
    teacherInfo.subject = null;
    const updateResult = await this.teacherRepository.save(teacherInfo);
    return updateResult;
  }

  public async remove(id: string): Promise<void> {
    await this.teacherRepository.delete(id);
  }

  public async countTeacher(): Promise<any> {
    return await this.teacherRepository
      .createQueryBuilder('teacher')
      .leftJoinAndSelect('teacher.subject', 'subject')
      .groupBy('teacher.subject.id')
      .select(
        'COUNT(teacher.subject.id) AS countTeacher , subject.name as subjectName',
      )
      .getRawMany();
  }
}
