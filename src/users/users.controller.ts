import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  ParseUUIDPipe,
  NotFoundException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAll() {
    const users = await this.usersService.findAll();
    return this.usersService.sanitizeList(users);
  }
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return this.usersService.removePassword(user);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() dto: CreateUserDto) {
    const newUser = await this.usersService.create(dto);
    return this.usersService.removePassword(newUser);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updatePassword(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() dto: UpdatePasswordDto,
  ) {
    const updated = await this.usersService.updatePassword(id, dto);
    return this.usersService.removePassword(updated);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', new ParseUUIDPipe()) id: string) {
    const deleted = await this.usersService.delete(id);
    if (!deleted) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
