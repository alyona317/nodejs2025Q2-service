import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  HttpCode,
  NotFoundException,
  HttpStatus,
  Delete,
} from '@nestjs/common';
import { TracksService } from './track.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('track')
export class TracksController {
  constructor(private readonly TracksService: TracksService) {}
  @Get()
  getAll() {
    return this.TracksService.findAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string) {
    const track = this.TracksService.findOne(id);
    if (!track) {
      throw new NotFoundException(`track with id ${id} not found`);
    }
    return track;
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() dto: CreateTrackDto) {
    return this.TracksService.create(dto);
  }

  @Put(':id')
  updatePassword(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return this.TracksService.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  deleteUser(@Param('id') id: string) {
    const deleted = this.TracksService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }
}
