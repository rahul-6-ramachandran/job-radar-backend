import { Injectable, Logger } from "@nestjs/common";
import { Company } from "@prisma/client";

import { ATS } from "../../../constants";
import { HtmlService } from "../../common/html/html.service";
import { HttpService } from "../../common/http/http.service";
import { JobsService } from "../../jobs/jobs.service";
import { isRelevantJob } from "../../helpers/helpers";
import { BaseAdapter } from "../base/base.adapter";
import { AdapterRegistry } from "../registry/adapter.registry";

@Injectable()
export class SmartRecruitersService extends BaseAdapter {
  readonly source = ATS.SMART_RECRUITERS;

  protected readonly logger =
    new Logger(SmartRecruitersService.name);

  constructor(
    private readonly http: HttpService,
    private readonly html: HtmlService,
    private readonly jobsService: JobsService,
    registry: AdapterRegistry,
  ) {
    super();

    registry.register(this);
  }

  protected async syncCompany(
    company: Company,
  ): Promise<void> {

    try {

      const url =
        `https://careers.smartrecruiters.com/${company.board}`;

      const html =
        await this.http.get<string>(url);

      const $ =
        this.html.load(html);

      const jobElements =
        $(".opening-job");

      let synced = 0;

      for (const element of jobElements.toArray()) {

        const title =
          $(element)
            .find(".job-title")
            .text()
            .trim();

        if (!title) {
          continue;
        }

     this.logger.debug(title);

      if (!isRelevantJob(title)) {
          this.logger.debug(`Skipped: ${title}`);
          continue;
      }

        const href =
          $(element)
            .find("a")
            .attr("href");

        if (!href) {
          continue;
        }

        await this.jobsService.upsertJob({

          source: this.source,

          externalJobId: href,

          companyName: company.name,

          title,

          applicationUrl: href,

           location: undefined,
            remoteStatus: undefined,
            postedAt: undefined,

        });

        synced++;
      }

      this.logger.log(
        `${company.name}: ${synced}/${jobElements.length} jobs synced`,
      );

    } catch (error) {

      this.logger.error(
        `Failed syncing ${company.name}`,
        error,
      );

    }
  }
}