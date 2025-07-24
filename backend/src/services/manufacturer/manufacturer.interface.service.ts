import {
  Manufacturer,
  ManufacturerAttributes,
  ManufacturerCreationAttributes,
} from "@/models";

export interface IManufacturerService {
  createManufacturer(
    manufacturer: ManufacturerCreationAttributes
  ): Promise<Manufacturer | null>;
  getManufacturerById(id: number): Promise<Manufacturer | null>;
  updateManufacturer(
    id: number,
    updates: Partial<ManufacturerAttributes>
  ): Promise<Manufacturer>;
  deleteManufacturer(id: number): Promise<Manufacturer>;
  getAllManufacturers(): Promise<Manufacturer[]>;
  changeManufacturerStatus(
    id: number,
    status: string
  ): Promise<Manufacturer | null>;
}
