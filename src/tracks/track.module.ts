import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TracksService } from './track.service';
import { TracksController } from './track.controller';
import { Track } from './entities/track.entity';
import { Artist } from '../artists/entities/artist.entity';
import { Album } from '../albums/entities/album.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Track, Artist, Album]), 
  ],
  controllers: [TracksController],
  providers: [TracksService],
  exports: [TracksService],
})
export class TracksModule {}
