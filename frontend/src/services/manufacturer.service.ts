import { AxiosError } from "axios";
import { type ManufacturerAttributes } from "../types/manufacturer.types";
import { manufacturerInstance } from "../api/axios-instance";

export const manufacturerServices = {
  createManufacturer: async (
    manufacturerData: ManufacturerAttributes
  ): Promise<ManufacturerAttributes> => {
    try {
      const response = await manufacturerInstance.post("/create", manufacturerData);
      return response.data.manufacturer;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Create Manufacturer Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  getManufacturerById: async (id: number): Promise<ManufacturerAttributes> => {
    try {
      const response = await manufacturerInstance.get(`/${id}`);
      return response.data.manufacturer;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Fetching Manufacturer Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  updateManufacturer: async (
    id: number,
    updates: Partial<ManufacturerAttributes>
  ): Promise<ManufacturerAttributes> => {
    try {
      const response = await manufacturerInstance.put(`/update/${id}`, updates);
      return response.data.updatedManufacturer;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Update Manufacturer Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  deleteManufacturer: async (id: number): Promise<number> => {
    try {
      const response = await manufacturerInstance.delete(`/delete/${id}`);
      return response.data.deletedCount;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Delete Manufacturer Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  getAllManufacturers: async (): Promise<{ data: ManufacturerAttributes[]; total: number }> => {
    try {
      const response = await manufacturerInstance.get(`/`);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Fetch Manufacturers Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  changeManufacturerStatus: async (
    id: number,
    status: boolean
  ): Promise<ManufacturerAttributes> => {
    try {
      const response = await manufacturerInstance.patch(`/${id}/status`, { status });
      return response.data.updatedManufacturer;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Status Update Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
};
