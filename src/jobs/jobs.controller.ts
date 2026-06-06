import { Controller, Get, Query } from '@nestjs/common';
import { JobsService } from './jobs.service';
import { GreenhouseService } from '../sources/greenhouse/greenhouse.service';

@Controller('jobs')
export class JobsController {
  constructor(
    private readonly jobsService: JobsService,
  ) {}

  @Get('test')
  async test() {
    await this.jobsService.upsertJob({
      source: 'test',
      externalJobId: '123',

      companyName: 'Rahul Corp',

      title: 'Backend Engineer',

      applicationUrl: 'https://example.com',
    });

    return {
      success: true,
    };
  }

 @Get()
findAll(
  @Query('search') search?: string,
  @Query('company') company?: string,
  @Query('remote') remote?: string,
) {
  return this.jobsService.findAll({
    search,
    company,
    remote:
      remote === undefined
        ? undefined
        : remote === 'true',
  });
}


  

  

}