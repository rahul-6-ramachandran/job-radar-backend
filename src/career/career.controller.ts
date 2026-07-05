import { Controller, Get } from '@nestjs/common';
import { CareerService } from './career.service';

@Controller("career")
export class CareerController {

    constructor(
        private readonly careerService: CareerService,
    ) {}

    @Get("sync")
    async sync() {

        await this.careerService.discoverAll();

        return {
            success: true,
        };

    }

}