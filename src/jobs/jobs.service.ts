import { Injectable, Logger } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../notifications/telegram/telegram.service';

import { CreateJobDto } from './DTO/jobs-create-dto';

@Injectable()
export class JobsService {
  private readonly logger =
    new Logger(JobsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService,
  ) {}

  async upsertJob(job: CreateJobDto) {
    const existing =
      await this.prisma.job.findUnique({
        where: {
          source_externalJobId: {
            source: job.source,
            externalJobId: job.externalJobId,
          },
        },
      });

    if (existing) {
      return this.prisma.job.update({
        where: {
          id: existing.id,
        },
        data: job,
      });
    }

    const created =
      await this.prisma.job.create({
        data: job,
      });

    try {
      await this.telegramService.sendNewJob(created);
    } catch (error) {
      this.logger.error(
        'Failed to send Telegram notification',
        error,
      );
    }

    return created;
  }

  async findAll(filters: {
       q?: string;

    company?: string;

    remote?: boolean;

    source?: string;

    location?: string;

    postedWithinDays?: number;

    page?: number;

    limit?: number;
  }) {
    const page = filters.page ?? 1;
    const limit = filters.limit ?? 20;

    let postedAtFilter;

    if (filters.postedWithinDays) {

        const date = new Date();

        date.setDate(
            date.getDate() - filters.postedWithinDays,
        );

        postedAtFilter = {
            gte: date,
        };

    }

    const where: Prisma.JobWhereInput = {
      ...(filters.q && {
       OR: [
        {
          title: {
            contains: filters.q,
            mode: 'insensitive',
          },
        },
        {
          companyName: {
            contains: filters.q,
            mode: 'insensitive',
          },
        },
        {
          location: {
            contains: filters.q,
            mode: 'insensitive',
          },
        },
        {
          source: {
            contains: filters.q,
            mode: 'insensitive',
          },
        },
      ]
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

      ...(postedAtFilter && {

          postedAt: postedAtFilter,

      }),

      ...(filters.source && {

    source: filters.source,

}),

...(filters.location && {

    location: {

        contains: filters.location,

        mode: "insensitive",

    },

}),
    };

    const total =
      await this.prisma.job.count({
        where,
      });

    const jobs =
      await this.prisma.job.findMany({
        where,

        skip: (page - 1) * limit,

        take: limit,

        orderBy: [
          {
            postedAt: 'desc',
          },
          {
            createdAt: 'desc',
          },
        ],
      });

    return {
      jobs,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }
}