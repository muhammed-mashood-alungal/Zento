import { Branch } from "@/models";
import { BaseRepository } from "../base.repository";
import { IPaginationResponse } from "@/types";
import { IBranchRepository } from "./branch.interface.repository";

export class BranchRepository
  extends BaseRepository<Branch>
  implements IBranchRepository
{
  constructor() {
    super(Branch);
  }

  async findBranchById(id: number): Promise<Branch | null> {
    return await this.findById(id);
  }

  async fetchAllBranches(options?: any): Promise<Branch[]> {
    return await this.findAll({ ...options, where: { is_deleted: false } });
  }

  async createBranch(branchData: Partial<Branch>): Promise<Branch> {
    return await this.create(branchData);
  }

  async updateBranch(
    id: number,
    branchData: Partial<Branch>
  ): Promise<Branch | null> {
    return await this.updateById(id, branchData);
  }

  async deleteBranch(id: number): Promise<void> {
    await this.updateById(id, {
      is_deleted: true,
    });
  }

  async isBranchExistWithName(name: string): Promise<boolean> {
    return (await this.count({ where: { name } })) != 0;
  }
}
