import {
  IsString,
  IsNumber,
  IsOptional,
  Min,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsUUID('4')
  @IsOptional()
  artistId?: string;

  @IsUUID('4')
  @IsOptional()
  albumId?: string;

  @IsNumber()
  @IsOptional()
  @Min(1)
  duration?: number;
}
