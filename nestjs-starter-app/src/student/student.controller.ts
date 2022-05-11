import {
  Controller,
  Put,
  Get,
  Post,
  Body,
  Delete,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { RegisterStudentDto } from './dto/register-student.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('student')
@Controller('/api/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post('register')
  create(@Body() registerStudentDto: RegisterStudentDto) {
    return this.studentService.create(registerStudentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('add-subject')
  addSubject(@Request() req, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.studentService.updateSubject(
      req.user.id,
      updateSubjectDto,
      'add',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Patch('delete-subject')
  deleteSubject(@Request() req, @Body() updateSubjectDto: UpdateSubjectDto) {
    return this.studentService.updateSubject(
      req.user.id,
      updateSubjectDto,
      'delete',
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findOne(@Request() req) {
    return this.studentService.findOne(req.user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('update-card')
  update(@Request() req, @Body() updateCardDto: UpdateCardDto) {
    return this.studentService.update(req.user.id, updateCardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  remove(@Request() req) {
    return this.studentService.remove(req.user.id);
  }
}
