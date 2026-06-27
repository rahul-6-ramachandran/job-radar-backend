import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';


import { JobsService } from '../../jobs/jobs.service';
import { isRelevantJob, isRemoteJob } from '../../helpers/helpers';
import { isAllowedLocation } from '../../helpers/location-filters';
import { JobSourceAdapter } from '../interfaces/job-source.interface';
import { Company } from '@prisma/client';
import { AdapterRegistry } from '../registry/adapter.registry';
import { HttpService } from '../../common/http/http.service';
import { GreenhouseResponse } from './greenhous.types';

@Injectable()
export class GreenhouseService implements JobSourceAdapter {
  readonly source = 'greenhouse';

  private readonly logger =
    new Logger(GreenhouseService.name);

  constructor(
    private readonly jobsService: JobsService,
    private http: HttpService,

   registry: AdapterRegistry
  ) {
       registry.register(this);
  }


  async sync(companies: Company[]) {
  for (const company of companies) {
    await this.syncCompany(
      company.board!,
      company.name,
    );
  }
}
  async syncCompany(
    board: string,
    companyName: string,
  ) {
    try {
      const url =
        `https://boards-api.greenhouse.io/v1/boards/${board}/jobs`;

      const data =
          await this.http.get<GreenhouseResponse>(url);

      let synced = 0;

      for (const job of data.jobs) {
        if (!isRelevantJob(job.title)) {
        console.log('FILTERED OUT:', job.title);
        continue;
        }
        const location =
                job.location?.name ?? null;

        if (!isAllowedLocation(location)) {
        continue;
        }
        

        await this.jobsService.upsertJob({
          source: 'greenhouse',

          externalJobId: String(job.id),

          companyName,

          title: job.title,

          location,

          remoteStatus:
            isRemoteJob(location),

          department:
            job.departments?.[0]?.name,

          applicationUrl:
            job.absolute_url,

          postedAt:
            job.updated_at
              ? new Date(job.updated_at)
              : undefined,
        });

        synced++;
      }

     this.logger.log(
  `${companyName}: ${synced}/${data.jobs.length} relevant jobs`,
);
    } catch (error) {
      this.logger.error(
        `Failed syncing ${companyName}`,
        error,
      );
    }
  }
}