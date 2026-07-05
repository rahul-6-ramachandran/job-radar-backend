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
import { HttpModule } from './common/http/http.module';
import { NotificationsModule } from './notifications/notifications.module';
import { DiscoveryModule } from './discovery/discovery.module';
import { HomepageModule } from './homepage/homepage.module';
import { CareerModule } from './career/career.module';

@Module({
  imports: [PrismaModule, JobsModule, SourcesModule, ScheduleModule.forRoot(), WatchlistModule, CompanyModule, EngineModule, HttpModule, NotificationsModule, DiscoveryModule,AppModule, HomepageModule, CareerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
