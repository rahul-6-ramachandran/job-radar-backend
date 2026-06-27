import { Injectable } from '@nestjs/common';
import { AtsDetector } from '../../sources/interfaces/detector.interface';
import { DetectionResult, DiscoveryContext } from '../types/detection-result.types';

@Injectable()
export class GreenhouseDetector
  implements AtsDetector
{
  name = 'greenhouse';

  async detect(
    context: DiscoveryContext,
  ): Promise<DetectionResult | null> {
    const patterns = [
      /boards\.greenhouse\.io\/([a-zA-Z0-9_-]+)/i,
      /job-boards\.greenhouse\.io\/([a-zA-Z0-9_-]+)/i,
    ];

    for (const pattern of patterns) {
      const match = context.html.match(pattern);

      if (match) {
        return {
          ats: 'greenhouse',
          board: match[1].toLowerCase(),
          confidence: 100,
        };
      }
    }

    return null;
  }
}