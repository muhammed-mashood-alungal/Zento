import { Manufacturer, ManufacturerAttributes, ManufacturerCreationAttributes } from "@/models";
import { IPaginationResponse } from "@/types/api-response.types";

export interface IManufacturerService {
  createManufacturer(
    manufacturer: ManufacturerCreationAttributes
  ): Promise<Manufacturer | null>;
  getManufacturerById(id: number): Promise<Manufacturer | null>;
  updateManufacturer(
    id: number,
    updates: Partial<ManufacturerAttributes>
  ): Promise<Manufacturer>;
  deleteManufacturer(id: number): Promise<number>;
  getAllManufacturers(
    page: number,
    limit: number
  ): Promise<IPaginationResponse<Manufacturer>>;
  changeManufacturerStatus(
    id: number,
    status: string
  ): Promise<Manufacturer | null>;
}
