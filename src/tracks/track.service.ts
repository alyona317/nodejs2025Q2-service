import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from './entities/track.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class TracksService {
  constructor(
    @InjectRepository(Track)
    private tracksRepository: Repository<Track>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,

    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,
  ) {}

  async findAll(): Promise<Track[]> {
    return this.tracksRepository.find({
      relations: ['artist', 'album'],
    });
  }

  async findOne(id: string): Promise<Track> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid track id');
    }

    const track = await this.tracksRepository.findOne({
      where: { id },
      relations: ['artist', 'album'],
    });

    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }

    return track;
  }

  async create(dto: CreateTrackDto): Promise<Track> {
    let artist = null;
    if (dto.artistId) {
      artist = await this.artistsRepository.findOne({
        where: { id: dto.artistId },
      });
      if (!artist) {
        throw new BadRequestException(
          `Artist with id ${dto.artistId} not found`,
        );
      }
    }

    let album = null;
    if (dto.albumId) {
      album = await this.albumsRepository.findOne({
        where: { id: dto.albumId },
      });
      if (!album) {
        throw new BadRequestException(`Album with id ${dto.albumId} not found`);
      }
    }

    const track = this.tracksRepository.create({
      name: dto.name,
      duration: dto.duration,
      artistId: dto.artistId || null,
      albumId: dto.albumId || null,
      artist: artist,
      album: album,
    });

    return this.tracksRepository.save(track);
  }

  async updateTrack(id: string, dto: UpdateTrackDto): Promise<Track> {
    const track = await this.findOne(id);

    if (dto.name !== undefined) track.name = dto.name;
    if (dto.duration !== undefined) track.duration = dto.duration;

    if (dto.artistId !== undefined) {
      let artist = null;
      if (dto.artistId) {
        artist = await this.artistsRepository.findOne({
          where: { id: dto.artistId },
        });
        if (!artist) {
          throw new BadRequestException(
            `Artist with id ${dto.artistId} not found`,
          );
        }
      }
      track.artistId = dto.artistId || null;
      track.artist = artist;
    }

    if (dto.albumId !== undefined) {
      let album = null;
      if (dto.albumId) {
        album = await this.albumsRepository.findOne({
          where: { id: dto.albumId },
        });
        if (!album) {
          throw new BadRequestException(
            `Album with id ${dto.albumId} not found`,
          );
        }
      }
      track.albumId = dto.albumId || null;
      track.album = album;
    }

    return this.tracksRepository.save(track);
  }

  async remove(id: string): Promise<boolean> {
    const result = await this.tracksRepository.delete(id);
    return result.affected > 0;
  }
}
