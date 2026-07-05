export interface DetectionResult {
  ats: string;
  board: string;
  confidence: number;
  detectedFrom: string;
}
export interface DiscoveryContext {
  url: string;
  html: string;
}