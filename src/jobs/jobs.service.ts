import { Injectable, Logger } from '@nestjs/common';
import { CreateJobDto } from './DTO/jobs-create-dto';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../notifications/telegram/telegram.service';

@Injectable()
export class JobsService {

    private readonly logger =
      new Logger(JobsService.name);
  
constructor(
    private readonly prisma: PrismaService,
    private readonly telegramService: TelegramService,
  ) {}
    async upsertJob(job: CreateJobDto) {
  const existing = await this.prisma.job.findUnique({
    where: {
      source_externalJobId: {
        source: job.source,
        externalJobId: job.externalJobId,
      },
    },
  });

  if (existing) {
    return this.prisma.job.update({
      where: { id: existing.id },
      data: job,
    });
  }

  const createdJob = await this.prisma.job.create({
    data: job,
  });
  try {
    await this.telegramService.sendNewJob(createdJob);
  } catch (error) {
    this.logger.error(
      'Failed to send Telegram notification',
      error,
    );
  }

  return createdJob;
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
