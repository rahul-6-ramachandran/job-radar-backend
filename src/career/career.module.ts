import { Module } from '@nestjs/common';
import { CareerService } from './career.service';
import { CareerController } from './career.controller';
import { CompanyModule } from '../company/company.module';
import { HttpModule } from '../common/http/http.module';
import { HtmlModule } from '../common/html/html.module';

@Module({
  imports: [
    CompanyModule,
    HttpModule,
    HtmlModule
  ],
  providers: [
    CareerService,
  ],
  controllers: [
    CareerController,
  ],
  exports: [
    CareerService,
  ],
})
export class CareerModule {}