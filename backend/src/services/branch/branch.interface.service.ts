import { Branch, BranchAttributes, BranchCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IBranchService {
  createBranch(branchData: BranchCreationAttributes): Promise<Branch>;
  getBranchById(id: number): Promise<Branch | null>;
  getAllBranches(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<Branch>>;
  updateBranch(
    id: number,
    branchData: Partial<BranchAttributes>
  ): Promise<Branch | null>;
  deleteBranch(id: number): Promise<void>;
}
