import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Subject } from 'src/models/subject.entity';
import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SearchSubjectDto } from './dto/search-subject.dto';
import { SearchResponseDto } from 'src/common/dto/search-response.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectRepository(Subject)
    private subjectRepository: Repository<Subject>,
  ) {}

  public async findAll(
    searchQuery: SearchSubjectDto,
  ): Promise<SearchResponseDto<Subject>> {
    const { limit, offset, search } = searchQuery;
    const [list, count] = await Promise.all([
      this.subjectRepository.find({
        where: search
          ? {
              name: Like(`%${search} #%`),
            }
          : {},

        skip: offset,
        take: limit,
      }),
      this.subjectRepository.count({
        where: search
          ? {
              name: Like(`%${search} #%`),
            }
          : {},
      }),
    ]);
    return { data: list, totalRecord: count };
  }

  public async findOne(id: string): Promise<Subject> {
    const subjectInfo = await this.subjectRepository.findOne({
      where: { id: +id },
    });
    if (!subjectInfo) {
      throw new NotFoundException(`Subject ${id} not found`);
    }
    return subjectInfo;
  }

  public async findById(id: number): Promise<Subject> {
    const subjectInfo = await this.subjectRepository.findOne({
      where: { id },
    });
    if (!subjectInfo) {
      throw new NotFoundException(`Subject ${id} not found`);
    }
    return subjectInfo;
  }

  public async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    try {
      return await this.subjectRepository.save(createSubjectDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }

  public async update(
    id: string,
    updateSubjectDto: UpdateSubjectDto,
  ): Promise<Subject | any> {
    const updateResult = await this.subjectRepository.update(
      id,
      updateSubjectDto,
    );
    if (updateResult.affected === 0) {
      throw new NotFoundException(`Subject ${id} not found`);
    }
    return updateResult.raw[0];
  }

  public async remove(id: string) {
    return await this.subjectRepository.delete(id);
  }
}
