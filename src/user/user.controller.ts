import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/create')
  async register(@Body() body: CreateUserDto) {
    const user = await this.userService.create(body);
    return user;
  }

  @Put('/update/:id')
  @ApiParam({ name: 'id', required: true })
  async update(@Body() body: UpdateUserDto, @Param('id', ParseIntPipe) id) {
    const user = await this.userService.update(body, id);
    return user;
  }

  @Delete('/delete/:id')
  @ApiParam({ name: 'id', required: true })
  async delete(@Body() body: UpdateUserDto, @Param('id', ParseIntPipe) id) {
    const user = await this.userService.update(body, id);
    return user;
  }

  @Get('/all')
  async getAll() {
    const users = await this.userService.getAll();
    return users;
  }

  @Get('/male')
  async getMale() {
    const users = await this.userService.getMale();
    return users;
  }

  @Get('/female')
  async getFemale() {
    const users = await this.userService.getFemale();
    return users;
  }

  @Get('/under30')
  async getUnder30() {
    const users = await this.userService.getUnder30();
    return users;
  }

  @Get('/over30')
  async getOver30() {
    const users = await this.userService.getOver30();
    return users;
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  async getOne(@Param('id', ParseIntPipe) id) {
    const user = await this.userService.getOne(id);
    return user;
  }
}
