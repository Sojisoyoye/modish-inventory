import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserDto } from '../dto';
import { User } from 'src/entities';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDto: UserDto) {
    const newUser = await this.userRepository.save(userDto);
    return newUser;
  }

  async getByUsername(userName: string) {
    const user = await this.userRepository.findOne({
      where: {
        userName,
      },
    });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this user name does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this id does not exist',
      HttpStatus.NOT_FOUND,
    );
  }

  async getUsers() {
    const users = await this.userRepository.find();
    if (users) {
      return users;
    }
    throw new HttpException('No user available', HttpStatus.NOT_FOUND);
  }

  async getUserByUsername(userName: string) {
    const user = await this.userRepository.findOneBy({ userName });
    if (user) {
      return user;
    }
    throw new HttpException(
      'User with this username does not exist',
      HttpStatus.NOT_FOUND,
    );
  }
}
