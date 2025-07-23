import {
  Asset,
  AssetAttributes,
  AssetCreationAttributes,
  Branch,
  BranchAttributes,
  GRNAttributes,
  GRNCreationAttributes,
  GRNHeader,
  GRNLineItems,
} from "@/models";
import { sequelize } from "@/config";
import { IPaginationResponse } from "@/types";
import { Op } from "sequelize";
import { IGRNRepository } from "./grn.interface.repository";

export class GrnRepository implements IGRNRepository {
  private grnHeaderRepo: typeof GRNHeader;
  private grnItemRepo: typeof GRNLineItems;
  private asset: typeof Asset;

  constructor() {
    this.grnHeaderRepo = GRNHeader;
    this.grnItemRepo = GRNLineItems;
    this.asset = Asset;
  }

  async createGRN(grnData: GRNCreationAttributes): Promise<GRNAttributes> {
    const transaction = await sequelize.transaction();

    try {
      const grnHeader = await this.grnHeaderRepo.create(grnData.header, {
        transaction,
      });
      const grnLineItems = grnData.line_items.map((item) => ({
        ...item,
        grn_header_id: grnHeader.id,
      }));

      await this.grnItemRepo.bulkCreate(grnLineItems, { transaction });

      await transaction.commit();
      return {
        ...grnHeader.get(),
        line_items: grnLineItems,
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findByGRNId(id: number): Promise<GRNAttributes | null> {
    const grn: unknown = await this.grnHeaderRepo.findByPk(id, {
      include: [
        {
          model: GRNLineItems,
          as: "line_items",
        },
        "vendor",
        "branch",
      ],
    });

    return grn as GRNAttributes | null;
  }

  async fetchAllGRNs(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<GRNAttributes>> {
    const offset = (page - 1) * limit;

    const whereClause = {};

    if (options?.vendorId) {
      whereClause["vendor_id"] = options.vendorId;
    }
    if (options?.branchId) {
      whereClause["branch_id"] = options.branchId;
    }
    if (options?.status) {
      whereClause["status"] = options.status;
    }
    if (options?.grnNumber) {
      whereClause["grn_number"] = {
        [Op.like]: `%${options.grnNumber}%`,
      };
    }
    if (options?.dateRange) {
      whereClause["grn_date"] = {
        [Op.between]: [options.dateRange.start, options.dateRange.end],
      };
    }

    const { rows: data, count: total }: { rows: unknown; count: number } =
      await this.grnHeaderRepo.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: GRNLineItems,
            as: "line_items",
          },
          "vendor",
          "branch",
        ],
        order: [["created_at", "DESC"]],
        limit,
        offset,
      });

    return {
      data: data as GRNAttributes[],
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
  async updateGRN(
    id: number,
    grnData: Partial<GRNCreationAttributes>
  ): Promise<GRNAttributes | null> {
    const transaction = await sequelize.transaction();

    try {
      const grnHeader = await this.grnHeaderRepo.findByPk(id, { transaction });
      if (!grnHeader) {
        return null;
      }

      await grnHeader.update(grnData.header || {}, { transaction });

      if (grnData.line_items) {
        await this.grnItemRepo.destroy({
          where: { grn_header_id: id },
          transaction,
        });
        const grnLineItems = grnData.line_items.map((item) => ({
          ...item,
          grn_header_id: id,
        }));
        await this.grnItemRepo.bulkCreate(grnLineItems, { transaction });
      }

      await transaction.commit();
      return {
        ...grnHeader.get(),
        line_items: grnData.line_items || [],
      };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async deleteGRN(id: number): Promise<number> {
    const transaction = await sequelize.transaction();

    try {
      const deletedCount = await this.grnHeaderRepo.destroy({
        where: { id },
        transaction,
      });
      await transaction.commit();
      return deletedCount;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findGRNByNumber(grn_number: string): Promise<GRNAttributes> {
    const grn: unknown = await this.grnHeaderRepo.findOne({
      where: { grn_number },
      include: [
        {
          model: GRNLineItems,
          as: "line_items",
        },
        "vendor",
        "branch",
      ],
    });

    return grn as GRNAttributes | null;
  }
}
