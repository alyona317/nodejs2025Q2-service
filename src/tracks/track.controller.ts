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
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  async getAll() {
    return await this.tracksService.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    const track = await this.tracksService.findOne(id);
    if (!track) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
    return track;
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createTrack(@Body() dto: CreateTrackDto) {
    return await this.tracksService.create(dto);
  }

  @Put(':id')
  async updateTrack(@Param('id') id: string, @Body() dto: UpdateTrackDto) {
    return await this.tracksService.updateTrack(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrack(@Param('id') id: string) {
    const deleted = await this.tracksService.remove(id);
    if (!deleted) {
      throw new NotFoundException(`Track with id ${id} not found`);
    }
  }
}
