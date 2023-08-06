import {
  Body,
  Controller,
  Get,
  HttpCode,
  Patch,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { LocalAuthGuard } from '../localAuth.guard';
import ReqWithUser from '../reqWithUser.interface';
import { Response } from 'express';
import { JwtAuthGuard } from '../jwt-auth.guard';
import {
  Role,
  UserDto,
  changePasswordDto,
  resetPasswordDto,
} from 'src/user/dto';
import { Roles } from 'src/user/roles.decorator';
import { RolesGuard } from 'src/user/roles.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authenticationService: AuthService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post('register')
  async register(@Body() registrationData: UserDto) {
    return this.authenticationService.registerUser(registrationData);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('reset-password')
  async resetPassword(
    @Body() resetPasswordData: resetPasswordDto,
    @Res() response: Response,
  ) {
    const userName = await this.authenticationService.resetPassword(
      resetPasswordData,
    );
    return response.status(200).json({
      statusCode: 200,
      message: 'Password reset successful',
      data: userName,
    });
  }

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: ReqWithUser, @Res() response: Response) {
    const { user } = request;
    const token = this.authenticationService.getCookieWithJwtToken(user.id);
    // response.setHeader('Set-Cookie', cookie);
    // response.setHeader('Authorization', `Bearer ${token}`);
    user.password = undefined;
    return response.status(200).json({
      statusCode: 200,
      message: 'Login successful',
      data: user,
      token,
    });
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('logout')
  // async logOut(@Req() request: ReqWithUser, @Res() response: Response) {
  //   response.setHeader('Authorization', '');
  //   return response.sendStatus(200);
  // }

  @UseGuards(JwtAuthGuard)
  @Get()
  authenticate(@Req() request: ReqWithUser) {
    const user = request.user;
    user.password = undefined;
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Put('change-password')
  async changePassword(
    @Body() data: changePasswordDto,
    @Res() response: Response,
  ) {
    const userName = await this.authenticationService.changePassword(data);
    return response.status(200).json({
      statusCode: 200,
      message: 'Password change successful',
      data: userName,
    });
  }
}
