import { Injectable } from "@nestjs/common";
import { CompanyRepository } from "./company.repository";

@Injectable()
export class CompanyService {
  constructor(
    private readonly repository: CompanyRepository,
  ) {}


  async findByATS(ats: string) {
  return this.repository.findEnabledByATS(ats);
}
 
}