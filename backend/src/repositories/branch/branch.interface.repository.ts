import { Branch,  BranchCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IBranchRepository {
  createBranch(branchData: BranchCreationAttributes): Promise<Branch>;
  getBranchById(id: number): Promise<Branch | null>;
  getAllBranches(
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
