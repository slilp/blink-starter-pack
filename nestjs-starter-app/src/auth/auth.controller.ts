import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/student/signin')
  loginStudent(@Request() req) {
    return req.user;
  }
}
