import {
  Manufacturer,
  ManufacturerAttributes,
  ManufacturerCreationAttributes,
} from "@/models";
import { IManufacturerRepository } from "@/repositories";
import { IPaginationResponse } from "@/types";
import { IManufacturerService } from "./manufacturer.interface.service";

export class ManufacturerService implements IManufacturerService {
  constructor(
    private readonly manufacturerRepository: IManufacturerRepository
  ) {}

  async createManufacturer(
    manufacturer: ManufacturerCreationAttributes
  ): Promise<Manufacturer | null> {
    return await this.manufacturerRepository.createManufacturer(manufacturer);
  }

  async getManufacturerById(id: number): Promise<Manufacturer | null> {
    return this.manufacturerRepository.findManufacturerById(id);
  }
  async updateManufacturer(
    id: number,
    updates: Partial<ManufacturerAttributes>
  ): Promise<Manufacturer> {
    return this.manufacturerRepository.updateManufacturer(id, updates);
  }
  async deleteManufacturer(id: number): Promise<number> {
    return this.manufacturerRepository.deleteManufacturer(id);
  }

  async getAllManufacturers(
    page: number,
    limit: number,
    options?: any
  ): Promise<IPaginationResponse<Manufacturer>> {
    return this.manufacturerRepository.fetchAllManufacturers(
      page,
      limit,
      options
    );
  }

  async changeManufacturerStatus(
    id: number,
    status: string
  ): Promise<Manufacturer | null> {
    return this.manufacturerRepository.changeManufacturerStatus(id, status);
  }
}
