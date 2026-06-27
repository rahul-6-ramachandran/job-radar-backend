import { Injectable } from '@nestjs/common';
import { JobSourceAdapter } from '../interfaces/job-source.interface';
import { AtsDetector } from '../interfaces/detector.interface';

@Injectable()
export class DetectorRegistry {
  private readonly detectors: AtsDetector[] = [];

  register(detector: AtsDetector) {
    this.detectors.push(detector);
  }

  getDetectors(): AtsDetector[] {
    return this.detectors;
  }
}