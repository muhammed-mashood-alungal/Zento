import { AxiosError } from "axios";
import { type SubCategoryAttributes } from "../types/sub-category.types";
import { subCetagoryInstance } from "../api/axios-instance";

export const subCategoryServices = {
  createSubCategory: async (
    subCategoryData: SubCategoryAttributes
  ): Promise<SubCategoryAttributes> => {
    try {
      const response = await subCetagoryInstance.post("/create", subCategoryData);
      return response.data.subCategory;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Create Sub Category Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  getAllSubCategories: async (
    categoryId: number): Promise<{ data: SubCategoryAttributes[]; total: number }> => {
    try {
      const response = await subCetagoryInstance.get(`/${categoryId}`);
      return response.data.subCategories;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Fetch Sub Categories Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  getSubCategoryById: async (
    categoryId: number,
    subCategoryId: number
  ): Promise<SubCategoryAttributes> => {
    try {
      const response = await subCetagoryInstance.get(`/${categoryId}/${subCategoryId}`);
      return response.data.subCategory;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Fetch Sub Category Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  updateSubCategory: async (
    categoryId: number,
    subCategoryId: number,
    updates: Partial<SubCategoryAttributes>
  ): Promise<SubCategoryAttributes> => {
    try {
      const response = await subCetagoryInstance.put(
        `/update/${categoryId}/${subCategoryId}`,
        updates
      );
      return response.data.updatedSubCategory;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Update Sub Category Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  deleteSubCategory: async (
    categoryId: number,
    subCategoryId: number
  ): Promise<number> => {
    try {
      const response = await subCetagoryInstance.delete(
        `/delete/${categoryId}/${subCategoryId}`
      );
      return response.data.deletedCount;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Delete Sub Category Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
};
