export interface AshbyApiResponse {
  data: {
    jobBoard: {
      jobs: AshbyJob[];
    };
  };
}

export interface AshbyJob {
  id: string;

  title: string;

  jobUrl: string;

  publishedAt: string;

  isRemote?: boolean;

  employmentType?: string;

  location?: {
    locationName: string;
  };
}