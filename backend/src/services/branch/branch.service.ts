import { IBranchRepository } from "@/repositories";
import { IBranchService } from "./branch.interface.service";
import { IPaginationResponse } from "@/types/pagination.types";
import { Branch, BranchAttributes, BranchCreationAttributes } from "@/models";
import { createHttpsError } from "@/utils";
import { StatusCodes } from "http-status-codes";
import { RESPONSE_MESSAGES } from "@/constants";

export class BranchService implements IBranchService {
  constructor(private branchRepository: IBranchRepository) {}

  async getBranchById(id: number): Promise<Branch | null> {
    return await this.branchRepository.findBranchById(id);
  }
  async getAllBranches(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<Branch>> {
    return await this.branchRepository.fetchAllBranches(page, limit, options);
  }
  async createBranch(branchData: BranchCreationAttributes): Promise<Branch> {
    const isExist = await this.branchRepository.isBranchExistWithName(
      branchData.name
    );

    if (isExist) {
      throw createHttpsError(
        StatusCodes.CONFLICT,
        RESPONSE_MESSAGES.BRANCH_EXISTS
      );
    }
    return await this.branchRepository.createBranch(branchData);
  }
  async updateBranch(
    id: number,
    branchData: Partial<BranchAttributes>
  ): Promise<Branch | null> {
    return await this.branchRepository.updateBranch(id, branchData);
  }
  async deleteBranch(id: number): Promise<void> {
    await this.branchRepository.deleteBranch(id);
  }
}
