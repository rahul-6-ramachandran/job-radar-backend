import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
} from '@nestjs/common';

import { WatchlistService } from './watchlist.service';

@Controller('watchlist')
export class WatchlistController {
  constructor(
    private readonly watchlistService: WatchlistService,
  ) {}

  @Get()
  findAll() {
    return this.watchlistService.findAll();
  }

  @Post()
  create(
    @Body()
    body: {
      companyName: string;
      priority: number;
    },
  ) {
    return this.watchlistService.create(
      body.companyName,
      body.priority,
    );
  }

  @Delete(':id')
  delete(
    @Param('id') id: string,
  ) {
    return this.watchlistService.delete(id);
  }
}