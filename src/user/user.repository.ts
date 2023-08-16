import { Injectable } from '@nestjs/common';
import { hash } from 'bcrypt';
import { User } from './user.interface';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { CreateUserDto } from './dto/createUser.dto';
import { Gender } from '@prisma/client';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    data.password = await hash(data.password, 10);
    const gender = data.gender === 'MALE' ? Gender.MALE : Gender.FEMALE;
    return this.prisma.user.create({
      data: {
        ...data,
        gender,
      },
    });
  }

  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({ where: { id } });
  }

  async findMaleUsers(): Promise<User[]> {
    return this.prisma.user.findMany({ where: { gender: Gender.MALE } });
  }

  async findFemaleUsers(): Promise<User[]> {
    return this.prisma.user.findMany({ where: { gender: Gender.FEMALE } });
  }

  async findUsersUnder30(): Promise<User[]> {
    return this.prisma.user.findMany({ where: { age: { lt: 30 } } });
  }

  async findUsersOver30(): Promise<User[]> {
    return this.prisma.user.findMany({ where: { age: { gt: 30 } } });
  }
}
