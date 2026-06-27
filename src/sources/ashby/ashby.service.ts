import { Injectable } from "@nestjs/common";
import { JobSourceAdapter } from "../interfaces/job-source.interface";
import { JobsService } from "../../jobs/jobs.service";
import { Company } from "@prisma/client";
import { AdapterRegistry } from "../registry/adapter.registry";
import { BaseAdapter } from "../base/base.adapter";
import { ATS } from "../../common/constants/ats";

@Injectable()
export class AshbyService extends BaseAdapter {
  readonly source = ATS.ASHBY;

  constructor(
    private readonly jobsService: JobsService,
    registry: AdapterRegistry
  ) {
    super()
       registry.register(this);
  }


protected async syncCompany(
    company: Company,
): Promise<void> {}
}