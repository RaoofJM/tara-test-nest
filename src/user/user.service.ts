import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(data: CreateUserDto) {
    data.age = +data.age;
    if (!data.age) throw new BadRequestException('Age must be a number');

    const isEmailTaken = await this.userRepository.findByEmail(data.email);
    if (isEmailTaken) throw new BadRequestException('Email is taken');

    const user = await this.userRepository.create(data);
    return user;
  }

  async update(data: UpdateUserDto, id: number) {
    data.age = +data.age;
    if (!data.age) throw new BadRequestException('Age must be a number');

    const userExist = await this.userRepository.findOne(id);
    if (!userExist) throw new NotFoundException('User not found');

    const isEmailTaken = await this.userRepository.findByEmail(data.email);
    if (isEmailTaken) throw new BadRequestException('Email is taken');

    const user = await this.userRepository.update(id, data);
    return user;
  }

  async delete(id: number) {
    const userExist = await this.userRepository.findOne(id);
    if (!userExist) throw new NotFoundException('User not found');

    const user = await this.userRepository.delete(id);
    return user;
  }

  async getAll() {
    const users = await this.userRepository.findAll();
    return users;
  }

  async getOne(id: number) {
    const userExist = await this.userRepository.findOne(id);
    if (!userExist) throw new NotFoundException('User not found');

    return userExist;
  }

  async getMale() {
    const users = await this.userRepository.findMaleUsers();
    return users;
  }

  async getFemale() {
    const users = await this.userRepository.findFemaleUsers();
    return users;
  }

  async getUnder30() {
    const users = await this.userRepository.findUsersUnder30();
    return users;
  }

  async getOver30() {
    const users = await this.userRepository.findUsersOver30();
    return users;
  }
}
