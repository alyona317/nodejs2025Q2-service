import {
  IsString,
  IsNotEmpty,
  IsNumber,
  Min,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class CreateTrackDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsUUID('4')
  @IsOptional()
  artistId?: string | null;

  @IsUUID('4')
  @IsOptional()
  albumId?: string | null;

  @IsNumber()
  @IsNotEmpty({ message: 'Duration is required' })
  @Min(1)
  duration: number;
}
