import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

import { JobsService } from '../../jobs/jobs.service';

import { leverCompanies } from './companies';
import { isRelevantJob, isRemoteJob } from '../../helpers/helpers';
import { isAllowedLocation } from '../../helpers/location-filters';


@Injectable()
export class LeverService {
  private readonly logger =
    new Logger(LeverService.name);

  constructor(
    private readonly jobsService: JobsService,
  ) {}

  async syncAll() {
    for (const company of leverCompanies) {
        try {
            await this.syncCompany(
            company.company,
            company.companyName,
            );
        } catch (error) {
            this.logger.error(
            `Failed ${company.companyName}`,
            error,
            );
        }
    }
  }

  async syncCompany(
    company: string,
    companyName: string,
  ) {
    try {
      const url =
        `https://api.lever.co/v0/postings/${company}?mode=json`;

      const { data } = await axios.get(url);

      let synced = 0;

      for (const job of data) {
        const location =
          job.categories?.location ?? null;

        if (!isRelevantJob(job.text)) {
          continue;
        }

        if (!isAllowedLocation(location)) {
          continue;
        }

        await this.jobsService.upsertJob({
          source: 'lever',

          externalJobId: job.id,

          companyName,

          title: job.text,

          location,

          remoteStatus:
            isRemoteJob(location),

          applicationUrl:
            job.hostedUrl,

          postedAt: new Date(),
        });

        synced++;
      }

      this.logger.log(
        `${companyName}: ${synced} jobs synced`,
      );
    } catch (error: any) {
      this.logger.error(
        `Failed syncing ${companyName}`,
        error,
      );


    this.logger.error(
        error?.response?.data ??
        error?.message,
    );
    }
  }
}