import { AxiosError } from "axios";
import { type Vendor, type VendorFormData } from "../types/vendor.types";
import { vendorInstance } from "../api/axios-instance";

export const vendorServices = {
  createVendor: async (
    vendorData: VendorFormData
  ): Promise<Vendor> => {
    try {
      const response = await vendorInstance.post("/create", vendorData);
      return response.data.vendor;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Create Vendor Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  fetchAllVendors: async (
  ): Promise<{ data: Vendor[]; total: number }> => {
    try {
      const response = await vendorInstance.get('/');
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Fetch Vendors Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  findByVendorId: async (id: number): Promise<Vendor> => {
    try {
      const response = await vendorInstance.get(`/${id}`);
      return response.data.vendor;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Fetch Vendor Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  editVendor: async (
    id: number,
    updates: Partial<VendorFormData>
  ): Promise<Vendor> => {
    try {
      const response = await vendorInstance.put(`/update/${id}`, updates);
      return response.data.updatedVendor;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Update Vendor Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  deleteVendor: async (id: number): Promise<number> => {
    try {
      const response = await vendorInstance.delete(`/delete/${id}`);
      return response.data.deletedCount;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Delete Vendor Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
};
