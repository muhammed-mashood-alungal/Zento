import {
  BranchAttributes,
  BranchCreationAttributes,
} from "@/models";
import { IPaginationResponse } from "@/types/api-response.types";

export interface IBranchRepository {
  createBranch(branchData: BranchCreationAttributes): Promise<BranchAttributes>;
  getBranchById(id: number): Promise<BranchAttributes | null>;
  getAllBranches(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<BranchAttributes>>;
  updateBranch(
    id: number,
    branchData: Partial<BranchAttributes>
  ): Promise<BranchAttributes | null>;
  deleteBranch(id: number): Promise<void>;
}
