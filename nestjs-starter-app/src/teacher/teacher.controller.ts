import {
  Controller,
  Put,
  Get,
  Param,
  Post,
  Body,
  Delete,
  UseGuards,
  Query,
  Patch,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { UpdateTeacherSubjectDto } from './dto/update-teacher-subject.dto';
import { ApiTags } from '@nestjs/swagger';
import { ApiKeyGuard } from 'src/auth/guards/api-key.guard';
import { SearchTeacherDto } from './dto/search-teacher.dto';

@ApiTags('teacher')
@UseGuards(ApiKeyGuard)
@Controller('api/teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  findAll(@Query() searchQuery: SearchTeacherDto) {
    return this.teacherService.findAll(searchQuery);
  }

  @Get('count-teacher')
  countTeacher() {
    return this.teacherService.countTeacher();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teacherService.findOne(id);
  }

  @Patch('update-subject/:id')
  updateSubject(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherSubjectDto,
  ) {
    return this.teacherService.updateSubject(id, updateTeacherDto.subject);
  }

  @Patch('delete-subject/:id')
  deleteSubject(@Param('id') id: string) {
    return this.teacherService.deleteSubject(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTeacherDto: UpdateTeacherDto) {
    return this.teacherService.update(id, updateTeacherDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teacherService.remove(id);
  }
}
