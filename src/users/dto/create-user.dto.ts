import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Login is required' })
  @MinLength(3, { message: 'Login must be at least 3 characters long' })
  @MaxLength(20, { message: 'Login must be at most 20 characters long' })
  login: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(5, { message: 'Password must be at least 5 characters long'})
  @MaxLength(10, { message: 'Password must be at most 10 characters long' })
  password: string;
}
