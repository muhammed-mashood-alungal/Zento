import { AxiosError } from "axios";
import type { Branch, BranchFormData } from "../types/branch.types";
import { branchInstance } from "../api/axios-instance";

export const branchServices = {
  createBranch: async (
    branchData: BranchFormData
  ): Promise<Branch> => {
    try {
      const response = await branchInstance.post("/create", branchData);
      return response.data.newBranch;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Create Branch Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  getAllBranches: async (): Promise<Branch[]> => {
    try {
      const response = await branchInstance.get(`/`);
      return response.data;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Fetching branches failed.";
      throw new Error(errorMessage);
    }
  },

  getBranchById: async (id: number): Promise<Branch> => {
    try {
      const response = await branchInstance.get(`/${id}`);
      return response.data.branch;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage = err.response?.data?.error || "Branch not found.";
      throw new Error(errorMessage);
    }
  },

  updateBranch: async (
    id: number,
    branchData: BranchFormData
  ): Promise<Branch> => {
    try {
      const response = await branchInstance.put(`/update/${id}`, branchData);
      return response.data.updatedBranch;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Update failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  deleteBranch: async (id: number): Promise<void> => {
    try {
      await branchInstance.delete(`/delete/${id}`);
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Delete failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
};
