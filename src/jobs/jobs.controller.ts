import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';

import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
  ) {}

  @Get()
  async findAll(
    @Query('q') q?: string,

    @Query('company') company?: string,

    @Query('remote') remote?: string,

    @Query('page') page = '1',

    @Query('limit') limit = '20',

    @Query("source")
    source?: string,

    @Query("location")
    location?: string,

    @Query("postedWithinDays")
    postedWithinDays?: string,
  ) {
    return this.jobsService.findAll({
      q,

      company,

      remote:
        remote !== undefined
          ? remote === 'true'
          : undefined,

      page: Number(page),

      limit: Number(limit),

      source,

      location,

      postedWithinDays:
          postedWithinDays
              ? Number(postedWithinDays)
              : undefined,
    });
  }
}