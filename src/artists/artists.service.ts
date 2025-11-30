import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { v4 as uuidv4, validate as isUUID } from 'uuid';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Album } from 'src/albums/entities/album.entity';

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];
  private albums: Album[] = [];

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  create(dto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...dto,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  update(id: string, dto: UpdateArtistDto): Artist {
    const artist = this.findOne(id);

    const updatedArtist = { ...artist, ...dto };
    this.artists = this.artists.map((a) => (a.id === id ? updatedArtist : a));

    return updatedArtist;
  }

  delete(id: string): void {
    this.findOne(id);

    this.artists = this.artists.filter((a) => a.id !== id);

    this.albums = this.albums.map((album) => {
      if (album.artistId === id) {
        return { ...album, artistId: null };
      }
      return album;
    });
  }
  
}
