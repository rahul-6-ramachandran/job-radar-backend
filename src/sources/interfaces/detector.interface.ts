import { DetectionResult, DiscoveryContext } from "../../discovery/types/detection-result.types";

export interface AtsDetector {
  name: string;

  detect(
   context : DiscoveryContext
  ): Promise<DetectionResult | null>;
}