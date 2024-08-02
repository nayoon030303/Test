import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignupUserDto,
  SignupUserResponseDto,
  LoginUserDto,
  LoginUserResponseDto,
  AccessUserDto,
} from './dto';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}

  @ApiOperation({
    summary: '회원가입 API',
  })
  @ApiCreatedResponse({
    type: SignupUserResponseDto,
  })
  @Post('/signup')
  async signup(@Body() user: SignupUserDto): Promise<SignupUserResponseDto> {
    try {
      return this.userService.signup(user);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({
    summary: '로그인 API',
  })
  @ApiCreatedResponse({
    description: '사용자 로그인',
    type: LoginUserResponseDto,
  })
  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<LoginUserResponseDto> {
    try {
      return this.userService.login(user);
    } catch (error) {
      throw error;
    }
  }

  @ApiOperation({
    summary: '회원가입 성공 인증 API',
  })
  @Get('/access')
  async access(@Query() user: AccessUserDto): Promise<string> {
    try {
      return await this.userService.access(user);
    } catch (error) {
      throw error;
    }
  }
}
