import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './DTO/jobs-create-dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class JobsService {
constructor(
    private readonly prisma: PrismaService,
  ) {}
    async upsertJob(job: CreateJobDto) {
    return this.prisma.job.upsert({
    where: {
      source_externalJobId: {
        source: job.source,
        externalJobId: job.externalJobId,
      },
    },

    create: job,

    update: {
      ...job,
    },
  });
}
async findAll(filters: {
  search?: string;
  remote?: boolean;
  company?: string;
}) {
  return this.prisma.job.findMany({
    where: {
      ...(filters.search && {
        OR: [
          {
            title: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
          {
            companyName: {
              contains: filters.search,
              mode: 'insensitive',
            },
          },
        ],
      }),

      ...(filters.remote !== undefined && {
        remoteStatus: filters.remote,
      }),

      ...(filters.company && {
        companyName: {
          contains: filters.company,
          mode: 'insensitive',
        },
      }),
    },

    orderBy: {
      postedAt: 'desc',
    },
  });
}
}
