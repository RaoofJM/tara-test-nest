import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserRepository } from './user.repository';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [UserController],
  providers: [UserService, UserRepository],
  imports: [PrismaModule],
})
export class UserModule {}
