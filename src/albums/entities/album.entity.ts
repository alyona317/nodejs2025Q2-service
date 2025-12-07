import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Artist } from 'src/artists/entities/artist.entity';
import { OneToMany } from 'typeorm';
import { Track } from 'src/tracks/entities/track.entity';

@Entity('albums')
export class Album {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'int' })
  year: number;

  @Column({ type: 'varchar', nullable: true })
  artistId: string;

  @ManyToOne(() => Artist, (artist) => artist.albums, {
    onDelete: 'SET NULL',
  })
  artist: Artist;
  @OneToMany(() => Track, (track) => track.album)
  tracks: Track[];
}
