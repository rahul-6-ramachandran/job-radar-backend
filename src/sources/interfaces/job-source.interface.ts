import { Company } from '@prisma/client';

export interface JobSourceAdapter {
  readonly source: string;

  sync(companies: Company[]): Promise<void>;
}