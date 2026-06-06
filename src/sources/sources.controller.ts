import { Controller, Get } from '@nestjs/common';
import { GreenhouseService } from './greenhouse/greenhouse.service';

@Controller('sources')
export class SourcesController {
  constructor(
    private readonly greenhouseService: GreenhouseService,
  ) {}

  @Get('sync')
  async sync() {
    await this.greenhouseService.syncAll();

    return {
      success: true,
    };
  }
}