import {
  Manufacturer,
  ManufacturerAttributes,
  ManufacturerCreationAttributes,
} from "@/models";
import { IManufacturerRepository } from "./manufacturer.interface.repository";
import { BaseRepository } from "../base.repository";
import { IPaginationResponse } from "@/types/pagination.types";

export class ManufacturerRepository
  extends BaseRepository<Manufacturer>
  implements IManufacturerRepository
{
  constructor() {
    super(Manufacturer);
  }

  async createManufacturer(
    manufacturer: ManufacturerCreationAttributes
  ): Promise<Manufacturer> {
    return await this.create(manufacturer);
  }
  async findManufacturerById(id: number): Promise<Manufacturer | null> {
    return await this.findById(id);
  }

  async updateManufacturer(
    id: number,
    manufacturer: Partial<Manufacturer>
  ): Promise<Manufacturer | null> {
    return await this.updateById(id, manufacturer);
  }

  async deleteManufacturer(id: number): Promise<Manufacturer> {
    return await this.updateById(id, {
      is_deleted: true,
    });
  }

  async fetchAllManufacturers(options: any): Promise<Manufacturer[]> {
    return await this.findAll({ ...options, where: { is_deleted: false } });
  }

  async changeManufacturerStatus(
    id: number,
    status: "active" | "inactive"
  ): Promise<Manufacturer | null> {
    const manufacturer = await this.updateById(id, { status });

    if (!manufacturer) {
      return null;
    }
    return manufacturer;
  }

  async isManufacturerExist(name: string): Promise<boolean> {
    return (await this.count({ where: { name } })) != 0;
  }
}
