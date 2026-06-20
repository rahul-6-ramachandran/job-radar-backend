import { Controller, Get } from '@nestjs/common';
import { CompanyImportService } from './company-import.service';


@Controller('company-import')
export class CompanyImportController {
  constructor(
    private readonly importer: CompanyImportService,
  ) {}

  @Get()
  async import() {
    await this.importer.importCompanies();

    return {
      success: true,
    };
  }
}