import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { DetectorRegistry } from '../sources/registry/detector.registry';
import { CompanyService } from '../company/company.service';
import { Company } from '@prisma/client';

@Injectable()
export class DiscoveryService {
    private readonly logger =
  new Logger(DiscoveryService.name);
  constructor(
    private readonly registry: DetectorRegistry,
      private readonly companyService: CompanyService,

  ) {}

  async discoverAll() {
  const companies =
    await this.companyService.findUnknownATS();

  for (const company of companies) {
    try {
      await this.discoverCompany(company);
    } catch (error) {
    this.logger.error(
        `Discovery failed for ${company.name}`,
        error,
        );
    }
  }
}


 async discover(url: string) {
  try {
    const { data } = await axios.get(url, {
      timeout: 10000,
    });

    for (const detector of this.registry.getDetectors()) {
      const result = await detector.detect({
        url,
        html: data,
      });

      if (result) {
        return result;
      }
    }

    return null;
  } catch (error) {
    this.logger.error(
      `Failed to fetch ${url}`,
      error,
    );

    return null;
  }
}

  async discoverCompany(company: Company) {
  if (!company.careerUrl) {
    return null;
  }

  const result = await this.discover(
    company.careerUrl,
  );

    if (result) {
    await this.companyService.updateATS(
        company.id,
        result,
    );

    this.logger.log(
        `${company.name} → ${result.ats} (${result.board})`,
    );

    return result;
    }

    this.logger.warn(
    `No ATS detected for ${company.name}`,
    );

return null;

}


}