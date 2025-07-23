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
    console.log('CREATING MANUFACTOR')
    console.log(manufacturer)
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

  async deleteManufacturer(id: number): Promise<number> {
    return await this.deleteById(id);
  }


  async fetchAllManufacturers(
    page: number,
    limit: number,
    options: any
  ): Promise<IPaginationResponse<Manufacturer>> {
    return await this.paginate(page, limit, options);
  }

  async changeManufacturerStatus(
    id: number,
    status: 'active' | 'inactive'
  ): Promise<Manufacturer | null> {
    const manufacturer = await this.updateById(id, { status });

    if (!manufacturer) {
      return null;
    }
    return manufacturer;
  }

  async isManufacturerExist(name: string): Promise<boolean> {
    return await this.count({where : {name }}) != 0
  }
}
