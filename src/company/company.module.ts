import { Module } from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CompanyRepository } from "./company.repository";
import { CompanyController } from "./company.controller";
import { CompanyImportService } from "./importer/company-import.service";
import { CompanyImportController } from "./importer/company-import.controller";
import { PrismaModule } from "../prisma/prisma.module";

@Module({
  providers: [
    CompanyService,
    CompanyRepository,
    CompanyImportService, 
  ],
  controllers: [
    CompanyController,
    CompanyImportController
  ],
  exports: [
    CompanyService,
    CompanyRepository,
  ],
  imports: [PrismaModule],
})
export class CompanyModule {}