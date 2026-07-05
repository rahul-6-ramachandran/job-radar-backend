import { Injectable } from "@nestjs/common";
import { ATS } from "../../common/constants/ats";
import { DetectionResult, DiscoveryContext } from "../types/detection-result.types";
import { AtsDetector } from "../../sources/interfaces/detector.interface";
import { DetectorRegistry } from "../../sources/registry/detector.registry";

@Injectable()
export class WorkableDetector
implements AtsDetector {

    name = ATS.WORKABLE;

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
               /apply\.workable\.com\/([a-zA-Z0-9-]+)/i
            );

        if (!match)
            return null;

        return {
            ats:ATS.WORKABLE,
            board:match[1],
            confidence:100,
            detectedFrom:"workable-script"
            }

    }

}