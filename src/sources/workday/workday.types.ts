export interface WorkdayResponse {
  total: number;
  jobPostings: WorkdayJob[];
}

export interface WorkdayJob {
  title: string;

  externalPath: string;

  locationsText: string;

  postedOn: string;

  remoteType?: string;

  bulletFields?: string[];
}