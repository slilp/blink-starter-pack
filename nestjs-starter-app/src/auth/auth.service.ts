import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from '../models/student.entity';
import { LoginStudentDto } from './dto/login-student.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Student)
    private studentRepository: Repository<Student>,
    private jwtService: JwtService,
  ) {}

  public async studentSignIn(
    loginStudentDto: LoginStudentDto,
  ): Promise<LoginStudentResponseDto> {
    const studentInfo = await this.studentRepository.findOne({
      where: { username: loginStudentDto.username },
    });
    if (!studentInfo) {
      throw new NotFoundException(
        `Student ${loginStudentDto.username} not found or invalid password`,
      );
    }
    const isMatch = await bcrypt.compare(
      loginStudentDto.password,
      studentInfo.password,
    );
    if (!isMatch)
      throw new NotFoundException(
        `Student ${loginStudentDto.username} not found or invalid password`,
      );
    studentInfo.password = null;
    const payload = { data: JSON.stringify(studentInfo) };
    return {
      student: studentInfo,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
