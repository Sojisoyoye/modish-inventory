import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/service/user.service';
import * as bcrypt from 'bcryptjs';
import { PostgresErrorCode } from 'src/config/postgresErrorCodes';
import { TokenPayload } from '../token.interface';
import { UserDto, changePasswordDto, resetPasswordDto } from 'src/user/dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async registerUser(userDto: UserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    try {
      const createdUser = await this.userService.create({
        ...userDto,
        password: hashedPassword,
      });
      createdUser.password = undefined;
      return createdUser;
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new HttpException(
          'User with that email already exists',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public async loginUser(userName: string, password: string) {
    try {
      const user = await this.userService.getByUsername(userName);
      await this.verifyPassword(password, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    const isPasswordMatching = await bcrypt.compare(password, hashedPassword);
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(userId: number) {
    const payload: TokenPayload = { userId };
    const token = this.jwtService.sign(payload);
    return token;
    // return `Authentication=${token}; HttpOnly; Path=/; Max-Age=${this.configService.get(
    //   'JWT_EXPIRATION_TIME',
    // )}`;
  }

  public getCookieForLogOut() {
    return `Authentication=; HttpOnly; Path=/; Max-Age=0`;
  }

  async changePassword(changePasswordData: changePasswordDto) {
    if (
      !changePasswordData.password ||
      changePasswordData.password.length < 6
    ) {
      throw new HttpException(
        'Password must be more than 6 characters',
        HttpStatus.BAD_REQUEST,
      );
    } else if (
      changePasswordData.password !== changePasswordData.confirmPassword
    ) {
      throw new HttpException(
        'Password does not match',
        HttpStatus.BAD_REQUEST,
      );
    } else {
      const hashedPassword = await bcrypt.hash(changePasswordData.password, 10);

      try {
        const value = await this.userService.updateUser(
          changePasswordData.userName,
          hashedPassword,
        );

        if (value === 0) {
          throw new HttpException(
            'Password change not successful',
            HttpStatus.BAD_REQUEST,
          );
        } else {
          return changePasswordData.userName;
        }
      } catch (error) {
        throw new HttpException(
          'Something went wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }

  async resetPassword(changePasswordData: resetPasswordDto) {
    const hashedPassword = await bcrypt.hash(changePasswordData.password, 10);

    try {
      const value = await this.userService.updateUser(
        changePasswordData.userName,
        hashedPassword,
      );

      if (value === 0) {
        throw new HttpException(
          'Password reset not successful',
          HttpStatus.BAD_REQUEST,
        );
      } else {
        return changePasswordData.userName;
      }
    } catch (error) {
      throw new HttpException(
        'Something went wrong',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
