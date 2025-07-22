import { Manufacturer } from "@/models";
import {
  ManufacturerAttributes,
  ManufacturerCreationAttributes,
} from "@/models";
import { IPaginationResponse } from "@/types";

export interface IManufacturerRepository {
  createManufacturer(
    manufacturer: ManufacturerCreationAttributes
  ): Promise<Manufacturer>;
  findManufacturerById(id: number): Promise<Manufacturer | null>;
  updateManufacturer(
    id: number,
    updates: Partial<ManufacturerAttributes>
  ): Promise<Manufacturer | null>;
  deleteManufacturer(id: number): Promise<number>;
  fetchAllManufacturers(
    page: number,
    limit: number,
    options: any
  ): Promise<IPaginationResponse<Manufacturer>>;
  changeManufacturerStatus(
    id: number,
    status: string
  ): Promise<Manufacturer | null>;
}
