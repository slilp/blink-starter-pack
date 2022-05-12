import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/student/signin')
  loginStudent(@Request() req) {
    return req.user;
  }
}
