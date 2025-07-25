import type { GRNFormData } from "../types/grn.types";
import * as yup from "yup";

export const draftSchema: yup.ObjectSchema<GRNFormData> = yup.object({
  grn_number: yup.string().default(""),
  grn_date: yup.string().default(""),
  vendor_id: yup.number().default(0),
  branch_id: yup.number().default(0),
  invoice_number: yup.string().default(""),
  total_amount: yup.number().default(0),
});

export const submitSchema: yup.ObjectSchema<GRNFormData> = yup.object({
  grn_number: yup.string().required("GRN Number is required"),
  grn_date: yup.string().required("GRN Date is required"),
  vendor_id: yup
    .number()
    .min(1, "Please Select A Vendor")
    .required("Vendor is required"),
  branch_id: yup
    .number()
    .min(1, "Please Select A Branch")
    .required("Branch is required"),
  invoice_number: yup
    .string()
    .max(30, "Invoice number must be 30 characters or less")
    .required("Invoice number is required"),
  total_amount: yup.number().required("Total amount is required"),
});
