import { Injectable } from "@nestjs/common";
import { AtsDetector } from "../../sources/interfaces/detector.interface";
import { DetectionResult, DiscoveryContext } from "../types/detection-result.types";

@Injectable()
export class LeverDetector
  implements AtsDetector
{
  name = 'lever';

  async detect(
    context: DiscoveryContext,
  ): Promise<DetectionResult | null> {
    const patterns = [
      /jobs\.lever\.co\/([a-zA-Z0-9_-]+)/i,
      /api\.lever\.co\/v0\/postings\/([a-zA-Z0-9_-]+)/i,
    ];

    for (const pattern of patterns) {
      const match = context.html.match(pattern);

      if (match) {
        return {
          ats: 'lever',
          board: match[1].toLowerCase(),
          confidence: 100,
        };
      }
    }

    return null;
  }
}