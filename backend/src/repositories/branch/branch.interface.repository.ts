import { Branch,  BranchCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types";

export interface IBranchRepository {
  createBranch(branchData: BranchCreationAttributes): Promise<Branch>;
  findBranchById(id: number): Promise<Branch | null>;
  fetchAllBranches(
    options?: any
  ): Promise<Branch[]>;
  updateBranch(
    id: number,
    branchData: Partial<Branch>
  ): Promise<Branch | null>;
  deleteBranch(id: number): Promise<void>;
  isBranchExistWithName(name : string) : Promise<boolean>
}
