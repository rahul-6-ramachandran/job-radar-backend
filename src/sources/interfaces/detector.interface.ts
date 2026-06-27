import { DetectionResult } from "../../discovery/types/detection-result.types";

export interface AtsDetector {
  name: string;

  detect(
    html: string,
    url: string,
  ): Promise<DetectionResult | null>;
}