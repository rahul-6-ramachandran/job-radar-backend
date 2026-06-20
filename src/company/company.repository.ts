import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CompanyRepository {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findAll() {
    return this.prisma.company.findMany();
  }

  findEnabledByATS(ats: string) {
    return this.prisma.company.findMany({
      where: {
        ats,
        enabled: true,
      },
      orderBy: {
        priority: 'asc',
      },
    });
  }

  create(data: any) {
    return this.prisma.company.create({
      data,
    });
  }

  upsert(data: any) {
    return this.prisma.company.upsert({
      where: {
        name: data.name,
      },
      create: data,
      update: data,
    });
  }
}