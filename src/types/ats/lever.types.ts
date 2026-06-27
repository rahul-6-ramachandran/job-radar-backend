export type LeverResponse = LeverJob[];


export interface LeverJob {
  id: string;

  text: string;

  hostedUrl: string;

  categories: {
    location: string;
    team?: string;
    commitment?: string;
  };

  createdAt?: number;
}