import { Injectable } from "@nestjs/common";
import { ATS } from "../../common/constants/ats";
import { DetectionResult, DiscoveryContext } from "../types/detection-result.types";
import { AtsDetector } from "../../sources/interfaces/detector.interface";
import { DetectorRegistry } from "../../sources/registry/detector.registry";

@Injectable()
export class WorkdayDetector
implements AtsDetector {

    name = ATS.WORKDAY;
     constructor(
    registry: DetectorRegistry,
  ) {
    registry.register(this);
  }


    async detect(
        context: DiscoveryContext,
    ): Promise<DetectionResult | null> {

        const match =
            context.html.match(
               /myworkdayjobs\.com\/([^"' ]+)/i
            );

        if (!match)
            return null;

        return {
            ats:ATS.WORKDAY,
            board:match[1],
            confidence:100,
            detectedFrom:"workday-script"
            }

    }

}