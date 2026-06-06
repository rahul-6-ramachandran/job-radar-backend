export interface CreateJobDto {
  source: string;
  externalJobId: string;
  companyName: string;
  title: string;
  location?: string;
  applicationUrl: string;
  employmentType?: string;
  remoteStatus?: boolean;
  description?: string;
  postedAt?: Date;
  department?: string;
}