import { AxiosError } from "axios";
import type {
  GRNAttributes,
  GRNCreatePayload,
  GRNResponseAttributes,
} from "../types/grn.types";
import { grnInstance } from "../api/axios-instance";
import type { IPaginationResponse } from "../types/common.types";
import { saveAs } from "file-saver";

export const grnServices = {
  createGRN: async (grnData: GRNCreatePayload): Promise<GRNAttributes> => {
    try {
      const response = await grnInstance.post("/create", grnData);
      return response.data.grn;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Create GRN Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  fetchAllGRNs: async (
    page = 1,
    limit = 10,
    options = {}
  ): Promise<IPaginationResponse<GRNResponseAttributes>> => {
    try {
      const response = await grnInstance.get("/", {
        params: {
          page,
          limit,
          options: JSON.stringify(options),
        },
      });
      return response.data.grns;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Fetching GRNs Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  findGRNById: async (id: number): Promise<GRNResponseAttributes> => {
    try {
      const response = await grnInstance.get(`/${id}`);
      return response.data.grn;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Fetch GRN Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  updateGRN: async (
    id: number,
    grnData: GRNCreatePayload
  ): Promise<GRNAttributes> => {
    try {
      const response = await grnInstance.put(`/update/${id}`, grnData);
      return response.data.grn;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Update GRN Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  deleteGRN: async (id: number): Promise<void> => {
    try {
      await grnInstance.delete(`/delete/${id}`);
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error || "Delete GRN Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },

  generateGRNNumber: async (): Promise<string> => {
    try {
      const response = await grnInstance.post("/generate-grn-number");
      return response.data.grnNumber;
    } catch (error: unknown) {
      const err = error as AxiosError<{ error: string }>;
      const errorMessage =
        err.response?.data?.error ||
        "Generate GRN Number Failed. Please try again.";
      throw new Error(errorMessage);
    }
  },
  download: async (filters: any): Promise<void> => {
  try {
    const query = new URLSearchParams({
      ...(filters.from && { from: new Date(filters.from).toISOString() }),
      ...(filters.to && { to: new Date(filters.to).toISOString() }),
      ...(filters.vendor_id && { vendor_id: String(filters.vendor_id) }),
      ...(filters.branch_id && { branch_id: String(filters.branch_id) }),
    }).toString();

    const res = await grnInstance.post(
      `/report/export?${query}`, 
      { filters },
      {
        responseType: "blob",
      }
    );

    const blob = new Blob([res?.data!], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const now = new Date();
    const fileName = `GRN_Report_${now.toISOString().split("T")[0]}.xlsx`;
    saveAs(blob, fileName);
  } catch (error: unknown) {
    const err = error as AxiosError<{ error: string }>;
    const errorMessage =
      err.response?.data?.error ||
      "Generate GRN Number Failed. Please try again.";
    throw new Error(errorMessage);
  }
},

};
