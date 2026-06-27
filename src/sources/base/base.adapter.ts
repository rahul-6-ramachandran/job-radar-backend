import { Company } from "@prisma/client";
import { JobSourceAdapter } from "../interfaces/job-source.interface";
import { Logger } from "@nestjs/common/services/logger.service";

export abstract class BaseAdapter
  implements JobSourceAdapter {

  abstract readonly source: string;

  protected readonly logger =
    new Logger(this.constructor.name);

  async sync(companies: Company[]) {

    this.logger.log(
      `Sync started (${this.source})`,
    );

    for (const company of companies) {
      try {
        await this.syncCompany(company);
      } catch (error) {
        this.logger.error(
          `${company.name} failed`,
          error,
        );
      }
    }

    this.logger.log(
      `Sync completed (${this.source})`,
    );
  }

  protected abstract syncCompany(
    company: Company,
  ): Promise<void>;
}