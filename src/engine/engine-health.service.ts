import { Injectable } from "@nestjs/common";

export class AdapterHealth {

    source: string = '';

    companies = 0;

    jobsFetched = 0;

    inserted = 0;

    filtered = 0;

    failed = 0;

    lastRun = new Date();

    duration = 0;
}

@Injectable()
export class EngineHealthService {

    private readonly stats =
        new Map<string, AdapterHealth>();

    update(
        source: string,
        health: AdapterHealth,
    ) {
        this.stats.set(source, health);
    }

    getAll() {
        return [...this.stats.values()];
    }

}