import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Album } from './entities/album.entity';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = this.albums.find((a) => a.id === id);

    if (!album) {
      throw new NotFoundException(`Album with id ${id} not found`);
    }

    return album;
  }

  create(dto: CreateAlbumDto): Album {
    if (!dto.name || !dto.year) {
      throw new BadRequestException('Missing required fields: name, year');
    }

    const newAlbum: Album = {
      id: uuidv4(),
      name: dto.name,
      year: dto.year,
      artistId: dto.artistId ?? null,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  update(id: string, dto: UpdateAlbumDto): Album {
    const album = this.findOne(id);

    const updated: Album = {
      ...album,
      ...dto,
    };

    this.albums = this.albums.map((a) => (a.id === id ? updated : a));

    return updated;
  }

  remove(id: string): void {
    this.findOne(id);

    this.albums = this.albums.filter((a) => a.id !== id);
  }
}
