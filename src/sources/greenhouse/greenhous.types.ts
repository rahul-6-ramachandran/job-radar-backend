export interface GreenhouseResponse {
  jobs: GreenhouseJob[];
}

export interface GreenhouseJob {
  id: number;
  title: string;

  absolute_url: string;

  updated_at: string;

  location: {
    name: string;
  };

  departments: {
    name: string;
  }[];
}