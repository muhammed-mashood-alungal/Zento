import { Branch,  BranchCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IBranchRepository {
  createBranch(branchData: BranchCreationAttributes): Promise<Branch>;
  findBranchById(id: number): Promise<Branch | null>;
  fetchAllBranches(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<Branch>>;
  updateBranch(
    id: number,
    branchData: Partial<Branch>
  ): Promise<Branch | null>;
  deleteBranch(id: number): Promise<void>;
}
