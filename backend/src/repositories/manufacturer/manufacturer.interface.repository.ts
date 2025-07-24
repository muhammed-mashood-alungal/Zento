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
  deleteManufacturer(id: number): Promise<Manufacturer>;
  fetchAllManufacturers(options: any): Promise<Manufacturer[]>;
  changeManufacturerStatus(
    id: number,
    status: string
  ): Promise<Manufacturer | null>;
  isManufacturerExist(name: string): Promise<boolean>;
}
