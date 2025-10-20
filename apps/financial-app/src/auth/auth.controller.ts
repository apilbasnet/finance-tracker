import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from '@my-workspace/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: SignUpDto) {
    console.log('➡️ SIGNUP endpoint called with:', { dto });

    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SignInDto) {
    console.log('➡️ SIGNIN endpoint called with:', { dto });

    return this.authService.signin(dto);
  }
}
