import { Module } from '@nestjs/common';
import { JobsModule } from '../jobs/jobs.module';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { SourcesController } from './sources.controller';
import { LeverService } from './lever/lever.service';

@Module({
  imports: [JobsModule],
  providers: [GreenhouseService, LeverService],
  exports: [GreenhouseService,LeverService,],
  controllers: [SourcesController],
})
export class SourcesModule {}