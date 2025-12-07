import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Album } from './entities/album.entity';
import { Artist } from '../artists/entities/artist.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { validate as isUUID } from 'uuid';

@Injectable()
export class AlbumsService {
  constructor(
    @InjectRepository(Album)
    private albumsRepository: Repository<Album>,

    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<Album[]> {
    return this.albumsRepository.find({
      relations: ['artist'],
    });
  }

  async findOne(id: string): Promise<Album> {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = await this.albumsRepository.findOne({
      where: { id },
      relations: ['artist'],
    });

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  async create(dto: CreateAlbumDto): Promise<Album> {
    if (!dto.name || !dto.year) {
      throw new BadRequestException('Missing required fields: name, year');
    }

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

    const album = this.albumsRepository.create({
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId || null,
      artist: artist,
    });

    return this.albumsRepository.save(album);
  }

  async update(id: string, dto: UpdateAlbumDto): Promise<Album> {
    const album = await this.findOne(id);

    if (dto.name !== undefined) album.name = dto.name;
    if (dto.year !== undefined) album.year = dto.year;

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
      album.artistId = dto.artistId || null;
      album.artist = artist;
    }

    return this.albumsRepository.save(album);
  }

  async remove(id: string): Promise<void> {
    const result = await this.albumsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }
  }
}
