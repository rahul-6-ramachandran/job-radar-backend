import { Injectable, Logger } from '@nestjs/common';
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
private readonly logger =
    new Logger(EngineService.name);


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
             this.logger.warn("Sync already running.");
            return;
        }

        this.isRunning=true;


  const started = Date.now();

          this.logger.log("================================");
            this.logger.log("Starting Job Sync");
            this.logger.log("================================");
              let adaptersProcessed = 0;
            let companiesProcessed = 0;

        try {
          
            for (const adapter of this.registry.getAdapters()) {

            const companies =
                await this.companyService.findByATS(
                adapter.source,
                );

            this.logger.log("--------------------------------");
            this.logger.log(
                `Adapter : ${adapter.source}`,
            );
            this.logger.log(
                `Companies : ${companies.length}`,
            );

            if (!companies.length) {
                continue;
            }

            try {

                await adapter.sync(companies);

                adaptersProcessed++;
                companiesProcessed += companies.length;

                this.logger.log(
                `${adapter.source} completed.`,
                );

            } catch (error) {

                this.logger.error(
                `${adapter.source} failed.`,
                error,
                );

            }

            }
            } finally {


                this.logger.log("");
                this.logger.log("Summary");
                this.logger.log(
                `Adapters : ${adaptersProcessed}`,
                );
                this.logger.log(
                `Companies : ${companiesProcessed}`,
                );

    const duration =
      ((Date.now() - started) / 1000).toFixed(2);

    this.logger.log("================================");
    this.logger.log(`Finished Job Sync (${duration}s)`);
    this.logger.log("================================");
            this.isRunning = false;
        }

    }

 }

