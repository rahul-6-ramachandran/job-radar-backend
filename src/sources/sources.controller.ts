  import { Controller, Get, Logger, Param } from '@nestjs/common';
  import { EngineService } from '../engine/engine.service';

  @Controller('engine')
  export class EngineController {
      
    constructor(
      private readonly engineService: EngineService,
    ) {}

    @Get('sync')
    async syncAll() {
      await this.engineService.sync();

      return {
        success: true,
      };
    }

    @Get('sync/:source')
    async syncSource(
      @Param('source') source: string,
    ) {
      await this.engineService.syncSource(source);

      return {
        success: true,
      };
    }
  }