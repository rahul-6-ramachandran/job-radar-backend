import { Controller, Get } from "@nestjs/common";
import { DiscoveryService } from "./discovery.service";


@Controller('discovery')
export class DiscoveryController {
  constructor(
    private readonly discoveryService: DiscoveryService,
  ) {}

  @Get('sync')
  async sync() {
    await this.discoveryService.discoverAll();

    return {
      success: true,
    };
  }

  @Get()
  async test() {
    return this.discoveryService.discover(
      'https://www.postman.com/company/careers/',
    );
  }
}