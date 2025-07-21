import { IBranchRepository } from "@/repositories";
import { IBranchService } from "./branch.interface.service";
import { IPaginationResponse } from "@/types/api-response.types";
import {
  BranchAttributes,
  BranchCreationAttributes,
} from "@/models";

export class BranchService implements IBranchService {
  constructor(private branchRepository: IBranchRepository) {}

  async getBranchById(id: number): Promise<BranchAttributes | null> {
    return await this.branchRepository.getBranchById(id);
  }
  async getAllBranches(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<BranchAttributes>> {
    return await this.branchRepository.getAllBranches(page, limit, options);
  }
  async createBranch(
    branchData: BranchCreationAttributes
  ): Promise<BranchAttributes> {
    return await this.branchRepository.createBranch(branchData);
  }
  async updateBranch(
    id: number,
    branchData: Partial<BranchAttributes>
  ): Promise<BranchAttributes | null> {
    return await this.branchRepository.updateBranch(id, branchData);
  }
  async deleteBranch(id: number): Promise<void> {
    await this.branchRepository.deleteBranch(id);
  }
}
