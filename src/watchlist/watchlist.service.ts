import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WatchlistService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  findAll() {
    return this.prisma.watchlistCompany.findMany({
      orderBy: {
        priority: 'asc',
      },
    });
  }

  create(
    companyName: string,
    priority: number,
  ) {
    return this.prisma.watchlistCompany.create({
      data: {
        companyName,
        priority,
      },
    });
  }

  delete(id: string) {
    return this.prisma.watchlistCompany.delete({
      where: {
        id,
      },
    });
  }

  async isWatchlisted(
    companyName: string,
  ): Promise<boolean> {
    const company =
      await this.prisma.watchlistCompany.findUnique({
        where: {
          companyName,
        },
      });

    return !!company;
  }
}