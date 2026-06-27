import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CompanyImportService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}
}