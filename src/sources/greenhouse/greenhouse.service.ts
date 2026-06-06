import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { Cron, CronExpression } from '@nestjs/schedule';

import { JobsService } from '../../jobs/jobs.service';
import { greenhouseCompanies } from '../../../constants';
import { isRelevantJob, isRemoteJob } from '../../helpers/helpers';
import { isAllowedLocation } from '../../helpers/location-filters';

@Injectable()
export class GreenhouseService {
  private readonly logger =
    new Logger(GreenhouseService.name);

  private isRunning = false;

  constructor(
    private readonly jobsService: JobsService,
  ) {}

  @Cron(CronExpression.EVERY_HOUR)
  async syncAll() {
    if (this.isRunning) {
      return;
    }

    this.isRunning = true;

    try {
      this.logger.log(
        'Starting Greenhouse sync...',
      );

      for (const company of greenhouseCompanies) {
        await this.syncCompany(
          company.board,
          company.companyName,
        );
      }
    } finally {
      this.isRunning = false;
    }
  }

  async syncCompany(
    board: string,
    companyName: string,
  ) {
    try {
      const url =
        `https://boards-api.greenhouse.io/v1/boards/${board}/jobs`;

      const { data } = await axios.get(url, {
        timeout: 10000,
      });

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