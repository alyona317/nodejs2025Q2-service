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
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist)
    private artistsRepository: Repository<Artist>,
  ) {}

  async findAll(): Promise<Artist[]> {
    return this.artistsRepository.find(); // 
  }

  async findOne(id: string): Promise<Artist> {

    if (!isUUID(id)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = await this.artistsRepository.findOne({

      where: { id },
    });

    if (!artist) {
      throw new NotFoundException(`Artist with id ${id} not found`);
    }

    return artist;
  }

  async create(dto: CreateArtistDto): Promise<Artist> {

    const newArtist = this.artistsRepository.create(dto);
    return this.artistsRepository.save(newArtist);
  }

  async update(id: string, dto: UpdateArtistDto): Promise<Artist> {

    const artist = await this.findOne(id); // 
    if (dto.name !== undefined) artist.name = dto.name;
    if (dto.grammy !== undefined) artist.grammy = dto.grammy;

    return this.artistsRepository.save(artist);
  }

  async delete(id: string): Promise<void> {
    const artist = await this.findOne(id); // 
    await this.artistsRepository.delete(id); // 

  }
}