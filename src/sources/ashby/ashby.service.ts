import { Injectable, Logger } from "@nestjs/common";
import { Company } from "@prisma/client";

import { BaseAdapter } from "../base/base.adapter";
import { AdapterRegistry } from "../registry/adapter.registry";

import { JobsService } from "../../jobs/jobs.service";
import { HttpService } from "../../common/http/http.service";

import { ATS } from "../../common/constants/ats";

import { JOB_QUERY } from "./ashby.query";
import { AshbyApiResponse } from "./ashby.types";

import {
  isRelevantJob,
  isRemoteJob,
} from "../../helpers/helpers";

import { isAllowedLocation } from "../../helpers/location-filters";

@Injectable()
export class AshbyService extends BaseAdapter {
  readonly source = ATS.ASHBY;

  protected readonly logger =
    new Logger(AshbyService.name);

  constructor(
    private readonly jobsService: JobsService,
    private readonly http: HttpService,
    registry: AdapterRegistry,
  ) {
    super();
    registry.register(this);
  }

  protected async syncCompany(
    company: Company,
  ): Promise<void> {
    try {
      const response =
        await this.http.post<AshbyApiResponse>(
          "https://jobs.ashbyhq.com/api/non-user-graphql",
          {
            operationName: "ApiJobBoardWithTeams",

            variables: {
              organizationHostedJobsPageName:
                company.board,
            },

            query: JOB_QUERY,
          },
        );

      const jobs =
        response.data?.jobBoard?.jobs ?? [];

      let synced = 0;

      for (const job of jobs) {
        if (!isRelevantJob(job.title)) {
          continue;
        }

        const location =
          job.location?.locationName ?? null;

        if (!isAllowedLocation(location)) {
          continue;
        }

        await this.jobsService.upsertJob({
          source: this.source,

          externalJobId: job.id,

          companyName: company.name,

          title: job.title,

          location,

          remoteStatus:
            job.isRemote ??
            isRemoteJob(location),

          applicationUrl:
            job.jobUrl,

          postedAt: job.publishedAt
            ? new Date(job.publishedAt)
            : undefined,
        });

        synced++;
      }

      this.logger.log(
        `${company.name}: ${synced}/${jobs.length} jobs synced`,
      );
    } catch (error) {
      this.logger.error(
        `Failed syncing ${company.name}`,
        error,
      );
    }
  }
}