import { Controller, Get } from '@nestjs/common';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { LeverService } from './lever/lever.service';

@Controller('sources')
export class SourcesController {
  constructor(
    private readonly greenhouseService: GreenhouseService,
      private readonly leverService: LeverService,
  ) {}

  
  @Get('lever-sync')
async leverSync() {
  await this.leverService.syncAll();

  return {
    success: true,
  };
}
}