import { Module } from '@nestjs/common';
import { JobsModule } from '../jobs/jobs.module';
import { AdapterRegistry } from './registry/adapter.registry';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { SourcesController } from './sources.controller';
import { LeverService } from './lever/lever.service';

@Module({
  imports: [JobsModule],
  providers: [AdapterRegistry, GreenhouseService, LeverService],
  exports: [AdapterRegistry, GreenhouseService, LeverService],
  controllers: [SourcesController],
})
export class SourcesModule {}