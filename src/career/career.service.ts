import {
 Injectable,
 Logger,
} from "@nestjs/common";

import { CompanyService } from "../company/company.service";

import { HttpService } from "../common/http/http.service";
import { Company } from "@prisma/client";
import { HtmlService } from "../common/html/html.service";
import { CAREER_KEYWORDS } from "./constants";

@Injectable()
export class CareerService {

    private readonly logger =
        new Logger(CareerService.name);

    constructor(

        private readonly companyService: CompanyService,
        private readonly html: HtmlService,
        private readonly http: HttpService,

    ) {}

    async discoverAll() {

    const companies =
        await this.companyService
        .findWithoutCareerUrl();

    for (const company of companies) {

        await this.discoverCareer(company);

        await new Promise(resolve =>
            setTimeout(resolve,200)
        );

    }

    }
    private async discoverCareer(
        company: Company,
    ) {
        this.logger.log(
        `Checking ${company.name}`,
        );
    if (!company.homepageUrl) {
        this.logger.warn(
            `${company.name} has no homepage`
        );
        return;
    }

    let html: string;

    try {
        html = await this.http.get<string>(
            company.homepageUrl,
        );
    } catch {
        this.logger.warn(
            `${company.name} homepage blocked`
        );
        return;
    }

        const $ = this.html.load(html);

        const links: string[] = [];

        $('a').each((_, element) => {
            const href = $(element).attr('href');

            if (!href) {
                return;
            }

            const normalized = this.normalizeLink(
                company.homepageUrl!,
                href,
            );

            if (normalized) {
                links.push(normalized);
            }
        });

        const uniqueLinks = [...new Set(links)];

        const internalLinks = uniqueLinks.filter(link =>
            this.isSameDomain(
                company.homepageUrl!,
                link,
            ),
        );

        let bestUrl: string | null = null;
        let bestScore = 0;

        for (const link of internalLinks) {

            const score = this.scoreLink(link);

            if (score > bestScore) {
                bestScore = score;
                bestUrl = link;
            }

        }

        if (bestUrl) {

            this.logger.log(
                `${company.name} -> ${bestUrl}`,
            );

            await this.companyService.updateCareerUrl(
                company.id,
                bestUrl,
            );

            return;
        }

        this.logger.warn(
            `${company.name} career page not found`,
        );
    }

    private normalizeLink(
    base: string,
    href: string,
    ): string | null {

        try {
            return new URL(
                href,
                base,
            ).toString();
        } catch {
            return null;
        }

    }

    private isSameDomain(
    homepage: string,
    url: string,
    ): boolean {

        return (
            new URL(homepage).hostname ===
            new URL(url).hostname
        );

    }

    private scoreLink(
    url: string,
    ): number {

        const lower =
            url.toLowerCase();

        let score = 0;

        for (const keyword of CAREER_KEYWORDS) {

            if (lower.includes(keyword)) {
                score += 10;
            }

        }

        return score;
    }
}