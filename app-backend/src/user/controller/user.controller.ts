import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from '../roles.decorator';
import { Role } from '../dto';
import { RolesGuard } from '../roles.guard';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  public async getAll() {
    return await this.userService.getUsers();
  }

  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':userName')
  public async getUser(@Param('userName') userName: string) {
    try {
      return await this.userService.getUserByUsername(userName);
    } catch (e) {
      throw new HttpException(
        `User with user name: ${userName} not found`,
        HttpStatus.NOT_FOUND,
      );
    }
  }
}
