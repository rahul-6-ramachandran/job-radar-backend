import { Injectable, Logger } from "@nestjs/common";
import { BaseAdapter } from "../base/base.adapter";
import { ATS } from "../../../constants";
import { JobsService } from "../../jobs/jobs.service";
import { HttpService } from "../../common/http/http.service";
import { AdapterRegistry } from "../registry/adapter.registry";
import { Company } from "@prisma/client";
@Injectable()
export class WorkdayService extends BaseAdapter {
  readonly source = ATS.WORKDAY;

  protected readonly logger =
    new Logger(WorkdayService.name);

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
    const [host, tenant, site] =
  company.board!.split("/");


  const url =
  `https://${host}/wday/cxs/${tenant}/${site}/jobs`;

  this.logger.log(url);
  }
}