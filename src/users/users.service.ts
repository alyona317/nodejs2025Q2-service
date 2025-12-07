import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(dto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(dto);
    return this.usersRepository.save(user);
  }

  async updatePassword(id: string, dto: UpdatePasswordDto): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    
    if (user.password !== dto.oldPassword) {
      throw new ForbiddenException('Old password is incorrect');
    }
    
    user.password = dto.newPassword;
    user.version += 1;
    
    return this.usersRepository.save(user);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected > 0;
  }

  removePassword({ password: _, ...rest }: User): Omit<User, 'password'> {
    return rest;
  }

  sanitizeList(users: User[]): Omit<User, 'password'>[] {
    return users.map((u) => this.removePassword(u));
  }
}
