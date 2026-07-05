import { Module } from '@nestjs/common';
import { HomepageService } from './homepage.service';
import { HomepageController } from './homepage.controller';
import { CompanyModule } from '../company/company.module';
import { HttpModule } from '../common/http/http.module';

@Module({
  imports: [
    CompanyModule,
    HttpModule,
  ],
  providers: [
    HomepageService,
  ],
  controllers: [
    HomepageController,
  ],
  exports: [
    HomepageService,
  ],
})
export class HomepageModule {}