import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from '../models/teacher.entity';
import { Subject } from '../models/subject.entity';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>, // @InjectRepository(Subject)
  ) {}

  public async findAll(): Promise<Subject[]> {
    return await this.subjectRepository.find();
  }

  public async findOne(id: string): Promise<Subject> {
    const subjectInfo = await this.subjectRepository.findOne({
      where: { id: +id },
      relations: ['teachers'],
    });
    if (!subjectInfo) {
      throw new NotFoundException(`Subject ${id} not found`);
    }
    return subjectInfo;
  }

  public async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return await this.subjectRepository.save(createSubjectDto);
  }

  public async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Teacher | any> {
    const updateResult = await this.subjectRepository.update(
      id,
      updateSubjectDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Subject ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string): Promise<void> {
    await this.subjectRepository.delete(id);
  }
}
