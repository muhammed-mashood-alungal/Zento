import { Manufacturer } from "@/models";
import {
  ManufacturerAttributes,
  ManufacturerCreationAttributes,
} from "@/models/manufacturer/manufacturer.types";
import { IPaginationResponse } from "@/types/api-response.types";

export interface IManufacturerRepository {
  createManufacturer(
    manufacturer: ManufacturerCreationAttributes
  ): Promise<Manufacturer>;
  getManufacturerById(id: number): Promise<Manufacturer | null>;
  updateManufacturer(
    id: number,
    updates: Partial<ManufacturerAttributes>
  ): Promise<Manufacturer | null>;
  deleteManufacturer(id: number): Promise<number>;
  getAllManufacturers(
    page: number,
    limit: number,
    options: any
  ): Promise<IPaginationResponse<Manufacturer>>;
  changeManufacturerStatus(
    id: number,
    status: string
  ): Promise<Manufacturer | null>;
}
