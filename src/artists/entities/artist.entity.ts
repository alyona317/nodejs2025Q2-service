import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Entity('artists')
export class Artist {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'boolean',
    default: false,
  })
  grammy: boolean;
  @OneToMany(() => Album, (album) => album.artist)
  albums: Album[];
  @OneToMany(() => Track, (track) => track.artist)
  tracks: Track[];
}
