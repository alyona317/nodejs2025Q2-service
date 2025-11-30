import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Injectable()
export class UsersService {
  private users: User[] = [];
  findAll(): User[] {
    return this.users;
  }
  findOne(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }
  create(dto: CreateUserDto): User {
    const now = Date.now();

    const newUser: User = {
      id: uuidv4(),
      login: dto.login,
      password: dto.password,
      version: 1,
      createdAt: now,
      updatedAt: now,
    };
    this.users.push(newUser);
    return newUser;
  }
  updatePassword(id: string, dto: UpdatePasswordDto): User {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    user.password = dto.newPassword;
    user.version += 1;
    user.updatedAt = Date.now();
    return user;
  }
  removePassword({ password: _, ...rest }: User): Omit<User, 'password'> {
    return rest;
  }
  sanitizeList(users: User[]) {
    return users.map((u) => this.removePassword(u));
  }

  delete(id: string): boolean {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return false;
    }
    this.users.splice(index, 1);
    return true;
  }
}
