import { Branch, BranchAttributes, BranchCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IBranchService {
  createBranch(branchData: BranchCreationAttributes): Promise<Branch>;
  getBranchById(id: number): Promise<Branch | null>;
  getAllBranches(
    options?: any
  ): Promise<Branch[]>;
  updateBranch(
    id: number,
    branchData: Partial<BranchAttributes>
  ): Promise<Branch | null>;
  deleteBranch(id: number): Promise<void>;
}
