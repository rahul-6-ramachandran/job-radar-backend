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

async markSynced(id: string) {
  return this.prisma.company.update({
    where: { id },
    data: {
      lastSyncedAt: new Date(),
    },
  });
}

  
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

async findWithoutHomepage() {
  return this.prisma.company.findMany({
    where: {
      homepageUrl: null,
    },
  });
}


async findWithoutCareerUrl() {
  return this.prisma.company.findMany({
    where: {
      homepageUrl: {
        not: null,
      },
      careerUrl: null,
    },
  });
}

async updateCareerUrl(
  id: string,
  careerUrl: string,
) {
  return this.prisma.company.update({
    where: {
      id,
    },
    data: {
      careerUrl,
    },
  });
}

async updateHomepage(
  id: string,
  homepageUrl: string,
) {
  return this.prisma.company.update({
    where: {
      id,
    },
    data: {
      homepageUrl,
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