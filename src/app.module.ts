import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { JobsModule } from './jobs/jobs.module';
import { SourcesModule } from './sources/sources.module';
import { ScheduleModule } from '@nestjs/schedule';
import { WatchlistModule } from './watchlist/watchlist.module';
import { CompanyModule } from './company/company.module';
import { EngineModule } from './engine/engine.module';

@Module({
  imports: [PrismaModule, JobsModule, SourcesModule, ScheduleModule.forRoot(), WatchlistModule, CompanyModule, EngineModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
