import { Injectable } from "@nestjs/common";
import { CompanyRepository } from "./company.repository";
import { DetectionResult } from "../discovery/types/detection-result.types";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CompanyService {
  constructor(
    private readonly repository: CompanyRepository,
    private readonly prisma : PrismaService
  ) {}



  
async findUnknownATS() {
  return this.prisma.company.findMany({
    where: {
      enabled: true,
      ats: 'unknown',
      careerUrl: {
        not: null,
      },
    },
  });
}


  async findByATS(ats: string) {
  return this.repository.findEnabledByATS(ats);
}
  async updateATS(
    id: string,
    result: DetectionResult,
  ) {
    return this.prisma.company.update({
      where: { id },

      data: {
        ats: result.ats,
        board: result.board,
        confidence: result.confidence,
        lastVerifiedAt: new Date(),
      },
    });
  } 

async findAll() {
  return this.prisma.company.findMany({
    orderBy: {
      priority: "asc",
    },
  });
}
}