import { AxiosError } from "axios";
import { cetagoryInstance } from "../api/axios-instance";
import { type Category, type CategoryFormData } from "../types/category.types";

export const categoryServices = {
  createCategory: async (
    categoryData: CategoryFormData
  ): Promise<Category> => {
    try {
      const response = await cetagoryInstance.post("/create", categoryData);
      return response.data.newCategory;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Create Category Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  fetchAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await cetagoryInstance.get("/");
      return response.data.categories;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Fetching Categories Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  findByCategoryId: async (id: string): Promise<Category> => {
    try {
      const response = await cetagoryInstance.get(`/${id}`);
      return response.data.category;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Fetching Category Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  editCategory: async (
    id: string,
    categoryData: CategoryFormData
  ): Promise<Category> => {
    try {
      const response = await cetagoryInstance.put(`/update/${id}`, categoryData);
      return response.data.updatedCategory;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Update Category Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  deleteCategory: async (id: string): Promise<string> => {
    try {
      const response = await cetagoryInstance.delete(`/delete/${id}`);
      return response.data.message;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Delete Category Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
};
