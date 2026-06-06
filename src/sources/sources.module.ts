import { Module } from '@nestjs/common';
import { JobsModule } from '../jobs/jobs.module';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { SourcesController } from './sources.controller';

@Module({
  imports: [JobsModule],
  providers: [GreenhouseService],
  exports: [GreenhouseService],
  controllers: [SourcesController],
})
export class SourcesModule {}