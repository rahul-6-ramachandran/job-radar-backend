import { Module, forwardRef } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { SourcesModule } from '../sources/sources.module';
import { EngineService } from './engine.service';

@Module({
  imports: [
    CompanyModule,
    forwardRef(() => SourcesModule),
  ],
  providers: [EngineService],
  exports: [EngineService],
})
export class EngineModule {}