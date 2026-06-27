export interface DetectionResult {
  ats: string;
  board: string;
  confidence: number;
  careersUrl?: string;
}

export interface DiscoveryContext {
  url: string;
  html: string;
}