import { Injectable } from '@nestjs/common';
import { CompanyService } from '../company/company.service';
import { GreenhouseService } from '../sources/greenhouse/greenhouse.service';
import {
Cron,
CronExpression,
} from '@nestjs/schedule';
import { JobSourceAdapter } from '../sources/interfaces/job-source.interface';
import { AdapterRegistry } from '../sources/registry/adapter.registry';



@Injectable()
export class EngineService {

  private isRunning = false;
  constructor(
       private registry: AdapterRegistry,
      private readonly companyService: CompanyService,
  ) {
  }


    async syncSource(source: string) {
    const adapter = this.registry
        .getAdapters()
        .find(a => a.source === source);

    if (!adapter) {
        throw new Error(`Unknown source: ${source}`);
    }

    const companies =
        await this.companyService.findByATS(source);

    await adapter.sync(companies);
    }

    @Cron(CronExpression.EVERY_HOUR)
    async sync(){

        if(this.isRunning){
            return;
        }

        this.isRunning=true;
        try {
            for (const adapter of this.registry.getAdapters()) {
                const companies = await this.companyService.findByATS(
                    adapter.source,
                );

                await adapter.sync(companies);
            }   
            } finally {
            this.isRunning = false;
        }

    }

 }

