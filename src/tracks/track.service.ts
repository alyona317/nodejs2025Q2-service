import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    if (!isUUID(id)) throw new BadRequestException('Invalid track id');
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    return track;
  }

  create(dto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      name: dto.name,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      duration: dto.duration,
    };
    this.tracks.push(newTrack);
    return newTrack;
  }
  updateTrack(id: string, dto: UpdateTrackDto): Track {
    const track = this.tracks.find((track) => track.id === id);
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    track.name = dto.name ?? track.name;
    track.albumId = dto.albumId ?? track.albumId;
    track.artistId = dto.artistId ?? track.artistId;
    track.duration = dto.duration ?? track.duration;
    return track;
  }

  remove(id: string): boolean {
    const track = this.tracks.find((t) => t.id === id);
    if (!track) return false;

    this.tracks = this.tracks.filter((t) => t.id !== id);
    return true;
  }
  
}
