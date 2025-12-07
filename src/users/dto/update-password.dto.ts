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

interface IUpdatePasswordDto {
  oldPassword: string;
  newPassword: string;
}

@ValidatorConstraint({ name: 'IsDifferentPassword', async: false })
export class DifferentPasswordsConstraint
  implements ValidatorConstraintInterface
{
  validate(newPassword: string, args: ValidationArguments) {
    const object = args.object as IUpdatePasswordDto;
    return newPassword !== object.oldPassword;
  }
  defaultMessage() {
    return 'New password must be different from old password';
  }
}
export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Login is required' })
  @MinLength(3, { message: 'Login must be at least 3 characters long' })
  @MaxLength(20, { message: 'Login must be at most 20 characters long' })
  oldPassword: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(5, { message: 'Password must be at least 5 characters long' })
  @MaxLength(10, { message: 'Password must be at most 10 characters long' })
  @Validate(DifferentPasswordsConstraint)
  newPassword: string;
}
