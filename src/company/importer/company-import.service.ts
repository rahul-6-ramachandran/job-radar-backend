import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as fs from 'fs';
import csv from 'csv-parser';

@Injectable()
export class CompanyImportService {
  private readonly logger = new Logger(CompanyImportService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async importCompanies() {
    const companies: any[] = [];

    return new Promise((resolve, reject) => {
      fs.createReadStream('data/companies.csv')
        .pipe(csv())
        .on('data', (row) => companies.push(row))
        .on('end', async () => {
          let inserted = 0;
          let updated = 0;

          for (const row of companies) {
            const existing =
              await this.prisma.company.findUnique({
                where: {
                  name: row.Company.trim(),
                },
              });

            await this.prisma.company.upsert({
              where: {
                name: row.Company.trim(),
              },

              create: {
                name: row.Company.trim(),
                category: row.Category,
                bestFitRoles: row['Best-Fit Roles'],
                techStack: row['Relevant Stack'],

                ats: 'unknown',
                board: '',

                priority: 3,
                enabled: true,
              },

              update: {
                category: row.Category,
                bestFitRoles: row['Best-Fit Roles'],
                techStack: row['Relevant Stack'],
              },
            });

            if (existing) {
              updated++;
            } else {
              inserted++;
            }
          }

          this.logger.log(
            `Imported: ${inserted}, Updated: ${updated}`,
          );

          resolve(true);
        })
        .on('error', reject);
    });
  }
}