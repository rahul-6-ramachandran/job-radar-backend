import { Module } from "@nestjs/common";
import { DetectorRegistry } from "../sources/registry/detector.registry";
import { GreenhouseDetector } from "./detectors/greenhouse.detector";
import { DiscoveryController } from "./discovery.controller";
import { DiscoveryService } from "./discovery.service";
import { CompanyModule } from "../company/company.module";

@Module({
  providers: [
    DetectorRegistry,
    GreenhouseDetector,
    DiscoveryService
  ],
  controllers: [DiscoveryController],
  imports:[CompanyModule]
})
export class DiscoveryModule {
  constructor(
    registry: DetectorRegistry,
    greenhouse: GreenhouseDetector,
  ) {
    registry.register(greenhouse as any);
  }
}