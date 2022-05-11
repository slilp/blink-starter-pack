import {
  Controller,
  Put,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Query,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { SearchSubjectDto } from './dto/search-subject.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('subject')
@Controller('api/subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Get()
  findAll(@Query() searchQuery: SearchSubjectDto) {
    return this.subjectService.findAll(searchQuery);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.subjectService.findOne(id + '');
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.subjectService.update(id, updateSubjectDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjectService.remove(id);
  }
}
