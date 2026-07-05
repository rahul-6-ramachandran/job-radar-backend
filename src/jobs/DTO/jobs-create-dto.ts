export interface CreateJobDto {
  source: string;
  externalJobId: string;
  companyName: string;
  title: string;
  location?: string | null;
  applicationUrl: string;
  employmentType?: string;
  remoteStatus?: boolean;
  description?: string;
  postedAt?: Date;
  department?: string;
}