import { Injectable } from '@nestjs/common';
import { JobSourceAdapter } from '../interfaces/job-source.interface';

@Injectable()
export class AdapterRegistry {
  private readonly adapters: JobSourceAdapter[] = [];

  register(adapter: JobSourceAdapter) {
    this.adapters.push(adapter);
  }

  getAdapters(): JobSourceAdapter[] {
    return this.adapters;
  }
}