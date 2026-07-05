import { Injectable, Logger } from "@nestjs/common";

import { CompanyService } from "../company/company.service";

import { HttpService } from "../common/http/http.service";
import { Company } from "@prisma/client";
import { DOMAIN_OVERRIDES } from "./overrides";

@Injectable()
export class HomepageService {

  private readonly logger =
    new Logger(HomepageService.name);

  constructor(
    private readonly companyService: CompanyService,
    private readonly http: HttpService,
  ) {}


  
  async discoverAll() {
    let success = 0;
    let failed = 0;
    const companies =
      await this.companyService.findWithoutHomepage();

    for (const company of companies) {
    const found =
    await this.discoverHomepage(company);

    if (found) {
    success++;
    } else {
    failed++;
    }

      await new Promise(resolve =>
    setTimeout(resolve, 200),
    );


    }

    this.logger.log(`
    Homepage Discovery Finished

    Success : ${success}

    Failed : ${failed}
    `);
    }

    private async discoverHomepage(
    company: Company,
    ): Promise<boolean> {
        this.logger.log(
        `Checking ${company.name}`,
    );

    const candidates =
        this.buildCandidates(
            company.name,
        );

    for (const url of candidates) {

        const exists =
            await this.verifyHomepage(url);

        if (!exists) {
            continue;
        }

        this.logger.log(
            `✓ ${company.name} -> ${url}`,
        );

        await this.companyService.updateHomepage(
            company.id,
            url,
        );

        return true;

    }

    this.logger.warn(
  `✗ ${company.name} homepage not found`,
    );
    return false;
    }

    private buildCandidates(
      companyName: string,
    ): string[] {
      if (DOMAIN_OVERRIDES[companyName]) {
        return [DOMAIN_OVERRIDES[companyName]];
      }

      const normalized =
        companyName
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "");
        
        return [

        `https://${normalized}.com`,

        `https://www.${normalized}.com`,

        ];
    }

    private async verifyHomepage(
    url: string,
    ): Promise<boolean> {
    try {
        const response = await this.http.head(url);

        if (
        response.status === 405 ||
        response.status === 403
        ) {
        await this.http.get<any>(url, {
            maxRedirects: 5,
            timeout: 5000,
        });

        return true;
        }

        return (
        response.status >= 200 &&
        response.status < 400
        );
    } catch {
        return false;
    }
}
}