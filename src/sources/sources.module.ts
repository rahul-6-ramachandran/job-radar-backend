import { Module, forwardRef } from '@nestjs/common';
import { JobsModule } from '../jobs/jobs.module';
import { HttpModule } from '../common/http/http.module';
import { EngineModule } from '../engine/engine.module';
import { AdapterRegistry } from './registry/adapter.registry';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { EngineController } from './sources.controller';
import { LeverService } from './lever/lever.service';

@Module({
  imports: [JobsModule, HttpModule, forwardRef(() => EngineModule)],
  providers: [AdapterRegistry, GreenhouseService, LeverService],
  exports: [AdapterRegistry, GreenhouseService, LeverService],
  controllers: [EngineController],
})
export class SourcesModule {}