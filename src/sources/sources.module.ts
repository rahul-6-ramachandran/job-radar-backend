import { Module, forwardRef } from '@nestjs/common';
import { JobsModule } from '../jobs/jobs.module';
import { HttpModule } from '../common/http/http.module';
import { EngineModule } from '../engine/engine.module';
import { AdapterRegistry } from './registry/adapter.registry';
import { GreenhouseService } from './greenhouse/greenhouse.service';
import { EngineController } from './sources.controller';
import { LeverService } from './lever/lever.service';
import { AshbyService } from './ashby/ashby.service';

@Module({
  imports: [JobsModule, HttpModule, forwardRef(() => EngineModule)],
  providers: [AdapterRegistry, GreenhouseService, LeverService, AshbyService],
  exports: [AdapterRegistry, GreenhouseService, LeverService, AshbyService],
  controllers: [EngineController],
})
export class SourcesModule {}